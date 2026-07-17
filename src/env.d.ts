/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * Active website market for localized content paths.
   * Must match locale keys in `src/lib/cms/locales.ts`.
   */
  readonly PUBLIC_WEBSITE_LOCALE?:
    "denmark" | "finland" | "germany" | "ireland" | "norway" | "sweden";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
