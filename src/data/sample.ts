import type { BlogPost, Author } from '../types/contentful';

// Sample author data for development
export const sampleAuthor: Author = {
  id: 'sample-author',
  name: 'John Doe',
  bio: 'Full-stack developer passionate about modern web technologies',
  email: 'john@example.com',
  website: 'https://johndoe.dev',
  social: {
    twitter: 'johndoe',
    github: 'johndoe',
    linkedin: 'johndoe',
  },
};

// Sample blog posts for development (when Contentful is not configured)
export const sampleBlogPosts: BlogPost[] = [
  {
    id: 'sample-post-1',
    title: 'Getting Started with Astro, Contentful, and Tailwind CSS',
    slug: 'getting-started-astro-contentful-tailwind',
    excerpt: 'Learn how to build modern, fast websites using this powerful combination of technologies. This comprehensive guide will walk you through setting up your development environment and creating your first project.',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Welcome to the world of modern web development! In this article, we\'ll explore how to combine three powerful technologies to create fast, scalable, and maintainable websites.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'Why This Stack?',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Astro provides excellent performance with its island architecture, Contentful offers a flexible headless CMS, and Tailwind CSS enables rapid UI development.',
            },
          ],
        },
      ],
    },
    author: sampleAuthor,
    publishedDate: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'sample-post-2',
    title: 'Building Performant Websites with Static Site Generation',
    slug: 'building-performant-websites-ssg',
    excerpt: 'Discover the benefits of static site generation and how it can dramatically improve your website\'s performance, SEO, and user experience.',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Static Site Generation (SSG) has become increasingly popular for building fast, secure, and scalable websites. Let\'s explore why.',
            },
          ],
        },
      ],
    },
    author: sampleAuthor,
    publishedDate: '2024-01-10T14:30:00Z',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: 'sample-post-3',
    title: 'Headless CMS: The Future of Content Management',
    slug: 'headless-cms-future-content-management',
    excerpt: 'Explore the advantages of headless CMS architecture and how it enables developers to build more flexible and scalable content-driven applications.',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Traditional CMS platforms are being challenged by a new approach: headless content management systems. Here\'s what you need to know.',
            },
          ],
        },
      ],
    },
    author: sampleAuthor,
    publishedDate: '2024-01-05T09:15:00Z',
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
  },
];

// Sample navigation items
export const sampleNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Sample site configuration
export const sampleSiteConfig = {
  title: 'Astro Contentful Starter',
  description: 'A modern starter template built with Astro, Contentful CMS, and Tailwind CSS',
  url: 'https://your-site.com',
  author: 'Your Name',
  social: {
    twitter: 'yourhandle',
    github: 'yourusername',
    linkedin: 'yourprofile',
  },
  navigation: sampleNavigation,
};

