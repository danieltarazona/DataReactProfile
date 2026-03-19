import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'
import { mountAuthRoutes } from '@datakit/cloudflare-login'
import { drizzle } from 'drizzle-orm/d1'
import { eq, asc } from 'drizzle-orm'
import * as schema from './db/schema'
import { MIGRATION_SQL, SEED_SQL } from './db/migrate'

type Bindings = {
    DB: D1Database
    ASSETS: Fetcher
    ADMIN_EMAIL: string
    ADMIN_PASSWORD: string
}

const app = new Hono<{ Bindings: Bindings }>()

// Auth routes
mountAuthRoutes(app, { basePath: '/api/auth' })

// Helper: generate UUID
function uuid(): string {
    return crypto.randomUUID()
}

// Helper: current ISO timestamp
function now(): string {
    return new Date().toISOString()
}

// ─── Migration endpoint ──────────────────────────────────────
app.post('/api/cv/migrate', async (c) => {
    const db = c.env.DB
    const statements = MIGRATION_SQL.split(';').map(s => s.trim()).filter(Boolean)
    for (const stmt of statements) {
        await db.prepare(stmt).run()
    }
    const seedStatements = SEED_SQL.split(';').map(s => s.trim()).filter(Boolean)
    for (const stmt of seedStatements) {
        await db.prepare(stmt).run()
    }
    return c.json({ success: true, message: 'Migration and seed complete' })
})

// ─── GET /api/cv/all — Full CV data ─────────────────────────
app.get('/api/cv/all', async (c) => {
    const db = drizzle(c.env.DB)

    try {
        const [
            rolesData,
            headerData,
            educationData,
            experienceData,
            projectsData,
            skillsData,
            leadershipData,
            certificatesData,
            languagesData,
            awardsData,
            sectionOrderData,
        ] = await Promise.all([
            db.select().from(schema.roles).orderBy(asc(schema.roles.sortOrder)),
            db.select().from(schema.header),
            db.select().from(schema.education).orderBy(asc(schema.education.sortOrder)),
            db.select().from(schema.experience).orderBy(asc(schema.experience.sortOrder)),
            db.select().from(schema.projects).orderBy(asc(schema.projects.sortOrder)),
            db.select().from(schema.skills).orderBy(asc(schema.skills.sortOrder)),
            db.select().from(schema.leadership).orderBy(asc(schema.leadership.sortOrder)),
            db.select().from(schema.certificates).orderBy(asc(schema.certificates.sortOrder)),
            db.select().from(schema.languages).orderBy(asc(schema.languages.sortOrder)),
            db.select().from(schema.awards).orderBy(asc(schema.awards.sortOrder)),
            db.select().from(schema.sectionOrder).orderBy(asc(schema.sectionOrder.sortOrder)),
        ])
        return c.json({
            roles: rolesData,
            header: headerData[0] || null,
            education: educationData,
            experience: experienceData,
            projects: projectsData,
            skills: skillsData,
            leadership: leadershipData,
            certificates: certificatesData,
            languages: languagesData,
            awards: awardsData,
            sectionOrder: sectionOrderData,
        })
    } catch (err: any) {
        if (err.message?.includes('no such table')) {
            console.log('Tables missing, triggering auto-migration...')
            // Run migration
            const migrationStatements = MIGRATION_SQL.split(';').map(s => s.trim()).filter(Boolean)
            for (const stmt of migrationStatements) {
                await c.env.DB.prepare(stmt).run()
            }
            // Run seed
            const seedStatements = SEED_SQL.split(';').map(s => s.trim()).filter(Boolean)
            for (const stmt of seedStatements) {
                await c.env.DB.prepare(stmt).run()
            }
            // Retry by redirecting back to same URL
            console.log('Migration complete, retrying request...')
            return c.redirect(c.req.url)
        }
        console.error('API Error:', err)
        return c.json({ error: err.message }, 500)
    }
})

// ─── Roles CRUD ──────────────────────────────────────────────
app.get('/api/cv/roles', async (c) => {
    const db = drizzle(c.env.DB)
    const data = await db.select().from(schema.roles).orderBy(asc(schema.roles.sortOrder))
    return c.json(data)
})

app.post('/api/cv/roles', async (c) => {
    const db = drizzle(c.env.DB)
    const body = await c.req.json()
    const id = uuid()
    const ts = now()
    await db.insert(schema.roles).values({
        id, name: body.name || '', jobTitle: body.jobTitle || '',
        sortOrder: body.sortOrder ?? 0, createdAt: ts, updatedAt: ts,
    })
    return c.json({ id, success: true })
})

app.delete('/api/cv/roles/:id', async (c) => {
    const db = drizzle(c.env.DB)
    const id = c.req.param('id')
    if (id === 'all') return c.json({ error: 'Cannot delete the All role' }, 400)
    await db.delete(schema.roles).where(eq(schema.roles.id, id))
    return c.json({ success: true })
})

// ─── Header CRUD ─────────────────────────────────────────────
app.put('/api/cv/header', async (c) => {
    const db = drizzle(c.env.DB)
    const body = await c.req.json()
    await db.update(schema.header).set({ ...body, updatedAt: now() }).where(eq(schema.header.id, 'default'))
    return c.json({ success: true })
})

// ─── Generic section CRUD ────────────────────────────────────
const sectionMap: Record<string, any> = {
    education: schema.education,
    experience: schema.experience,
    projects: schema.projects,
    skills: schema.skills,
    leadership: schema.leadership,
    certificates: schema.certificates,
    languages: schema.languages,
    awards: schema.awards,
}

// CREATE
app.post('/api/cv/:section', async (c) => {
    const section = c.req.param('section')
    const table = sectionMap[section]
    if (!table) return c.json({ error: 'Invalid section' }, 400)

    const db = drizzle(c.env.DB)
    const body = await c.req.json()
    const id = uuid()
    const ts = now()

    await db.insert(table).values({
        id, ...body, createdAt: ts, updatedAt: ts,
    })
    return c.json({ id, success: true })
})

// UPDATE
app.put('/api/cv/:section/:id', async (c) => {
    const section = c.req.param('section')
    const id = c.req.param('id')
    const table = sectionMap[section]
    if (!table) return c.json({ error: 'Invalid section' }, 400)

    const db = drizzle(c.env.DB)
    const body = await c.req.json()

    await db.update(table).set({ ...body, updatedAt: now() }).where(eq(table.id, id))
    return c.json({ success: true })
})

// DELETE
app.delete('/api/cv/:section/:id', async (c) => {
    const section = c.req.param('section')
    const id = c.req.param('id')
    const table = sectionMap[section]
    if (!table) return c.json({ error: 'Invalid section' }, 400)

    const db = drizzle(c.env.DB)
    await db.delete(table).where(eq(table.id, id))
    return c.json({ success: true })
})

// ─── Reorder ─────────────────────────────────────────────────
app.patch('/api/cv/reorder', async (c) => {
    const db = drizzle(c.env.DB)
    const body = await c.req.json() as { section: string; items: { id: string; sortOrder: number }[] }
    const table = body.section === 'sectionOrder' ? schema.sectionOrder : sectionMap[body.section]
    if (!table) return c.json({ error: 'Invalid section' }, 400)

    const ts = now()
    for (const item of body.items) {
        await db.update(table).set({ sortOrder: item.sortOrder, updatedAt: ts }).where(eq(table.id, item.id))
    }
    return c.json({ success: true })
})

// Serve static assets
app.use('/*', serveStatic())

export default app
