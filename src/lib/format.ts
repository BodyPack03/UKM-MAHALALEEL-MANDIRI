import type { Product, RABItem, SchoolInfo } from '@/types/product';
import { CONTACTS, type ContactKey } from '@/config/contacts';

/**
 * Format angka ke format Rupiah Indonesia
 * Contoh: 7000000 → "Rp 7.000.000"
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Tampilkan harga produk (handle "Hubungi WA" untuk price_numeric === 0)
 */
export function displayPrice(product: Product): string {
  if (product.price_numeric === 0) {
    return 'Hubungi WA';
  }
  return product.price_display;
}

/**
 * Generate slug dari nama produk
 */
export function generateSlug(id: string, name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return `${id.toLowerCase()}-${slug}`;
}

/**
 * Build URL WhatsApp untuk pesan cepat produk individual
 */
export function buildProductWhatsAppUrl(
  product: Product,
  quantity: number,
  contactKey: ContactKey = 'dina'
): string {
  const contact = CONTACTS[contactKey];
  const priceText = product.price_numeric === 0
    ? 'Konfirmasi Harga'
    : product.price_display;

  const message = [
    `Halo ${contact.name}, saya tertarik dengan produk berikut:`,
    '',
    `📦 *${product.id} - ${product.name}*`,
    `💰 Harga: ${priceText}/${product.unit}`,
    `📏 Jumlah: ${quantity} ${product.unit}`,
    product.price_numeric > 0 ? `💵 Subtotal: ${formatRupiah(product.price_numeric * quantity)}` : '',
    '',
    `🔗 Detail: ${typeof window !== 'undefined' ? window.location.origin : ''}/produk/${product.slug}`,
    '',
    'Mohon informasi ketersediaan dan proses pengadaannya. Terima kasih! 🙏',
  ].filter(Boolean).join('\n');

  return `https://wa.me/${contact.wa_number}?text=${encodeURIComponent(message)}`;
}

/**
 * Build URL WhatsApp untuk Keranjang RAB (checkout)
 */
export function buildRABWhatsAppUrl(
  items: RABItem[],
  schoolInfo: SchoolInfo,
  contactKey: ContactKey = 'dina'
): string {
  const contact = CONTACTS[contactKey];

  const itemLines = items.map((item, index) => {
    const priceText = item.product.price_numeric === 0
      ? 'Konfirmasi Harga'
      : `${item.product.price_display}/${item.product.unit}`;
    const subtotalText = item.product.price_numeric > 0
      ? ` → ${formatRupiah(item.product.price_numeric * item.quantity)}`
      : ' → *Konfirmasi Harga*';
    return `${index + 1}. ${item.product.id} - ${item.product.name}\n   ${priceText} × ${item.quantity}${subtotalText}`;
  });

  const totalNumeric = items.reduce((sum, item) => {
    return sum + (item.product.price_numeric > 0 ? item.product.price_numeric * item.quantity : 0);
  }, 0);

  const hasUnpriced = items.some(item => item.product.price_numeric === 0);

  const message = [
    `📋 *PERMINTAAN ESTIMASI RAB*`,
    `UKM Mahalaleel School Supplies`,
    '',
    `🏫 *Data Sekolah/Instansi:*`,
    `Nama: ${schoolInfo.schoolName || '-'}`,
    `Kab/Kota: ${schoolInfo.city || '-'}`,
    `Pemohon: ${schoolInfo.contactPerson || '-'}`,
    schoolInfo.notes ? `Catatan: ${schoolInfo.notes}` : '',
    '',
    `📦 *Daftar Item RAB:*`,
    ...itemLines,
    '',
    `💰 *Total Estimasi: ${formatRupiah(totalNumeric)}*`,
    hasUnpriced ? '⚠️ Beberapa item memerlukan konfirmasi harga terpisah.' : '',
    '',
    `Mohon dibuatkan penawaran resmi. Terima kasih! 🙏`,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${contact.wa_number}?text=${encodeURIComponent(message)}`;
}
