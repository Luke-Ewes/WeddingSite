interface Env {
    SITE_USERNAME: string;
    SITE_PASSWORD: string;
}

const unauthorizedResponse = () =>
    new Response("Authentication required", {
        status: 401,
        headers: {
            "WWW.Authenticate": `Basic realm="Wedding Website", charset="utf-8"`,
            "Content-Type": "text/plain",
        }
    });

export const onRequest: PagesFunction<Env> = async ({request, env, next}) =>{
    const authorization = request.headers.get("Authorization");

    if(!authorization?.startsWith("Basic ")) {
        return unauthorizedResponse();
    }

    try {
        const credentials = atob(authorization.slice(6));
        const seperatorIndex = credentials.indexOf(":");

        if(seperatorIndex === -1) {
            return unauthorizedResponse();
        }

        const username = credentials.slice(0, seperatorIndex);
        const password = credentials.slice(seperatorIndex+1);

        if( username !== env.SITE_USERNAME  ||
            password !== env.SITE_PASSWORD ) {
            return unauthorizedResponse();
        }

        return next();
    }catch {
        return unauthorizedResponse();
    }
}

