# Changelog
## 0.1.0 – Sprint 1
- API endpoint `/v1/quiz/flag` with deterministic `seed`.
- Web page `/flag-quiz` to fetch and answer a single question.
- Implemented immediate click feedback for quiz answers.
- Shared data: `packages/lib/src/flags.data.ts` with seedable random helpers.
- E2E coverage: API shape, seeded determinism, UI feedback; includes health checks.
- Enabled CORS for local development.
- Documentation: Sprint 1 living doc, bug log, and release notes.

## 0.2.0 – Sprint 2 (planned)
- Expand country dataset
- UI feedback + “Next Question”
- Session score (frontend-only)
- E2E for feedback & score
