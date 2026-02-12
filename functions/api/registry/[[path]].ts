/**
 * Registry API Proxy - Cloudflare Pages Function
 * Proxies requests to the DataKitReactCore service
 */

/// <reference types="@cloudflare/workers-types" />

interface Env {
    DATAKITREACTCORE: Fetcher;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const { request, env, params } = context;

    // Path parameter handling for [[path]] catch-all
    // context.params.path can be a string or array of strings
    const pathParam = params.path;
    const pathParts = Array.isArray(pathParam) ? pathParam : (pathParam ? [pathParam] : []);
    const path = pathParts.join('/');

    // Construct target URL
    const url = new URL(request.url);

    // Use service binding if available, otherwise fallback (though binding is required)
    // In Pages Functions, bindings are available on `env`
    if (!env.DATAKITREACTCORE) {
        console.error('DATAKITREACTCORE binding not found');
        return new Response('Service binding not configured', { status: 500 });
    }

    const targetUrl = `https://registry.internal/${path}${url.search}`;

    try {
        // Clone request to avoid body stream issues
        const newRequest = new Request(targetUrl, request);

        // Forward to the service
        return await env.DATAKITREACTCORE.fetch(newRequest);
    } catch (e: any) {
        console.error('Proxy error:', e);
        return new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
