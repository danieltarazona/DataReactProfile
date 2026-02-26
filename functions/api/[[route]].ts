import { Hono } from 'hono';
import { handle } from 'hono/cloudflare-pages';
import { getCookie, setCookie } from 'hono/cookie';
import { mountAuthRoutes } from '@datakit/cloudflare-login';

type Bindings = {
    DB: D1Database;
    DATAKITREACTCORE: Fetcher;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    NODE_ENV: string;
};

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

// --- Auth Routes ---
mountAuthRoutes(app, {
    secureCookie: true, // Hono handle wrapper for Pages Functions usually runs in production-like env
});

// --- Registry Routes ---
app.all('/registry/:path*', async (c) => {
    const path = c.req.param('path');
    const registry = c.env.DATAKITREACTCORE;

    if (!registry) {
        console.error('[Registry] DATAKITREACTCORE binding not found');
        return c.json({ error: 'Service binding not configured' }, 500);
    }

    const url = new URL(c.req.url);
    const targetUrl = `https://registry.internal/${path}${url.search}`;

    try {
        const fetchOptions: RequestInit = {
            method: c.req.method,
            headers: c.req.header() as any,
            body: (c.req.method !== 'GET' && c.req.method !== 'HEAD') ? await c.req.arrayBuffer() : undefined,
        };

        const response = await registry.fetch(targetUrl, fetchOptions);

        return new Response(response.body, {
            status: response.status,
            headers: response.headers,
        });
    } catch (e: any) {
        console.error('[Registry] Proxy error:', e);
        return c.json({ error: e.message }, 500);
    }
});

export const onRequest = handle(app);
