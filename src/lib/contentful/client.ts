const CONTENTFUL_SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_DELIVERY_TOKEN = import.meta.env.CONTENTFUL_DELIVERY_TOKEN;


if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_DELIVERY_TOKEN) {
  throw new Error(
    "Missing required Contentful environment variables: CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_  TOKEN",
  );
}

const CONTENTFUL_REST_ENDPOINT = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}`;

export interface ContentfulResponse<T = any> {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: T[];
  includes?: {
    Asset?: any[];
    Entry?: any[];
  };
}

export interface ContentfulEntry {
  sys: {
    id: string;
    type: string;
    contentType: {
      sys: {
        id: string;
      };
    };
    createdAt: string;
    updatedAt: string;
  };
  fields: Record<string, any>;
}

export async function fetchContentfulEntries<T = ContentfulEntry>(
  contentType: string,
  query: Record<string, any> = {},
): Promise<ContentfulResponse<T>> {
  try {
    const searchParams = new URLSearchParams({
      content_type: contentType,
      include: "10", // Include linked entries and assets
      ...query,
    });

    const response = await fetch(
      `${CONTENTFUL_REST_ENDPOINT}/entries?${searchParams}`,
      {
        headers: {
          Authorization: `Bearer ${CONTENTFUL_DELIVERY_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Contentful API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Contentful REST API Error:", error);
    throw error;
  }
}

export async function fetchContentfulEntry<T = ContentfulEntry>(
  entryId: string,
  include: number = 10,
): Promise<T> {
  try {
    const response = await fetch(
      `${CONTENTFUL_REST_ENDPOINT}/entries/${entryId}?include=${include}`,
      {
        headers: {
          Authorization: `Bearer ${CONTENTFUL_DELIVERY_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Contentful API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Contentful REST API Error:", error);
    throw error;
  }
}

// Helper function to resolve linked entries and assets
export function resolveLinks<T = any>(
  entry: ContentfulEntry,
  includes?: { Asset?: any[]; Entry?: any[] },
): T {
  if (!includes) return entry as T;

  const resolveField = (field: any): any => {
    if (Array.isArray(field)) {
      return field.map(resolveField);
    }

    if (field && typeof field === "object" && field.sys) {
      if (field.sys.type === "Link") {
        if (field.sys.linkType === "Asset" && includes.Asset) {
          const asset = includes.Asset.find((a) => a.sys.id === field.sys.id);
          return asset || field;
        }
        if (field.sys.linkType === "Entry" && includes.Entry) {
          const linkedEntry = includes.Entry.find(
            (e) => e.sys.id === field.sys.id,
          );
          return linkedEntry ? resolveLinks(linkedEntry, includes) : field;
        }
      }
      return field;
    }

    if (field && typeof field === "object") {
      const resolved: any = {};
      for (const [key, value] of Object.entries(field)) {
        resolved[key] = resolveField(value);
      }
      return resolved;
    }

    return field;
  };

  const resolvedEntry = { ...entry };
  if (resolvedEntry.fields) {
    const resolvedFields: any = {};
    for (const [key, value] of Object.entries(resolvedEntry.fields)) {
      resolvedFields[key] = resolveField(value);
    }
    resolvedEntry.fields = resolvedFields;
  }

  return resolvedEntry as T;
}
