'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import productsData from '@/data/products.json';
import ProductImage from '@/components/catalog/ProductImage';
import { useRAB } from '@/context/RABContext';
import type { Product, ProductsData } from '@/types/product';

const data = productsData as unknown as ProductsData;
const featuredProducts = data.products.filter((p) => p.featured);

export default function FeaturedProducts() {
  const { addItem } = useRAB();

  return (
    <section className="py-10 md:py-14 bg-[var(--color-surface-muted)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">
              Produk Unggulan Pengadaan Sekolah
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Item terlaris untuk pengadaan Dana BOS & proyek sekolah
            </p>
          </div>
          <Link
            href="/katalog?sort=featured"
            className="text-sm text-[var(--color-accent)] font-medium hover:underline hidden sm:inline"
          >
            Lihat Semua →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredProducts.slice(0, 10).map((product: Product) => (
            <div key={product.id} className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full">
              <Link href={`/produk/${product.slug}`} className="block">
                <ProductImage
                  product={product}
                  className="aspect-[4/3] w-full"
                />
              </Link>
              <div className="p-3 flex flex-col flex-1">
                <Link href={`/produk/${product.slug}`}>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-1">{product.category}</p>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] line-clamp-2 leading-tight group-hover:text-[var(--color-accent)] transition-colors mb-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-auto">
                  <p className="text-sm font-bold text-[var(--color-primary)] tabular-nums">
                    {product.price_numeric > 0 ? product.price_display : (
                      <span className="text-[var(--color-outdoor)]">Hubungi WA</span>
                    )}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-secondary)]">/{product.unit}</p>
                  <button
                    onClick={() => addItem(product)}
                    className="mt-2 w-full flex items-center justify-center gap-1 py-2 px-3 text-xs font-medium bg-[var(--color-accent)] hover:bg-amber-600 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah ke RAB
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/katalog?sort=featured"
            className="text-sm text-[var(--color-accent)] font-medium hover:underline"
          >
            Lihat Semua Produk Unggulan →
          </Link>
        </div>
      </div>
    </section>
  );
}
