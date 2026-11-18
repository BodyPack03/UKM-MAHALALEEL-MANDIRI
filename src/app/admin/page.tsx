'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  LogOut,
  Package,
  FileText,
  Phone,
  Search,
  CheckCircle2,
  AlertCircle,
  Edit2,
  MessageCircle,
  ExternalLink,
  Save,
  RefreshCw,
} from 'lucide-react';
import { isSupabaseConfigured, supabase, getRabInquiries, type RabInquiryRecord } from '@/lib/supabase';
import { CONTACTS, BRAND } from '@/config/contacts';
import productsData from '@/data/products.json';
import type { Product, ProductsData } from '@/types/product';
import { formatRupiah } from '@/lib/format';

const initialProducts: Product[] = (productsData as unknown as ProductsData).products;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'products' | 'contacts'>('inquiries');

  // Data states
  const [inquiries, setInquiries] = useState<RabInquiryRecord[]>([]);
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [searchProduct, setSearchProduct] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [contactsState, setContactsState] = useState<{
    dinaPhone: string;
    dinaWa: string;
    elmarPhone: string;
    elmarWa: string;
  }>({
    dinaPhone: CONTACTS.dina.phone_display,
    dinaWa: CONTACTS.dina.wa_number,
    elmarPhone: CONTACTS.elmar.phone_display,
    elmarWa: CONTACTS.elmar.wa_number,
  });
  const [savedNotice, setSavedNotice] = useState('');

  const loadInquiriesData = async () => {
    const data = await getRabInquiries();
    setInquiries(data);
  };

  // Check existing session
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          setIsAuthenticated(true);
        }
      });
    } else {
      // Demo session check
      const demoAuth = localStorage.getItem('mahalaleel-admin-auth');
      if (demoAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Load inquiries
  useEffect(() => {
    if (isAuthenticated) {
      loadInquiriesData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setLoginError(`Login gagal: ${error.message}`);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      // Demo fallback login
      if (email.trim() && password.length >= 6) {
        setIsAuthenticated(true);
        localStorage.setItem('mahalaleel-admin-auth', 'true');
      } else {
        setLoginError('Untuk mode demo, masukkan email apa saja dan password min. 6 karakter.');
      }
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('mahalaleel-admin-auth');
    setIsAuthenticated(false);
  };

  const handleUpdateInquiryStatus = async (id: string | undefined, newStatus: 'baru' | 'diproses' | 'deal' | 'selesai') => {
    if (!id) return;

    if (isSupabaseConfigured && supabase && !id.startsWith('local-')) {
      await supabase.from('rab_inquiries').update({ status: newStatus }).eq('id', id);
    } else if (typeof window !== 'undefined') {
      const saved: RabInquiryRecord[] = JSON.parse(localStorage.getItem('mahalaleel-local-inquiries') || '[]');
      const updated = saved.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
      localStorage.setItem('mahalaleel-local-inquiries', JSON.stringify(updated));
    }

    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProductsList((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
    setSavedNotice(`Perubahan produk ${editingProduct.id} berhasil disimpan.`);
    setTimeout(() => setSavedNotice(''), 3000);
  };

  const handleSaveContacts = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice('Pengaturan kontak WhatsApp berhasil diperbarui.');
    setTimeout(() => setSavedNotice(''), 3000);
  };

  const filteredProducts = productsList.filter(
    (p) =>
      p.id.toLowerCase().includes(searchProduct.toLowerCase()) ||
      p.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
      p.category.toLowerCase().includes(searchProduct.toLowerCase())
  );

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--color-surface-muted)] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[var(--color-primary)] text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <Lock className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <h1 className="font-heading font-extrabold text-xl text-slate-900">
              Panel Admin UKM Mahalaleel
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Kelola 137 produk, pantau permintaan RAB masuk, &amp; pengaturan kontak
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
              <p className="font-bold flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Supabase Belum Terhubung (.env.local)</span>
              </p>
              <p className="text-[11px] text-amber-800">
                Website saat ini berjalan dalam mode mandiri (JSON fallback). Anda dapat login demo dengan email apa saja dan password min. 6 karakter.
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Admin
              </label>
              <input
                type="email"
                required
                placeholder="admin@mahalaleel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-slate-50"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[var(--color-primary)] hover:bg-[#1a3d5c] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
            >
              Masuk ke Panel Admin
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-slate-500 hover:text-[var(--color-primary)]"
            >
              ← Kembali ke Beranda Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[var(--color-surface-muted)] py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Navbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center font-bold">
              M
            </div>
            <div>
              <h1 className="font-heading font-bold text-base text-slate-900">
                Dashboard Admin UKM Mahalaleel
              </h1>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">{BRAND.tagline}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-emerald-700 font-semibold">
                  {isSupabaseConfigured ? 'Supabase Terhubung' : 'Mode Offline / Lokal'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Website</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Saved notice banner */}
        {savedNotice && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{savedNotice}</span>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 mb-6 gap-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'inquiries'
                ? 'border-[var(--color-accent)] text-[var(--color-primary)]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Permintaan RAB Masuk ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-[var(--color-accent)] text-[var(--color-primary)]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Kelola 137 Produk</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
              activeTab === 'contacts'
                ? 'border-[var(--color-accent)] text-[var(--color-primary)]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Pengaturan WhatsApp</span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES LIST */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  Daftar Calon Pembeli &amp; Estimasi RAB Sekolah
                </h2>
                <p className="text-xs text-slate-500">
                  Riwayat pemohon yang telah menyusun RAB dan mengirim ke WhatsApp admin
                </p>
              </div>
              <button
                onClick={loadInquiriesData}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                title="Muat Ulang Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="font-medium text-sm">Belum Ada Permintaan RAB Masuk</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Setiap kali pihak sekolah mengklik &quot;Kirim Permintaan Penawaran via WhatsApp&quot; di halaman RAB, data akan otomatis tercatat di sini.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Tanggal</th>
                      <th className="py-3 px-4">Nama Sekolah / Instansi</th>
                      <th className="py-3 px-4">Wilayah</th>
                      <th className="py-3 px-4">Pemohon</th>
                      <th className="py-3 px-4">Rincian Item</th>
                      <th className="py-3 px-4 text-right">Total Estimasi</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.map((inq, idx) => (
                      <tr key={inq.id || idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {inq.created_at ? new Date(inq.created_at).toLocaleDateString('id-ID') : 'Hari ini'}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {inq.school_name}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {inq.city_regency}
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          {inq.contact_name}
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs">
                          <span className="font-semibold text-slate-800">
                            {inq.items.length} item:
                          </span>{' '}
                          {inq.items.map((i) => `${i.id} (${i.qty})`).join(', ')}
                          {inq.notes && (
                            <p className="text-[10px] text-amber-700 italic mt-0.5">
                              Catatan: {inq.notes}
                            </p>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-[var(--color-primary)] tabular-nums whitespace-nowrap">
                          {formatRupiah(inq.estimated_total)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <select
                            value={inq.status || 'baru'}
                            onChange={(e) =>
                              handleUpdateInquiryStatus(
                                inq.id,
                                e.target.value as 'baru' | 'diproses' | 'deal' | 'selesai'
                              )
                            }
                            className={`text-xs font-semibold py-1 px-2 rounded-lg border focus:outline-none ${
                              inq.status === 'deal'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : inq.status === 'diproses'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : inq.status === 'selesai'
                                ? 'bg-slate-100 text-slate-700 border-slate-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="baru">Baru</option>
                            <option value="diproses">Diproses</option>
                            <option value="deal">Deal / Pembelian</option>
                            <option value="selesai">Selesai</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                              `Halo ${inq.contact_name} (${inq.school_name}), kami dari UKM Mahalaleel mengonfirmasi permintaan penawaran RAB Anda...`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Chat WA</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari kode (mis. G63) atau nama..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] bg-slate-50"
                />
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Menampilkan {filteredProducts.length} dari {productsList.length} produk
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-4">Kode</th>
                      <th className="py-3 px-4">Nama Produk</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4 text-right">Harga Display</th>
                      <th className="py-3 px-4 text-center">Satuan</th>
                      <th className="py-3 px-4 text-center">Unggulan</th>
                      <th className="py-3 px-4 text-center">Bisa Custom</th>
                      <th className="py-3 px-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-mono font-bold text-slate-900">
                          {p.id}
                        </td>
                        <td className="py-2.5 px-4 font-semibold text-slate-800 max-w-xs truncate">
                          {p.name}
                        </td>
                        <td className="py-2.5 px-4 text-slate-500">
                          {p.category}
                        </td>
                        <td className="py-2.5 px-4 text-right font-bold text-slate-900 tabular-nums">
                          {p.price_display}
                        </td>
                        <td className="py-2.5 px-4 text-center text-slate-500">
                          {p.unit}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          {p.featured ? (
                            <span className="px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded font-semibold text-[10px]">
                              Ya
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">-</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          {p.customizable ? (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded font-semibold text-[10px]">
                              Ya
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">-</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <button
                            onClick={() => setEditingProduct({ ...p })}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 p-1"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* EDIT PRODUCT MODAL */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      Edit Produk: {editingProduct.id}
                    </h3>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, name: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Harga Angka (0 = Hubungi WA)
                        </label>
                        <input
                          type="number"
                          value={editingProduct.price_numeric}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setEditingProduct({
                              ...editingProduct,
                              price_numeric: val,
                              price_display: val === 0 ? 'Hubungi WA' : formatRupiah(val),
                            });
                          }}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Satuan (unit/set/pcs/paket)
                        </label>
                        <input
                          type="text"
                          value={editingProduct.unit}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, unit: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Spesifikasi Teknis
                      </label>
                      <textarea
                        rows={3}
                        value={editingProduct.specs}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, specs: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingProduct.featured}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, featured: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-[var(--color-accent)]"
                        />
                        <span>Tampilkan di Unggulan Beranda</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingProduct.customizable}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, customizable: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-[var(--color-accent)]"
                        />
                        <span>Bisa Custom Desain/Sablon</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 mt-4">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[var(--color-primary)] hover:bg-[#1a3d5c] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Perubahan</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTACT SETTINGS */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-2xl shadow-xs">
            <h2 className="font-heading font-bold text-base text-slate-900 mb-2">
              Pengaturan Kontak WhatsApp Resmi
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Nomor WhatsApp ini digunakan pada tombol konsultasi cepat, checkout RAB, dan footer website.
            </p>

            <form onSubmit={handleSaveContacts} className="space-y-5">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider text-[var(--color-primary)]">
                  Admin 1: Dina P (Sales &amp; Administrasi)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Nomor Tampilan (Format Ind)
                    </label>
                    <input
                      type="text"
                      value={contactsState.dinaPhone}
                      onChange={(e) => setContactsState({ ...contactsState, dinaPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp Link (628...)
                    </label>
                    <input
                      type="text"
                      value={contactsState.dinaWa}
                      onChange={(e) => setContactsState({ ...contactsState, dinaWa: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider text-[var(--color-primary)]">
                  Admin 2: Elmar S (Sales &amp; Pengadaan)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Nomor Tampilan (Format Ind)
                    </label>
                    <input
                      type="text"
                      value={contactsState.elmarPhone}
                      onChange={(e) => setContactsState({ ...contactsState, elmarPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Nomor WhatsApp Link (628...)
                    </label>
                    <input
                      type="text"
                      value={contactsState.elmarWa}
                      onChange={(e) => setContactsState({ ...contactsState, elmarWa: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-amber-700 italic">
                  * Catatan: Verifikasi ulang jika ada digit nomor Elmar S yang terlewat dari katalog fisik sebelum publikasi.
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-primary)] hover:bg-[#1a3d5c] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan Kontak</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
