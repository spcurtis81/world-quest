# Changelog

## Unreleased – Sprint 11 (0.11.0-dev)

### Added
- ActivityPane component for displaying game activity and status
- HeaderBar component for global navigation
- Tailwind CSS integration and configuration
- Design token system for consistent styling

### Changed
- *To be updated during sprint*

### Fixed
- *To be updated during sprint*

### Infrastructure
- *To be updated during sprint*
## 0.1.0 – Sprint 1
- API endpoint `/v1/quiz/flag` with deterministic `seed`.
- Web page `/flag-quiz` to fetch and answer a single question.
- Implemented immediate click feedback for quiz answers.
- Shared data: `packages/lib/src/flags.data.ts` with seedable random helpers.
- E2E coverage: API shape, seeded determinism, UI feedback; includes health checks.
- Enabled CORS for local development.
- Documentation: Sprint 1 living doc, bug log, and release notes.

## 0.2.0 – Sprint 2
- Expand country dataset (~60)
- Web UI: clear answer feedback and disabled options post‑answer
- “Next Question” flow
- Session score (frontend state)
- E2E tests for feedback/Next/score (green)

## 0.3.0 – Sprint 3 (planned)
- Round gameplay (N questions + summary)
- Flag images (accessible)
- Restart flow
- E2E for full round

## 0.4.0 – Sprint 4 (planned)
- Round summary UI
- Score history (localStorage)
- Randomised order and option shuffle
- Difficulty selector

## 0.4.0 – Sprint 4
- Round summary with percent + restart
- Recent games (localStorage, last 5)
- Difficulty (4/6/8 options) via ?options=
- Deterministic option shuffle when seeded
- E2E for summary/history/difficulty/randomisation

## 0.5.0 – Sprint 5 (planned)
- Real flag images via CDN/local toggle with fallback
- Mobile layout/tap-target polish
- Accessibility improvements

## 0.5.0 – Sprint 5
- Real flag images via CDN/local toggle with fallback
- Mobile layout polish (responsive container, tap targets, focus-visible)
- Accessibility improvements (keyboard flow, ARIA labels/roles)
- E2E for image presence (smoke), mobile viewport, keyboard navigation

## 0.6.0 – Sprint 6 (planned)
- Expand question pool; no repeats per round
- Round length & progression indicator
- Summary review with per-question breakdown
- Region filter (Europe/Africa/Asia/Americas/Oceania)

## 0.7.0 – Sprint 7 (planned)
- Region switch confirmation modal; restart round on confirm
- Infinite round (∞) option in round length
- Summary improvements and minor console fixes

## 0.7.0 – Sprint 7
- Region switch confirmation modal; round restarts on confirm
- Infinite round (∞) with manual end and “Stats so far” summary
- E2E for modal flow and infinite mode
- No breaking changes

## [0.9.0] - 2025-08-21
-

## [0.10.0] - 2024-12-27 – Sprint 10 Release

### Added
- **New Launcher (App Router)** at `/launch` with responsive tile-based game selection from centralized games config
- **Legacy Launcher (Pages Router)** at `/launcher` for backward compatibility and E2E test support
- **Reusable Toast System** globally mounted with ARIA-compliant notifications (`role="status"`, `aria-live="polite"`, deterministic `aria-label`)
- **Health Endpoints** restored: `/healthz` (App Router) and `/api/ping` with proper JSON responses
- Games registry and centralized configuration for all game metadata
- Theme tokens and ThemeProvider for app-wide theming foundation
- Mobile ergonomics improvements: larger tap targets and prevention of layout shifts

### Changed
- Homepage simplified to minimal implementation with redirect to launcher
- Toast system enhanced with deterministic ARIA properties for reliable E2E testing
- Modal component reworked into accessible, reusable pattern with portal rendering
- Flag Quiz updated to use shared modal and toast components

### Fixed
- **Test Stabilization**: All 37 tests now run successfully (33 passing, 4 skipped, 0 failures)
- E2E tests stabilized around race conditions in toast visibility
- TypeScript configuration issues resolved after Tailwind integration
- Build process and module resolution fixed in monorepo structure
- Infrastructure cleanup ensuring development server runs without warnings

### Infrastructure
- Tailwind CSS fully integrated with proper PostCSS configuration
- Dependencies updated and cleaned up across all packages
- Monorepo structure optimized for better build performance
