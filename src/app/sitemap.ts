import type { MetadataRoute } from 'next';
import productsData from '@/data/products.json';
import type { Product, ProductsData } from '@/types/product';

export const dynamic = 'force-static';

const data = productsData as unknown as ProductsData;
const allProducts: Product[] = data.products;

const BASE_URL = 'https://mahalaleel-school-supplies.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date('2026-11-19T00:00:00Z');

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/katalog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/rab`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/portofolio`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tentang-kami`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic product routes for all 137 items
  const productRoutes: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${BASE_URL}/produk/${product.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
