import Link from 'next/link';
import {
  Landmark, ClipboardList, Armchair, Tent, Archive,
  Presentation, Flag, Trash2, Zap
} from 'lucide-react';
import productsData from '@/data/products.json';
import type { ProductsData } from '@/types/product';

const data = productsData as unknown as ProductsData;

const iconMap: Record<string, React.ElementType> = {
  'Landmark': Landmark,
  'ClipboardList': ClipboardList,
  'Armchair': Armchair,
  'Tent': Tent,
  'Archive': Archive,
  'Presentation': Presentation,
  'Flag': Flag,
  'Trash2': Trash2,
  'Zap': Zap,
};

export default function CategoryStrip() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-lg md:text-xl font-bold text-[var(--color-text-primary)]">
            Kategori Produk
          </h2>
          <Link
            href="/katalog"
            className="text-sm text-[var(--color-accent)] font-medium hover:underline"
          >
            Lihat Semua →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {data.categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const count = data.products.filter(p => p.category === cat.name).length;
            return (
              <Link
                key={cat.slug}
                href={`/katalog?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-md transition-all group bg-white"
              >
                {Icon && (
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-muted)] group-hover:bg-[var(--color-accent)]/10 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-[var(--color-outdoor)] group-hover:text-[var(--color-accent)] transition-colors" />
                  </div>
                )}
                <span className="text-xs font-medium text-center text-[var(--color-text-primary)] line-clamp-2 leading-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] text-[var(--color-text-secondary)]">
                  {count} produk
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
