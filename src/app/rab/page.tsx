'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Printer,
  MessageCircle,
  Trash2,
  Plus,
  Minus,
  School,
  MapPin,
  User,
  MessageSquare,
  AlertCircle,
  Building,
  ArrowLeft,
} from 'lucide-react';
import { useRAB } from '@/context/RABContext';
import { formatRupiah, buildRABWhatsAppUrl } from '@/lib/format';
import { CONTACTS, BRAND, type ContactKey } from '@/config/contacts';
import ProductImage from '@/components/catalog/ProductImage';
import { recordRabInquiry } from '@/lib/supabase';

export default function RABPage() {
  const {
    items,
    schoolInfo,
    updateSchoolInfo,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useRAB();

  const [selectedContact, setSelectedContact] = useState<ContactKey>('dina');
  const [printDate, setPrintDate] = useState('');

  useEffect(() => {
    setPrintDate(
      new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  const hasUnpriced = items.some((item) => item.product.price_numeric === 0);
  const waUrl = buildRABWhatsAppUrl(items, schoolInfo, selectedContact);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleSendWhatsApp = () => {
    recordRabInquiry({
      school_name: schoolInfo.schoolName || 'Tanpa Nama Sekolah',
      city_regency: schoolInfo.city || 'Sumatera Selatan',
      contact_name: schoolInfo.contactPerson || 'Pemohon',
      notes: schoolInfo.notes || '',
      target_admin: selectedContact === 'dina' ? CONTACTS.dina.name : CONTACTS.elmar.name,
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        qty: i.quantity,
        price_numeric: i.product.price_numeric,
        subtotal: i.product.price_numeric * i.quantity,
      })),
      estimated_total: totalPrice,
    });
  };

  return (
    <div className="bg-[var(--color-surface-muted)] min-h-screen py-6 md:py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Breadcrumb - Hidden in print */}
        <nav className="text-xs text-slate-500 mb-4 flex items-center gap-1.5 print:hidden">
          <Link href="/" className="hover:text-[var(--color-primary)]">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/katalog" className="hover:text-[var(--color-primary)]">
            Katalog
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Estimasi RAB</span>
        </nav>

        {/* PRINT ONLY: Professional Letterhead Kop Surat */}
        <div className="hidden print:block mb-8 pb-4 border-b-2 border-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-wide text-slate-900">
                {BRAND.name}
              </h1>
              <p className="text-xs font-semibold text-slate-700">
                {BRAND.category_label}
              </p>
              <p className="text-xs text-slate-600">
                {BRAND.tagline} • Wilayah: {BRAND.region}
              </p>
              <p className="text-xs text-slate-600">
                WhatsApp: {CONTACTS.dina.name} ({CONTACTS.dina.phone_display}) | {CONTACTS.elmar.name} ({CONTACTS.elmar.phone_display})
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white font-mono text-xs font-bold rounded">
                DOKUMEN ESTIMASI RAB
              </span>
              <p className="text-xs text-slate-500 mt-1">Tanggal: {printDate}</p>
            </div>
          </div>
        </div>

        {/* Header - Screen only */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 print:hidden">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
              <FileText className="w-7 h-7 text-[var(--color-accent)]" />
              <span>Keranjang Estimasi RAB Sekolah</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              Rencana Anggaran Biaya untuk pengadaan sarana &amp; prasarana sekolah / Dana BOS
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded-lg border border-slate-300 shadow-xs transition-colors"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Cetak / Simpan PDF</span>
              </button>
              <button
                onClick={clearCart}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Kosongkan Semua"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Kosongkan</span>
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto print:hidden">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="font-heading font-bold text-lg text-slate-800 mb-2">
              Keranjang RAB Anda Masih Kosong
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              Anda belum menambahkan produk ke dalam estimasi RAB. Silakan pilih meja siswa, tenda pramuka, gapura, atau produk lainnya dari katalog 137 item kami.
            </p>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
            >
              <span>Buka Katalog 137 Produk</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Form Identitas Sekolah */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 md:p-6 shadow-xs">
              <h2 className="font-heading font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                <School className="w-5 h-5 text-[var(--color-primary)]" />
                <span>Identitas Sekolah / Pemohon</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nama Sekolah / Instansi *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: SDN 1 Lawang Kidul"
                    value={schoolInfo.schoolName}
                    onChange={(e) => updateSchoolInfo({ schoolName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Kabupaten / Kota *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Muara Enim / Lahat"
                    value={schoolInfo.city}
                    onChange={(e) => updateSchoolInfo({ city: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nama &amp; Jabatan Pemohon</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Bpk. Ahmad (Kepsek / Bendahara)"
                    value={schoolInfo.contactPerson}
                    onChange={(e) => updateSchoolInfo({ contactPerson: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-slate-50"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>Catatan Khusus (Custom Nama Sekolah / Ukuran / Jadwal Pengiriman)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Tenda pramuka butuh sablon SDN 1 Lawang Kidul, meja siswa warna biru siap kirim minggu depan."
                    value={schoolInfo.notes}
                    onChange={(e) => updateSchoolInfo({ notes: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-slate-50"
                  />
                </div>
              </div>
            </div>

            {/* Tabel Daftar Produk RAB */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-xs overflow-hidden">
              <div className="p-4 md:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-sm md:text-base text-slate-900">
                    Daftar Rincian Pengadaan ({totalItems} Item)
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Periksa kembali kuantitas dan harga satuan setiap item
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3 sm:px-4 font-bold">No</th>
                      <th className="py-3 px-3 sm:px-4 font-bold">Produk</th>
                      <th className="py-3 px-3 sm:px-4 font-bold text-right">Harga Satuan</th>
                      <th className="py-3 px-3 sm:px-4 font-bold text-center">Jumlah</th>
                      <th className="py-3 px-3 sm:px-4 font-bold text-right">Subtotal</th>
                      <th className="py-3 px-3 sm:px-4 font-bold text-center print:hidden">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, index) => {
                      const isUnpriced = item.product.price_numeric === 0;
                      return (
                        <tr key={item.product.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-3 sm:px-4 font-mono font-bold text-slate-400 align-top">
                            {index + 1}
                          </td>
                          <td className="py-3.5 px-3 sm:px-4 align-top">
                            <div className="flex gap-3">
                              <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 relative hidden sm:block">
                                <ProductImage
                                  product={item.product}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div>
                                <span className="inline-block font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-900 text-white rounded mr-1.5 mb-1">
                                  {item.product.id}
                                </span>
                                <span className="text-[10px] text-slate-500">
                                  {item.product.category}
                                </span>
                                <h3 className="font-heading font-semibold text-xs sm:text-sm text-slate-900 leading-snug">
                                  {item.product.name}
                                </h3>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {item.product.specs}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3 sm:px-4 text-right align-top whitespace-nowrap tabular-nums">
                            {isUnpriced ? (
                              <span className="text-[var(--color-outdoor)] font-semibold text-xs">
                                Konfirmasi Harga
                              </span>
                            ) : (
                              <>
                                <span className="font-medium text-slate-800">
                                  {item.product.price_display}
                                </span>
                                <span className="text-[10px] text-slate-400 block">
                                  /{item.product.unit}
                                </span>
                              </>
                            )}
                          </td>
                          <td className="py-3.5 px-3 sm:px-4 text-center align-top whitespace-nowrap">
                            <div className="inline-flex items-center border border-slate-200 rounded-md overflow-hidden bg-white shadow-xs print:hidden">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                                aria-label="Kurangi"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold tabular-nums text-slate-800 min-w-[28px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                                aria-label="Tambah"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="hidden print:inline font-bold">
                              {item.quantity} {item.product.unit}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 sm:px-4 text-right align-top whitespace-nowrap tabular-nums font-bold text-slate-900">
                            {isUnpriced ? (
                              <span className="text-slate-400 font-normal text-xs">
                                Sesuai Pesanan
                              </span>
                            ) : (
                              formatRupiah(item.product.price_numeric * item.quantity)
                            )}
                          </td>
                          <td className="py-3.5 px-3 sm:px-4 text-center align-top print:hidden">
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                              title="Hapus baris ini"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold">
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-right text-xs sm:text-sm text-slate-700">
                        Total Estimasi Anggaran:
                      </td>
                      <td className="py-4 px-4 text-right text-base sm:text-lg text-[var(--color-primary)] tabular-nums">
                        {formatRupiah(totalPrice)}
                      </td>
                      <td className="print:hidden"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {hasUnpriced && (
                <div className="p-3 bg-amber-50 border-t border-amber-200 flex items-start gap-2 text-xs text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p>
                    Catatan: Item dengan label <strong>Konfirmasi Harga</strong> belum termasuk dalam kalkulasi total di atas. Admin kami akan melengkapi harga resminya pada surat penawaran final via WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* PRINT SIGNATURE FOOTER */}
            <div className="hidden print:block mt-12 pt-8 border-t border-slate-300">
              <div className="grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <p className="text-slate-500">Pihak Pemohon / Sekolah:</p>
                  <p className="font-bold text-slate-900 mt-1">
                    {schoolInfo.schoolName || '...........................................'}
                  </p>
                  <div className="h-20" />
                  <p className="border-t border-slate-400 inline-block px-8 pt-1">
                    ( {schoolInfo.contactPerson || 'Kepala Sekolah / Bendahara'} )
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Penyedia Barang &amp; Jasa:</p>
                  <p className="font-bold text-slate-900 mt-1">{BRAND.name}</p>
                  <div className="h-20" />
                  <p className="border-t border-slate-400 inline-block px-8 pt-1">
                    ( {CONTACTS[selectedContact].name} - {CONTACTS[selectedContact].role} )
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Checkout & Admin Selection Card (Hidden in print) */}
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-xs print:hidden space-y-5">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900 mb-1">
                  Kirim Permintaan Penawaran via WhatsApp
                </h3>
                <p className="text-xs text-slate-500">
                  Pilih nomor WhatsApp admin tujuan untuk menerima salinan rincian RAB yang sudah terformat rapi.
                </p>
              </div>

              {/* Admin radio selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    selectedContact === 'dina'
                      ? 'border-[#15803D] bg-emerald-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="adminContact"
                      value="dina"
                      checked={selectedContact === 'dina'}
                      onChange={() => setSelectedContact('dina')}
                      className="text-[#15803D] focus:ring-[#15803D]"
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-slate-900">
                        {CONTACTS.dina.name} ({CONTACTS.dina.role})
                      </p>
                      <p className="text-xs text-slate-500">{CONTACTS.dina.phone_display}</p>
                    </div>
                  </div>
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </label>

                <label
                  className={`p-3.5 rounded-xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    selectedContact === 'elmar'
                      ? 'border-[#15803D] bg-emerald-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="adminContact"
                      value="elmar"
                      checked={selectedContact === 'elmar'}
                      onChange={() => setSelectedContact('elmar')}
                      className="text-[#15803D] focus:ring-[#15803D]"
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-slate-900">
                        {CONTACTS.elmar.name} ({CONTACTS.elmar.role})
                      </p>
                      <p className="text-xs text-slate-500">{CONTACTS.elmar.phone_display}</p>
                    </div>
                  </div>
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </label>
              </div>

              {/* Main Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={waUrl}
                  onClick={handleSendWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-98"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Kirim Permintaan Penawaran via WhatsApp</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-md"
                >
                  <Printer className="w-5 h-5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
              </div>
            </div>

            {/* Back to Catalog */}
            <div className="pt-2 print:hidden">
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[var(--color-primary)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>+ Tambah Produk Lain dari Katalog</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
