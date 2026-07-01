"""Entry point for the packaged executable: runs the FastAPI app and a
cloudflared quick tunnel together, printing the public URL to the console.
"""

import os
import re
import shutil
import socket
import subprocess
import sys
import threading
import time
import urllib.request
from pathlib import Path

import uvicorn

TUNNEL_URL_PATTERN = re.compile(r"https://[a-zA-Z0-9\-]+\.trycloudflare\.com")
CLOUDFLARED_FALLBACK = Path(r"C:\Program Files (x86)\cloudflared\cloudflared.exe")
PROJECT_ROOT = Path(r"C:\Users\iscal\Documents\Estudo\kommotemplates")


def base_dir() -> Path:
    return PROJECT_ROOT


def find_free_port(start_port: int, attempts: int = 20) -> int:
    for port in range(start_port, start_port + attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            try:
                sock.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    raise RuntimeError(f"No free port found in range {start_port}-{start_port + attempts - 1}")


def find_cloudflared() -> str:
    found = shutil.which("cloudflared")
    if found:
        return found
    if CLOUDFLARED_FALLBACK.exists():
        return str(CLOUDFLARED_FALLBACK)
    raise FileNotFoundError(
        "cloudflared.exe not found on PATH or at the default install location. "
        "Install it from https://github.com/cloudflare/cloudflared/releases"
    )


def wait_for_app(url: str, timeout_seconds: float = 30) -> bool:
    deadline = time.monotonic() + timeout_seconds
    while time.monotonic() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=3) as response:
                if response.status < 500:
                    return True
        except OSError:
            time.sleep(0.5)
    return False


def run_tunnel_and_wait(cloudflared_path: str, port: int) -> None:
    process = subprocess.Popen(
        [cloudflared_path, "tunnel", "--url", f"http://127.0.0.1:{port}"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
    )
    printed_url = False
    try:
        assert process.stdout is not None
        for line in process.stdout:
            print(line, end="")
            if not printed_url:
                match = TUNNEL_URL_PATTERN.search(line)
                if match:
                    printed_url = True
                    print(f"\n=== Public tunnel URL: {match.group(0)} ===\n")
        process.wait()
    except KeyboardInterrupt:
        pass
    finally:
        if process.poll() is None:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()


def main() -> None:
    sys.stdout.reconfigure(line_buffering=True)
    sys.stderr.reconfigure(line_buffering=True)

    root = base_dir()
    os.chdir(root)
    sys.path.insert(0, str(root))

    from app.main import app as fastapi_app

    port = find_free_port(8000)
    config = uvicorn.Config(fastapi_app, host="127.0.0.1", port=port, log_level="info")
    server = uvicorn.Server(config)

    server_thread = threading.Thread(target=server.run, daemon=True)
    server_thread.start()

    print(f"Starting app on http://127.0.0.1:{port} ...")
    if not wait_for_app(f"http://127.0.0.1:{port}/ui"):
        print("App did not become healthy in time.", file=sys.stderr)
        server.should_exit = True
        server_thread.join(timeout=5)
        sys.exit(1)
    print(f"App is healthy at http://127.0.0.1:{port}/ui")

    cloudflared_path = find_cloudflared()
    print("Starting cloudflared tunnel ...")
    try:
        run_tunnel_and_wait(cloudflared_path, port)
    finally:
        server.should_exit = True
        server_thread.join(timeout=10)


if __name__ == "__main__":
    try:
        main()
    except Exception:
        import traceback

        traceback.print_exc()
        input("\nThe app crashed (see error above). Press Enter to close this window...")
        sys.exit(1)
