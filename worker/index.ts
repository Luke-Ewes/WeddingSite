interface Env {
    ASSETS: Fetcher;
    SITE_USERNAME: string;
    SITE_PASSWORD: string;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const authorization = request.headers.get("Authorization");

        if (!authorization?.startsWith("Basic ")) {
            return unauthorized();
        }

        try {
            const decoded = atob(authorization.substring(6));
            const separator = decoded.indexOf(":");

            if (separator === -1) {
                return unauthorized();
            }

            const username = decoded.substring(0, separator);
            const password = decoded.substring(separator + 1);

            if (
                username !== env.SITE_USERNAME ||
                password !== env.SITE_PASSWORD
            ) {
                return unauthorized();
            }

            return env.ASSETS.fetch(request);
        } catch {
            return unauthorized();
        }
    }
} satisfies ExportedHandler<Env>;

function unauthorized(): Response {
    return new Response("Authentication required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Wedding Website"'
        }
    });
}