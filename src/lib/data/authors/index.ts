import type { WebsiteLocaleKey } from "../../cms/locales";
import { ROOT_WEBSITE_LOCALE } from "../../cms/routing";
import { seamusOConnor } from "./seamus-oconnor";
import { stoyanMakoski } from "./stoyan-makoski";
import type { AuthorRecord, PageAuthorRef, PageAuthorsMeta } from "./types";

export const AUTHORS_BY_ID: Record<string, AuthorRecord> = {
  [seamusOConnor.id]: seamusOConnor,
  [stoyanMakoski.id]: stoyanMakoski,
};

export const DEFAULT_PAGE_AUTHORS: Required<PageAuthorsMeta> = {
  addedBy: seamusOConnor.id,
  reviewedBy: stoyanMakoski.id,
};

export function getAuthorById(
  id: string | undefined | null,
): AuthorRecord | null {
  if (!id) return null;
  return AUTHORS_BY_ID[id] ?? null;
}

export function resolveAuthorProfile(
  author: AuthorRecord,
  locale: WebsiteLocaleKey,
) {
  return (
    author.profiles[locale] ??
    author.profiles[ROOT_WEBSITE_LOCALE] ??
    Object.values(author.profiles)[0]
  );
}

export function toPageAuthorRef(
  authorId: string | undefined,
  locale: WebsiteLocaleKey,
): PageAuthorRef | undefined {
  const author = getAuthorById(authorId);
  if (!author) return undefined;
  const profile = resolveAuthorProfile(author, locale);
  return {
    id: author.id,
    name: author.name,
    image: author.image,
    role: profile?.role ?? "",
    bio: profile?.bio,
    email: author.email,
    socialLinks: author.socialLinks,
    externalProfiles: author.externalProfiles,
  };
}

export function resolvePageAuthors(
  meta: PageAuthorsMeta | undefined,
  locale: WebsiteLocaleKey,
): { addedBy?: PageAuthorRef; reviewedBy?: PageAuthorRef } {
  const addedById = meta?.addedBy ?? DEFAULT_PAGE_AUTHORS.addedBy;
  const reviewedById = meta?.reviewedBy ?? DEFAULT_PAGE_AUTHORS.reviewedBy;
  return {
    addedBy: toPageAuthorRef(addedById, locale),
    reviewedBy: toPageAuthorRef(reviewedById, locale),
  };
}

export { seamusOConnor, stoyanMakoski };
export type {
  AuthorRecord,
  AuthorProfile,
  PageAuthorsMeta,
  PageAuthorRef,
} from "./types";
