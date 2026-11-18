import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  FileSpreadsheet,
  ArrowLeft,
} from 'lucide-react';
import productsData from '@/data/products.json';
import type { Product, ProductsData } from '@/types/product';
import ProductImage from '@/components/catalog/ProductImage';
import ProductCard from '@/components/catalog/ProductCard';
import ProductDetailActions from './ProductDetailActions';

const data = productsData as unknown as ProductsData;
const allProducts: Product[] = data.products;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan',
    };
  }

  const priceText = product.price_numeric > 0 ? product.price_display : 'Hubungi WA untuk Penawaran';

  return {
    title: `${product.id} - ${product.name}`,
    description: `${product.name} (${product.id}) untuk pengadaan ${product.school_area}. Spesifikasi: ${product.specs}. Harga: ${priceText}/${product.unit}. UKM Mahalaleel Sumatera Selatan.`,
    openGraph: {
      title: `${product.id} - ${product.name} | Pengadaan Sekolah`,
      description: `${product.specs} — ${priceText}/${product.unit}`,
      images: [
        {
          url: product.image_path,
          alt: `${product.id} - ${product.name}`,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Similar products (up to 4 from same category, excluding current)
  const similarProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `https://mahalaleel-school-supplies.vercel.app${product.image_path}`,
    description: product.specs,
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: 'UKM Mahalaleel School Supplies',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: product.price_numeric > 0 ? product.price_numeric : 0,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'UKM Mahalaleel School Supplies',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-[var(--color-surface-muted)] min-h-screen py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-slate-500 mb-6 flex flex-wrap items-center gap-1.5">
            <Link href="/" className="hover:text-[var(--color-primary)]">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/katalog" className="hover:text-[var(--color-primary)]">
              Katalog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href={`/katalog?category=${encodeURIComponent(product.category)}`}
              className="hover:text-[var(--color-primary)]"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold truncate max-w-xs">
              {product.id} - {product.name}
            </span>
          </nav>

          {/* Main Product Section */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-xs overflow-hidden p-6 md:p-8 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Big Image Display (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <ProductImage
                    product={product}
                    className="w-full h-full object-contain"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>

                {/* PDF Reference Info */}
                <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="font-mono">
                    Ref. Katalog PDF: Halaman {product.pdf_page}
                  </span>
                  <span className="text-[var(--color-outdoor)] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Produk Terverifikasi
                  </span>
                </div>
              </div>

              {/* Right Column: Details & Actions (7 cols) */}
              <div className="lg:col-span-7 flex flex-col space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-slate-900 text-white font-mono font-bold text-xs rounded-md">
                      {product.id}
                    </span>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-semibold rounded-md border border-blue-200">
                      {product.category}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-md border border-emerald-200">
                      Area: {product.school_area}
                    </span>
                    {product.customizable && (
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-md border border-amber-200">
                        Bisa Custom Desain
                      </span>
                    )}
                  </div>

                  <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] leading-tight">
                    {product.name}
                  </h1>
                </div>

                {/* Price Display */}
                <div className="p-4 bg-[var(--color-surface-muted)] rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 block mb-0.5">
                    Harga Pengadaan Resmi / Satuan:
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[var(--color-primary)] tabular-nums">
                      {product.price_numeric > 0 ? (
                        product.price_display
                      ) : (
                        <span className="text-[var(--color-outdoor)]">
                          Hubungi WA untuk Penawaran
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      /{product.unit}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    * Harga transparan, siap dimasukkan ke Rencana Anggaran Biaya (RAB) sekolah &amp; Dana BOS.
                  </p>
                </div>

                {/* Specifications Card */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-heading font-bold text-xs text-slate-800 uppercase tracking-wider">
                    Spesifikasi &amp; Detail Produk
                  </div>
                  <div className="p-4 text-sm text-slate-700 leading-relaxed space-y-2">
                    <p>{product.specs}</p>
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block">Kode Produk:</span>
                        <span className="font-mono font-bold text-slate-800">{product.id}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Satuan Hitung:</span>
                        <span className="font-semibold text-slate-800">{product.unit}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Penempatan Area:</span>
                        <span className="font-semibold text-slate-800">{product.school_area}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Layanan Custom:</span>
                        <span className="font-semibold text-slate-800">
                          {product.customizable ? 'Ya (Desain, Logo & Nama)' : 'Sesuai Standar'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client-side actions: Qty Selector, Add to RAB, WA Button */}
                <ProductDetailActions product={product} />

                {/* Guarantees / Service Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2.5 text-xs text-slate-700">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Garansi Mutu &amp; Kualitas Teruji</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-700">
                    <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>Kirim &amp; Pasang se-Sumsel</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-700">
                    <FileSpreadsheet className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span>Dokumen Penawaran RAB Resmi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-[var(--color-text-primary)]">
                    Produk Serupa di Kategori {product.category}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Pilihan fasilitas sekolah sejenis untuk perbandingan RAB
                  </p>
                </div>
                <Link
                  href={`/katalog?category=${encodeURIComponent(product.category)}`}
                  className="text-xs font-semibold text-[var(--color-accent)] hover:underline hidden sm:inline"
                >
                  Lihat Kategori Ini →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {similarProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <div className="mt-8">
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[var(--color-primary)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Katalog 137 Produk</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
