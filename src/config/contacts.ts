export const CONTACTS = {
  dina: {
    name: 'Dina P',
    phone_display: '0857 0914 8987',
    wa_number: '6285709148987',
    role: 'Sales & Administrasi',
  },
  elmar: {
    name: 'Elmar S',
    phone_display: '0821 8158705',
    // CATATAN: Verifikasi ulang jumlah digit nomor WA ini sebelum launch
    // (tercetak 11 digit di katalog PDF, normalnya 12-13 digit)
    wa_number: '628218158705',
    wa_number_note: 'Verifikasi ulang jumlah digit nomor WA ini sebelum launch',
    role: 'Sales & Pengadaan',
  },
} as const;

export const BRAND = {
  name: 'UKM Mahalaleel School Supplies',
  tagline: 'Solusi Fasilitas Sekolah, Dari Kelas Hingga Lapangan',
  category_label: 'Usaha Kecil Menengah — Pengadaan Barang & Jasa',
  region: 'Sumatera Selatan',
  areas: [
    'Muara Enim',
    'Lahat',
    'Banyuasin',
    'Ogan Ilir',
    'Prabumulih',
    'Pagar Alam',
    'Empat Lawang',
    'Palembang',
  ],
  operationalHours: 'Senin–Sabtu, 08:00–17:00 WIB',
} as const;

export type ContactKey = keyof typeof CONTACTS;
