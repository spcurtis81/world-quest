# Testing

## E2E Conventions
- Health waits via `/healthz` (API & Web)
- Seeded determinism with `?seed=123` for API
- UI flow covered: load question → answer → feedback → Next → score increments
- Region change test confirms modal and restart
- Infinite mode tests: attempted count grows; manual End Round → summary shows “Stats so far”
- Playwright config: retries=1, trace/video on failure
- Tests live in the `/tests` package
