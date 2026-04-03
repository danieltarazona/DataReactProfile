---
description: Ensure Local D1 Database Schema
---
This initializes the local database with the tables defined in `setup.sql`.
// turbo
1. Run the ensure script:
```bash
pnpm run db:ensure
```
Note: Safe to run multiple times (uses IF NOT EXISTS).
