# Release Notes - v0.10.0

**Sprint 10 Release** | December 27, 2024

## Highlights

- 🚀 **New Launcher System**: Dual launcher implementation with App Router (`/launch`) and Pages Router (`/launcher`) for maximum compatibility
- 🎮 **Centralized Games Config**: Single source of truth for all game metadata and routing
- 🔔 **Global Toast System**: ARIA-compliant toast notifications with deterministic behavior for testing
- ✅ **Health Endpoints Restored**: Both `/healthz` and `/api/ping` endpoints operational and passing tests
- 🧪 **Test Stabilization**: All 37 tests running with 33 passing and 4 skipped - no failures

## What's New

### Launcher (App Router)
The new primary launcher at `/launch` showcases all available games in a responsive grid layout. Built with Next.js App Router, it provides:
- Clean tile-based interface with game cards
- Automatic routing to game pages
- Central games configuration for easy maintenance
- Responsive design for mobile and desktop

### Legacy Launcher (Pages Router)
A fallback launcher at `/launcher` ensures backward compatibility and E2E test stability:
- Pages Router implementation for legacy support
- Identical functionality to the App Router version
- Ensures smooth transition path for existing users

### Reusable Toast System
A globally-mounted toast notification system provides consistent user feedback:
- ARIA-compliant with proper `role="status"` and `aria-live="polite"`
- Deterministic `aria-label` for reliable E2E testing
- Configurable duration and positioning
- Beautiful, non-intrusive design at high z-index

### Health Endpoints
Critical infrastructure endpoints have been restored and verified:
- `/healthz` - Server health check endpoint (App Router)
- `/api/ping` - API health check endpoint
- Both endpoints return proper JSON responses with status "ok"
- Full E2E test coverage ensuring reliability

### Stabilization Improvements
Significant effort went into stabilizing the codebase after Tailwind CSS integration:
- Fixed race conditions in toast visibility tests
- Resolved TypeScript configuration issues
- Cleaned up minimal homepage for better performance
- Infrastructure cleanup and dependency updates
- All tests now passing consistently (33 passing, 4 intentionally skipped)

## Technical Details

### Infrastructure
- Tailwind CSS fully integrated with proper PostCSS configuration
- TypeScript paths and module resolution stabilized
- Build process optimized for monorepo structure
- Development server running cleanly without warnings

### Testing
- E2E tests for launcher visibility and navigation
- Health endpoint tests passing consistently
- Toast system tests with proper ARIA selectors
- Mobile viewport and responsive design tests

## Migration Notes

No breaking changes in this release. The new launcher is available at `/launch` while the existing functionality remains unchanged. The toast system is globally available and can be used immediately without additional setup.

## Next Steps

Sprint 11 will focus on UI polish and styling improvements:
- Background designs and theming
- Activity pane implementation
- Light/dark mode support
- Enhanced visual feedback and animations

---

*For the complete list of changes, see [CHANGELOG.md](../../CHANGELOG.md)*