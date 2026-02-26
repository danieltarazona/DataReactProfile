#!/bin/bash
curl -s -w '\nHTTP_CODE:%{http_code}\n' \
  -X POST http://localhost:8788/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"admin123"}'
