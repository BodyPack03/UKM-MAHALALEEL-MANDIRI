'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import { CONTACTS, BRAND } from '@/config/contacts';

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[var(--color-primary)] text-white print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <p className="font-heading font-bold text-sm">MAHALALEEL</p>
                <p className="text-[10px] text-slate-300">School Supplies</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-3">
              {BRAND.tagline}
            </p>
            <p className="text-xs text-slate-400">
              {BRAND.category_label}
            </p>
          </div>

          {/* Column 2: Kategori Produk */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 text-[var(--color-accent)]">Kategori Produk</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/katalog?category=gapura-signage" className="hover:text-white transition-colors">Gapura & Signage</Link></li>
              <li><Link href="/katalog?category=papan-informasi-struktur" className="hover:text-white transition-colors">Papan Informasi & Struktur</Link></li>
              <li><Link href="/katalog?category=meja-kursi" className="hover:text-white transition-colors">Meja & Kursi</Link></li>
              <li><Link href="/katalog?category=tenda-olahraga-outdoor" className="hover:text-white transition-colors">Tenda, Olahraga & Outdoor</Link></li>
              <li><Link href="/katalog?category=lemari-rak" className="hover:text-white transition-colors">Lemari & Rak</Link></li>
              <li><Link href="/katalog?category=papan-tulis" className="hover:text-white transition-colors">Papan Tulis</Link></li>
              <li><Link href="/katalog?category=uks-bendera" className="hover:text-white transition-colors">UKS & Bendera</Link></li>
              <li><Link href="/katalog?category=kebersihan-sanitasi" className="hover:text-white transition-colors">Kebersihan & Sanitasi</Link></li>
              <li><Link href="/katalog?category=elektronik-utilitas" className="hover:text-white transition-colors">Elektronik & Utilitas</Link></li>
            </ul>
          </div>

          {/* Column 3: Panduan */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 text-[var(--color-accent)]">Panduan Pengadaan</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/tentang-kami#alur-pengadaan" className="hover:text-white transition-colors">Alur Pemesanan</Link></li>
              <li><Link href="/tentang-kami#faq" className="hover:text-white transition-colors">FAQ Pengadaan</Link></li>
              <li><Link href="/rab" className="hover:text-white transition-colors">Keranjang Estimasi RAB</Link></li>
              <li><Link href="/portofolio" className="hover:text-white transition-colors">Portofolio Pemasangan</Link></li>
              <li><Link href="/katalog" className="hover:text-white transition-colors">Lihat Semua 137 Produk</Link></li>
            </ul>
          </div>

          {/* Column 4: Kontak */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 text-[var(--color-accent)]">Kontak Resmi</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 mt-0.5 text-green-400" />
                <div>
                  <a
                    href={`https://wa.me/${CONTACTS.dina.wa_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {CONTACTS.dina.name} — {CONTACTS.dina.phone_display}
                  </a>
                  <p className="text-xs text-slate-400">{CONTACTS.dina.role}</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-green-400" />
                <div>
                  <a
                    href={`https://wa.me/${CONTACTS.elmar.wa_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {CONTACTS.elmar.name} — {CONTACTS.elmar.phone_display}
                  </a>
                  <p className="text-xs text-slate-400">{CONTACTS.elmar.role}</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-slate-400" />
                <span>{BRAND.region}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-slate-400" />
                <span>{BRAND.operationalHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© {year} {BRAND.name}. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            <span>{BRAND.tagline}</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-white transition-colors">
              Panel Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
