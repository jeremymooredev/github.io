/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_KIT_FORM_UID: string;
  readonly PUBLIC_KIT_EMBED_HOST: string;
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
