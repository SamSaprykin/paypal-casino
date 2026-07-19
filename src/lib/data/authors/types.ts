import type { WebsiteLocaleKey } from "../../cms/locales";

export interface AuthorProfile {
  role: string;
  bio: string;
  expertise?: string[];
  about?: string[];
}

export interface AuthorSocialLinks {
  linkedin?: string;
  x?: string;
  facebook?: string;
  instagram?: string;
}

export interface AuthorExternalProfile {
  label: string;
  url: string;
}

export interface AuthorRecord {
  id: string;
  name: string;
  image: string;
  email?: string;
  socialLinks?: AuthorSocialLinks;
  externalProfiles?: AuthorExternalProfile[];
  profiles: Partial<Record<WebsiteLocaleKey, AuthorProfile>>;
}

export interface PageAuthorsMeta {
  addedBy?: string;
  reviewedBy?: string;
}

export interface PageAuthorRef {
  id: string;
  name: string;
  image: string;
  role: string;
  bio?: string;
  email?: string;
  socialLinks?: AuthorSocialLinks;
  externalProfiles?: AuthorExternalProfile[];
}
