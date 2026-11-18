import Link from 'next/link';
import { FileText, MessageCircle } from 'lucide-react';

export default function CorporateBanner() {
  return (
    <section className="py-10 md:py-14 bg-[var(--color-surface-muted)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--color-primary)] via-[#1a3d5c] to-[var(--color-primary)] p-8 md:p-12 text-white">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-outdoor)]/10 rounded-full translate-y-1/2 -translate-x-1/3" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">
              Layanan Pengadaan Sekolah, Dana BOS & Proyek Custom
            </h2>
            <p className="text-sm md:text-base text-white/70 mb-8">
              Kami melayani pembuatan custom desain gapura, huruf timbul 3D, sablon tenda pramuka,
              dan pemasangan langsung di lokasi sekolah Anda. Proses mudah & transparan.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/rab"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
              >
                <FileText className="w-5 h-5" />
                Susun Estimasi RAB Sekarang
              </Link>
              <a
                href="https://wa.me/6285709148987?text=Halo%2C%20saya%20ingin%20konsultasi%20pengadaan%20fasilitas%20sekolah."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/30"
              >
                <MessageCircle className="w-5 h-5" />
                Chat Admin Pengadaan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
