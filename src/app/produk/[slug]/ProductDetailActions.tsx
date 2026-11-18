'use client';

import { useState } from 'react';
import { Plus, Minus, ShoppingCart, MessageCircle, Check, Share2 } from 'lucide-react';
import type { Product } from '@/types/product';
import { useRAB } from '@/context/RABContext';
import { buildProductWhatsAppUrl, formatRupiah } from '@/lib/format';
import { CONTACTS } from '@/config/contacts';

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, setDrawerOpen } = useRAB();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setDrawerOpen(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      try {
        if (navigator.share) {
          await navigator.share({
            title: `${product.id} - ${product.name}`,
            text: `Katalog Pengadaan Sekolah: ${product.name} (${product.id})`,
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } catch {
        // User cancelled share
      }
    }
  };

  const waUrl = buildProductWhatsAppUrl(product, quantity, 'dina');

  return (
    <div className="space-y-4 pt-2">
      {/* Quantity & Subtotal */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700">Kuantitas:</span>
          <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-xs">
            <button
              onClick={handleDecrease}
              className="p-2 text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-30"
              disabled={quantity <= 1}
              aria-label="Kurangi kuantitas"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-sm font-bold tabular-nums text-slate-800 min-w-[36px] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="p-2 text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Tambah kuantitas"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {product.unit}
          </span>
        </div>

        {product.price_numeric > 0 && (
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">Subtotal Estimasi:</span>
            <span className="font-heading font-bold text-base text-[var(--color-primary)] tabular-nums">
              {formatRupiah(product.price_numeric * quantity)}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Tambah ke RAB */}
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 py-3 px-5 bg-[var(--color-primary)] hover:bg-[#1a3d5c] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-98"
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Dimasukkan ke RAB!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Tambah ke Keranjang RAB</span>
            </>
          )}
        </button>

        {/* Pesan Cepat WA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-5 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-98"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Pesan Cepat via WhatsApp</span>
        </a>
      </div>

      {/* Share / Copy Link */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span className="text-[11px]">
          Hubungi Admin: {CONTACTS.dina.name} ({CONTACTS.dina.phone_display})
        </span>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[var(--color-primary)] font-medium transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Tautan Disalin!' : 'Bagikan Produk'}</span>
        </button>
      </div>
    </div>
  );
}
