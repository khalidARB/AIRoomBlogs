import { MetadataRoute } from 'next';
import { getAllPosts, getCategories, slugify } from '@/lib/wordpress';

export const revalidate = 60; // ISR revalidation every 60 seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-room-blogs.vercel.app';

  // Fetch all posts and categories
  const posts = await getAllPosts();
  const categories = await getCategories();

  // Extract unique author slugs
  const authorSlugs = Array.from(new Set(posts.map((p) => slugify(p.author.name))));

  // Static entries
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Article entries
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Category archive entries
  const categoryRoutes: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug !== 'all')
    .map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  // Author profile entries
  const authorRoutes: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
    url: `${baseUrl}/author/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...authorRoutes];
}
