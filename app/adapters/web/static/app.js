const elements = {
    loginPanel: document.getElementById("loginPanel"),
    appPanel: document.getElementById("appPanel"),
    loginForm: document.getElementById("loginForm"),
    openRegisterButton: document.getElementById("openRegisterButton"),
    username: document.getElementById("username"),
    password: document.getElementById("password"),
    toggleLoginPasswordButton: document.getElementById("toggleLoginPasswordButton"),
    loginStatusMessage: document.getElementById("loginStatusMessage"),
    registerDialog: document.getElementById("registerDialog"),
    registerForm: document.getElementById("registerForm"),
    registerUsername: document.getElementById("registerUsername"),
    registerPassword: document.getElementById("registerPassword"),
    registerRole: document.getElementById("registerRole"),
    registerStatusMessage: document.getElementById("registerStatusMessage"),
    registerCancelButton: document.getElementById("registerCancelButton"),
    languageSwitcher: document.getElementById("languageSwitcher"),
    languageBadge: document.getElementById("languageBadge"),
    sessionBadge: document.getElementById("sessionBadge"),
    recentChangesWrap: document.getElementById("recentChangesWrap"),
    recentChangesButton: document.getElementById("recentChangesButton"),
    recentChangesCount: document.getElementById("recentChangesCount"),
    recentChangesPanel: document.getElementById("recentChangesPanel"),
    outdatedBellWrap: document.getElementById("outdatedBellWrap"),
    outdatedBellButton: document.getElementById("outdatedBellButton"),
    outdatedBellCount: document.getElementById("outdatedBellCount"),
    outdatedPanel: document.getElementById("outdatedPanel"),
    bottomMetricsBar: document.getElementById("bottomMetricsBar"),
    metricsBarStrip: document.getElementById("metricsBarStrip"),
    themeToggleButton: document.getElementById("themeToggleButton"),
    adhdToggleButton: document.getElementById("adhdToggleButton"),
    signatureButton: document.getElementById("signatureButton"),
    logoutButton: document.getElementById("logoutButton"),
    localTimeLabel: document.getElementById("localTimeLabel"),
    resetUiLayoutButton: document.getElementById("resetUiLayoutButton"),
    searchPanel: document.getElementById("searchPanel"),
    explorerShell: document.getElementById("explorerShell"),
    explorerNodeContextMenu: document.getElementById("explorerNodeContextMenu"),
    templatesPanel: document.getElementById("templatesPanel"),
    templateFormPanel: document.getElementById("templateFormPanel"),
    templateFormDrawer: document.getElementById("templateFormDrawer"),
    closeTemplateDrawerButton: document.getElementById("closeTemplateDrawerButton"),
    newTemplateButton: document.getElementById("newTemplateButton"),
    form: document.getElementById("templateForm"),
    templateId: document.getElementById("templateId"),
    category: document.getElementById("category"),
    responseCode: document.getElementById("responseCode"),
    content: document.getElementById("content"),
    searchInput: document.getElementById("searchInput"),
    flowTabs: document.getElementById("flowTabs"),
    explorerPrimaryList: document.getElementById("explorerPrimaryList"),
    explorerSecondaryList: document.getElementById("explorerSecondaryList"),
    breadcrumbBar: document.getElementById("breadcrumbBar"),
    flowExplorerScopeText: document.getElementById("flowExplorerScopeText"),
    clearExplorerButton: document.getElementById("clearExplorerButton"),
    flowExplorerNotice: document.getElementById("flowExplorerNotice"),
    explorerUpButton: document.getElementById("explorerUpButton"),
    nodeManagerPanel: document.getElementById("nodeManagerPanel"),
    selectedNodeSummary: document.getElementById("selectedNodeSummary"),
    newNodeButton: document.getElementById("newNodeButton"),
    renameNodeButton: document.getElementById("renameNodeButton"),
    deleteNodeButton: document.getElementById("deleteNodeButton"),
    nodeActionDialog: document.getElementById("nodeActionDialog"),
    nodeActionForm: document.getElementById("nodeActionForm"),
    nodeActionTitle: document.getElementById("nodeActionTitle"),
    nodeActionHint: document.getElementById("nodeActionHint"),
    nodeActionNameInput: document.getElementById("nodeActionNameInput"),
    nodeActionFlowInput: document.getElementById("nodeActionFlowInput"),
    nodeActionDeleteMode: document.getElementById("nodeActionDeleteMode"),
    nodeActionConfirmButton: document.getElementById("nodeActionConfirmButton"),
    nodeActionCancelButton: document.getElementById("nodeActionCancelButton"),
    searchButton: document.getElementById("searchButton"),
    clearSearchButton: document.getElementById("clearSearchButton"),
    metricsPanel: document.getElementById("metricsPanel"),
    metricsRefreshButton: document.getElementById("metricsRefreshButton"),
    metricsSummaryButton: document.getElementById("metricsSummaryButton"),
    metricsSummary: document.getElementById("metricsSummary"),
    metricsEndpoints: document.getElementById("metricsEndpoints"),
    metricsSummaryText: document.getElementById("metricsSummaryText"),
    userAdminPanel: document.getElementById("userAdminPanel"),
    usersRefreshButton: document.getElementById("usersRefreshButton"),
    usersList: document.getElementById("usersList"),
    importTemplatesButton: document.getElementById("importTemplatesButton"),
    importDialog: document.getElementById("importDialog"),
    importForm: document.getElementById("importForm"),
    importFileInput: document.getElementById("importFileInput"),
    importCancelButton: document.getElementById("importCancelButton"),
    refreshButton: document.getElementById("refreshButton"),
    createButton: document.getElementById("createButton"),
    updateButton: document.getElementById("updateButton"),
    deleteButton: document.getElementById("deleteButton"),
    resetButton: document.getElementById("resetButton"),
    templateList: document.getElementById("templateList"),
    statusMessage: document.getElementById("statusMessage"),
    formMode: document.getElementById("formMode"),
    warningsText: document.getElementById("warningsText"),
    warningsEditor: document.getElementById("warningsEditor"),
    warningsFormatControls: document.getElementById("warningsFormatControls"),
    warningsBoldButton: document.getElementById("warningsBoldButton"),
    warningsItalicButton: document.getElementById("warningsItalicButton"),
    warningsUnderlineButton: document.getElementById("warningsUnderlineButton"),
    warningsRedButton: document.getElementById("warningsRedButton"),
    warningsBulletButton: document.getElementById("warningsBulletButton"),
    warningsPanel: document.getElementById("warningsPanel"),
    editWarningsButton: document.getElementById("editWarningsButton"),
    saveWarningsButton: document.getElementById("saveWarningsButton"),
    cancelWarningsButton: document.getElementById("cancelWarningsButton"),
    warningsActions: document.getElementById("warningsActions"),
    kommoRailNav: document.getElementById("kommoRailNav"),
    workspaceView: document.getElementById("workspaceView"),
    businessDashboardView: document.getElementById("businessDashboardView"),
    engineeringDashboardView: document.getElementById("engineeringDashboardView"),
    dashboardTemplateStats: document.getElementById("dashboardTemplateStats"),
    dashboardTopUsers: document.getElementById("dashboardTopUsers"),
    dashboardTopTemplates: document.getElementById("dashboardTopTemplates"),
    dashboardLanguageUsage: document.getElementById("dashboardLanguageUsage"),
    engineeringTrafficStats: document.getElementById("engineeringTrafficStats"),
    engineeringLatencyStats: document.getElementById("engineeringLatencyStats"),
    engineeringStatusCodes: document.getElementById("engineeringStatusCodes"),
    engineeringRoleTraffic: document.getElementById("engineeringRoleTraffic"),
    engineeringSlowEndpoints: document.getElementById("engineeringSlowEndpoints"),
    engineeringMetricsRefreshButton: document.getElementById("engineeringMetricsRefreshButton"),
    engineeringMetricsSummaryButton: document.getElementById("engineeringMetricsSummaryButton"),
    engineeringLiveMetricsSummary: document.getElementById("engineeringLiveMetricsSummary"),
    engineeringLiveMetricsEndpoints: document.getElementById("engineeringLiveMetricsEndpoints"),
    engineeringMetricsSummaryText: document.getElementById("engineeringMetricsSummaryText"),
};

let selectedTemplateId = null;
let currentTemplates = [];
let currentSession = null;
let currentLanguage = "en";
let currentTheme = "light";
let currentFontMode = "default";
let metricsRefreshIntervalId = null;
let usersRefreshIntervalId = null;
let outdatedRefreshIntervalId = null;
let categoryTreeData = [];
let selectedExplorerPath = "";
let selectedExplorerFlow = "general";
let selectedFlowTab = "all";
let templateCountsByPath = {};
let flowExplorerNoticeTimer = null;
let isEditingWarnings = false;
let selectedNodeId = null;
let pendingNodeAction = null;
let pendingNodeContextId = null;
let explorerContextMenuNodeId = null;
let explorerNodeMenuDocClickHandler = null;
let explorerNodeMenuEscapeHandler = null;
let explorerNodeMenuScrollHandler = null;
let lastOutdatedItems = [];
let lastLoadedTemplatesForRecentChanges = [];
let kommoRailScrollObserver = null;
let currentView = "workspace";
let dashboardRefreshIntervalId = null;
let localTimeIntervalId = null;
const KOMMO_RAIL_SCROLL_OBSERVE_IDS = ["searchPanel", "warningsPanel", "templatesPanel"];
const UI_LAYOUT_STORAGE_KEY = "ui_panel_heights_v1";
const EDITABLE_PANEL_IDS = [
    "searchPanel",
    "templateFormPanel",
    "warningsPanel",
    "templatesPanel",
];

const WARNINGS_STORAGE_KEY = "warnings_by_node";
const PROTECTED_USERNAMES = new Set(["manager", "developer", "user"]);

function canAccessBusinessDashboard() {
    return ["manager", "developer"].includes(currentSession?.role || "");
}

function canAccessEngineeringDashboard() {
    return currentSession?.role === "developer";
}

function stopDashboardAutoRefresh() {
    if (dashboardRefreshIntervalId) {
        window.clearInterval(dashboardRefreshIntervalId);
        dashboardRefreshIntervalId = null;
    }
}

function renderLocalTimeLabel() {
    if (!elements.localTimeLabel) {
        return;
    }
    const now = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
    const timeText = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    elements.localTimeLabel.textContent = timeText;
    elements.localTimeLabel.title = timezone;
}

function startLocalTimeClock() {
    if (!elements.localTimeLabel) {
        return;
    }
    if (localTimeIntervalId) {
        window.clearInterval(localTimeIntervalId);
    }
    renderLocalTimeLabel();
    localTimeIntervalId = window.setInterval(renderLocalTimeLabel, 1000);
}

async function loadBusinessDashboardSnapshot() {
    if (!canAccessBusinessDashboard() || !currentSession?.token) {
        return;
    }
    try {
        const payload = await request("/admin/dashboard/business", { method: "GET" });
        renderBusinessDashboard(payload);
    } catch {
        void 0;
    }
}

async function loadEngineeringDashboardSnapshot() {
    if (!canAccessEngineeringDashboard() || !currentSession?.token) {
        return;
    }
    try {
        const payload = await request("/admin/dashboard/engineering", { method: "GET" });
        renderEngineeringDashboard(payload);
        await loadAdminMetrics();
    } catch {
        void 0;
    }
}

function startDashboardAutoRefresh() {
    stopDashboardAutoRefresh();
    if (currentView === "business-dashboard") {
        void loadBusinessDashboardSnapshot();
    } else if (currentView === "engineering-dashboard") {
        void loadEngineeringDashboardSnapshot();
    }
    dashboardRefreshIntervalId = window.setInterval(() => {
        if (currentView === "business-dashboard") {
            void loadBusinessDashboardSnapshot();
        } else if (currentView === "engineering-dashboard") {
            void loadEngineeringDashboardSnapshot();
        }
    }, 30000);
}

