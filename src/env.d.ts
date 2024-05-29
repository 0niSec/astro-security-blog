/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly RESEND_API_KEY: string;
    readonly ADMIN_EMAIL: string;
    readonly DESTINATION_EMAIL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
