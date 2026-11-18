import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import ProductImage from '@/components/catalog/ProductImage';
import productsData from '@/data/products.json';
import type { Product, ProductsData } from '@/types/product';

export const metadata: Metadata = {
  title: 'Portofolio Pemasangan Nyata di Sekolah Sumatera Selatan',
  description:
    'Dokumentasi proyek nyata instalasi gapura sekolah, huruf timbul 3D, papan informasi, dan mebel di Muara Enim, Lahat, Banyuasin, Ogan Ilir, dan Prabumulih.',
};

const data = productsData as unknown as ProductsData;
const allProducts: Product[] = data.products;

// Selected real project installations extracted from actual catalog specs
const portfolioProjects = [
  {
    product: allProducts.find((p) => p.id === 'G1')!,
    school: 'SDN 09 Tanjung Batu',
    location: 'Ogan Ilir, Sumatera Selatan',
    category: 'Gapura & Signage',
    highlight: 'Gapura plang nama rangka besi model welcome dengan ornamen khas.',
  },
  {
    product: allProducts.find((p) => p.id === 'G3')!,
    school: 'SDN 1 Jarai',
    location: 'Lahat, Sumatera Selatan',
    category: 'Gapura & Signage',
    highlight: 'Tugu prasasti nama sekolah granit 2m x 2m dengan huruf timbul emas.',
  },
  {
    product: allProducts.find((p) => p.id === 'G6')!,
    school: 'SDN 1 Gelumbang Adiwiyata',
    location: 'Muara Enim, Sumatera Selatan',
    category: 'Gapura & Signage',
    highlight: 'Huruf timbul 3 dimensi plat besi outdoor nama sekolah & predikat Adiwiyata.',
  },
  {
    product: allProducts.find((p) => p.id === 'G9')!,
    school: 'SMPN 1 Indralaya BERSATU',
    location: 'Ogan Ilir, Sumatera Selatan',
    category: 'Gapura & Signage',
    highlight: 'Dinding tugu nama sekolah & motto 3D motif batu alam.',
  },
  {
    product: allProducts.find((p) => p.id === 'G12')!,
    school: 'SMAN 1 Gelumbang',
    location: 'Muara Enim, Sumatera Selatan',
    category: 'Papan Informasi',
    highlight: 'Papan nama Gugus Depan Pramuka & UKS 3 tingkat outdoor berkanopi.',
  },
  {
    product: allProducts.find((p) => p.id === 'G13')!,
    school: 'SMPN 9 Pagar Alam',
    location: 'Pagar Alam, Sumatera Selatan',
    category: 'Papan Informasi',
    highlight: 'Papan karakter Budayakan 7S tiang tunggal di pintu gerbang masuk.',
  },
  {
    product: allProducts.find((p) => p.id === 'G15')!,
    school: 'SDN 1 Lawang Kidul',
    location: 'Muara Enim, Sumatera Selatan',
    category: 'Papan Informasi',
    highlight: 'Papan Gerakan Sekolah Bersih (GERASSIH) 7 poin rangka besi outdoor.',
  },
  {
    product: allProducts.find((p) => p.id === 'G21')!,
    school: 'SDN 14 Tanjung Agung',
    location: 'Muara Enim, Sumatera Selatan',
    category: 'Papan Informasi',
    highlight: 'Papan program 7 Kebiasaan Anak Indonesia Hebat dengan kanopi atap.',
  },
  {
    product: allProducts.find((p) => p.id === 'G25')!,
    school: 'SMKN 1 Pemulutan Selatan',
    location: 'Ogan Ilir, Sumatera Selatan',
    category: 'Papan Informasi',
    highlight: 'Papan nama sekolah & daftar program keahlian/jurusan akrilik stiker premium.',
  },
  {
    product: allProducts.find((p) => p.id === 'G29')!,
    school: 'SDN 13 Tanjung Agung',
    location: 'Muara Enim, Sumatera Selatan',
    category: 'Gapura & Signage',
    highlight: 'Gapura gerbang sekolah megah lengkap dengan ornamen atap dan huruf timbul.',
  },
  {
    product: allProducts.find((p) => p.id === 'G33')!,
    school: 'SDN 1 Lawang Kidul',
    location: 'Muara Enim, Sumatera Selatan',
    category: 'Gapura & Signage',
    highlight: 'Gapura utama sekolah permanen megah dengan ukiran ornamen motif Songket.',
  },
  {
    product: allProducts.find((p) => p.id === 'G37')!,
    school: 'SDN 50 Prabumulih',
    location: 'Prabumulih, Sumatera Selatan',
    category: 'Papan Informasi',
    highlight: 'Tiang penunjuk arah ruangan kelas, kantor, UKS & jalur evakuasi.',
  },
  {
    product: allProducts.find((p) => p.id === 'G63')!,
    school: 'SD & SMP Wilayah Sumsel',
    location: 'Palembang & Muara Enim',
    category: 'Mebel & Meja Kursi',
    highlight: 'Pengadaan paket set meja kursi siswa modern adjustable tinggi untuk ruang kelas.',
  },
  {
    product: allProducts.find((p) => p.id === 'G135')!,
    school: 'SMPN 2 Gelumbang',
    location: 'Muara Enim, Sumatera Selatan',
    category: 'Tenda & Outdoor',
    highlight: 'Tenda pramuka kemah regu kapasitas besar lengkap dengan sablon nama sekolah.',
  },
  {
    product: allProducts.find((p) => p.id === 'G136')!,
    school: 'SDN 2 Kelekar',
    location: 'Muara Enim, Sumatera Selatan',
    category: 'Tenda & Outdoor',
    highlight: 'Tenda kemah regu dinding model custom dengan sablon identitas sekolah.',
  },
].filter((item) => Boolean(item.product));