function setCurrentView(nextView) {
    const requested = nextView || "workspace";
    if (requested === "engineering-dashboard" && canAccessEngineeringDashboard()) {
        currentView = "engineering-dashboard";
    } else if (requested === "business-dashboard" && canAccessBusinessDashboard()) {
        currentView = "business-dashboard";
    } else if (requested === "engineering-dashboard" && canAccessBusinessDashboard()) {
        currentView = "business-dashboard";
    } else {
        currentView = "workspace";
    }
    elements.businessDashboardView?.classList.toggle("hidden", currentView !== "business-dashboard");
    elements.engineeringDashboardView?.classList.toggle("hidden", currentView !== "engineering-dashboard");
    elements.workspaceView?.classList.toggle("hidden", currentView !== "workspace");
    if (currentView === "business-dashboard" || currentView === "engineering-dashboard") {
        startDashboardAutoRefresh();
    } else {
        stopDashboardAutoRefresh();
    }
    setKommoRailCurrent(currentView);
}

function renderBusinessDashboard(payload) {
    if (!payload || typeof payload !== "object") {
        return;
    }
    const userMetrics = payload.user_metrics || {};
    const templateUsage = payload.template_usage || {};

    elements.dashboardTemplateStats.innerHTML = [
        ["Total templates", templateUsage.total_templates],
        ["Total copies", templateUsage.total_copies],
        ["Outdated templates", templateUsage.outdated_templates],
    ].map(([label, value]) => `
        <div class="metric-item">
            <span class="metric-label">${escapeHtml(String(label))}</span>
            <span class="metric-value">${escapeHtml(String(value ?? 0))}</span>
        </div>
    `).join("");

    const topUsers = Array.isArray(userMetrics.top_users_last_60m) ? userMetrics.top_users_last_60m : [];
    elements.dashboardTopUsers.innerHTML = topUsers.length
        ? topUsers.map((item) => `
            <div class="endpoint-item">
                <span class="endpoint-name">${escapeHtml(String(item.username || "unknown"))}</span>
                <span class="endpoint-count">${formatNumber(item.requests)} req</span>
            </div>
        `).join("")
        : '<div class="empty-state">No user activity yet.</div>';

    const topTemplates = Array.isArray(templateUsage.top_templates_by_copy_count)
        ? templateUsage.top_templates_by_copy_count
        : [];
    elements.dashboardTopTemplates.innerHTML = topTemplates.length
        ? topTemplates.map((item) => `
            <div class="endpoint-item">
                <span class="endpoint-name">${escapeHtml(String(item.response_code || "unknown"))} (${escapeHtml(String(item.language || "--").toUpperCase())})</span>
                <span class="endpoint-count">${formatNumber(item.copy_count)} copies</span>
            </div>
        `).join("")
        : '<div class="empty-state">No copy usage data yet.</div>';

    const byLanguage = Array.isArray(templateUsage.usage_by_language) ? templateUsage.usage_by_language : [];
    elements.dashboardLanguageUsage.innerHTML = byLanguage.length
        ? byLanguage.map((item) => `
            <div class="endpoint-item">
                <span class="endpoint-name">${escapeHtml(String(item.language || "--").toUpperCase())}</span>
                <span class="endpoint-count">${formatNumber(item.template_count)} templates · ${formatNumber(item.copy_count)} copies</span>
            </div>
        `).join("")
        : '<div class="empty-state">No language usage breakdown yet.</div>';
}

function renderEngineeringDashboard(payload) {
    if (!payload || typeof payload !== "object") {
        return;
    }
    const traffic = payload.traffic || {};
    const latency = payload.latency_ms || {};
    const status = payload.status_codes_last_60m || {};
    const roleTraffic = payload.role_traffic_last_60m || {};
    const slowEndpoints = Array.isArray(payload.slow_endpoints_last_60m)
        ? payload.slow_endpoints_last_60m
        : [];

    elements.engineeringTrafficStats.innerHTML = [
        ["Requests (15m)", traffic.request_count_last_15m],
        ["Requests (60m)", traffic.request_count_last_60m],
        ["Errors (60m)", traffic.error_count_last_60m],
        ["Error rate (60m)", `${traffic.error_rate_last_60m ?? 0}%`],
        ["Auth failures (24h)", payload.auth_failures_last_24h ?? 0],
    ].map(([label, value]) => `
        <div class="metric-item">
            <span class="metric-label">${escapeHtml(String(label))}</span>
            <span class="metric-value">${escapeHtml(String(value ?? 0))}</span>
        </div>
    `).join("");

    elements.engineeringLatencyStats.innerHTML = [
        ["p50", `${latency.p50_last_60m ?? 0} ms`],
        ["p95", `${latency.p95_last_60m ?? 0} ms`],
        ["p99", `${latency.p99_last_60m ?? 0} ms`],
    ].map(([label, value]) => `
        <div class="metric-item">
            <span class="metric-label">${escapeHtml(String(label))}</span>
            <span class="metric-value">${escapeHtml(String(value))}</span>
        </div>
    `).join("");

    const statusRows = Object.entries(status).sort((a, b) => Number(b[1]) - Number(a[1]));
    elements.engineeringStatusCodes.innerHTML = statusRows.length
        ? statusRows.map(([code, count]) => `
            <div class="endpoint-item" title="HTTP ${escapeHtml(code)} - ${escapeHtml(describeHttpStatusCode(code))}">
                <span class="endpoint-name">HTTP ${escapeHtml(code)}</span>
                <span class="endpoint-count">${formatNumber(Number(count || 0))}</span>
            </div>
        `).join("")
        : '<div class="empty-state">No status code activity yet.</div>';

    const roleRows = Object.entries(roleTraffic).sort((a, b) => Number(b[1]) - Number(a[1]));
    elements.engineeringRoleTraffic.innerHTML = roleRows.length
        ? roleRows.map(([role, count]) => `
            <div class="endpoint-item">
                <span class="endpoint-name">${escapeHtml(role)}</span>
                <span class="endpoint-count">${formatNumber(Number(count || 0))} req</span>
            </div>
        `).join("")
        : '<div class="empty-state">No role traffic activity yet.</div>';

    elements.engineeringSlowEndpoints.innerHTML = slowEndpoints.length
        ? slowEndpoints.map((item) => `
            <div class="endpoint-item">
                <span class="endpoint-name">${escapeHtml(String(item.endpoint || ""))}</span>
                <span class="endpoint-count">p95 ${formatNumber(Number(item.p95_latency_ms || 0))}ms · ${formatNumber(Number(item.requests || 0))} req · ${formatNumber(Number(item.error_count || 0))} err</span>
            </div>
        `).join("")
        : '<div class="empty-state">Not enough endpoint data yet.</div>';
}

function recentChangesStorageKey() {
    const username = currentSession?.username || "anonymous";
    return `recent_changes_last_seen_${username}`;
}

function ensureRecentChangesBaseline() {
    const key = recentChangesStorageKey();
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, new Date().toISOString());
    }
}

