---
description: Initial Project Setup & Permission Fixes
---
Use this workflow if you have permission issues or are setting up the project for the first time in WSL.

// turbo
1. Install dependencies:
```bash
pnpm install
```

2. Fix execution permissions for binaries:
// turbo
```bash
chmod +x node_modules/.bin/*
```

3. Initialize the local database:
// turbo
```bash
pnpm run db:ensure
```

4. Ready to run! Use /dev or /test now.
