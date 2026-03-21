import { MetadataRoute } from 'next';
import { getAllArticles, CATEGORIES } from '@/lib/articles';

const BASE_URL = 'https://scrollcorner.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const articleUrls: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE_URL}/${a.category.toLowerCase()}/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'never',
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map(cat => ({
    url: `${BASE_URL}/${cat.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    ...categoryUrls,
    ...articleUrls,
  ];
}
