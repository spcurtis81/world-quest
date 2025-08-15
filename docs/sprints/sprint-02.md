# Sprint 2 – Data, Feedback, and Score
**Dates:** {{fill when closed}}
**Planned Version:** 0.2.0

## Sprint Goal
Deliver a more engaging quiz: larger flag dataset, clearer UI feedback, and basic per-session score.

## User Stories (in scope)
1. As a player, I get a broader set of countries so questions feel varied.
2. As a player, after answering I see crystal-clear feedback and can move to the next question.
3. As a player, I can see my score for this session (correct / total).
4. As a tester, E2E verifies feedback flow, score updates, and seeded determinism still works.

## Features / Deliverables
- Expanded `COUNTRIES` dataset (flags.data.ts).
- Web UI: highlight answers, “Next Question” button.
- Frontend-only score (stores in component state, later may persist).
- E2E tests for feedback + score flow.

## Testing & QA
- Unit tests (small helpers).
- E2E: wait for /healthz; verify next-question flow; verify score increments.
- Accessibility: buttons and headings have roles; visible feedback.

## Carryover Bugs
- None planned.

## Documentation Updates
- README: endpoints/pages overview as needed.
- Update changelog + release notes at close.

## Definition of Done
- All E2E pass locally.
- Docs updated (this sprint doc, changelog, release notes).
- Version bumped to 0.2.0.
