'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, ShoppingCart, MessageCircle, Menu, X, ChevronDown,
  Landmark, ClipboardList, Armchair, Tent, Archive,
  Presentation, Flag, Trash2, Zap
} from 'lucide-react';
import { useRAB } from '@/context/RABContext';
import { CONTACTS, BRAND } from '@/config/contacts';

const categoryIcons: Record<string, React.ElementType> = {
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

const categories = [
  { slug: 'gapura-signage', name: 'Gapura & Signage', icon: 'Landmark' },
  { slug: 'papan-informasi-struktur', name: 'Papan Informasi & Struktur', icon: 'ClipboardList' },
  { slug: 'meja-kursi', name: 'Meja & Kursi', icon: 'Armchair' },
  { slug: 'tenda-olahraga-outdoor', name: 'Tenda, Olahraga & Outdoor', icon: 'Tent' },
  { slug: 'lemari-rak', name: 'Lemari & Rak', icon: 'Archive' },
  { slug: 'papan-tulis', name: 'Papan Tulis', icon: 'Presentation' },
  { slug: 'uks-bendera', name: 'UKS & Bendera', icon: 'Flag' },
  { slug: 'kebersihan-sanitasi', name: 'Kebersihan & Sanitasi', icon: 'Trash2' },
  { slug: 'elektronik-utilitas', name: 'Elektronik & Utilitas', icon: 'Zap' },
];

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setDrawerOpen } = useRAB();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/katalog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm print:hidden">
      {/* Top Bar */}
      <div className="bg-[var(--color-primary)] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span className="hidden sm:inline">Pengadaan Fasilitas Sekolah & Instansi — Sumatera Selatan</span>
          <span className="sm:hidden text-xs">{BRAND.tagline}</span>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`https://wa.me/${CONTACTS.dina.wa_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              WA: {CONTACTS.dina.name} ({CONTACTS.dina.phone_display})
            </a>
            <span className="hidden md:inline">|</span>
            <a
              href={`https://wa.me/${CONTACTS.elmar.wa_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline hover:text-[var(--color-accent)] transition-colors"
            >
              {CONTACTS.elmar.name} ({CONTACTS.elmar.phone_display})
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-[var(--color-primary)] text-sm leading-tight">
                MAHALALEEL
              </p>
              <p className="text-[10px] text-[var(--color-text-secondary)] leading-tight">
                School Supplies
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
                Katalog <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-0 w-[600px] bg-white rounded-b-xl shadow-xl border border-[var(--color-border)] p-6 grid grid-cols-3 gap-3">
                  {categories.map((cat) => {
                    const Icon = categoryIcons[cat.icon];
                    return (
                      <Link
                        key={cat.slug}
                        href={`/katalog?category=${cat.slug}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-surface-muted)] transition-colors group"
                      >
                        {Icon && <Icon className="w-5 h-5 text-[var(--color-outdoor)] group-hover:text-[var(--color-accent)]" />}
                        <span className="text-sm text-[var(--color-text-primary)]">{cat.name}</span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/katalog"
                    className="col-span-3 mt-2 text-center text-sm font-medium text-[var(--color-accent)] hover:underline"
                  >
                    Lihat Semua 137 Produk →
                  </Link>
                </div>
              )}
            </div>

            <Link href="/katalog" className="px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
              Semua Produk
            </Link>
            <Link href="/portofolio" className="px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
              Portofolio
            </Link>
            <Link href="/tentang-kami" className="px-3 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors">
              Tentang Kami
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <input
                type="text"
                placeholder="Cari kode G1-G137 atau nama produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent bg-[var(--color-surface-muted)]"
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* RAB Cart */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-surface-muted)] rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">RAB</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-accent)] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* WA Quick */}
            <a
              href={`https://wa.me/${CONTACTS.dina.wa_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-[#15803D] hover:bg-[#166534] rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WA</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--color-text-primary)]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
                <input
                  type="text"
                  placeholder="Cari kode G1-G137 atau nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
            </form>

            {/* Nav Links */}
            <nav className="space-y-1">
              <Link href="/katalog" className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-[var(--color-surface-muted)]" onClick={() => setMobileMenuOpen(false)}>
                📦 Semua Produk (137 Item)
              </Link>
              <Link href="/portofolio" className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-[var(--color-surface-muted)]" onClick={() => setMobileMenuOpen(false)}>
                📸 Portofolio
              </Link>
              <Link href="/tentang-kami" className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-[var(--color-surface-muted)]" onClick={() => setMobileMenuOpen(false)}>
                ℹ️ Tentang Kami
              </Link>
              <Link href="/rab" className="block px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-[var(--color-surface-muted)]" onClick={() => setMobileMenuOpen(false)}>
                🧮 Keranjang RAB
              </Link>
            </nav>

            {/* Category Grid */}
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase mb-2">Kategori Produk</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.icon];
                  return (
                    <Link
                      key={cat.slug}
                      href={`/katalog?category=${cat.slug}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-surface-muted)] text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {Icon && <Icon className="w-4 h-4 text-[var(--color-outdoor)]" />}
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
