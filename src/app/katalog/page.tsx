'use client';

import { Suspense, useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { Search, SlidersHorizontal, ArrowUpDown, PackageOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import productsData from '@/data/products.json';
import type { Product, ProductsData } from '@/types/product';
import ProductCard from '@/components/catalog/ProductCard';
import FilterSidebar, { type FilterState } from '@/components/catalog/FilterSidebar';

const data = productsData as unknown as ProductsData;
const allProducts: Product[] = data.products;

const ITEMS_PER_PAGE = 24;

const fuse = new Fuse(allProducts, {
  keys: [
    { name: 'id', weight: 0.4 },
    { name: 'name', weight: 0.35 },
    { name: 'specs', weight: 0.15 },
    { name: 'category', weight: 0.05 },
    { name: 'school_area', weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
});

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL query params
  const initialQ = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialArea = searchParams.get('area') || '';
  const initialPrice = searchParams.get('price') || 'all';
  const initialCustom = searchParams.get('custom') === 'true';
  const initialSort = searchParams.get('sort') || 'featured';
  const initialPage = Number(searchParams.get('page') || '1');

  const [query, setQuery] = useState(initialQ);
  const [sort, setSort] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    area: initialArea,
    priceRange: initialPrice,
    customOnly: initialCustom,
  });

  // Sync state when URL params change
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setFilters({
      category: searchParams.get('category') || '',
      area: searchParams.get('area') || '',
      priceRange: searchParams.get('price') || 'all',
      customOnly: searchParams.get('custom') === 'true',
    });
    setSort(searchParams.get('sort') || 'featured');
    setCurrentPage(Number(searchParams.get('page') || '1'));
  }, [searchParams]);

  // Update URL helper
  const updateUrl = useCallback(
    (newQ: string, newFilters: FilterState, newSort: string, newPage: number) => {
      const params = new URLSearchParams();
      if (newQ.trim()) params.set('q', newQ.trim());
      if (newFilters.category) params.set('category', newFilters.category);
      if (newFilters.area) params.set('area', newFilters.area);
      if (newFilters.priceRange && newFilters.priceRange !== 'all') {
        params.set('price', newFilters.priceRange);
      }
      if (newFilters.customOnly) params.set('custom', 'true');
      if (newSort && newSort !== 'featured') params.set('sort', newSort);
      if (newPage > 1) params.set('page', String(newPage));

      const queryString = params.toString();
      router.replace(queryString ? `/katalog?${queryString}` : '/katalog', { scroll: false });
    },
    [router]
  );

  const handleFilterChange = (partial: Partial<FilterState>) => {
    const updated = { ...filters, ...partial };
    setFilters(updated);
    setCurrentPage(1);
    updateUrl(query, updated, sort, 1);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      category: '',
      area: '',
      priceRange: 'all',
      customOnly: false,
    };
    setQuery('');
    setFilters(resetFilters);
    setSort('featured');
    setCurrentPage(1);
    updateUrl('', resetFilters, 'featured', 1);
  };

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
    updateUrl(value, filters, sort, 1);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setCurrentPage(1);
    updateUrl(query, filters, newSort, 1);
  };

  // Filter & Search pipeline
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // 1. Text Search (Fuse.js)
    if (query.trim()) {
      const fuseResults = fuse.search(query.trim());
      result = fuseResults.map((r) => r.item);
    }

    // 2. Category Filter
    if (filters.category) {
      result = result.filter(
        (p) =>
          p.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === filters.category.toLowerCase() ||
          p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // 3. School Area Filter
    if (filters.area) {
      result = result.filter(
        (p) =>
          p.school_area.toLowerCase().replace(/[^a-z0-9]/g, '-') === filters.area.toLowerCase() ||
          p.school_area.toLowerCase() === filters.area.toLowerCase()
      );
    }

    // 4. Price Range Filter
    if (filters.priceRange && filters.priceRange !== 'all') {
      result = result.filter((p) => {
        const price = p.price_numeric;
        switch (filters.priceRange) {
          case 'under-1m':
            return price > 0 && price < 1000000;
          case '1m-3m':
            return price >= 1000000 && price <= 3000000;
          case '3m-7m':
            return price > 3000000 && price <= 7000000;
          case 'above-7m':
            return price > 7000000;
          case 'contact-wa':
            return price === 0;
          default:
            return true;
        }
      });
    }

    // 5. Custom Only Filter
    if (filters.customOnly) {
      result = result.filter((p) => p.customizable);
    }

    // 6. Sorting
    const sorted = [...result];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => {
          if (a.price_numeric === 0) return 1;
          if (b.price_numeric === 0) return -1;
          return a.price_numeric - b.price_numeric;
        });
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price_numeric - a.price_numeric);
        break;
      case 'code-asc':
        sorted.sort((a, b) => {
          const numA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
          const numB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
          return numA - numB;
        });
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => {
          if (a.featured === b.featured) {
            const numA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
            const numB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
            return numA - numB;
          }
          return a.featured ? -1 : 1;
        });
        break;
    }

    return sorted;
  }, [query, filters, sort]);

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    updateUrl(query, filters, sort, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[var(--color-surface-muted)] min-h-screen py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <nav className="text-xs text-slate-500 mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[var(--color-primary)]">Beranda</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Katalog Produk</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                Katalog Fasilitas Sekolah
              </h1>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                Menampilkan {filteredProducts.length} dari {allProducts.length} produk pengadaan resmi
              </p>
            </div>

            {/* Quick stats / trust badge */}
            <div className="hidden md:flex items-center gap-3 text-xs bg-white py-2 px-3.5 rounded-lg border border-slate-200">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-700">137 Item Sesuai Spesifikasi Pengadaan Sekolah</span>
            </div>
          </div>
        </div>

        {/* Controls Bar: Search, Mobile Filter Button, Sort */}
        <div className="bg-white p-3 md:p-4 rounded-xl border border-[var(--color-border)] shadow-xs mb-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kode (mis. G136), nama produk, tenda, meja..."
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-slate-50"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors border border-slate-200"
            >
              <SlidersHorizontal className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Filter ({filteredProducts.length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 flex-1 sm:flex-none">
              <div className="relative w-full">
                <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <select
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 text-xs font-medium border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] appearance-none cursor-pointer"
                >
                  <option value="featured">Urutkan: Produk Unggulan</option>
                  <option value="code-asc">Kode Produk (G1 – G137)</option>
                  <option value="price-asc">Harga: Termurah ke Termahal</option>
                  <option value="price-desc">Harga: Termahal ke Termurah</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Body: Sidebar + Grid */}
        <div className="flex gap-6 items-start">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setMobileFilterOpen(false)}
            totalFilteredCount={filteredProducts.length}
          />

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <PackageOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-heading font-bold text-base text-slate-800 mb-1">
                  Tidak Ada Produk yang Cocok
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  Coba ubah kata kunci pencarian atau reset filter untuk melihat 137 produk lainnya.
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-[var(--color-accent)] hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Reset Semua Filter
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <button
                      onClick={() => goToPage(validPage - 1)}
                      disabled={validPage <= 1}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Sebelumnya</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${
                            page === validPage
                              ? 'bg-[var(--color-primary)] text-white'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => goToPage(validPage + 1)}
                      disabled={validPage >= totalPages}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      <span className="hidden sm:inline">Selanjutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-muted)]">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Memuat Katalog 137 Produk...</p>
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
