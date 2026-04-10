---
description: Start Development Server (Cloudflare D1 Local + Vite)
---
1. Ensure the local D1 database is initialized (see /db-ensure)
// turbo
2. Run the development environment via npm scripts. This command works automatically on both macOS/Linux (Bash/Zsh) and Windows (PowerShell/CMD).

```bash
pnpm run dev
```

Note: This runs the Vite development server with the `@hono/vite-dev-server/cloudflare` adapter. It automatically loads secrets from `.dev.vars` (like ADMIN_EMAIL and ADMIN_PASSWORD) and exposes your local D1 database for the backend API.
