# Dev Setup

## Prerequisites
- Node.js 20+
- pnpm (via corepack)

## Setup

```
cp .env.example .env
corepack enable
pnpm i
pnpm dev
```

## Env vars
- `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`)
- `BASE_PATH` (optional for reverse proxy)

## Running tests
- Keep `pnpm dev` running in one terminal
- In another terminal: `pnpm -C tests e2e`
- Health waits rely on `/healthz` routes for both API and Web
