/**
 * Thin Sanity Content Lake GraphQL client (HTTP).
 * Deploy schema from Studio with `sanity graphql deploy`.
 * @see https://www.sanity.io/docs/content-lake/graphql
 */

/** Path segment of the deployed GraphQL endpoint. Keep in sync with `codegen.ts`. */
export const SANITY_GRAPHQL_API_VERSION = "v2025-02-19" as const;

export type SanityGraphqlResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export function sanityGraphqlEndpoint(opts: {
  projectId: string;
  dataset: string;
  /** Tag from `sanity graphql deploy` (Sanity defaults to `default`). */
  tag?: string;
  /** Use CDN for cached reads — recommended for static builds. */
  useCdn?: boolean;
}): string {
  const { projectId, dataset, tag = "default", useCdn = true } = opts;
  const host = useCdn ? `${projectId}.apicdn.sanity.io` : `${projectId}.api.sanity.io`;
  return `https://${host}/${SANITY_GRAPHQL_API_VERSION}/graphql/${dataset}/${tag}`;
}

export async function sanityGraphqlFetch<TResult>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TResult> {
  const projectId = import.meta.env.SANITY_PROJECT_ID;
  const dataset = import.meta.env.SANITY_DATASET;
  const token = import.meta.env.SANITY_API_TOKEN;
  const tag = import.meta.env.SANITY_GRAPHQL_TAG ?? "default";
  const useCdn = import.meta.env.SANITY_GRAPHQL_USE_CDN !== "false";

  if (!projectId || !dataset) {
    throw new Error(
      "Sanity: missing SANITY_PROJECT_ID or SANITY_DATASET (see .env.example).",
    );
  }

  const endpoint = sanityGraphqlEndpoint({ projectId, dataset, tag, useCdn });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Sanity GraphQL HTTP ${res.status}: ${await res.text()}`);
  }

  const body = (await res.json()) as SanityGraphqlResponse<TResult>;

  // GraphQL allows `data` alongside field-level errors (e.g. a malformed
  // `DateTime` value coerced to null). Warn but keep going if data is present;
  // only treat the response as fatal when there's no data to use.
  if (body.errors?.length) {
    if (!body.data) {
      throw new Error(
        `Sanity GraphQL: ${body.errors.map((e) => e.message).join("; ")}`,
      );
    }
    console.warn(
      `Sanity GraphQL returned ${body.errors.length} field error(s):\n  - ${body.errors
        .map((e) => e.message)
        .join("\n  - ")}`,
    );
  }

  if (!body.data) {
    throw new Error("Sanity GraphQL returned empty data.");
  }
  return body.data;
}
