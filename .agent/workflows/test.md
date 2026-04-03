---
description: Run Unit Tests (Vitest)
---
If you get "Permission denied" on vitest:
// turbo
1. Fix binary permissions:
```bash
chmod +x node_modules/.bin/vitest
```

2. Run the test suite:
// turbo
```bash
pnpm run test
```
