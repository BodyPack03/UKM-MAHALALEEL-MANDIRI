'use client';

import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, MessageCircle, FileText } from 'lucide-react';
import { useRAB } from '@/context/RABContext';
import { formatRupiah, buildRABWhatsAppUrl } from '@/lib/format';
import ProductImage from '@/components/catalog/ProductImage';

export default function RABDrawer() {
  const {
    items,
    isDrawerOpen,
    setDrawerOpen,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
    schoolInfo,
  } = useRAB();

  if (!isDrawerOpen) return null;

  const hasUnpriced = items.some((item) => item.product.price_numeric === 0);
  const waUrl = buildRABWhatsAppUrl(items, schoolInfo, 'dina');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden print:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 transition-opacity backdrop-blur-xs"
        onClick={() => setDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 bg-[var(--color-primary)] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[var(--color-accent)]" />
              <div>
                <h2 className="font-heading font-bold text-base">Keranjang Estimasi RAB</h2>
                <p className="text-xs text-slate-300">{totalItems} item dipilih</p>
              </div>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="font-medium text-slate-700 mb-1">Keranjang RAB Masih Kosong</p>
                <p className="text-xs text-slate-500 mb-4 max-w-xs mx-auto">
                  Pilih produk dari katalog sekolah dan klik &quot;+ Tambah ke RAB&quot; untuk menyusun estimasi anggaran.
                </p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--color-accent)] hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Jelajahi Katalog Produk
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 relative">
                    <ProductImage
                      product={item.product}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          {item.product.id}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                        aria-label="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 mt-0.5 tabular-nums">
                      {item.product.price_numeric > 0 ? (
                        <>
                          {item.product.price_display}
                          <span className="text-[10px] text-slate-400">/{item.product.unit}</span>
                        </>
                      ) : (
                        <span className="text-[var(--color-outdoor)] font-medium">Konfirmasi Harga</span>
                      )}
                    </p>

                    {/* Qty Controls & Subtotal */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                          aria-label="Kurang satu"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-slate-800 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-200 transition-colors"
                          aria-label="Tambah satu"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[var(--color-primary)] tabular-nums">
                          {item.product.price_numeric > 0
                            ? formatRupiah(item.product.price_numeric * item.quantity)
                            : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                  <span>Subtotal ({totalItems} item)</span>
                  <span className="font-bold text-sm text-[var(--color-primary)] tabular-nums">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
                {hasUnpriced && (
                  <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 leading-tight">
                    * Beberapa item memerlukan konfirmasi harga via WA dan belum termasuk dalam total di atas.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Link
                  href="/rab"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[var(--color-primary)] hover:bg-[#1a3d5c] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Buka Halaman RAB Lengkap &amp; Cetak</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim RAB via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
