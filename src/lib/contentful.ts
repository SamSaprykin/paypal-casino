import { createClient } from "contentful";
import type { Entry } from 'contentful';
import type { BlogPost, Author, Page, ContentfulAsset } from '../types/contentful';

const CONTENTFUL_SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_DELIVERY_TOKEN = import.meta.env.CONTENTFUL_DELIVERY_TOKEN;

const client = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_DELIVERY_TOKEN,
  host: "cdn.contentful.com",
});

/**
 * Fetch all blog posts from Contentful
 */
export async function getBlogPosts(limit: number = 10): Promise<BlogPost[]> {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      limit,
      order: ['-sys.createdAt'],
      include: 2,
    });

    return response.items.map((item: Entry<any>) => ({
      id: item.sys.id,
      title: item.fields.title as string,
      slug: item.fields.slug as string,
      excerpt: item.fields.excerpt as string,
      content: item.fields.content,
      featuredImage: item.fields.featuredImage as ContentfulAsset,
      author: item.fields.author as unknown as Author,
      publishedDate: item.fields.publishedDate as string,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });

    if (response.items.length === 0) {
      return null;
    }

    const item = response.items[0];
    return {
      id: item.sys.id,
      title: item.fields.title as string,
      slug: item.fields.slug as string,
      excerpt: item.fields.excerpt as string,
      content: item.fields.content,
      featuredImage: item.fields.featuredImage as ContentfulAsset,
      author: item.fields.author as unknown as Author,
      publishedDate: item.fields.publishedDate as string,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Fetch all pages from Contentful
 */
export async function getPages(): Promise<Page[]> {
  try {
    const response = await client.getEntries({
      content_type: 'page',
      order: ['fields.title'],
      include: 2,
    });

    return response.items.map((item: Entry<any>) => ({
      id: item.sys.id,
      title: item.fields.title as string,
      slug: item.fields.slug as string,
      content: item.fields.content,
      seoTitle: item.fields.seoTitle as string,
      seoDescription: item.fields.seoDescription as string,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const response = await client.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    });

    if (response.items.length === 0) {
      return null;
    }

    const item = response.items[0];
    return {
      id: item.sys.id,
      title: item.fields.title as string,
      slug: item.fields.slug as string,
      content: item.fields.content,
      seoTitle: item.fields.seoTitle as string,
      seoDescription: item.fields.seoDescription as string,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export { client };
