/**
 * Logout API - Cloudflare Pages Function
 * Clears the session cookie
 */

/// <reference types="@cloudflare/workers-types" />

export const onRequestPost: PagesFunction = async (): Promise<Response> => {
    const cookie = [
        'session=',
        'Path=/',
        'HttpOnly',
        'Secure',
        'SameSite=Strict',
        'Max-Age=0'
    ].join('; ');

    return new Response(
        JSON.stringify({ success: true }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': cookie
            }
        }
    );
};
