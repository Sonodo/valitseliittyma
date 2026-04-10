import type { MetadataRoute } from 'next';
import { operators } from '@/data/operators';
import { blogPosts } from '@/data/blog-posts';
import { comparisonPairs } from '@/data/comparisons';
import { cities } from '@/data/cities';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '/',
    '/puhelinliittymat',
    '/laajakaista',
    '/operaattorit',
    '/vertaa',
    '/halvin-puhelinliittyma',
    '/paras-5g-liittyma',
    '/paras-laajakaista',
    '/opas/puhelinliittyman-vaihto',
    '/opas/numeron-siirto',
    '/opas/5g-opas',
    '/blogi',
    '/laskuri/liittymahinta',
    '/laskuri/datankulutus',
    '/tietoa',
    '/tietosuoja',
    '/kayttoehdot',
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : path === '/puhelinliittymat' ? 0.9 : 0.7,
  }));

  // Operator pages
  operators.forEach((op) => {
    entries.push({
      url: `${SITE_URL}/operaattorit/${op.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Blog posts
  blogPosts.forEach((post) => {
    entries.push({
      url: `${SITE_URL}/blogi/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Comparison pages
  comparisonPairs.forEach((pair) => {
    entries.push({
      url: `${SITE_URL}/liittymavertailu/${pair.slugPair}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // City pages
  cities.forEach((city) => {
    entries.push({
      url: `${SITE_URL}/kaupunki/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return entries;
}