function getRecentChangesLastSeen() {
    const key = recentChangesStorageKey();
    const raw = localStorage.getItem(key);
    if (!raw) {
        return null;
    }
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function markRecentChangesAsSeen(isoTimestamp) {
    localStorage.setItem(recentChangesStorageKey(), isoTimestamp);
}

function markRecentChangesAsSeenNow() {
    markRecentChangesAsSeen(new Date().toISOString());
}

function parseServerTimestamp(rawTimestamp) {
    if (!rawTimestamp) {
        return null;
    }
    const text = String(rawTimestamp).trim();
    if (!text) {
        return null;
    }
    const hasTimezone = /([zZ]|[+-]\d{2}:\d{2})$/.test(text);
    const parsed = new Date(hasTimezone ? text : `${text}Z`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatRelativeTime(targetDate) {
    const diffMs = targetDate.getTime() - Date.now();
    const absMs = Math.abs(diffMs);
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    if (absMs < hour) {
        return rtf.format(Math.round(diffMs / minute), "minute");
    }
    if (absMs < day) {
        return rtf.format(Math.round(diffMs / hour), "hour");
    }
    return rtf.format(Math.round(diffMs / day), "day");
}

function describeHttpStatusCode(code) {
    const descriptions = {
        200: "OK",
        201: "Created",
        202: "Accepted",
        204: "No Content",
        301: "Moved Permanently",
        302: "Found",
        304: "Not Modified",
        307: "Temporary Redirect",
        308: "Permanent Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        409: "Conflict",
        410: "Gone",
        413: "Payload Too Large",
        415: "Unsupported Media Type",
        422: "Unprocessable Entity",
        429: "Too Many Requests",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
    };
    const numeric = Number(code);
    if (descriptions[numeric]) {
        return descriptions[numeric];
    }
    if (numeric >= 100 && numeric < 200) return "Informational response";
    if (numeric >= 200 && numeric < 300) return "Successful response";
    if (numeric >= 300 && numeric < 400) return "Redirection message";
    if (numeric >= 400 && numeric < 500) return "Client error response";
    if (numeric >= 500 && numeric < 600) return "Server error response";
    return "Unknown status code";
}

function goToTemplateById(templateId) {
    return (async () => {
        const template = await request(`/templates/${templateId}`, { method: "GET" });
        if (!template?.id) {
            throw new Error("Template not found.");
        }
        if (template.language && template.language !== currentLanguage) {
            setCurrentLanguage(template.language);
        }
        selectedExplorerPath = "";
        selectedNodeId = null;
        selectedFlowTab = "all";
        selectedExplorerFlow = template.flow || "general";
        renderBreadcrumb("");
        renderFlowTabs();
        renderFlowExplorerTree();
        elements.searchInput.value = template.response_code || "";
        await loadTemplates();
        const match = currentTemplates.find((item) => item.id === template.id);
        if (!match) {
            throw new Error("Template loaded but not visible in current list.");
        }
        setEditMode(match);
        setStatus(`Opened template ${match.response_code} via filter.`, "success");
    })();
}

function setLoginStatus(message, type = "") {
    elements.loginStatusMessage.textContent = message;
    elements.loginStatusMessage.className = `status ${type}`.trim();
}

function setRegisterStatus(message, type = "") {
    elements.registerStatusMessage.textContent = message;
    elements.registerStatusMessage.className = `status ${type}`.trim();
}

function setStatus(message, type = "") {
    elements.statusMessage.textContent = message;
    elements.statusMessage.className = `status ${type}`.trim();
}

function canEditTemplates() {
    return ["manager", "developer"].includes(currentSession?.role || "");
}

function openTemplateDrawer() {
    const drawer = elements.templateFormDrawer;
    if (!drawer || !canEditTemplates()) {
        return;
    }
    drawer.classList.remove("hidden");
    if (!drawer.open) {
        drawer.showModal();
    }
    setKommoRailCurrent("templateFormPanel");
    window.requestAnimationFrame(() => {
        try {
            elements.category.focus();
        } catch {
            void 0;
        }
    });
}

function closeTemplateDrawer() {
    const drawer = elements.templateFormDrawer;
    if (drawer?.open) {
        drawer.close();
    }
}

function setCreateMode() {
    selectedTemplateId = null;
    elements.templateId.value = "";
    elements.form.reset();
    populateCategoryDropdown("");
    elements.formMode.textContent = "Create mode";
    elements.updateButton.disabled = true;
    elements.deleteButton.disabled = true;
    renderTemplates(currentTemplates);
}

function currentWarningsKey() {
    return selectedExplorerPath || `flow:${selectedFlowTab || "all"}`;
}

function readWarningsMap() {
    const raw = localStorage.getItem(WARNINGS_STORAGE_KEY);
    if (!raw) {
        return {};
    }
    try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
        return {};
    }
}

function writeWarningsMap(warningsByNode) {
    localStorage.setItem(WARNINGS_STORAGE_KEY, JSON.stringify(warningsByNode));
}

function humanizeFlow(flow) {
    if (!flow || flow === "all") {
        return "general";
    }
    return flow.replaceAll("_", " ");
}

function generateNodeWarningsText() {
    const nodeLabel = selectedExplorerPath || `Flow: ${humanizeFlow(selectedFlowTab)}`;
    const flowLabel = humanizeFlow(selectedExplorerFlow || selectedFlowTab);
    return [
        `Node-specific warning for "${nodeLabel}": validate placeholders before publishing edits.`,
        `Compliance warning for "${nodeLabel}": do not include personal or sensitive customer data.`,
        `Operational warning for "${nodeLabel}": confirm language (${currentLanguage.toUpperCase()}) and flow (${flowLabel}) before using this template.`,
    ].join("\n");
}

function normalizeWarningsRecord(record) {
    if (typeof record === "string") {
        return {
            html: `<ul>${record
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => `<li>${escapeHtml(line)}</li>`)
                .join("")}</ul>`,
        };
    }
    if (!record || typeof record !== "object") {
        return {
            html: `<ul>${generateNodeWarningsText()
                .split("\n")
                .map((line) => `<li>${escapeHtml(line)}</li>`)
                .join("")}</ul>`,
        };
    }
    if (record.html && typeof record.html === "string") {
        return { html: record.html };
    }
    return {
        html: `<ul>${String(record.text || generateNodeWarningsText())
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean)
            .map((line) => `<li>${escapeHtml(line)}</li>`)
            .join("")}</ul>`,
    };
}

function getWarningsTextValue() {
    const warningsByNode = readWarningsMap();
    const key = currentWarningsKey();
    if (!warningsByNode[key]) {
        warningsByNode[key] = normalizeWarningsRecord(generateNodeWarningsText());
        writeWarningsMap(warningsByNode);
    }
    return normalizeWarningsRecord(warningsByNode[key]);
}

function renderWarningsText() {
    const record = getWarningsTextValue();
    elements.warningsText.innerHTML = record.html || "<li>No warnings available.</li>";
}

function setWarningsEditMode(enabled) {
    isEditingWarnings = enabled;
    elements.warningsText.classList.toggle("hidden", enabled);
    elements.warningsEditor.classList.toggle("hidden", !enabled);
    elements.warningsFormatControls.classList.toggle("hidden", !enabled);
    elements.warningsActions.classList.toggle("hidden", !enabled);
    elements.editWarningsButton.textContent = enabled ? "Editing..." : "Edit warnings";
    elements.editWarningsButton.disabled = enabled;
    if (enabled) {
        const record = getWarningsTextValue();
        elements.warningsEditor.innerHTML = record.html;
        elements.warningsEditor.focus();
    }
}

function applyWarningFormat(command, value = null) {
    if (!isEditingWarnings) {
        return;
    }
    elements.warningsEditor.focus();
    if (value === null) {
        document.execCommand(command, false);
    } else {
        document.execCommand(command, false, value);
    }
}

function getEditablePanels() {
    return EDITABLE_PANEL_IDS
        .map((id) => document.getElementById(id))
        .filter(Boolean);
}

function readUiLayout() {
    const raw = localStorage.getItem(UI_LAYOUT_STORAGE_KEY);
    if (!raw) {
        return null;
    }
    try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
        return {};
    }
}

function writeUiLayout(layout) {
    localStorage.setItem(UI_LAYOUT_STORAGE_KEY, JSON.stringify(layout));
}

function clearUiLayout() {
    localStorage.removeItem(UI_LAYOUT_STORAGE_KEY);
}

function currentLayoutSnapshot() {
    const layout = {};
    getEditablePanels().forEach((panel) => {
        layout[panel.id] = { height: panel.style.height || "" };
    });
    return layout;
}

function updateAppPanelHeight() {
    // No-op for simple vertical resizing.
}

function applyUiLayout(layout) {
    const safeLayout = layout || {};
    getEditablePanels().forEach((panel) => {
        const cfg = safeLayout[panel.id];
        panel.style.height = cfg?.height || "";
    });
}

function resetPanelsToFlowLayout() {
    getEditablePanels().forEach((panel) => {
        panel.style.height = "";
    });
}

function setUiEditMode(enabled) {
    void enabled;
}

function initUiEditInteractions() {
    // Persist user-resized heights using ResizeObserver.
    if (!window.ResizeObserver) {
        return;
    }
    const observer = new ResizeObserver(() => {
        writeUiLayout(currentLayoutSnapshot());
    });
    getEditablePanels().forEach((panel) => observer.observe(panel));
}

function normalizeFlowLabel(flow) {
    return flow.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function updateFlowExplorerScope() {
    if (!elements.flowExplorerScopeText) {
        return;
    }
    const label =
        selectedFlowTab === "all" ? "All flows" : normalizeFlowLabel(selectedFlowTab);
    elements.flowExplorerScopeText.textContent = label;
}

function dismissFlowExplorerNotice() {
    if (flowExplorerNoticeTimer) {
        clearTimeout(flowExplorerNoticeTimer);
        flowExplorerNoticeTimer = null;
    }
    if (elements.flowExplorerNotice) {
        elements.flowExplorerNotice.textContent = "";
    }
}

function showFlowExplorerNotice(message) {
    if (!elements.flowExplorerNotice || !message) {
        return;
    }
    dismissFlowExplorerNotice();
    elements.flowExplorerNotice.textContent = message;
    flowExplorerNoticeTimer = setTimeout(() => {
        if (elements.flowExplorerNotice) {
            elements.flowExplorerNotice.textContent = "";
        }
        flowExplorerNoticeTimer = null;
    }, 9000);
}

function parentCategoryPath(path) {
    if (!path || typeof path !== "string") {
        return "";
    }
    const parts = path.split(">").map((part) => part.trim()).filter(Boolean);
    if (parts.length <= 1) {
        return "";
    }
    return parts.slice(0, -1).join(" > ");
}

function updateExplorerUpButtonState() {
    const btn = elements.explorerUpButton;
    if (!btn) {
        return;
    }
    btn.disabled = !selectedExplorerPath;
}

function closeExplorerNodeMenu() {
    const menu = elements.explorerNodeContextMenu;
    if (!menu) {
        return;
    }
    menu.classList.add("hidden");
    explorerContextMenuNodeId = null;
    if (explorerNodeMenuDocClickHandler) {
        document.removeEventListener("click", explorerNodeMenuDocClickHandler, true);
        explorerNodeMenuDocClickHandler = null;
    }
    if (explorerNodeMenuEscapeHandler) {
        document.removeEventListener("keydown", explorerNodeMenuEscapeHandler, true);
        explorerNodeMenuEscapeHandler = null;
    }
    if (explorerNodeMenuScrollHandler && elements.explorerShell) {
        elements.explorerShell.removeEventListener("scroll", explorerNodeMenuScrollHandler, true);
        explorerNodeMenuScrollHandler = null;
    }
}

function placeExplorerNodeMenu(left, top, minWidthPx) {
    const menu = elements.explorerNodeContextMenu;
    if (!menu) {
        return;
    }
    const w = Math.max(200, minWidthPx || 0);
    menu.style.minWidth = `${w}px`;
    menu.style.left = `${Math.max(8, left)}px`;
    menu.style.top = `${Math.max(8, top)}px`;
    const rect = menu.getBoundingClientRect();
    if (rect.right > window.innerWidth - 8) {
        menu.style.left = `${Math.max(8, window.innerWidth - rect.width - 8)}px`;
    }
    if (rect.bottom > window.innerHeight - 8) {
        menu.style.top = `${Math.max(8, window.innerHeight - rect.height - 8)}px`;
    }
}

function bindExplorerNodeMenuDismiss() {
    const menu = elements.explorerNodeContextMenu;
    if (!menu) {
        return;
    }
    if (explorerNodeMenuDocClickHandler) {
        document.removeEventListener("click", explorerNodeMenuDocClickHandler, true);
    }
    explorerNodeMenuDocClickHandler = (ev) => {
        if (menu.contains(ev.target) || ev.target.closest("[data-node-menu]")) {
            return;
        }
        closeExplorerNodeMenu();
    };
    requestAnimationFrame(() => {
        document.addEventListener("click", explorerNodeMenuDocClickHandler, true);
    });
    if (explorerNodeMenuEscapeHandler) {
        document.removeEventListener("keydown", explorerNodeMenuEscapeHandler, true);
    }
    explorerNodeMenuEscapeHandler = (ev) => {
        if (ev.key === "Escape") {
            closeExplorerNodeMenu();
        }
    };
    document.addEventListener("keydown", explorerNodeMenuEscapeHandler, true);
    if (elements.explorerShell && !explorerNodeMenuScrollHandler) {
        explorerNodeMenuScrollHandler = () => {
            closeExplorerNodeMenu();
        };
        elements.explorerShell.addEventListener("scroll", explorerNodeMenuScrollHandler, true);
    }
    menu.querySelector("[data-menu-action]")?.focus();
}

function openExplorerNodeMenuFromAnchor(anchor) {
    const menu = elements.explorerNodeContextMenu;
    if (!menu || !anchor) {
        return;
    }
    const id = Number(anchor.dataset.nodeMenu);
    if (!Number.isFinite(id)) {
        return;
    }
    closeExplorerNodeMenu();
    explorerContextMenuNodeId = id;
    menu.classList.remove("hidden");
    const rect = anchor.getBoundingClientRect();
    placeExplorerNodeMenu(rect.left, rect.bottom + 4, rect.width);
    bindExplorerNodeMenuDismiss();
}

function openExplorerNodeMenuAtPoint(row, clientX, clientY) {
    const menu = elements.explorerNodeContextMenu;
    if (!menu || !row) {
        return;
    }
    const id = Number(row.dataset.nodeRowId);
    if (!Number.isFinite(id)) {
        return;
    }
    closeExplorerNodeMenu();
    explorerContextMenuNodeId = id;
    menu.classList.remove("hidden");
    placeExplorerNodeMenu(clientX + 2, clientY + 2, 220);
    bindExplorerNodeMenuDismiss();
}

function setupExplorerNodeActionMenus() {
    const shell = elements.explorerShell;
    const menu = elements.explorerNodeContextMenu;
    if (!shell || !menu || shell.dataset.explorerMenuBound === "1") {
        return;
    }
    shell.dataset.explorerMenuBound = "1";
    shell.addEventListener("click", (e) => {
        const trigger = e.target.closest("[data-node-menu]");
        if (trigger) {
            e.preventDefault();
            e.stopPropagation();
            if (!canManageCategoryNodes()) {
                return;
            }
            const id = Number(trigger.dataset.nodeMenu);
            if (
                explorerContextMenuNodeId === id
                && !elements.explorerNodeContextMenu.classList.contains("hidden")
            ) {
                closeExplorerNodeMenu();
                return;
            }
            openExplorerNodeMenuFromAnchor(trigger);
            return;
        }
        if (!menu.classList.contains("hidden") && !menu.contains(e.target)) {
            closeExplorerNodeMenu();
        }
    });
    shell.addEventListener("contextmenu", (e) => {
        const row = e.target.closest(".flow-node-row");
        if (!row || !canManageCategoryNodes()) {
            return;
        }
        e.preventDefault();
        openExplorerNodeMenuAtPoint(row, e.clientX, e.clientY);
    });
    menu.addEventListener("click", (e) => {
        const item = e.target.closest("[data-menu-action]");
        if (!item) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        const nodeId = explorerContextMenuNodeId;
        const action = item.dataset.menuAction;
        closeExplorerNodeMenu();
        if (!nodeId) {
            return;
        }
        if (action === "add-child") {
            openNodeActionDialog("create_node", { contextNodeId: nodeId });
        } else if (action === "rename") {
            openNodeActionDialog("rename", { contextNodeId: nodeId });
        } else if (action === "delete") {
            openNodeActionDialog("delete", { contextNodeId: nodeId });
        }
    });
}

function renderFlowTabs() {
    const flows = [
        "all",
        ...new Set(
            categoryTreeData
                .map((node) => (node.flow || "").trim().toLowerCase())
                .filter(Boolean),
        ),
    ];
    elements.flowTabs.innerHTML = flows
        .map((flow) => {
            const label = flow === "all" ? "All flows" : normalizeFlowLabel(flow);
            const active = flow === selectedFlowTab ? "active" : "";
            return `<button type="button" class="flow-tab ${active}" data-flow-tab="${escapeHtml(flow)}">${escapeHtml(label)}</button>`;
        })
        .join("");

    elements.flowTabs.querySelectorAll("[data-flow-tab]").forEach((button) => {
        button.addEventListener("click", async () => {
            selectedFlowTab = (button.dataset.flowTab || "all").toLowerCase();
            if (selectedFlowTab !== "all") {
                selectedExplorerFlow = selectedFlowTab;
            }
            let pathClearedForOtherFlow = false;
            if (selectedExplorerPath) {
                const selectedNode = findNodeByPath(categoryTreeData, selectedExplorerPath);
                if (selectedNode?.flow !== selectedFlowTab) {
                    selectedExplorerPath = "";
                    renderBreadcrumb("");
                    pathClearedForOtherFlow = selectedFlowTab !== "all";
                }
            }
            renderFlowTabs();
            renderFlowExplorerTree();
            renderWarningsText();
            await loadTemplates();
            if (pathClearedForOtherFlow) {
                showFlowExplorerNotice(
                    "Your category path was cleared because those categories belong to a different flow than the tab you picked.",
                );
            }
        });
    });
    updateFlowExplorerScope();
}

function renderBreadcrumb(path) {
    if (!path) {
        elements.breadcrumbBar.innerHTML =
            '<span class="breadcrumb-chip breadcrumb-chip--current">All categories (start here)</span>';
        return;
    }
    const parts = path.split(">").map((part) => part.trim()).filter(Boolean);
    const chunks = [];
    let cumulative = "";
    parts.forEach((part, index) => {
        cumulative = cumulative ? `${cumulative} > ${part}` : part;
        const isLast = index === parts.length - 1;
        const currentClass = isLast ? " breadcrumb-chip--current" : "";
        chunks.push(
            `<button type="button" class="breadcrumb-chip${currentClass}" data-breadcrumb-path="${escapeHtml(cumulative)}">${escapeHtml(part)}</button>`,
        );
        if (!isLast) {
            chunks.push('<span class="breadcrumb-chevron" aria-hidden="true">›</span>');
        }
    });
    elements.breadcrumbBar.innerHTML = chunks.join("");
    elements.breadcrumbBar.querySelectorAll("[data-breadcrumb-path]").forEach((button) => {
        button.addEventListener("click", async () => {
            dismissFlowExplorerNotice();
            selectedExplorerPath = button.dataset.breadcrumbPath || "";
            renderBreadcrumb(selectedExplorerPath);
            renderFlowExplorerTree();
            renderWarningsText();
            await loadTemplates();
        });
    });
}

function findNodeByPath(nodes, path) {
    for (const node of nodes) {
        if (node.path === path) {
            return node;
        }
        const found = findNodeByPath(node.children || [], path);
        if (found) {
            return found;
        }
    }
    return null;
}

function flattenCategoryTree(nodes) {
    const items = [];
    const walk = (nodeList) => {
        nodeList.forEach((node) => {
            items.push(node);
            walk(node.children || []);
        });
    };
    walk(nodes);
    return items;
}

function findNodeById(nodes, nodeId) {
    for (const node of nodes) {
        if (node.id === nodeId) {
            return node;
        }
        const found = findNodeById(node.children || [], nodeId);
        if (found) {
            return found;
        }
    }
    return null;
}

function updateSelectedNodeSummary() {
    const el = elements.selectedNodeSummary;
    if (!el) {
        return;
    }
    const emptyCopy =
        '<p class="node-summary-empty">Select a category in the lists above. A short summary appears here when you add, rename, or delete nodes.</p>';
    if (!selectedNodeId) {
        el.innerHTML = emptyCopy;
        return;
    }
    const node = findNodeById(categoryTreeData, selectedNodeId);
    if (!node) {
        el.innerHTML = emptyCopy;
        return;
    }
    const childrenCount = (node.children || []).length;
    const templateCount = templateCountsByPath[node.path] || 0;
    const flowKey = (node.flow || "general").toString().trim() || "general";
    const flowLabel = escapeHtml(normalizeFlowLabel(flowKey));
    el.innerHTML = [
        '<dl class="node-summary-grid">',
        "<dt>Category path</dt><dd>",
        escapeHtml(node.path),
        "</dd>",
        "<dt>Flow</dt><dd>",
        flowLabel,
        "</dd>",
        "<dt>Sub-categories here</dt><dd>",
        escapeHtml(String(childrenCount)),
        "</dd>",
        "<dt>Templates in this branch</dt><dd>",
        escapeHtml(String(templateCount)),
        "</dd>",
        "</dl>",
    ].join("");
}

function canManageCategoryNodes() {
    return ["manager", "developer"].includes(currentSession?.role || "");
}

function parseOptionalNodeContextId(contextNodeId) {
    if (contextNodeId == null || contextNodeId === "") {
        return null;
    }
    const n = Number(contextNodeId);
    return Number.isFinite(n) ? n : null;
}

function openNodeActionDialog(action, { contextNodeId } = {}) {
    pendingNodeAction = action;
    pendingNodeContextId = parseOptionalNodeContextId(contextNodeId);

    const targetNodeForRenameDelete =
        pendingNodeContextId != null
            ? findNodeById(categoryTreeData, pendingNodeContextId)
            : selectedNodeId
              ? findNodeById(categoryTreeData, selectedNodeId)
              : null;

    elements.nodeActionNameInput.value = "";
    elements.nodeActionFlowInput.value = targetNodeForRenameDelete?.flow || "";
    elements.nodeActionDeleteMode.value = "delete";

    if (action === "create_node") {
        if (pendingNodeContextId != null) {
            const parentNode = findNodeById(categoryTreeData, pendingNodeContextId);
            if (!parentNode) {
                pendingNodeContextId = null;
                setStatus("Category not found.", "error");
                return;
            }
            elements.nodeActionTitle.textContent = "Create sub-category";
            elements.nodeActionHint.textContent = `Under: ${parentNode.path}`;
            elements.nodeActionNameInput.placeholder = "New sub-category name";
            elements.nodeActionFlowInput.value = parentNode.flow || selectedFlowTab || "";
        } else if (selectedFlowTab === "all") {
            elements.nodeActionTitle.textContent = "Create Top-Level Node";
            elements.nodeActionHint.textContent =
                "With \"All flows\" selected, the new node is a root category (no parent). Flow defaults to general if blank.";
            elements.nodeActionNameInput.placeholder = "Node name";
            elements.nodeActionFlowInput.value = "";
        } else {
            const parentForCreate = selectedNodeId
                ? findNodeById(categoryTreeData, selectedNodeId)
                : null;
            if (!parentForCreate) {
                pendingNodeContextId = null;
                setStatus("Select a parent node in this flow first.", "error");
                return;
            }
            elements.nodeActionTitle.textContent = "Create Node";
            elements.nodeActionHint.textContent = `Parent: ${parentForCreate.path}`;
            elements.nodeActionNameInput.placeholder = "Node name";
            elements.nodeActionFlowInput.value = parentForCreate.flow || selectedFlowTab || "";
        }
    } else if (action === "rename") {
        if (!targetNodeForRenameDelete) {
            pendingNodeContextId = null;
            setStatus("Select a node first.", "error");
            return;
        }
        elements.nodeActionTitle.textContent = "Rename Node";
        elements.nodeActionHint.textContent =
            targetNodeForRenameDelete.parent_id == null
                ? `Current: ${targetNodeForRenameDelete.path} (top-level)`
                : `Current: ${targetNodeForRenameDelete.path}`;
        elements.nodeActionNameInput.value = targetNodeForRenameDelete.name;
        elements.nodeActionNameInput.placeholder = "New node name";
    } else {
        if (!targetNodeForRenameDelete) {
            pendingNodeContextId = null;
            setStatus("Select a node first.", "error");
            return;
        }
        elements.nodeActionTitle.textContent = "Delete Node Subtree";
        elements.nodeActionHint.textContent =
            `Selected: ${targetNodeForRenameDelete.path}\nDeleting this node removes its descendants.`;
    }

    const showDeleteControls = action === "delete";
    const nameLabel = elements.nodeActionNameInput.previousElementSibling;
    const flowLabel = elements.nodeActionFlowInput.previousElementSibling;
    const deleteModeLabel = elements.nodeActionDeleteMode.previousElementSibling;
    elements.nodeActionNameInput.classList.toggle("hidden", showDeleteControls);
    nameLabel?.classList.toggle("hidden", showDeleteControls);
    elements.nodeActionFlowInput.classList.toggle("hidden", showDeleteControls);
    flowLabel?.classList.toggle("hidden", showDeleteControls);
    elements.nodeActionDeleteMode.classList.toggle("hidden", !showDeleteControls);
    deleteModeLabel?.classList.toggle("hidden", !showDeleteControls);
    elements.nodeActionDialog.showModal();
}

function flowFilteredRoots() {
    if (selectedFlowTab === "all") {
        return categoryTreeData;
    }
    return categoryTreeData.filter((node) => (node.flow || "").toLowerCase() === selectedFlowTab);
}

function buildExplorerButton(node) {
    const isActive = selectedExplorerPath === node.path ? "active" : "";
    const count = templateCountsByPath[node.path] || 0;
    const menuBtn = canManageCategoryNodes()
        ? `<button type="button" class="flow-node-menu-btn" aria-label="Actions for ${escapeHtml(node.name)}" title="Category actions" data-node-menu="${node.id}">⋯</button>`
        : "";
    return `
        <div class="flow-node-row" data-node-row-id="${node.id}">
            <button type="button" class="flow-node-button ${isActive}" data-node-path="${escapeHtml(node.path)}" data-node-flow="${escapeHtml(node.flow || "general")}">
                <span class="flow-node-button-label">${escapeHtml(node.name)}</span>
                <span class="node-count-badge">${formatNumber(count)}</span>
            </button>
            ${menuBtn}
        </div>
    `;
}

function collectCountsByPath(templates) {
    const counts = {};
    templates.forEach((template) => {
        const path = template.category || "";
        if (!path) {
            return;
        }
        const parts = path.split(">").map((part) => part.trim()).filter(Boolean);
        let cumulative = "";
        parts.forEach((part) => {
            cumulative = cumulative ? `${cumulative} > ${part}` : part;
            counts[cumulative] = (counts[cumulative] || 0) + 1;
        });
    });
    templateCountsByPath = counts;
}

function categoryDropdownScope() {
    const roots = flowFilteredRoots();
    if (!selectedExplorerPath) {
        return [...roots];
    }
    const node = findNodeByPath(roots, selectedExplorerPath);
    if (!node) {
        return [...roots];
    }
    return [node, ...(node.children || [])];
}

function populateCategoryDropdown(desiredValue) {
    const select = elements.category;
    if (!select) {
        return;
    }
    const targetValue = desiredValue === undefined ? select.value : desiredValue;
    const optionNodes = categoryDropdownScope();
    if (targetValue && !optionNodes.some((node) => node.path === targetValue)) {
        const externalNode = findNodeByPath(categoryTreeData, targetValue);
        optionNodes.unshift(externalNode || { path: targetValue });
    }
    select.innerHTML = optionNodes.length
        ? optionNodes
              .map((node) => `<option value="${escapeHtml(node.path)}">${escapeHtml(node.path)}</option>`)
              .join("")
        : '<option value="">No categories available yet</option>';
    const matchedValue = optionNodes.find((node) => node.path === targetValue);
    select.value = matchedValue ? matchedValue.path : (optionNodes[0]?.path ?? "");
}

function renderFlowExplorerTree() {
    if (!categoryTreeData.length) {
        elements.explorerPrimaryList.innerHTML = '<div class="empty-state">No category tree available.</div>';
        elements.explorerSecondaryList.innerHTML = '<div class="empty-state">No category tree available.</div>';
        populateCategoryDropdown();
        updateExplorerUpButtonState();
        return;
    }

    const roots = flowFilteredRoots();
    let primaryNodes = roots;
    let secondaryNodes = [];
    if (!selectedExplorerPath) {
        selectedNodeId = null;
    } else {
        const node = findNodeByPath(roots, selectedExplorerPath);
        if (node) {
            selectedNodeId = node.id;
            const parentPath = parentCategoryPath(node.path);
            if (parentPath) {
                const parentNode = findNodeByPath(roots, parentPath);
                primaryNodes = parentNode?.children || roots;
            }
            secondaryNodes = node.children || [];
        } else {
            selectedNodeId = null;
        }
    }

    elements.explorerPrimaryList.innerHTML = primaryNodes.length
        ? primaryNodes.map((node) => buildExplorerButton(node)).join("")
        : '<div class="empty-state">No categories at this level.</div>';
    elements.explorerSecondaryList.innerHTML = secondaryNodes.length
        ? secondaryNodes.map((node) => buildExplorerButton(node)).join("")
        : '<div class="empty-state">No sub-categories under this choice. You can still use templates below, or go up one level.</div>';

    document.querySelectorAll("[data-node-path]").forEach((button) => {
        button.addEventListener("click", async () => {
            dismissFlowExplorerNotice();
            selectedExplorerPath = button.dataset.nodePath || "";
            selectedExplorerFlow = button.dataset.nodeFlow || "general";
            selectedFlowTab = selectedExplorerFlow || "all";
            const selectedNode = findNodeByPath(categoryTreeData, selectedExplorerPath);
            selectedNodeId = selectedNode?.id || null;
            renderBreadcrumb(selectedExplorerPath);
            renderFlowTabs();
            renderFlowExplorerTree();
            updateSelectedNodeSummary();
            renderWarningsText();
            setCreateMode();
            await loadTemplates();
        });
    });
    populateCategoryDropdown();
    updateSelectedNodeSummary();
    updateFlowExplorerScope();
    updateExplorerUpButtonState();
}

async function loadFlowExplorerTree() {
    try {
        categoryTreeData = await request("/templates/categories/tree", { method: "GET" });
        if (selectedNodeId && !findNodeById(categoryTreeData, selectedNodeId)) {
            selectedNodeId = null;
            selectedExplorerPath = "";
        }
        renderFlowTabs();
        renderFlowExplorerTree();
        updateSelectedNodeSummary();
    } catch (error) {
        categoryTreeData = [];
        selectedNodeId = null;
        const html = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
        elements.explorerPrimaryList.innerHTML = html;
        elements.explorerSecondaryList.innerHTML = html;
        updateFlowExplorerScope();
        updateExplorerUpButtonState();
    }
}

function languageLabel(language) {
    return language.toUpperCase();
}

function applyLanguageUi() {
    elements.languageBadge.textContent = languageLabel(currentLanguage);
    elements.languageSwitcher.querySelectorAll(".lang-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.language === currentLanguage);
    });
}

function setCurrentLanguage(language) {
    currentLanguage = language;
    sessionStorage.setItem("template_language", language);
    applyLanguageUi();
}

function applyThemeUi() {
    const isDark = currentTheme === "dark";
    document.body.classList.toggle("dark-theme", isDark);
    elements.themeToggleButton.textContent = isDark ? "Light mode" : "Dark mode";
}

function setCurrentTheme(theme) {
    currentTheme = theme === "dark" ? "dark" : "light";
    localStorage.setItem("template_theme", currentTheme);
    applyThemeUi();
}

function applyFontModeUi() {
    const isAdhdMode = currentFontMode === "adhd";
    document.body.classList.toggle("adhd-mode", isAdhdMode);
    elements.adhdToggleButton.textContent = isAdhdMode ? "Standard mode" : "ADHD mode";
}

function setCurrentFontMode(mode) {
    currentFontMode = mode === "adhd" ? "adhd" : "default";
    localStorage.setItem("template_font_mode", currentFontMode);
    applyFontModeUi();
}

function setEditMode(template) {
    selectedTemplateId = template.id;
    elements.templateId.value = String(template.id);
    elements.responseCode.value = template.response_code;
    elements.content.value = template.content;
    selectedExplorerFlow = template.flow || selectedExplorerFlow;
    populateCategoryDropdown(template.category);
    elements.formMode.textContent = `Edit mode: #${template.id}`;
    elements.updateButton.disabled = false;
    elements.deleteButton.disabled = false;
    renderTemplates(currentTemplates);
    openTemplateDrawer();
}

function applyRoleUi(role) {
    const readOnly = !["manager", "developer"].includes(role);
    if (readOnly) {
        closeTemplateDrawer();
    }
    elements.appPanel.classList.toggle("read-only", readOnly);
    elements.formMode.textContent = readOnly ? "Read-only mode" : "Create mode";
    elements.bottomMetricsBar.classList.toggle("hidden", role !== "developer");
    elements.userAdminPanel?.classList.toggle("hidden", role !== "developer");
    const showReports = ["manager", "developer"].includes(role);
    elements.outdatedBellWrap.classList.toggle("hidden", !showReports);
    if (!showReports) {
        elements.outdatedPanel.classList.add("hidden");
    }
    elements.templateFormDrawer?.classList.toggle("hidden", readOnly);
    elements.newTemplateButton?.classList.toggle("hidden", readOnly);
    elements.editWarningsButton.classList.toggle("hidden", readOnly);
    elements.nodeManagerPanel.classList.toggle("hidden", readOnly);
    elements.importTemplatesButton.classList.toggle("hidden", readOnly);
    if (readOnly && isEditingWarnings) {
        setWarningsEditMode(false);
    }

    elements.category.disabled = readOnly;
    elements.responseCode.readOnly = readOnly;
    elements.content.readOnly = readOnly;
    elements.createButton.disabled = readOnly;
    elements.updateButton.disabled = readOnly || !selectedTemplateId;
    elements.deleteButton.disabled = readOnly || !selectedTemplateId;
    syncKommoRailVisibility(role);
    window.requestAnimationFrame(() => {
        setupKommoRailScrollObserver();
    });
}

function syncKommoRailVisibility(role) {
    const nav = elements.kommoRailNav;
    if (!nav) {
        return;
    }
    nav.querySelectorAll(".kommo-rail-btn").forEach((btn) => {
        const allowed = (btn.dataset.railVisible || "user,manager,developer")
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean);
        const show = allowed.includes(role);
        btn.classList.toggle("hidden", !show);
    });
}

