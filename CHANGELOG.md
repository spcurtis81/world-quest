# Changelog
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
