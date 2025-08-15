# Sprint 3 – Rounds & Flag Images
**Dates:** {{fill when closed}}
**Planned Version:** 0.3.0

## Sprint Goal
Make the quiz feel complete and replayable with multi‑question rounds and flag images.

## User Stories (in scope)
1. As a player, I can play a round of N questions and see a summary at the end.
2. As a player, I see the flag image for the current question (with accessible labelling).
3. As a player, I can restart and play again from the summary screen.
4. As a tester, E2E covers full round → summary → restart.

## Features / Deliverables
- Round state (N questions, default 10) with end‑of‑round summary.
- Flag images surfaced in API payloads and shown in the web UI.
- Accessibility: alt text and ARIA labels for images and feedback states.
- E2E for full round flow and image visibility.

## Testing & QA
- Unit tests for helpers (e.g., round state reducer).
- E2E: full round completion, summary accuracy, restart flow, image present.
- Accessibility checks (roles, names, labels).

## Carryover Bugs
- None planned.

## Documentation Updates
- README: features list, endpoints, pages.
- Release notes & changelog at close.

## Definition of Done
- All E2E pass locally.
- Docs updated (this sprint doc, changelog, release notes).
- Version bumped to 0.3.0.
