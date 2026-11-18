import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { RABProvider } from '@/context/RABContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import RABDrawer from '@/components/rab/RABDrawer';

  const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-heading',
    display: 'swap',
    weight: ['500', '600', '700', '800'],
  });

    const inter = Inter({
      subsets: ['latin'],
      variable: '--font-sans',
      display: 'swap',
      weight: ['400', '500', '600', '700'],
    });

    export const metadata: Metadata = {
      title: {
        template: '%s | UKM Mahalaleel School Supplies',
        default: 'UKM Mahalaleel School Supplies — Solusi Fasilitas Sekolah, Dari Kelas Hingga Lapangan',
      },
      description:
        'Katalog lengkap 137+ produk & jasa pengadaan fasilitas sekolah di Sumatera Selatan. Gapura, papan informasi, meja kursi siswa, tenda pramuka, lemari arsip, dan perlengkapan sekolah dengan estimasi RAB instan via WhatsApp.',
      keywords: [
        'pengadaan sekolah',
        'meja kursi sekolah',
        'gapura sekolah',
        'tenda pramuka',
        'papan visi misi',
        'RAB sekolah',
        'dana BOS',
        'UKM Mahalaleel',
        'Sumatera Selatan',
        'Muara Enim',
        'Lahat',
        'Palembang',
      ],
      authors: [{ name: 'UKM Mahalaleel School Supplies' }],
      metadataBase: new URL('https://mahalaleel-school-supplies.vercel.app'),
      openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: 'https://mahalaleel-school-supplies.vercel.app',
        title: 'UKM Mahalaleel School Supplies — Solusi Fasilitas Sekolah',
        description:
          'Katalog pengadaan fasilitas sekolah lengkap 137 produk. Estimasi RAB otomatis & konsultasi langsung via WhatsApp.',
        siteName: 'UKM Mahalaleel School Supplies',
      },
    };

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return(
    <html lang="id" className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[var(--color-surface)] text-[var(--color-text-primary)]">
        <RABProvider>
          <Header />
          <RABDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </RABProvider>
      </body>
    </html>
  );
}
