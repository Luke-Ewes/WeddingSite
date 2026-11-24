export function onRequest(): Response {
    return new Response("Cloudflare Functions is working!", {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
        },
    });
}