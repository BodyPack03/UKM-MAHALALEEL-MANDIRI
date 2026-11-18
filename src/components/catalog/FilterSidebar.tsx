'use client';

import { X, RotateCcw, Filter, Check } from 'lucide-react';
import productsData from '@/data/products.json';
import type { ProductsData } from '@/types/product';
import { cn } from '@/lib/utils';

const data = productsData as unknown as ProductsData;

export interface FilterState {
  category: string;
  area: string;
  priceRange: string;
  customOnly: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalFilteredCount: number;
}

const priceRanges = [
  { id: 'all', label: 'Semua Harga' },
  { id: 'under-1m', label: '< Rp 1 Juta' },
  { id: '1m-3m', label: 'Rp 1 Juta – Rp 3 Juta' },
  { id: '3m-7m', label: 'Rp 3 Juta – Rp 7 Juta' },
  { id: 'above-7m', label: '> Rp 7 Juta' },
  { id: 'contact-wa', label: 'Hubungi WA (Konfirmasi)' },
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onReset,
  isOpenMobile,
  onCloseMobile,
  totalFilteredCount,
}: FilterSidebarProps) {
  const hasActiveFilters =
    Boolean(filters.category) ||
    Boolean(filters.area) ||
    (filters.priceRange !== 'all' && Boolean(filters.priceRange)) ||
    filters.customOnly;

  const filterContent = (
    <div className="space-y-6">
      {/* Header filter & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--color-primary)]" />
          <h3 className="font-heading font-bold text-sm text-[var(--color-text-primary)]">
            Filter Katalog
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-[var(--color-accent)] hover:underline font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Kategori */}
      <div>
        <h4 className="font-heading font-semibold text-xs text-slate-900 uppercase tracking-wider mb-2.5">
          Kategori Produk
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ category: '' })}
            className={cn(
              'w-full text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors',
              !filters.category
                ? 'bg-[var(--color-primary)] text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            )}
          >
            <span>Semua Kategori</span>
            <span className={cn('text-[10px]', !filters.category ? 'text-white/80' : 'text-slate-400')}>
              {data.products.length}
            </span>
          </button>
          {data.categories.map((cat) => {
            const count = data.products.filter((p) => p.category === cat.name).length;
            const isSelected = filters.category === cat.slug || filters.category === cat.name;
            return (
              <button
                key={cat.slug}
                onClick={() => onFilterChange({ category: isSelected ? '' : cat.slug })}
                className={cn(
                  'w-full text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors',
                  isSelected
                    ? 'bg-[var(--color-primary)] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <span className="truncate pr-2">{cat.name}</span>
                <span className={cn('text-[10px] flex-shrink-0', isSelected ? 'text-white/80' : 'text-slate-400')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Area Sekolah */}
      <div>
        <h4 className="font-heading font-semibold text-xs text-slate-900 uppercase tracking-wider mb-2.5">
          Area Sekolah
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ area: '' })}
            className={cn(
              'w-full text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors',
              !filters.area
                ? 'bg-[var(--color-primary)] text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            )}
          >
            <span>Semua Area</span>
            <span className={cn('text-[10px]', !filters.area ? 'text-white/80' : 'text-slate-400')}>
              {data.products.length}
            </span>
          </button>
          {data.school_areas.map((area) => {
            const count = data.products.filter((p) => p.school_area === area.name).length;
            const isSelected = filters.area === area.slug || filters.area === area.name;
            return (
              <button
                key={area.slug}
                onClick={() => onFilterChange({ area: isSelected ? '' : area.slug })}
                className={cn(
                  'w-full text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors',
                  isSelected
                    ? 'bg-[var(--color-primary)] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <span className="truncate pr-2">{area.name}</span>
                <span className={cn('text-[10px] flex-shrink-0', isSelected ? 'text-white/80' : 'text-slate-400')}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rentang Harga */}
      <div>
        <h4 className="font-heading font-semibold text-xs text-slate-900 uppercase tracking-wider mb-2.5">
          Rentang Harga
        </h4>
        <div className="space-y-1">
          {priceRanges.map((pr) => {
            const isSelected = (filters.priceRange || 'all') === pr.id;
            return (
              <button
                key={pr.id}
                onClick={() => onFilterChange({ priceRange: pr.id })}
                className={cn(
                  'w-full text-left text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors',
                  isSelected
                    ? 'bg-[var(--color-primary)] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
              >
                <span>{pr.label}</span>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bisa Custom Toggle */}
      <div className="pt-2 border-t border-slate-200">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-800">
          <input
            type="checkbox"
            checked={filters.customOnly}
            onChange={(e) => onFilterChange({ customOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[var(--color-accent)] focus:ring-[var(--color-accent)] border-slate-300"
          />
          <span>Hanya Produk Bisa Custom</span>
        </label>
        <p className="text-[10px] text-slate-400 mt-1 pl-6">
          Gapura, huruf timbul, papan nama &amp; tenda bersablon
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-20 bg-white p-5 rounded-xl border border-[var(--color-border)] shadow-xs">
          {filterContent}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10">
            <div className="p-4 bg-[var(--color-primary)] text-white flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-sm">Filter Produk</h3>
                <p className="text-[11px] text-slate-300">
                  {totalFilteredCount} produk cocok
                </p>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-slate-300 hover:text-white"
                aria-label="Tutup Filter"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{filterContent}</div>
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={onCloseMobile}
                className="w-full py-2.5 px-4 bg-[var(--color-accent)] hover:bg-amber-600 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Terapkan Filter ({totalFilteredCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
