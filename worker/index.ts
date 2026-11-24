const COOKIE_NAME = "__Host-wedding_session";
const SESSION_DURATION = 60 * 60 * 24 * 7;
const encoder = new TextEncoder();

interface Env {
    ASSETS: {
        fetch(request: Request): Promise<Response>;
    };
    WEDDING_PASSWORD: string;
    SESSION_SECRET: string;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname === "/health") {
            return new Response("Worker is running", {
                headers: { "Cache-Control": "no-store" },
            });
        }

        if (url.pathname === "/api/login") {
            if (request.method !== "POST") {
                return renderLoginPage("/");
            }

            return handleLogin(request, env);
        }

        if (url.pathname === "/api/logout") {
            if (request.method !== "POST") {
                return new Response("Method not allowed", { status: 405 });
            }

            return new Response(null, {
                status: 303,
                headers: {
                    "Location": "/",
                    "Set-Cookie": `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
                    "Cache-Control": "no-store",
                },
            });
        }

        if (!env.WEDDING_PASSWORD || !env.SESSION_SECRET) {
            return new Response("Authentication is not configured.", {
                status: 500,
            });
        }

        const authenticated = await hasValidSession(request, env.SESSION_SECRET);

        if (!authenticated) {
            if (request.method === "GET" || request.method === "HEAD") {
                return renderLoginPage(
                    sanitizeNextPath(`${url.pathname}${url.search}`),
                );
            }

            return new Response("Authentication required.", {
                status: 401,
                headers: { "Cache-Control": "no-store" },
            });
        }

        if (url.pathname.startsWith("/api/")) {
            return Response.json({ error: "Not found" }, { status: 404 });
        }

        return env.ASSETS.fetch(request);
    },
};

async function handleLogin(request: Request, env: Env): Promise<Response> {
    if (!env.WEDDING_PASSWORD || !env.SESSION_SECRET) {
        return new Response("Authentication is not configured.", {
            status: 500,
        });
    }

    let formData: FormData;

    try {
        formData = await request.formData();
    } catch {
        return renderLoginPage("/", true);
    }

    const password = formData.get("password");

    if (
        typeof password !== "string" ||
        password.length > 512 ||
        !(await passwordsMatch(password, env.WEDDING_PASSWORD))
    ) {
        return renderLoginPage(sanitizeNextPath(formData.get("next")), true);
    }

    const session = await createSession(env.SESSION_SECRET);
    const next = sanitizeNextPath(formData.get("next"));

    return new Response(null, {
        status: 303,
        headers: {
            "Location": next,
            "Set-Cookie": `${COOKIE_NAME}=${session}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_DURATION}`,
            "Cache-Control": "no-store",
        },
    });
}

function renderLoginPage(next: string, invalid = false): Response {
    const safeNext = escapeHtml(sanitizeNextPath(next));

    const html = `
        <!DOCTYPE html>
        <html lang="nl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Welkom!</title>
            <meta name="robots" content="noindex,nofollow">

            <style>
                :root {
                    --color-lightblue: #C2DCFF;
                    --color-lightblue-hover: #B2D2FA;
                    --color-surface-hover: #FFF0F0;
                }

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: Arial, sans-serif;
                }

                .password-gate {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 24px;
                    width: 100%;
                }

                .password-gate__form {
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                }

                .password-gate__form input {
                    width: 100%;
                    padding: 12px;

                    border: 3px solid var(--color-lightblue);
                    border-radius: 12px;
                }

                .password-gate__form input:focus-visible {
                    outline: none;
                }

                .password-gate__form button {
                    width: 50%;
                    padding: 12px;
                    cursor: pointer;

                    background-color: var(--color-lightblue);
                    border: 3px solid var(--color-lightblue);
                    border-radius: 12px;

                    margin-top: 16px;
                }

                .password-gate__form button:hover {
                    background-color: var(--color-lightblue-hover);
                }

                .password-gate__error {
                    color: #c62828;

                    width: 70%;
                    margin: 0 auto 1rem;

                    background-color: var(--color-surface-hover);
                    border: 2px solid var(--color-lightblue);
                    border-radius: 12px;

                    padding: 1rem;
                }
            </style>
        </head>

        <body>
            <div class="password-gate">
                <form
                    class="password-gate__form"
                    method="POST"
                    action="/api/login"
                >
                    <h1>Welkom!</h1>
                    <p>Voer het wachtwoord in om onze website te bekijken</p>

                    <input
                        type="hidden"
                        name="next"
                        value="${safeNext}"
                    >

                    <input
                        type="password"
                        name="password"
                        placeholder="Wachtwoord"
                        autocomplete="current-password"
                        required
                        autofocus
                    >

                    ${invalid
        ? '<p class="password-gate__error">Het ingevoerde wachtwoord is onjuist</p>'
        : ""
    }
                    <button type="submit">
                        Bekijk website
                    </button>
                </form>
            </div>
        </body>
        </html>
    `;

    return new Response(html, {
        status: invalid ? 401 : 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff",
            "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
        },
    });
}

async function passwordsMatch(
    provided: string,
    expected: string,
): Promise<boolean> {
    const providedHash = new Uint8Array(
        await crypto.subtle.digest("SHA-256", encoder.encode(provided)),
    );

    const expectedHash = new Uint8Array(
        await crypto.subtle.digest("SHA-256", encoder.encode(expected)),
    );

    let difference = 0;

    for (let i = 0; i < providedHash.length; i++) {
        difference |= providedHash[i] ^ expectedHash[i];
    }

    return difference === 0;
}

async function createSession(secret: string): Promise<string> {
    const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;
    const key = await getSigningKey(secret);

    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(String(expiresAt)),
    );

    return `${expiresAt}.${toBase64Url(signature)}`;
}

async function hasValidSession(
    request: Request,
    secret: string,
): Promise<boolean> {
    const cookies = request.headers.get("Cookie") ?? "";

    const cookie = cookies
        .split(";")
        .map(value => value.trim())
        .find(value => value.startsWith(`${COOKIE_NAME}=`));

    if (!cookie) return false;

    const token = cookie.slice(COOKIE_NAME.length + 1);
    const parts = token.split(".");

    if (parts.length !== 2) return false;

    const [expiresAt, signature] = parts;
    const expiry = Number(expiresAt);

    if (!Number.isSafeInteger(expiry) || expiry <= Date.now() / 1000) {
        return false;
    }

    try {
        const key = await getSigningKey(secret);

        return await crypto.subtle.verify(
            "HMAC",
            key,
            fromBase64Url(signature),
            encoder.encode(expiresAt),
        );
    } catch {
        return false;
    }
}

async function getSigningKey(secret: string): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"],
    );
}

function toBase64Url(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";

    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
    const base64 = value
        .replace(/-/g, "+")
        .replace(/_/g, "/")
        .padEnd(Math.ceil(value.length / 4) * 4, "=");

    const binary = atob(base64);

    return Uint8Array.from(binary, char => char.charCodeAt(0));
}

function sanitizeNextPath(value: unknown): string {
    if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
        return "/";
    }

    try {
        const base = new URL("https://wedding.invalid");
        const target = new URL(value, base);

        if (target.origin !== base.origin) return "/";
        if (target.pathname.startsWith("/api/")) return "/";
        if (target.pathname === "/health") return "/";

        return `${target.pathname}${target.search}${target.hash}`;
    } catch {
        return "/";
    }
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[char]!);
}