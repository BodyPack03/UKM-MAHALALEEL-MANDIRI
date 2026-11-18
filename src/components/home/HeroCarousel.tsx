'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Solusi Fasilitas Sekolah, Dari Kelas Hingga Lapangan',
    subtitle: '137+ produk pengadaan sekolah berkualitas untuk SD, SMP, SMA & SMK se-Sumatera Selatan',
    cta1: { text: 'Jelajahi 137 Produk', href: '/katalog' },
    cta2: { text: 'Konsultasi Pengadaan WA', href: 'https://wa.me/6285709148987' },
    gradient: 'from-[#0F2942]/90 via-[#0F2942]/70 to-transparent',
    bgColor: 'bg-gradient-to-br from-[#0F2942] to-[#1a3d5c]',
  },
  {
    title: 'Pengadaan Meja Kursi & Mebel Sekolah Siap Kirim',
    subtitle: 'Set meja kursi siswa adjustable, meja guru, lemari arsip, sofa tamu — semua tersedia dengan harga transparan untuk RAB Dana BOS',
    cta1: { text: 'Lihat Meja & Kursi', href: '/katalog?category=meja-kursi' },
    cta2: { text: 'Buat Estimasi RAB', href: '/rab' },
    gradient: 'from-[#166534]/90 via-[#166534]/70 to-transparent',
    bgColor: 'bg-gradient-to-br from-[#166534] to-[#1a7a3d]',
  },
  {
    title: 'Jasa Gapura, Huruf Timbul 3D & Papan Informasi Custom',
    subtitle: 'Desain custom nama sekolah, visi misi, 7 Kebiasaan, running text LED — pengerjaan profesional & pemasangan langsung',
    cta1: { text: 'Lihat Gapura & Signage', href: '/katalog?category=gapura-signage' },
    cta2: { text: 'Chat Admin Pengadaan', href: 'https://wa.me/6285709148987' },
    gradient: 'from-[#0F2942]/90 via-[#0F2942]/70 to-transparent',
    bgColor: 'bg-gradient-to-br from-[#92400e] to-[#b45309]',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className={`relative min-h-[400px] md:min-h-[500px] lg:min-h-[560px] ${slide.bgColor} transition-colors duration-700`}
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 left-10 w-48 h-48 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white/50 rotate-45" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center min-h-[400px] md:min-h-[500px] lg:min-h-[560px]">
          <div className="max-w-2xl py-16 md:py-20">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 md:mb-6">
              {slide.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={slide.cta1.href}
                className="inline-flex items-center px-6 py-3 bg-[var(--color-accent)] hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors text-sm md:text-base shadow-lg"
              >
                {slide.cta1.text}
              </Link>
              {slide.cta2.href.startsWith('http') ? (
                <a
                  href={slide.cta2.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors text-sm md:text-base border border-white/30"
                >
                  {slide.cta2.text}
                </a>
              ) : (
                <Link
                  href={slide.cta2.href}
                  className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors text-sm md:text-base border border-white/30"
                >
                  {slide.cta2.text}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          aria-label="Slide berikutnya"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? 'bg-[var(--color-accent)] w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
