#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

log() { echo "[e2e-fresh] $*"; }

# ---------- 0) Safety defaults ----------
# Raise file descriptor limit to avoid EMFILE (macOS can be stingy)
ulimit -n 10000 || true

# ---------- 1) Kill stray dev processes ----------
log "Killing stray dev processes"
pkill -f "next dev" 2>/dev/null || true
pkill -f "tsx watch" 2>/dev/null || true
pkill -f "tsup .* --watch" 2>/dev/null || true
pkill -f "node .*server\.ts" 2>/dev/null || true
# Also free ports just in case
for p in 3000 3001 3002 4000; do
  kill -9 $(lsof -t -iTCP:$p -sTCP:LISTEN 2>/dev/null) 2>/dev/null || true
done

# ---------- 2) Clear caches ----------
log "Clearing build caches"
rm -rf apps/web/.next apps/web/.turbo .e2e-dev.log

# ---------- 3) Rebuild shared packages ----------
log "Rebuilding shared packages"
pnpm --filter @config/shared build
pnpm --filter @lib/shared build
pnpm --filter @ui/shared build

# ---------- 4) Start dev servers in background ----------
log "Starting 'pnpm dev' (web+api) in background (logs  .e2e-dev.log)"
WATCHPACK_POLLING=true pnpm dev > .e2e-dev.log 2>&1 &
DEV_PID=$!
log "Dev PID: $DEV_PID"

# Leave server up by default (set E2E_SHUTDOWN_DEV=1 to auto-kill after tests)
cleanup() {
  if [[ "${E2E_SHUTDOWN_DEV:-0}" == "1" ]]; then
    log "Shutting down dev (PID $DEV_PID)"
    kill "$DEV_PID" 2>/dev/null || true
  else
    log "Leaving dev server running (PID $DEV_PID)."
    log "Open:  http://localhost:3000"
    log "API:   http://localhost:4000"
    log "Logs:  .e2e-dev.log  (tail -f .e2e-dev.log)"
  fi
}
trap cleanup EXIT

# ---------- 5) Health check helpers ----------
wait_for() {
  local url="$1" name="$2" timeout="${3:-60}" interval=1
  log "Waiting up to ${timeout}s for ${name} (${url})"
  local start=$(date +%s) now
  while true; do
    if curl -sSf "$url" >/dev/null 2>&1; then
      log "${name} is up."
      return 0
    fi
    sleep "$interval"
    now=$(date +%s)
    if (( now - start >= timeout )); then
      log "Timed out waiting for ${name}. Tail of .e2e-dev.log:"
      tail -n 120 .e2e-dev.log || true
      exit 1
    fi
  done
}

# ---------- 6) Wait for web & api ----------
wait_for "http://localhost:3000/healthz" "Web /healthz" 60
wait_for "http://localhost:3000/api/ping" "Web /api/ping" 60
wait_for "http://localhost:4000/healthz" "API /healthz" 60

# ---------- 7) Run tests ----------
log "Running Playwright tests"
pnpm -C tests e2e
log "All tests passed."
