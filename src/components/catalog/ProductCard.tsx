'use client';

import Link from 'next/link';
import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types/product';
import ProductImage from '@/components/catalog/ProductImage';
import { useRAB } from '@/context/RABContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useRAB();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div
      className={cn(
        'group bg-white rounded-xl border border-[var(--color-border)] hover:border-slate-300 hover:shadow-md transition-all flex flex-col h-full overflow-hidden',
        className
      )}
    >
      {/* Product Image */}
      <Link href={`/produk/${product.slug}`} className="block relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <ProductImage
          product={product}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-text-secondary)] mb-1">
          <span className="font-mono font-bold text-slate-500">{product.id}</span>
          <span className="truncate max-w-[140px]">{product.category}</span>
        </div>

        <Link href={`/produk/${product.slug}`} className="block mb-2 flex-1">
          <h3 className="font-heading font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Specs highlight */}
        {product.specs && (
          <p className="text-[11px] text-slate-500 line-clamp-1 mb-2.5">
            {product.specs}
          </p>
        )}

        {/* Price & Action */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="block font-bold text-sm text-[var(--color-primary)] tabular-nums">
              {product.price_numeric > 0 ? (
                product.price_display
              ) : (
                <span className="text-[var(--color-outdoor)] font-semibold text-xs">Hubungi WA</span>
              )}
            </span>
            <span className="text-[10px] text-slate-400">/{product.unit}</span>
          </div>

          <button
            onClick={handleAdd}
            className={cn(
              'flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-xs',
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[var(--color-accent)] hover:bg-amber-600 text-white'
            )}
            aria-label={`Tambah ${product.name} ke RAB`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>+ RAB</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
