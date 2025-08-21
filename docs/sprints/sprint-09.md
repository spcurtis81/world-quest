# Sprint 9 — UX polish & readiness

Dates: Planned

## Scope
- Modal polish (portaled, focus, inert-driven background blocking, subtle animation)
- Toast notifications
- Mobile refinements (spacing, tap targets, layout)
- Accessibility check (a11y smoke via axe)
- Design tokens (colors, spacing, radii, shadows)

## Acceptance criteria
- Modal polish: Region-change modal is portaled to `document.body`, background is inert, ESC/cancel/confirm work with subtle entrance animation
- Toast: Minimal toast appears on “New round started” and auto-dismisses
- Mobile: Base UI uses improved spacing/tokens and remains tappable on small screens
- A11y: Dev-only axe smoke test runs and passes locally
- Tokens: `packages/ui` exposes `tokens.css` for colors/spacing/radii/shadows and is imported by the web app

## Done checklist
- [ ] Modal is portaled and animated; background blocking is deterministic
- [ ] Toast component and styles exist and are wired into the app
- [ ] Globals import tokens and apply base styles using CSS variables
- [ ] E2E includes a toast appearance/disappearance check
- [ ] (Dev) Axe smoke test is available and skipped in CI

## Test plan
- E2E: Trigger region confirm; expect a toast with role="status" containing “New round started” to appear then disappear
- Manual: Resize to mobile; verify spacing/padding and tap targets remain usable
- Manual: Open region modal mid‑round; verify background is inert and modal buttons work
- Dev-only: Run axe smoke on `/flag-quiz` to spot obvious violations
