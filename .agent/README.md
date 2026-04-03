# Gemini Agent Workflow - DataReactProfile

This document provides instructions for AI agents (like Gemini) on how to maintain, test, and develop this project correctly in a WSL/Windows environment.

## 🛠️ Environment Setup

- **WSL (Ubuntu)** is the primary development environment.
- **Node Manager**: Use `fnm` for Node/PNPM management.
- **Database**: The project uses **Cloudflare D1**. Local development uses `wrangler` with a local SQLite database.
- **Authentication**: Uses `@datakit/cloudflare-login`. Ensure `.dev.vars` contains `COOKIE_SECRET`.

## 📦 Core Commands

- **Development**: `pnpm run dev` (starts Hono server + Vite frontend).
- **Database Sync**: `pnpm run db:ensure` (creates/updates local D1 tables from `setup.sql`).
- **Database Reset**: `pnpm run db:reset` (deletes local DB and re-creates from scratch).
- **Testing**: `pnpm test` (runs Vitest).

## 🗃️ Schema Management

1.  **Drizzle Schema**: Located in `src/server/db/schema.ts`.
2.  **SQL Setup**: Located in `src/server/db/setup.sql`. This is the source of truth for the local Wrangler D1 setup.
3.  **Migration**: After changing either file, run `pnpm run db:ensure` to apply changes to the local dev database.

## 🎨 Design System

- **Styling**: Vanilla CSS with Tailwind-like utility classes in some places, but transitioning to a bespoke design system.
- **Icons**: Use `lucide-react`.
- **Animations**: Use `motion/react` (Framer Motion).
- **Previews**: The `PDFPreviewPanel` is heavy. Always ensure it is **debounced** in `Home.tsx` to prevent editor flickering.

## 🤖 Gemini Interaction Rules

- **Optimistic UI**: The `cvMachine.ts (XState)` handles state. Always ensure `send()` is called before or alongside API calls for a responsive feel.
- **Localization**: Fields usually come in trilingual versions (En, Es, Fr). Always use `api.getLocalizedField` for rendering.
- **Roles**: Most entries have `roleIds` (comma-separated string). Use `isVisibleForRole` to filter data before passing it to specialized components.

## 📂 Project Structure

- `src/client`: React frontend.
- `src/server`: Hono backend (Cloudflare Worker).
- `src/lib`: Shared logic (including XState machine).
- `src/server/db`: Drizzle and SQL schema.
