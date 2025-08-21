#!/usr/bin/env bash
set -euo pipefail

# ======================== Settings =========================
WEB_PORT="${WEB_PORT:-3000}"
API_PORT="${API_PORT:-4000}"
WEB_HEALTH="${WEB_HEALTH:-http://localhost:${WEB_PORT}/healthz}"
API_HEALTH="${API_HEALTH:-http://localhost:${API_PORT}/healthz}"
WAIT_SECS="${WAIT_SECS:-60}"                # total wait per service
LOG_FILE="${LOG_FILE:-.e2e-dev.log}"

# Any args after '--' go straight to Playwright (e.g., -g "summary" --trace on)
PW_ARGS=("$@")

# ====================== Pre-cleanup ========================
echo "[e2e] Killing servers on :${WEB_PORT} and :${API_PORT} if running…"
lsof -ti:"${WEB_PORT}" -sTCP:LISTEN | xargs kill -9 2>/dev/null || true
lsof -ti:"${API_PORT}" -sTCP:LISTEN | xargs kill -9 2>/dev/null || true

# ==================== Start background dev =================
echo "[e2e] Starting 'pnpm dev'… (logs → ${LOG_FILE})"
pnpm dev > "${LOG_FILE}" 2>&1 &
DEV_PID=$!
echo "[e2e] Dev PID: ${DEV_PID}"

# By default, KEEP dev running after tests.
# Set E2E_SHUTDOWN_DEV=1 to auto-kill on exit.
if [[ "${E2E_SHUTDOWN_DEV:-0}" == "1" ]]; then
  trap 'echo "[e2e] Shutting down dev (PID ${DEV_PID})"; kill ${DEV_PID} 2>/dev/null || true' EXIT
else
  echo "[e2e] Dev server will stay running after tests. Use E2E_SHUTDOWN_DEV=1 to auto-kill."
fi

# ==================== Health wait helper ===================
wait_for_health () {
  local url="$1"
  local label="$2"
  echo "[e2e] Waiting up to ${WAIT_SECS}s for ${label} (${url})…"
  for i in $(seq 1 "${WAIT_SECS}"); do
    if curl -fsS "${url}" >/dev/null 2>&1; then
      echo "[e2e] ${label} is up."
      return 0
    fi
    sleep 1
  done
  echo "[e2e] ${label} health timed out. Tail of ${LOG_FILE}:"
  tail -n 80 "${LOG_FILE}" || true
  return 1
}

# ==================== Wait for services ====================
wait_for_health "${API_HEALTH}" "API" || exit 1
wait_for_health "${WEB_HEALTH}" "Web" || exit 1

# ==================== Run Playwright =======================
echo "[e2e] Running Playwright tests…"
if ((${#PW_ARGS[@]})); then
  pnpm -C tests e2e -- "${PW_ARGS[@]}"
else
  pnpm -C tests e2e
fi
RESULT=$?

# ==================== Post-run info ========================
if [[ "${E2E_SHUTDOWN_DEV:-0}" != "1" ]]; then
  echo "[e2e] Leaving dev server running (PID ${DEV_PID})."
  echo "[e2e] Open:  http://localhost:${WEB_PORT}"
  echo "[e2e] API:   http://localhost:${API_PORT}"
  echo "[e2e] Logs:  ${LOG_FILE}  (tail -f ${LOG_FILE})"
fi

exit ${RESULT}
