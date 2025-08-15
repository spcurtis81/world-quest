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
