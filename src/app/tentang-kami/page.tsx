import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  HelpCircle,
  MessageCircle,
  MapPin,
  Clock,
  Truck,
  Wrench,
  FileText,
} from 'lucide-react';
import { BRAND, CONTACTS } from '@/config/contacts';

export const metadata: Metadata = {
  title: 'Tentang Kami & Panduan Pengadaan Sekolah',
  description:
    'Profil UKM Mahalaleel School Supplies, alur pengadaan sarana sekolah via Dana BOS, FAQ, dan kontak resmi sales pengadaan di Sumatera Selatan.',
};

const steps = [
  {
    step: '01',
    title: 'Pilih Produk & Buat RAB',
    description:
      'Pilih produk dari 137 katalog kami, sesuaikan kuantitas, dan susun estimasi anggaran langsung di fitur Keranjang RAB.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Konsultasi & Desain Custom',
    description:
      'Kirimkan RAB via WhatsApp. Tim kami segera mengonfirmasi ketersediaan, mendiskusikan sablon/nama sekolah, dan menerbitkan surat penawaran resmi.',
    icon: MessageCircle,
  },
  {
    step: '03',
    title: 'Produksi & Pengiriman',
    description:
      'Pesanan diproduksi dengan material standar mutu sekolah dan dikirim langsung ke lokasi sekolah Anda di wilayah Sumatera Selatan.',
    icon: Truck,
  },
  {
    step: '04',
    title: 'Pemasangan & Serah Terima',
    description:
      'Untuk produk seperti gapura, huruf timbul, dan wall panel, tim kami melakukan instalasi langsung di sekolah dengan berita acara serah terima resmi.',
    icon: Wrench,
  },
];

const faqs = [
  {
    q: 'Apakah pengadaan di UKM Mahalaleel dapat menggunakan Dana BOS?',
    a: 'Ya, seluruh produk kami dirancang sesuai spesifikasi teknis dan standar pengadaan sarana prasarana sekolah, serta dilengkapi dengan nota, kuitansi, dan dokumen administrasi pengadaan yang sah untuk pertanggungjawaban Dana BOS.',
  },
  {
    q: 'Berapa lama estimasi pengerjaan untuk produk custom (gapura, tugu, sablon tenda)?',
    a: 'Untuk produk custom nama sekolah seperti plang nama akrilik, huruf timbul 3D, atau sablon tenda regu pramuka, rata-rata waktu pengerjaan berkisar antara 7 hingga 14 hari kerja tergantung volume dan kerumitan desain.',
  },
  {
    q: 'Wilayah mana saja yang dapat dijangkau untuk pengiriman dan pemasangan?',
    a: 'Kami melayani seluruh wilayah Sumatera Selatan meliputi Palembang, Muara Enim, Lahat, Banyuasin, Ogan Ilir, Prabumulih, Pagar Alam, Empat Lawang, dan sekitarnya.',
  },
  {
    q: 'Bagaimana cara meminta surat penawaran harga resmi untuk persetujuan komite/kepala sekolah?',
    a: 'Sangat mudah! Masukkan produk yang Anda butuhkan ke Keranjang RAB di website ini, isi nama sekolah Anda, lalu klik "Kirim Permintaan Penawaran via WhatsApp". Tim kami akan langsung menyusun surat penawaran ber-kop resmi.',
  },
  {
    q: 'Apakah bisa survei lokasi terlebih dahulu untuk proyek gapura atau backdrop ruang kepala sekolah?',
    a: 'Ya, untuk proyek berskala menengah hingga besar di wilayah Sumatera Selatan, tim teknis kami dapat berkoordinasi untuk pengukuran dan survei lokasi sebelum proses fabrikasi.',
  },
];

export default function TentangKamiPage() {
  return (
    <div className="bg-[var(--color-surface-muted)] min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Tentang Kami</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 md:p-12 mb-10 shadow-xs">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200 mb-4">
              {BRAND.category_label}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] leading-tight mb-4">
              Mitra Terpercaya Pengadaan Sarana &amp; Prasarana Sekolah di Sumatera Selatan
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              <strong>{BRAND.name}</strong> hadir dengan moto <em>&quot;{BRAND.tagline}&quot;</em>. Kami menyediakan lebih dari 137 item perlengkapan mulai dari ruang kelas, ruang guru dan kepala sekolah, lapangan olahraga, perlengkapan pramuka dan UKS, hingga gapura dan tugu sekolah permanen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] hover:bg-amber-600 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
              >
                <span>Lihat Katalog 137 Produk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${CONTACTS.dina.wa_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Langsung via WA</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Steps Alur Pengadaan */}
        <div id="alur-pengadaan" className="mb-12 scroll-mt-24">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-heading text-2xl font-bold text-slate-900">
              Alur Pengadaan Sekolah yang Mudah &amp; Cepat
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              4 langkah praktis dari pemilihan produk hingga serah terima barang di sekolah Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-xs relative flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-3xl font-extrabold text-slate-200 block mb-2">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4 text-[var(--color-primary)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="mb-12 scroll-mt-24">
          <div className="bg-white rounded-3xl border border-[var(--color-border)] p-6 md:p-10 shadow-xs">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-[var(--color-accent)]" />
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Pertanyaan yang Sering Diajukan (FAQ)
              </h2>
            </div>

            <div className="space-y-4 divide-y divide-slate-100">
              {faqs.map((faq, i) => (
                <div key={i} className="pt-4 first:pt-0">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 mb-2 flex items-start gap-2">
                    <span className="text-[var(--color-accent)]">Q:</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Service Info */}
        <div className="bg-[var(--color-primary)] text-white rounded-3xl p-8 md:p-10 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-3">
                Siap Meningkatkan Kualitas Fasilitas Sekolah Anda?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Hubungi sales pengadaan kami untuk konsultasi spesifikasi teknis, pengecekan ketersediaan stok, dan pembuatan surat penawaran harga resmi.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                  <span>Wilayah Layanan: {BRAND.region}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                  <span>Jam Operasional: {BRAND.operationalHours}</span>
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-6 rounded-2xl border border-white/20 space-y-4">
              <h3 className="font-heading font-bold text-sm text-[var(--color-accent)] uppercase tracking-wider">
                Kontak Resmi Penjualan:
              </h3>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${CONTACTS.dina.wa_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div>
                    <p className="font-bold text-sm">{CONTACTS.dina.name}</p>
                    <p className="text-xs text-slate-300">{CONTACTS.dina.role} • {CONTACTS.dina.phone_display}</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </a>

                <a
                  href={`https://wa.me/${CONTACTS.elmar.wa_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <div>
                    <p className="font-bold text-sm">{CONTACTS.elmar.name}</p>
                    <p className="text-xs text-slate-300">{CONTACTS.elmar.role} • {CONTACTS.elmar.phone_display}</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
