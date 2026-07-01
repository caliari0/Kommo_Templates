param(
    [int]$Port = 8000
)

$ErrorActionPreference = "Stop"

function Write-Step($message) {
    Write-Host "`n==> $message" -ForegroundColor Cyan
}

function Stop-PortProcess($targetPort) {
    $pids = @(Get-NetTCPConnection -LocalPort $targetPort -ErrorAction SilentlyContinue |
        Select-Object -ExpandProperty OwningProcess -Unique |
        Where-Object { $_ -and $_ -ne 0 })
    foreach ($targetPid in $pids) {
        try {
            taskkill /PID $targetPid /F | Out-Null
            Write-Host "Stopped PID $targetPid on port $targetPort"
        } catch {
            Write-Warning "Could not stop PID $targetPid on port $targetPort"
        }
    }
}

function Wait-ForHttp($url, $timeoutSeconds = 30) {
    $deadline = (Get-Date).AddSeconds($timeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        try {
            $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 3
            if ($resp.StatusCode -ge 200 -and $resp.StatusCode -lt 500) {
                return $true
            }
        } catch {
            Start-Sleep -Milliseconds 700
        }
    }
    return $false
}

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$pythonPath = Join-Path $root ".venv\Scripts\python.exe"
if (-not (Test-Path $pythonPath)) {
    throw "Python venv not found at: $pythonPath"
}

$localUrl = "http://127.0.0.1:$Port/ui"
$tunnelLog = Join-Path $root "cloudflared.log"
$appStdoutLog = Join-Path $root "uvicorn.out.log"
$appStderrLog = Join-Path $root "uvicorn.err.log"

Write-Step "Stopping previous processes"
Stop-PortProcess -targetPort $Port
Get-Process cloudflared -ErrorAction SilentlyContinue | ForEach-Object {
    try { taskkill /PID $_.Id /F | Out-Null } catch {}
}

Write-Step "Starting FastAPI app on port $Port"
if (Test-Path $appStdoutLog) { Remove-Item $appStdoutLog -Force }
if (Test-Path $appStderrLog) { Remove-Item $appStderrLog -Force }
Start-Process -FilePath $pythonPath `
    -ArgumentList "-m uvicorn app.main:app --host 127.0.0.1 --port $Port --reload" `
    -WorkingDirectory $root `
    -RedirectStandardOutput $appStdoutLog `
    -RedirectStandardError $appStderrLog `
    -WindowStyle Minimized

if (-not (Wait-ForHttp -url $localUrl -timeoutSeconds 35)) {
    throw "App did not become healthy at $localUrl. Check $appStdoutLog and $appStderrLog"
}
Write-Host "App is healthy at $localUrl" -ForegroundColor Green

Write-Step "Starting cloudflared"
if (Test-Path $tunnelLog) { Remove-Item $tunnelLog -Force }
Start-Process -FilePath "cloudflared" `
    -ArgumentList "tunnel --url http://127.0.0.1:$Port --logfile `"$tunnelLog`"" `
    -WorkingDirectory $root `
    -WindowStyle Minimized

Write-Step "Waiting for tunnel URL"
$deadline = (Get-Date).AddSeconds(40)
$publicUrl = $null
while ((Get-Date) -lt $deadline) {
    if (Test-Path $tunnelLog) {
        $content = Get-Content $tunnelLog -Raw -ErrorAction SilentlyContinue
        if ($content -match "https://[a-zA-Z0-9\-]+\.trycloudflare\.com") {
            $publicUrl = $Matches[0]
            break
        }
    }
    Start-Sleep -Milliseconds 900
}

if (-not $publicUrl) {
    Write-Warning "Tunnel URL not found yet. Check log: $tunnelLog"
    exit 1
}

Write-Host "`nTunnel ready: $publicUrl" -ForegroundColor Green
Write-Host "Local app:   $localUrl"
Write-Host "App logs:    $appStdoutLog / $appStderrLog"
Write-Host "Tunnel log:  $tunnelLog"