export default function PortofolioPage() {
  return (
    <div className="bg-[var(--color-surface-muted)] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            Beranda
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Portofolio Pemasangan</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 mb-3">
            Bukti Nyata Pemasangan
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] leading-tight mb-3">
            Portofolio Pemasangan Sekolah di Sumatera Selatan
          </h1>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            Dokumentasi asli produk dan instalasi UKM Mahalaleel yang telah dipercaya oleh berbagai Sekolah Dasar, SMP, SMA, dan SMK di wilayah Muara Enim, Lahat, Ogan Ilir, Banyuasin, dan sekitarnya.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioProjects.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden border-b border-slate-100">
                <ProductImage
                  product={item.product}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-outdoor)] font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-900 mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                  {item.school}
                </h3>

                <p className="text-xs text-slate-500 font-medium mb-3">
                  {item.product.name} ({item.product.id})
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                  {item.highlight}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-[var(--color-primary)] tabular-nums">
                    {item.product.price_numeric > 0 ? item.product.price_display : 'Harga Sesuai Ukuran'}
                  </span>
                  <Link
                    href={`/produk/${item.product.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] hover:underline"
                  >
                    <span>Detail Produk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-white rounded-3xl border border-[var(--color-border)] p-8 text-center max-w-3xl mx-auto shadow-xs">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Ingin Sekolah Anda Memiliki Fasilitas Serupa?
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mb-6 max-w-lg mx-auto">
            Konsultasikan kebutuhan gapura, mebel, tenda sablon, atau papan informasi dengan tim kami via WhatsApp. Kami siap membantu survey dan menyusun penawaran terbaik.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/katalog"
              className="px-6 py-2.5 bg-[var(--color-accent)] hover:bg-amber-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs"
            >
              Lihat Seluruh 137 Produk
            </Link>
            <Link
              href="/rab"
              className="px-6 py-2.5 bg-[var(--color-primary)] hover:bg-[#1a3d5c] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs"
            >
              Buat Estimasi RAB Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
