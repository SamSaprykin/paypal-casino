/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SANITY_PROJECT_ID?: string;
  readonly SANITY_DATASET?: string;
  readonly SANITY_API_TOKEN?: string;
  /** GraphQL deployment tag (`sanity graphql deploy`). Defaults to `default`. */
  readonly SANITY_GRAPHQL_TAG?: string;
  /** When not `"false"`, uses Sanity API CDN for GraphQL (recommended for builds). */
  readonly SANITY_GRAPHQL_USE_CDN?: string;

  /**
   * Active website market for `intl*` fields (`slug`, SEO, blocks).
   * Must match Sanity `localeConfig` keys.
   */
  readonly PUBLIC_WEBSITE_LOCALE?:
    | "denmark"
    | "finland"
    | "germany"
    | "ireland"
    | "norway"
    | "sweden";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