function clearKommoRailCurrent() {
    document.querySelectorAll(".kommo-rail-btn").forEach((btn) => {
        btn.removeAttribute("aria-current");
    });
}

function setKommoRailCurrent(targetId) {
    document.querySelectorAll(".kommo-rail-btn").forEach((btn) => {
        const btnTarget = btn.dataset.viewTarget || btn.dataset.railTarget;
        if (btnTarget === targetId) {
            btn.setAttribute("aria-current", "page");
        } else {
            btn.removeAttribute("aria-current");
        }
    });
}

function scrollToRailTarget(targetId) {
    if (targetId === "templateFormPanel" && canEditTemplates()) {
        openTemplateDrawer();
        return;
    }
    const el = document.getElementById(targetId);
    if (!el || el.classList.contains("hidden")) {
        return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
        try {
            el.focus({ preventScroll: true });
        } catch {
            void 0;
        }
    }, 320);
    if (targetId === "bottomMetricsBar") {
        const details = el.querySelector("details.metrics-details");
        if (details && !details.open) {
            details.open = true;
        }
    }
}

function teardownKommoRailScrollObserver() {
    if (kommoRailScrollObserver) {
        kommoRailScrollObserver.disconnect();
        kommoRailScrollObserver = null;
    }
}

function applyKommoRailIntersection(entries, nav) {
    const visible = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0.12);
    if (!visible.length) {
        return;
    }
    visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    const id = visible[0].target.id;
    const btn = nav.querySelector(`[data-rail-target="${id}"]`);
    if (btn && !btn.classList.contains("hidden")) {
        setKommoRailCurrent(id);
    }
}

