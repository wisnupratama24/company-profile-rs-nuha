const CONFIG = {
    ENV: process.env.NEXT_PUBLIC_ENV,
    // NOTE:
    // - Anything used in the browser must be prefixed with NEXT_PUBLIC_ in Next.js.
    // - We keep process.env.BE_ENV as a fallback for server-only code paths.
    BE_ENV: process.env.NEXT_PUBLIC_BE_ENV ?? process.env.BE_ENV,
    BASE_API_URL: process.env.NEXT_PUBLIC_NUHA_API_URL,
    BASE_TOKEN: process.env.NEXT_PUBLIC_NUHA_API_TOKEN,

    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    CLIENT_KEY: process.env.CLIENT_KEY,
}

export const c = {
    CONFIG: CONFIG,
}