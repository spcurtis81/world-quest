# Sprint 5 – Real Flags, Mobile Polish, Accessibility (Stub)
**Dates:** 2025-08-15 – 2025-08-15
**Planned Version:** 0.5.0

## Sprint Goal
Ship real flag images, improve mobile UX, and upgrade accessibility without changing core gameplay.

## User Stories (planned)
1. As a player, I see real flag images reliably.
2. As a mobile user, buttons and layout are comfortable and readable.
3. As a keyboard/screen-reader user, I can play the quiz smoothly.

## Deliverables (planned)
- ✓ CDN/local flag images toggle with fallback.
- ✓ Responsive layout, touch-friendly controls.
- ✓ a11y improvements: focus order, roles, labels, key handling.

## Testing & QA (planned)
- E2E: image presence, mobile viewport sanity, keyboard navigation.
- Manual a11y checks (tab, shift+tab, screen reader labels).

## Definition of Done
- All E2E pass; docs & changelog updated; release 0.5.0.

## Outcomes / Demo Notes
- 16/16 E2E tests passing (includes mobile + keyboard a11y)
- Real images visible when CDN enabled, local placeholder otherwise
- No API breaking changes; optional imageUrl consumed by web

## Next
- Curate full flag set / licensing check
- Stats page (history view) + filters
- Region/category modes and longer “campaign” rounds
