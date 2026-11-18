import { MapPin, Shield, Wrench, MessageCircle } from 'lucide-react';
import { BRAND } from '@/config/contacts';

const regions = BRAND.areas;

const pillars = [
  {
    icon: Shield,
    title: 'Kualitas Teruji',
    description: 'Material berkualitas, konstruksi kuat, finishing rapi — terbukti terpasang di puluhan sekolah.',
  },
  {
    icon: Wrench,
    title: 'Terima Custom & Pemasangan',
    description: 'Desain custom nama sekolah, sablon tenda, huruf timbul 3D — termasuk jasa pemasangan di lokasi.',
  },
  {
    icon: MessageCircle,
    title: 'Respon Cepat via WhatsApp',
    description: 'Konsultasi, penawaran harga, dan follow-up pengadaan langsung via WhatsApp — tanpa ribet.',
  },
];

export default function PortfolioSection() {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Portfolio Map */}
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              Portofolio Pemasangan
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Telah melayani sekolah di berbagai wilayah Sumatera Selatan
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {regions.map((region) => (
                <div
                  key={region}
                  className="flex items-center gap-2 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)]"
                >
                  <MapPin className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" />
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{region}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Pillars */}
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              3 Pilar Keunggulan
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">
              Alasan sekolah-sekolah mempercayakan pengadaan kepada kami
            </p>
            <div className="space-y-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)]">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">{pillar.title}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
