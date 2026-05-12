/**
 * Pull your deployed Sanity GraphQL schema (introspection) and emit:
 * - `src/lib/sanity/generated/schema.graphql` — search types (e.g. `IntlMarkdown`, `HeroDefaultWithCasinoCardsIntl`) to shape queries.
 * - `src/lib/sanity/generated/graphql-types.ts` — TypeScript mirrors of the schema.
 *
 * Requires env vars (see `.env.example`). Run: `pnpm sanity:graphql:codegen`
 */
import type { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";

import { SANITY_GRAPHQL_API_VERSION } from "./src/lib/sanity/client";

function sanityGraphQlSchemaEndpoint(): NonNullable<CodegenConfig["schema"]> {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET ?? "production";
  const tag = process.env.SANITY_GRAPHQL_TAG ?? "default";
  const token = process.env.SANITY_API_TOKEN;
  const useCdn = process.env.SANITY_GRAPHQL_USE_CDN !== "false";

  if (!projectId) {
    throw new Error(
      "SANITY_PROJECT_ID is missing. Add it to `.env` (see `.env.example`), then run `pnpm sanity:graphql:codegen`.",
    );
  }

  const host = useCdn ? `${projectId}.apicdn.sanity.io` : `${projectId}.api.sanity.io`;
  const url = `https://${host}/${SANITY_GRAPHQL_API_VERSION}/graphql/${dataset}/${tag}`;

  return [
    {
      [url]: {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    },
  ];
}

const config: CodegenConfig = {
  overwrite: true,
  schema: sanityGraphQlSchemaEndpoint(),
  generates: {
    "src/lib/sanity/generated/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
    "src/lib/sanity/generated/graphql-types.ts": {
      plugins: ["typescript"],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
