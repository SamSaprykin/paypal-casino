import type { Asset, Entry } from 'contentful';

// Base Contentful types
export interface ContentfulAsset extends Asset {
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: ContentfulAsset;
  email?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Blog Post content type
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Rich text content from Contentful
  featuredImage?: ContentfulAsset;
  author?: Author;
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
}

// Page content type
export interface Page {
  id: string;
  title: string;
  slug: string;
  content: any; // Rich text content from Contentful
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// SEO Meta data interface
export interface SEOMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

// Rich text node types (for rendering Contentful rich text)
export interface RichTextNode {
  nodeType: string;
  content?: RichTextNode[];
  data?: any;
  value?: string;
  marks?: Array<{
    type: string;
  }>;
}

// Navigation item interface
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

// Site configuration interface
export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  author: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  navigation: NavigationItem[];
}

