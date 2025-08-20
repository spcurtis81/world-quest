# Bug Log
| ID | Title | Status | Area | Found in | Fixed in | Notes |
|----|-------|--------|------|----------|----------|-------|
| 1  | Web UI blocked by CORS when calling API | Fixed  | API/Web | 0.1.0 | 0.1.0 | Enabled `@fastify/cors` with allowlist for `http://localhost:3000`. |
| 2  | Flaky Flag Quiz UI feedback test | Fixed | Tests/Web | 0.1.0 | 0.1.0 | Wait for question heading and 4 option buttons before clicking. |
| 3  | Missing `node-fetch` dependency in tests | Fixed | Tests | 0.1.0 | 0.1.0 | Installed and imported in E2E utilities. |
| 4  | API health route mismatch | Fixed | API/Tests | 0.1.0 | 0.1.0 | Aligned `/healthz` implementation and E2E waits. |
| 5  | Duplicate Next.js pages warnings | Fixed | Web | 0.1.0 | 0.1.0 | Removed redundant `.js` files shadowing `.ts/.tsx`. |

|  –  | (none this sprint) |  –  |  –  | 0.2.0 |  –  |  –  |

No new bugs were recorded in Sprint 5.
No new bugs were recorded in Sprint 7.

Fixed in Sprint 7:
- Region change mid-round previously could lead to mismatched pool; now confirmed/restarted
- Minor race conditions in E2E addressed by robust waits (carried forward)
