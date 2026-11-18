'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductImageProps {
  product: Product;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function ProductImage({ product, className, priority = false, sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(product.image_path);
  const [hasError, setHasError] = useState(false);

  const fallbackPageSrc = `/images/pages/page-${String(product.pdf_page).padStart(2, '0')}.webp`;

  const handleError = () => {
    if (imgSrc === product.image_path && !hasError) {
      // Try page-level fallback
      setImgSrc(fallbackPageSrc);
    } else {
      // Show placeholder
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className={cn('relative bg-slate-100 flex flex-col items-center justify-center gap-2', className)}>
        <Package className="w-10 h-10 text-slate-300" />
        <span className="bg-slate-900/85 text-white font-mono text-xs px-2 py-0.5 rounded">
          {product.id}
        </span>
        <span className="text-[10px] text-slate-400 text-center px-2 line-clamp-2">
          {product.name}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('relative bg-slate-50', className)}>
      <Image
        src={imgSrc}
        alt={`${product.id} - ${product.name}`}
        fill
        className="object-contain"
        sizes={sizes}
        priority={priority}
        onError={handleError}
      />
      {/* Code badge */}
      <span className="absolute top-2 left-2 bg-slate-900/85 text-white font-mono text-xs px-2 py-0.5 rounded z-10">
        {product.id}
      </span>
      {product.customizable && (
        <span className="absolute top-2 right-2 bg-[var(--color-outdoor)] text-white text-[10px] px-1.5 py-0.5 rounded z-10">
          Bisa Custom
        </span>
      )}
    </div>
  );
}
