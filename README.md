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

- Flag Quiz (`/flag-quiz`): multi‑question round with answer feedback, Next/Finish, summary with score, restart, and flag images when available.

## API Endpoints

- `GET /healthz` – API health
- `GET /v1/ping` – API ping
- `GET /v1/quiz/flag?seed=<int>` – Flag question; deterministic with `seed`

## Web Pages

- `/` – landing page
- `/flag-quiz` – quiz UI (feedback + Next + session score)
- `/healthz` – web health check

## Health Checks

- Web: `GET /healthz`
- API: `GET /healthz`

## Quick start

- `pnpm dev` runs API and Web together (API on 4000, Web on 3000)
- Configure `.env` as needed, e.g. `NEXT_PUBLIC_API_URL=http://localhost:4000`
 - History: recent games are stored locally in your browser (last 5)
