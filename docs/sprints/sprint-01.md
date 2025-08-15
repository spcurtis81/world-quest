# Sprint 1 – Flag Question Vertical Slice
**Dates:** {{fill when closed}}
**Version:** 0.1.0

## Goals
- Deliver a single-round flag question playable from the web UI.
- Deterministic API output when `seed` query is used.
- Basic E2E coverage and health checks.

## User Stories
1. As a player, I can open the Flag Quiz page and see a question with four options.
2. As a player, when I click an option I see Correct/Incorrect immediately.
3. As a tester, I can call the API with a `seed` and get a deterministic question for automated tests.

## Tasks
- API: /v1/quiz/flag endpoint (deterministic with `seed`).
- Web: /flag-quiz page to fetch & render one question and show feedback.
- Tests: E2E for API shape and page render; include health waits (already done).

## Bugs & Fixes (running list)
- (add as they are found)

## Outcomes / Demo Notes
- (what we show in review)

## Next
- Persist score/history to local storage or backend.
- Add images or richer data model.