function setupKommoRailScrollObserver() {
    teardownKommoRailScrollObserver();
    const nav = elements.kommoRailNav;
    if (!nav || elements.appPanel.classList.contains("hidden")) {
        return;
    }

    const observed = [];
    KOMMO_RAIL_SCROLL_OBSERVE_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !el.classList.contains("hidden")) {
            observed.push(el);
        }
    });
    if (!observed.length) {
        return;
    }

    kommoRailScrollObserver = new IntersectionObserver(
        (entries) => applyKommoRailIntersection(entries, nav),
        { root: null, rootMargin: "-10% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    observed.forEach((el) => kommoRailScrollObserver.observe(el));
    if (typeof kommoRailScrollObserver.takeRecords === "function") {
        applyKommoRailIntersection(kommoRailScrollObserver.takeRecords(), nav);
    }
}

function setupKommoRailNav() {
    const nav = elements.kommoRailNav;
    if (!nav || nav.dataset.railBound === "1") {
        return;
    }
    nav.dataset.railBound = "1";
    nav.addEventListener("click", (event) => {
        const btn = event.target.closest(".kommo-rail-btn");
        if (!btn || btn.classList.contains("hidden")) {
            return;
        }
        const viewTarget = btn.dataset.viewTarget;
        if (viewTarget) {
            setCurrentView(viewTarget);
            return;
        }
        const targetId = btn.dataset.railTarget;
        if (!targetId) {
            return;
        }
        scrollToRailTarget(targetId);
        setKommoRailCurrent(targetId);
    });
}

function formatNumber(value) {
    return new Intl.NumberFormat().format(value || 0);
}

function renderMetrics(data) {
    const summaryItems = [
        ["Active sessions (15m)", data.active_sessions_last_15m],
        ["Unique IPs (15m)", data.unique_ips_last_15m],
        ["Unique IPs (60m)", data.unique_ips_last_60m],
        ["Requests (5m)", data.request_count_last_5m],
        ["Requests (15m)", data.request_count_last_15m],
        ["Requests (60m)", data.request_count_last_60m],
        ["Avg latency (60m)", `${data.avg_latency_ms_last_60m} ms`],
    ];

    if (elements.metricsBarStrip) {
        const lat = data.avg_latency_ms_last_60m != null ? `${data.avg_latency_ms_last_60m}ms` : "—";
        elements.metricsBarStrip.textContent = [
            `IPs ${formatNumber(data.unique_ips_last_15m)}`,
            `Sess ${formatNumber(data.active_sessions_last_15m)}`,
            `Avg ${lat}`,
        ].join(" · ");
    }

    if (elements.metricsSummary) {
        elements.metricsSummary.innerHTML = summaryItems
            .map(
                ([label, value]) => `
                    <div class="metric-item">
                        <span class="metric-label">${escapeHtml(label)}</span>
                        <span class="metric-value">${escapeHtml(String(value))}</span>
                    </div>
                `,
            )
            .join("");
    }

    if (elements.engineeringLiveMetricsSummary) {
        elements.engineeringLiveMetricsSummary.innerHTML = summaryItems
            .map(
                ([label, value]) => `
                    <div class="metric-item">
                        <span class="metric-label">${escapeHtml(label)}</span>
                        <span class="metric-value">${escapeHtml(String(value))}</span>
                    </div>
                `,
            )
            .join("");
    }

    const endpoints = data.top_endpoints_last_60m || [];
    if (!endpoints.length) {
        if (elements.metricsEndpoints) {
            elements.metricsEndpoints.innerHTML = '<div class="empty-state">No endpoint activity yet.</div>';
        }
        if (elements.engineeringLiveMetricsEndpoints) {
            elements.engineeringLiveMetricsEndpoints.innerHTML = '<div class="empty-state">No endpoint activity yet.</div>';
        }
        return;
    }

    if (elements.metricsEndpoints) {
        elements.metricsEndpoints.innerHTML = endpoints
            .map(
                (item) => `
                    <div class="endpoint-item">
                        <span class="endpoint-name">${escapeHtml(item.endpoint)}</span>
                        <span class="endpoint-count">${formatNumber(item.requests)} req</span>
                    </div>
                `,
            )
            .join("");
    }
    if (elements.engineeringLiveMetricsEndpoints) {
        elements.engineeringLiveMetricsEndpoints.innerHTML = endpoints
            .map(
                (item) => `
                    <div class="endpoint-item">
                        <span class="endpoint-name">${escapeHtml(item.endpoint)}</span>
                        <span class="endpoint-count">${formatNumber(item.requests)} req</span>
                    </div>
                `,
            )
            .join("");
    }

    const topUsers = Array.isArray(data.top_users_last_60m) ? data.top_users_last_60m : [];
    if (topUsers.length) {
        const usersHtml = topUsers
            .map(
                (item) => `
                    <div class="endpoint-item">
                        <span class="endpoint-name">User: ${escapeHtml(item.username)}</span>
                        <span class="endpoint-count">${formatNumber(item.requests)} req</span>
                    </div>
                `,
            )
            .join("");
        if (elements.metricsEndpoints) {
            elements.metricsEndpoints.innerHTML += `
                <h3 class="metrics-subtitle">Top Users (Last 60m)</h3>
                ${usersHtml}
            `;
        }
        if (elements.engineeringLiveMetricsEndpoints) {
            elements.engineeringLiveMetricsEndpoints.innerHTML += `
                <h3 class="metrics-subtitle">Top Users (Last 60m)</h3>
                ${usersHtml}
            `;
        }
    }
}

async function loadAdminMetrics() {
    if (currentSession?.role !== "developer") {
        return;
    }

    try {
        const metrics = await request("/admin/metrics", { method: "GET" });
        renderMetrics(metrics);
    } catch (error) {
        if (elements.metricsSummary) {
            elements.metricsSummary.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
        }
        if (elements.metricsEndpoints) {
            elements.metricsEndpoints.innerHTML = "";
        }
        if (elements.engineeringLiveMetricsSummary) {
            elements.engineeringLiveMetricsSummary.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
        }
        if (elements.engineeringLiveMetricsEndpoints) {
            elements.engineeringLiveMetricsEndpoints.innerHTML = "";
        }
        if (elements.metricsBarStrip) {
            elements.metricsBarStrip.textContent = `Metrics error: ${error.message}`;
        }
    }
}

async function generateMetricsSummaryText() {
    if (currentSession?.role !== "developer") {
        return;
    }

    if (elements.metricsSummaryText) {
        elements.metricsSummaryText.textContent = "Generating summary...";
    }
    if (elements.engineeringMetricsSummaryText) {
        elements.engineeringMetricsSummaryText.textContent = "Generating report...";
    }
    try {
        const summary = await request("/admin/metrics/summary", { method: "POST" });
        if (elements.metricsSummaryText) {
            elements.metricsSummaryText.textContent = summary.summary_text;
        }
        if (elements.engineeringMetricsSummaryText) {
            elements.engineeringMetricsSummaryText.textContent = summary.summary_text;
        }
    } catch (error) {
        if (elements.metricsSummaryText) {
            elements.metricsSummaryText.textContent = error.message;
        }
        if (elements.engineeringMetricsSummaryText) {
            elements.engineeringMetricsSummaryText.textContent = error.message;
        }
    }
}

function renderUsers(users) {
    const visibleUsers = Array.isArray(users)
        ? users.filter((user) => !PROTECTED_USERNAMES.has(String(user.username || "").toLowerCase()))
        : [];
    if (!visibleUsers.length) {
        elements.usersList.innerHTML = '<div class="empty-state">No users found.</div>';
        return;
    }
    elements.usersList.innerHTML = visibleUsers
        .map((user) => {
            const activeLabel = user.is_active ? "active" : "inactive";
            const canDelete = !PROTECTED_USERNAMES.has(String(user.username || "").toLowerCase())
                && user.username !== currentSession?.username;
            const deleteButton = canDelete
                ? `<button type="button" class="danger template-card-btn" data-action="delete-user" data-user-id="${user.id}" data-username="${escapeHtml(user.username)}">Delete</button>`
                : "";
            return `
                <div class="endpoint-item">
                    <span class="endpoint-name">${escapeHtml(user.username)} (${escapeHtml(user.role)}) - ${activeLabel}</span>
                    <span class="endpoint-count">
                        <button type="button" class="secondary template-card-btn" data-action="edit-user" data-user-id="${user.id}">Edit</button>
                        ${deleteButton}
                    </span>
                </div>
            `;
        })
        .join("");
    elements.usersList.querySelectorAll('[data-action="edit-user"]').forEach((button) => {
        button.addEventListener("click", async () => {
            const userId = Number(button.dataset.userId || 0);
            if (!userId) {
                return;
            }
            const username = window.prompt("New username (leave empty to keep):", "");
            const role = window.prompt("New role (user/manager/developer, leave empty to keep):", "");
            const password = window.prompt("New password (leave empty to keep):", "");
            const activeRaw = window.prompt("Active? (yes/no, leave empty to keep):", "");
            const payload = {};
            if (username && username.trim()) payload.username = username.trim();
            if (role && role.trim()) payload.role = role.trim().toLowerCase();
            if (password && password.trim()) payload.password = password;
            if (activeRaw && activeRaw.trim()) payload.is_active = ["yes", "y", "true", "1"].includes(activeRaw.trim().toLowerCase());
            if (!Object.keys(payload).length) {
                return;
            }
            try {
                await request(`/admin/users/${userId}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                });
                setStatus("User updated.", "success");
                await loadUsers();
            } catch (error) {
                setStatus(error.message, "error");
            }
        });
    });
    elements.usersList.querySelectorAll('[data-action="delete-user"]').forEach((button) => {
        button.addEventListener("click", async () => {
            const userId = Number(button.dataset.userId || 0);
            const username = button.dataset.username || "this user";
            if (!userId) {
                return;
            }
            const confirmed = window.confirm(`Delete account "${username}"?`);
            if (!confirmed) {
                return;
            }
            try {
                await request(`/admin/users/${userId}`, {
                    method: "DELETE",
                });
                setStatus("User deleted.", "success");
                await loadUsers();
            } catch (error) {
                setStatus(error.message, "error");
            }
        });
    });
}

async function loadUsers() {
    if (currentSession?.role !== "developer") {
        elements.usersList.innerHTML = "";
        return;
    }
    try {
        const users = await request("/admin/users", { method: "GET" });
        renderUsers(users);
    } catch (error) {
        elements.usersList.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
    }
}

function startMetricsAutoRefresh() {
    if (metricsRefreshIntervalId) {
        window.clearInterval(metricsRefreshIntervalId);
    }
    metricsRefreshIntervalId = window.setInterval(() => {
        loadAdminMetrics();
    }, 10000);
}

function stopMetricsAutoRefresh() {
    if (!metricsRefreshIntervalId) {
        return;
    }
    window.clearInterval(metricsRefreshIntervalId);
    metricsRefreshIntervalId = null;
}

function startUsersAutoRefresh() {
    if (usersRefreshIntervalId) {
        window.clearInterval(usersRefreshIntervalId);
    }
    usersRefreshIntervalId = window.setInterval(() => {
        loadUsers();
    }, 30000);
}

function stopUsersAutoRefresh() {
    if (!usersRefreshIntervalId) {
        return;
    }
    window.clearInterval(usersRefreshIntervalId);
    usersRefreshIntervalId = null;
}

async function loadOutdatedNotification() {
    if (!["manager", "developer"].includes(currentSession?.role || "")) {
        elements.outdatedBellWrap.classList.add("hidden");
        return;
    }
    try {
        const params = new URLSearchParams();
        params.set("language", currentLanguage);
        params.set("limit", "12");
        const payload = await request(`/templates/outdated/summary?${params.toString()}`, { method: "GET" });
        const count = Number(payload.count || 0);
        const items = Array.isArray(payload.items) ? payload.items : [];
        lastOutdatedItems = items;
        elements.outdatedBellCount.textContent = String(count);
        renderOutdatedPanel(items);
        elements.outdatedBellWrap.classList.remove("hidden");
    } catch {
        try {
            const params = new URLSearchParams();
            params.set("language", currentLanguage);
            const fallback = await request(`/templates/outdated/count?${params.toString()}`, { method: "GET" });
            const count = Number(fallback.count || 0);
            elements.outdatedBellCount.textContent = String(count);
            lastOutdatedItems = [];
            renderOutdatedPanel([]);
            elements.outdatedBellWrap.classList.remove("hidden");
        } catch {
            elements.outdatedBellWrap.classList.add("hidden");
        }
    }
}

function renderOutdatedPanel(items) {
    if (!items.length) {
        elements.outdatedPanel.innerHTML = '<div class="empty-state">No outdated reports.</div>';
        return;
    }
    const grouped = new Map();
    items.forEach((item) => {
        const code = String(item.response_code || "").trim() || "unknown_code";
        if (!grouped.has(code)) {
            grouped.set(code, []);
        }
        grouped.get(code).push(item);
    });
    elements.outdatedPanel.innerHTML = Array.from(grouped.entries())
        .map(([code, reports]) => {
            const latest = reports[0];
            const templateId = Number(latest.template_id || 0);
            const details = reports
                .map((report) => {
                    const user = escapeHtml(String(report.reported_by || "unknown user"));
                    const commentary = escapeHtml(String(report.commentary || "no suggested changes"));
                    return `<p class="outdated-line">-&gt;${user}</p><p class="outdated-line">-&gt;${commentary}</p>`;
                })
                .join("");
            const reviewButton = templateId
                ? `<button type="button" class="secondary outdated-review-btn" data-action="review-outdated" data-template-id="${templateId}">Mark reviewed</button>`
                : "";
            const goToButton = templateId
                ? `<button type="button" class="secondary outdated-go-btn" data-action="go-to-template" data-template-id="${templateId}">Go to template</button>`
                : "";
            return `
                <div class="outdated-group">
                    <p class="outdated-group-title">&gt; ${escapeHtml(code)}</p>
                    ${details}
                    <div class="outdated-group-actions">
                        ${goToButton}
                        ${reviewButton}
                    </div>
                </div>
            `;
        })
        .join("");

    elements.outdatedPanel.querySelectorAll('[data-action="review-outdated"]').forEach((button) => {
        button.addEventListener("click", async () => {
            const templateId = Number(button.dataset.templateId || 0);
            if (!templateId) {
                return;
            }
            try {
                await request(`/templates/${templateId}/outdated/clear`, { method: "PATCH" });
                setStatus("Outdated report marked as reviewed.", "success");
                await loadTemplates();
            } catch (error) {
                setStatus(error.message, "error");
            }
        });
    });

    elements.outdatedPanel.querySelectorAll('[data-action="go-to-template"]').forEach((button) => {
        button.addEventListener("click", async () => {
            const templateId = Number(button.dataset.templateId || 0);
            if (!templateId) {
                return;
            }
            try {
                await goToTemplateById(templateId);
                elements.outdatedPanel.classList.add("hidden");
            } catch (error) {
                setStatus(error.message, "error");
            }
        });
    });
}

function renderRecentChangesPanel() {
    const lastSeen = getRecentChangesLastSeen();
    const changed = lastLoadedTemplatesForRecentChanges
        .filter((template) => {
            const updatedAt = parseServerTimestamp(template?.updated_at);
            if (!updatedAt) {
                return false;
            }
            if (!lastSeen) {
                return true;
            }
            return updatedAt > lastSeen;
        })
        .sort((a, b) => {
            const aDate = parseServerTimestamp(a.updated_at)?.getTime() || 0;
            const bDate = parseServerTimestamp(b.updated_at)?.getTime() || 0;
            return bDate - aDate;
        });

    elements.recentChangesCount.textContent = String(changed.length);

    if (!changed.length) {
        elements.recentChangesPanel.innerHTML = '<div class="empty-state">No recent changes since your last session.</div>';
        return;
    }

    const header = `
        <div class="recent-panel-header">
            <p class="recent-panel-title">${changed.length} template(s) updated since last session</p>
            <button type="button" class="secondary recent-mark-seen-btn" data-action="mark-recent-seen">Mark all as seen</button>
        </div>
    `;
    const rows = changed
        .map((template) => {
            const parsedDate = parseServerTimestamp(template.updated_at);
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "local time";
            const updatedAt = parsedDate
                ? `${parsedDate.toLocaleString()} (${timezone}) • ${formatRelativeTime(parsedDate)}`
                : "unknown";
            return `
                <div class="outdated-group">
                    <p class="outdated-group-title">&gt; ${escapeHtml(template.response_code || "")}</p>
                    <p class="outdated-line">-&gt;updated at ${escapeHtml(updatedAt)}</p>
                    <div class="outdated-group-actions">
                        <button type="button" class="secondary outdated-go-btn" data-action="go-to-recent-template" data-template-id="${template.id}">Go to template</button>
                    </div>
                </div>
            `;
        })
        .join("");
    elements.recentChangesPanel.innerHTML = header + rows;

    elements.recentChangesPanel.querySelector('[data-action="mark-recent-seen"]')?.addEventListener("click", () => {
        const latestSeen = changed
            .map((template) => parseServerTimestamp(template.updated_at))
            .filter(Boolean)
            .sort((a, b) => b.getTime() - a.getTime())[0];
        markRecentChangesAsSeen((latestSeen || new Date()).toISOString());
        renderRecentChangesPanel();
    });
    elements.recentChangesPanel.querySelectorAll('[data-action="go-to-recent-template"]').forEach((button) => {
        button.addEventListener("click", async () => {
            const templateId = Number(button.dataset.templateId || 0);
            if (!templateId) {
                return;
            }
            try {
                await goToTemplateById(templateId);
                elements.recentChangesPanel.classList.add("hidden");
            } catch (error) {
                setStatus(error.message, "error");
            }
        });
    });
}

function startOutdatedAutoRefresh() {
    if (outdatedRefreshIntervalId) {
        window.clearInterval(outdatedRefreshIntervalId);
    }
    outdatedRefreshIntervalId = window.setInterval(() => {
        loadOutdatedNotification();
    }, 15000);
}

function stopOutdatedAutoRefresh() {
    if (!outdatedRefreshIntervalId) {
        return;
    }
    window.clearInterval(outdatedRefreshIntervalId);
    outdatedRefreshIntervalId = null;
}

function openApp() {
    elements.loginPanel.classList.add("hidden");
    elements.appPanel.classList.remove("hidden");
    elements.sessionBadge.textContent = `${currentSession.username} (${currentSession.role})`;
    ensureRecentChangesBaseline();
    applyRoleUi(currentSession.role);
    if (currentSession.role === "developer") {
        loadUsers();
        startUsersAutoRefresh();
    } else {
        stopMetricsAutoRefresh();
        stopUsersAutoRefresh();
    }
    loadOutdatedNotification();
    startOutdatedAutoRefresh();
    const savedLayout = readUiLayout();
    if (savedLayout) {
        applyUiLayout(savedLayout);
    } else {
        resetPanelsToFlowLayout();
    }
    if (canAccessEngineeringDashboard()) {
        setCurrentView("engineering-dashboard");
    } else if (canAccessBusinessDashboard()) {
        setCurrentView("business-dashboard");
    } else {
        setCurrentView("workspace");
    }
}

function openLogin() {
    closeExplorerNodeMenu();
    closeTemplateDrawer();
    elements.templateFormDrawer?.classList.add("hidden");
    teardownKommoRailScrollObserver();
    clearKommoRailCurrent();
    elements.appPanel.classList.add("hidden");
    elements.loginPanel.classList.remove("hidden");
    stopMetricsAutoRefresh();
    stopUsersAutoRefresh();
    stopOutdatedAutoRefresh();
    stopDashboardAutoRefresh();
    markRecentChangesAsSeenNow();
    elements.outdatedBellWrap.classList.add("hidden");
    elements.outdatedPanel.classList.add("hidden");
    elements.outdatedBellCount.textContent = "0";
    elements.recentChangesPanel.classList.add("hidden");
    elements.recentChangesCount.textContent = "0";
    if (elements.metricsBarStrip) {
        elements.metricsBarStrip.textContent = "";
    }
    if (elements.metricsSummaryText) {
        elements.metricsSummaryText.textContent =
            "Generate a summary to view session-level endpoint usage.";
    }
    if (elements.engineeringMetricsSummaryText) {
        elements.engineeringMetricsSummaryText.textContent =
            "Generate a report to view session-level endpoint usage.";
    }
    setCreateMode();
    currentTemplates = [];
    elements.templateList.innerHTML = "";
    setStatus("");
}

function saveSession(session) {
    currentSession = session;
    sessionStorage.setItem("auth_session", JSON.stringify(session));
}

function clearSession() {
    currentSession = null;
    sessionStorage.removeItem("auth_session");
}

function restoreSession() {
    const savedSession = sessionStorage.getItem("auth_session");
    if (!savedSession) {
        return false;
    }

    try {
        const parsed = JSON.parse(savedSession);
        if (!parsed.username || !parsed.role) {
            return false;
        }
        currentSession = parsed;
        return true;
    } catch {
        return false;
    }
}

function restoreLanguage() {
    const savedLanguage = sessionStorage.getItem("template_language");
    if (savedLanguage && ["en", "es", "pt"].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
    }
    applyLanguageUi();
}

function restoreTheme() {
    const savedTheme = localStorage.getItem("template_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
        currentTheme = savedTheme;
    }
    applyThemeUi();
}

function restoreFontMode() {
    const savedFontMode = localStorage.getItem("template_font_mode");
    if (savedFontMode === "adhd" || savedFontMode === "default") {
        currentFontMode = savedFontMode;
    }
    applyFontModeUi();
}

function setupSignatureToggle() {
    const button = elements.signatureButton;
    if (!button) {
        return;
    }
    button.addEventListener("click", () => {
        button.classList.toggle("revealed");
    });
}

async function request(url, options = {}) {
    const role = currentSession?.role;
    const token = currentSession?.token;
    const username = currentSession?.username;
    const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
    const response = await fetch(url, {
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(role ? { "X-Role": role } : {}),
            ...(username ? { "X-Username": username } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "X-Language": currentLanguage,
            ...(options.headers || {}),
        },
        ...options,
    });

    if (response.status === 204) {
        return null;
    }

    let data = {};
    try {
        data = await response.json();
    } catch {
        data = {};
    }

    if (!response.ok) {
        throw new Error(data.detail || "Request failed");
    }

    return data;
}

async function copyTextToClipboard(text) {
    if (!text) {
        throw new Error("There is no content to copy.");
    }

    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}

async function loadTemplates() {
    const query = elements.searchInput.value.trim();
    const params = new URLSearchParams();
    params.set("language", currentLanguage);
    if (query) {
        params.set("q", query);
    }

    const url = query
        ? `/templates/search?${params.toString()}`
        : params.toString()
          ? `/templates?${params.toString()}`
          : "/templates";

    try {
        const templates = await request(url, { method: "GET" });
        lastLoadedTemplatesForRecentChanges = templates;
        let visibleTemplates = templates;
        collectCountsByPath(templates);
        renderFlowExplorerTree();
        if (selectedExplorerPath) {
            visibleTemplates = templates.filter((template) =>
                (template.category || "").startsWith(selectedExplorerPath),
            );
        } else if (selectedFlowTab !== "all") {
            visibleTemplates = templates.filter(
                (template) => (template.flow || "").toLowerCase() === selectedFlowTab,
            );
        }
        currentTemplates = visibleTemplates;
        renderTemplates(visibleTemplates);
        setStatus(
            `${visibleTemplates.length} template(s) loaded for ${languageLabel(currentLanguage)}.`,
            "success",
        );
        renderRecentChangesPanel();
        await loadOutdatedNotification();
    } catch (error) {
        setStatus(error.message, "error");
    }
}

function renderTemplates(templates) {
    if (!templates.length) {
        elements.templateList.innerHTML = '<div class="empty-state">No templates found.</div>';
        return;
    }

    elements.templateList.innerHTML = templates
        .map((template) => {
            const isActive = template.id === selectedTemplateId ? "active" : "";
            const safeContent = escapeHtml(template.content);
            const outdatedChip = template.is_outdated
                ? '<span class="outdated-chip">Outdated</span>'
                : "";
            const canClearOutdated = ["manager", "developer"].includes(currentSession?.role || "");
            const canEdit = canEditTemplates();
            const editButton = canEdit
                ? `<button type="button" class="template-card-btn" data-action="edit" data-id="${template.id}">Edit</button>`
                : "";
            const reportButton = template.is_outdated
                ? (canClearOutdated
                    ? `<button type="button" class="template-card-btn secondary" data-action="clear-outdated" data-id="${template.id}">Clear</button>`
                    : "")
                : `<button type="button" class="template-card-btn warn" data-action="report-outdated" data-id="${template.id}">Report</button>`;
            const copyCountBadge = `<span class="copy-count-compact" title="Times copied">Copied ${Number(template.copy_count || 0)}x</span>`;

            return `
                <article class="template-card ${isActive}">
                    <div class="template-card-actions">
                        ${editButton}
                        <button type="button" class="template-card-btn secondary" data-action="copy" data-id="${template.id}">Copy</button>
                        <div class="template-card-report-group">
                            ${reportButton}
                            ${copyCountBadge}
                        </div>
                    </div>
                    <div class="template-card-main">
                        <h3 class="template-card-title">${escapeHtml(template.response_code)}</h3>
                        <div class="template-meta">
                            <span class="category-chip">${escapeHtml(template.category)}</span>
                            <small>ID: ${template.id}</small>
                            ${outdatedChip}
                        </div>
                        <pre class="template-card-body">${safeContent}</pre>
                    </div>
                </article>
            `;
        })
        .join("");

    document.querySelectorAll(".template-card button").forEach((button) => {
        button.addEventListener("click", async () => {
            const template = currentTemplates.find(
                (item) => item.id === Number(button.dataset.id),
            );
            if (template) {
                if (button.dataset.action === "copy") {
                    try {
                        await copyTextToClipboard(template.content);
                        await request(`/templates/${template.id}/copied`, { method: "PATCH" });
                        setStatus(`Copied content from ${template.response_code}.`, "success");
                        await loadTemplates();
                    } catch (error) {
                        setStatus(error.message, "error");
                    }
                    return;
                }
                if (button.dataset.action === "report-outdated") {
                    try {
                        const commentaryInput = window.prompt(
                            "Add commentary/tips for why this template is outdated (optional):",
                            "",
                        );
                        if (commentaryInput === null) {
                            return;
                        }
                        const params = new URLSearchParams();
                        const cleanedCommentary = commentaryInput.trim();
                        if (cleanedCommentary) {
                            params.set("commentary", cleanedCommentary);
                        }
                        if (currentSession?.username) {
                            params.set("username", currentSession.username);
                        }
                        const suffix = params.toString() ? `?${params.toString()}` : "";
                        await request(`/templates/${template.id}/outdated/report${suffix}`, { method: "PATCH" });
                        setStatus(`Template ${template.response_code} flagged as outdated.`, "success");
                        await loadTemplates();
                        await loadOutdatedNotification();
                    } catch (error) {
                        setStatus(error.message, "error");
                    }
                    return;
                }
                if (button.dataset.action === "clear-outdated") {
                    try {
                        await request(`/templates/${template.id}/outdated/clear`, { method: "PATCH" });
                        setStatus(`Outdated flag cleared for ${template.response_code}.`, "success");
                        await loadTemplates();
                        await loadOutdatedNotification();
                    } catch (error) {
                        setStatus(error.message, "error");
                    }
                    return;
                }

                setEditMode(template);
                setStatus(`Loaded template ${template.response_code} for editing.`, "success");
            }
        });
    });
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

async function createTemplate(event) {
    if (!["manager", "developer"].includes(currentSession?.role || "")) {
        setStatus("Only manager or developer can create templates.", "error");
        return;
    }

    event.preventDefault();

    const payload = {
        category: (elements.category.value.trim() || selectedExplorerPath || "General"),
        flow: selectedExplorerFlow,
        language: currentLanguage,
        response_code: elements.responseCode.value.trim(),
        content: elements.content.value,
    };

    try {
        await request("/templates", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        setStatus("Template created successfully.", "success");
        setCreateMode();
        closeTemplateDrawer();
        await loadTemplates();
    } catch (error) {
        setStatus(error.message, "error");
    }
}

async function updateTemplate() {
    if (!["manager", "developer"].includes(currentSession?.role || "")) {
        setStatus("Only manager or developer can update templates.", "error");
        return;
    }

    if (!selectedTemplateId) {
        setStatus("Select a template before updating.", "error");
        return;
    }

    const payload = {
        category: (elements.category.value.trim() || selectedExplorerPath || "General"),
        flow: selectedExplorerFlow,
        language: currentLanguage,
        response_code: elements.responseCode.value.trim(),
        content: elements.content.value,
    };

    try {
        const updatedTemplate = await request(`/templates/${selectedTemplateId}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        });
        setStatus("Template updated successfully.", "success");
        await loadTemplates();
        setEditMode(updatedTemplate);
    } catch (error) {
        setStatus(error.message, "error");
    }
}

async function deleteTemplate() {
    if (!["manager", "developer"].includes(currentSession?.role || "")) {
        setStatus("Only manager or developer can delete templates.", "error");
        return;
    }

    if (!selectedTemplateId) {
        setStatus("Select a template before deleting.", "error");
        return;
    }

    const confirmed = window.confirm("Delete this template?");
    if (!confirmed) {
        return;
    }

    try {
        await request(`/templates/${selectedTemplateId}`, { method: "DELETE" });
        setStatus("Template deleted successfully.", "success");
        setCreateMode();
        closeTemplateDrawer();
        await loadTemplates();
    } catch (error) {
        setStatus(error.message, "error");
    }
}

async function confirmNodeAction() {
    if (!["manager", "developer"].includes(currentSession?.role || "")) {
        setStatus("Only manager or developer can manage nodes.", "error");
        return;
    }

    try {
        if (pendingNodeAction === "create_node") {
            const name = elements.nodeActionNameInput.value.trim();
            if (!name) {
                setStatus("Provide a node name.", "error");
                return;
            }
            const params = new URLSearchParams();
            params.set("name", name);
            const flowVal = elements.nodeActionFlowInput.value.trim();
            if (flowVal) {
                params.set("flow", flowVal);
            }
            let parentIdForPost = null;
            if (pendingNodeContextId != null) {
                parentIdForPost = pendingNodeContextId;
            } else if (selectedFlowTab !== "all") {
                parentIdForPost = selectedNodeId;
            }
            if (selectedFlowTab !== "all" && parentIdForPost == null) {
                setStatus("Select a parent node in this flow first.", "error");
                return;
            }
            if (parentIdForPost != null) {
                params.set("parent_id", String(parentIdForPost));
            }
            const created = await request(`/templates/categories/nodes?${params.toString()}`, {
                method: "POST",
            });
            pendingNodeContextId = null;
            selectedNodeId = created.id;
            selectedExplorerPath = created.path;
            selectedExplorerFlow = created.flow;
            selectedFlowTab = created.flow || "all";
            await loadFlowExplorerTree();
            renderBreadcrumb(selectedExplorerPath);
            renderWarningsText();
            await loadTemplates();
            setStatus(
                parentIdForPost != null
                    ? `Node created: ${created.path}`
                    : `Top-level node created: ${created.path}`,
                "success",
            );
        } else if (pendingNodeAction === "rename") {
            const targetNodeId = pendingNodeContextId ?? selectedNodeId;
            if (!targetNodeId) {
                setStatus("Select a node first.", "error");
                return;
            }
            const name = elements.nodeActionNameInput.value.trim();
            if (!name) {
                setStatus("Provide a new node name.", "error");
                return;
            }
            const params = new URLSearchParams();
            params.set("name", name);
            const flow = elements.nodeActionFlowInput.value.trim();
            if (flow) {
                params.set("flow", flow);
            }
            const updated = await request(`/templates/categories/nodes/${targetNodeId}?${params.toString()}`, { method: "PUT" });
            pendingNodeContextId = null;
            selectedExplorerPath = updated.path;
            selectedExplorerFlow = updated.flow;
            selectedFlowTab = updated.flow || "all";
            await loadFlowExplorerTree();
            renderBreadcrumb(selectedExplorerPath);
            renderWarningsText();
            await loadTemplates();
            setStatus(`Node updated: ${updated.path}`, "success");
        } else if (pendingNodeAction === "delete") {
            const targetNodeId = pendingNodeContextId ?? selectedNodeId;
            if (!targetNodeId) {
                setStatus("Select a node first.", "error");
                return;
            }
            if (elements.nodeActionDeleteMode.value === "cancel") {
                pendingNodeContextId = null;
                elements.nodeActionDialog.close();
                return;
            }
            await request(`/templates/categories/nodes/${targetNodeId}?delete_templates=true`, {
                method: "DELETE",
            });
            pendingNodeContextId = null;
            selectedNodeId = null;
            selectedExplorerPath = "";
            selectedExplorerFlow = "general";
            selectedFlowTab = "all";
            await loadFlowExplorerTree();
            renderBreadcrumb("");
            renderWarningsText();
            await loadTemplates();
            setStatus("Node subtree deleted successfully.", "success");
        }
        elements.nodeActionDialog.close();
    } catch (error) {
        setStatus(error.message, "error");
    }
}

async function login(event) {
    event.preventDefault();
    try {
        const payload = {
            username: elements.username.value.trim().toLowerCase(),
            password: elements.password.value,
        };
        const auth = await request("/auth/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        saveSession({ username: auth.username, role: auth.role, token: auth.token });
        setLoginStatus("Login successful.", "success");
        openApp();
        await loadFlowExplorerTree();
        await loadTemplates();
    } catch (error) {
        setLoginStatus(error.message || "Invalid credentials.", "error");
    }
}

function openRegisterDialog() {
    elements.registerForm.reset();
    setRegisterStatus("");
    elements.registerDialog.showModal();
}

async function register(event) {
    event.preventDefault();
    try {
        const payload = {
            username: elements.registerUsername.value.trim().toLowerCase(),
            password: elements.registerPassword.value,
            role: elements.registerRole.value,
        };
        const auth = await request("/auth/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        saveSession({ username: auth.username, role: auth.role, token: auth.token });
        setLoginStatus("Account created and logged in.", "success");
        elements.registerDialog.close();
        openApp();
        await loadFlowExplorerTree();
        await loadTemplates();
    } catch (error) {
        setRegisterStatus(error.message, "error");
    }
}

function openImportDialog() {
    if (!["manager", "developer"].includes(currentSession?.role || "")) {
        return;
    }
    elements.importForm.reset();
    elements.importDialog.showModal();
}

async function importTemplatesFromCsv(event) {
    event.preventDefault();
    if (!["manager", "developer"].includes(currentSession?.role || "")) {
        setStatus("Only manager or developer can import templates.", "error");
        return;
    }
    const file = elements.importFileInput.files?.[0];
    if (!file) {
        setStatus("Select a CSV file first.", "error");
        return;
    }
    try {
        const body = new FormData();
        body.append("file", file);
        const result = await request("/templates/import/csv", {
            method: "POST",
            body,
        });
        const msg = `Import done. Rows: ${result.total_rows}. Created: ${result.created}. Updated: ${result.updated}. Failed: ${result.failed}.`;
        setStatus(msg, result.failed ? "error" : "success");
        elements.importDialog.close();
        await loadTemplates();
    } catch (error) {
        setStatus(error.message, "error");
    }
}

function logout() {
    clearSession();
    elements.loginForm.reset();
    elements.password.type = "password";
    elements.toggleLoginPasswordButton.setAttribute("aria-pressed", "false");
    elements.toggleLoginPasswordButton.setAttribute("aria-label", "Show password");
    elements.toggleLoginPasswordButton.setAttribute("title", "Show password");
    setLoginStatus("You have been logged out.", "success");
    openLogin();
}

elements.loginForm.addEventListener("submit", login);
elements.toggleLoginPasswordButton.addEventListener("click", () => {
    const show = elements.password.type === "password";
    elements.password.type = show ? "text" : "password";
    elements.toggleLoginPasswordButton.setAttribute("aria-pressed", show ? "true" : "false");
    elements.toggleLoginPasswordButton.setAttribute("aria-label", show ? "Hide password" : "Show password");
    elements.toggleLoginPasswordButton.setAttribute("title", show ? "Hide password" : "Show password");
});
elements.openRegisterButton.addEventListener("click", openRegisterDialog);
elements.registerForm.addEventListener("submit", register);
elements.registerCancelButton.addEventListener("click", () => elements.registerDialog.close());
elements.importTemplatesButton.addEventListener("click", openImportDialog);
elements.importForm.addEventListener("submit", importTemplatesFromCsv);
elements.importCancelButton.addEventListener("click", () => elements.importDialog.close());
elements.logoutButton.addEventListener("click", logout);
elements.themeToggleButton.addEventListener("click", () => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
});
elements.adhdToggleButton.addEventListener("click", () => {
    setCurrentFontMode(currentFontMode === "adhd" ? "default" : "adhd");
});
elements.resetUiLayoutButton.addEventListener("click", () => {
    clearUiLayout();
    resetPanelsToFlowLayout();
});
elements.form.addEventListener("submit", createTemplate);
elements.updateButton.addEventListener("click", updateTemplate);
elements.deleteButton.addEventListener("click", deleteTemplate);
elements.resetButton.addEventListener("click", () => {
    setCreateMode();
    setStatus("Form reset.", "success");
});
if (elements.newTemplateButton) {
    elements.newTemplateButton.addEventListener("click", () => {
        if (!canEditTemplates()) {
            return;
        }
        setCreateMode();
        openTemplateDrawer();
    });
}
if (elements.closeTemplateDrawerButton) {
    elements.closeTemplateDrawerButton.addEventListener("click", () => {
        closeTemplateDrawer();
    });
}
elements.editWarningsButton.addEventListener("click", () => {
    if (!["manager", "developer"].includes(currentSession?.role || "")) {
        return;
    }
    setWarningsEditMode(true);
});
elements.saveWarningsButton.addEventListener("click", () => {
    const warningsByNode = readWarningsMap();
    warningsByNode[currentWarningsKey()] = normalizeWarningsRecord({
        html: elements.warningsEditor.innerHTML.trim()
            || `<ul>${generateNodeWarningsText().split("\n").map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`,
    });
    writeWarningsMap(warningsByNode);
    renderWarningsText();
    setWarningsEditMode(false);
});
elements.cancelWarningsButton.addEventListener("click", () => {
    setWarningsEditMode(false);
});
elements.warningsBoldButton.addEventListener("click", () => applyWarningFormat("bold"));
elements.warningsItalicButton.addEventListener("click", () => applyWarningFormat("italic"));
elements.warningsUnderlineButton.addEventListener("click", () => applyWarningFormat("underline"));
elements.warningsRedButton.addEventListener("click", () => applyWarningFormat("foreColor", "#ff2a2a"));
elements.warningsBulletButton.addEventListener("click", () => applyWarningFormat("insertUnorderedList"));
elements.clearExplorerButton.addEventListener("click", async () => {
    dismissFlowExplorerNotice();
    selectedExplorerPath = "";
    selectedNodeId = null;
    selectedFlowTab = "all";
    selectedExplorerFlow = "general";
    renderBreadcrumb("");
    renderFlowTabs();
    renderFlowExplorerTree();
    updateSelectedNodeSummary();
    renderWarningsText();
    await loadTemplates();
});
elements.explorerUpButton?.addEventListener("click", async () => {
    if (!selectedExplorerPath) {
        return;
    }
    dismissFlowExplorerNotice();
    selectedExplorerPath = parentCategoryPath(selectedExplorerPath);
    renderBreadcrumb(selectedExplorerPath);
    renderFlowExplorerTree();
    renderWarningsText();
    setCreateMode();
    await loadTemplates();
});
elements.newNodeButton.addEventListener("click", () => openNodeActionDialog("create_node"));
elements.renameNodeButton.addEventListener("click", () => openNodeActionDialog("rename"));
elements.deleteNodeButton.addEventListener("click", () => openNodeActionDialog("delete"));
elements.nodeActionConfirmButton.addEventListener("click", confirmNodeAction);
elements.nodeActionCancelButton.addEventListener("click", () => {
    pendingNodeContextId = null;
    elements.nodeActionDialog.close();
});
elements.searchButton.addEventListener("click", loadTemplates);
elements.metricsRefreshButton?.addEventListener("click", loadAdminMetrics);
elements.metricsSummaryButton?.addEventListener("click", generateMetricsSummaryText);
elements.engineeringMetricsRefreshButton?.addEventListener("click", loadAdminMetrics);
elements.engineeringMetricsSummaryButton?.addEventListener("click", generateMetricsSummaryText);
elements.usersRefreshButton?.addEventListener("click", loadUsers);
elements.recentChangesButton.addEventListener("click", () => {
    elements.recentChangesPanel.classList.toggle("hidden");
    if (!elements.recentChangesPanel.classList.contains("hidden")) {
        elements.outdatedPanel.classList.add("hidden");
    }
});
elements.outdatedBellButton.addEventListener("click", () => {
    if (elements.outdatedBellWrap.classList.contains("hidden")) {
        return;
    }
    elements.outdatedPanel.classList.toggle("hidden");
    if (!elements.outdatedPanel.classList.contains("hidden")) {
        elements.recentChangesPanel.classList.add("hidden");
    }
});
document.addEventListener("click", (event) => {
    if (!elements.outdatedBellWrap.contains(event.target)) {
        elements.outdatedPanel.classList.add("hidden");
    }
    if (!elements.recentChangesWrap.contains(event.target)) {
        elements.recentChangesPanel.classList.add("hidden");
    }
});
elements.clearSearchButton.addEventListener("click", async () => {
    elements.searchInput.value = "";
    await loadTemplates();
});
elements.refreshButton.addEventListener("click", loadTemplates);
elements.searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        await loadTemplates();
    }
});
elements.languageSwitcher.querySelectorAll(".lang-button").forEach((button) => {
    button.addEventListener("click", async () => {
        const nextLanguage = button.dataset.language;
        if (nextLanguage === currentLanguage) {
            return;
        }
        setCurrentLanguage(nextLanguage);
        setCreateMode();
        renderWarningsText();
        await loadTemplates();
    });
});

restoreLanguage();
restoreTheme();
restoreFontMode();
renderWarningsText();
startLocalTimeClock();
setupSignatureToggle();
initUiEditInteractions();
setupKommoRailNav();
setupExplorerNodeActionMenus();
if (restoreSession()) {
    openApp();
    loadFlowExplorerTree();
    loadTemplates();
} else {
    openLogin();
}
