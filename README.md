# World Quest Monorepo

Monorepo managed with pnpm workspaces and TypeScript.

## Structure

- apps/web: Next.js app
- apps/api: Fastify API
- packages/ui: React UI library (Vite lib mode)
- packages/lib: Shared TypeScript utilities
- packages/config: Shared ESLint, Prettier, TSConfig
- infra/docker: Dockerfiles for web and api
- infra/compose: Docker Compose files
- tests: Playwright E2E tests

## Setup

```bash
corepack enable
pnpm i
pnpm -w dlx @biomejs/biome@latest init -y # optional
pnpm dev
```

## Env

Copy `.env.example` to `.env` and adjust values.

## CI

GitHub Actions runs typecheck, lint, and tests on pull requests.

## Current Features

- Flag Quiz (`/flag-quiz`): multi‑question rounds with answer feedback, Next/Finish, end-of-round summary with score and percent, restart (Play Again), recent games history (localStorage, last 5), difficulty selector (easy/medium/hard), and real flag images when CDN is enabled (local placeholder otherwise).

## API Endpoints

- `GET /healthz` – API health
- `GET /v1/ping` – ping
- `GET /v1/quiz/flag?seed=<int>&options=<4|6|8>` – Single question; deterministic with `seed`; number of options controlled by `options`; may include `imageUrl`.

## Web Health

- `GET /healthz` – web health page
- `/healthz` – web health check

## Health Checks

- Web: `GET /healthz`
- API: `GET /healthz`

## Environment Variables

- `NEXT_PUBLIC_API_URL` – default `http://localhost:4000`
- `USE_FLAG_CDN` (true|false), `FLAG_CDN_BASE` (default `https://flagcdn.com`), `FLAG_CDN_FORMAT` (`svg` or `png`), `FLAG_CDN_SIZE` (e.g. `w320` for png)

## Quick start

- `cp .env.example .env`
- `pnpm i` then `pnpm dev`
- E2E: keep dev servers running, then `pnpm -C tests e2e`
