import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'
import { mountAuthRoutes } from '@datakit/cloudflare-login'

const app = new Hono()

// Auth routes from shared package (SHA-256 hashing + .trim() on env vars)
mountAuthRoutes(app, { basePath: '/api/auth' })

// Serve static assets
app.use('/*', serveStatic())

export default app
