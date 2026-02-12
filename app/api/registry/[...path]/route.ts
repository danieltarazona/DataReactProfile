import { NextRequest } from 'next/server';


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return handleRequest(request, path);
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return handleRequest(request, path);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return handleRequest(request, path);
}

async function handleRequest(request: NextRequest, pathParts: string[]) {
    // @ts-ignore - DATAKITREACTCORE is injected by Cloudflare
    const registry = (process.env as any).DATAKITREACTCORE || (globalThis as any).DATAKITREACTCORE;

    const path = pathParts.join('/');
    const url = new URL(request.url);

    // Local dev: fallback to localhost when service binding is unavailable
    const baseUrl = registry
        ? 'https://registry.internal'
        : (process.env.DATAKITREACTCORE_URL || 'http://localhost:8787');
    const targetUrl = `${baseUrl}/${path}${url.search}`;

    try {
        const fetchOptions = {
            method: request.method,
            headers: request.headers,
            body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : undefined
        };

        const response = registry
            ? await registry.fetch(targetUrl, fetchOptions)
            : await fetch(targetUrl, fetchOptions);

        return new Response(response.body, {
            status: response.status,
            headers: response.headers
        });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
