import { createClient } from '@supabase/supabase-js';
import productsData from '@/data/products.json';
import type { Product, ProductsData } from '@/types/product';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://PROJECT-REF.supabase.co' &&
  !supabaseUrl.includes('PROJECT-REF')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const localProducts = (productsData as unknown as ProductsData).products;

export interface RabInquiryRecord {
  id?: string;
  school_name: string;
  city_regency: string;
  contact_name: string;
  contact_phone?: string;
  notes?: string;
  target_admin: string;
  items: Array<{
    id: string;
    name: string;
    qty: number;
    price_numeric: number;
    subtotal: number;
  }>;
  estimated_total: number;
  status?: 'baru' | 'diproses' | 'deal' | 'selesai';
  created_at?: string;
}

/**
 * Mengambil produk: dari Supabase jika terhubung, fallback ke products.json
 */
export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    } catch (e) {
      console.warn('Gagal memuat produk dari Supabase, beralih ke data lokal JSON:', e);
    }
  }
  return localProducts;
}

/**
 * Menyimpan permintaan RAB ke Supabase atau localStorage
 */
export async function recordRabInquiry(inquiry: RabInquiryRecord): Promise<{ success: boolean; id?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('rab_inquiries')
        .insert([
          {
            school_name: inquiry.school_name,
            city_regency: inquiry.city_regency,
            contact_name: inquiry.contact_name,
            contact_phone: inquiry.contact_phone || '',
            notes: inquiry.notes || '',
            target_admin: inquiry.target_admin,
            items: inquiry.items,
            estimated_total: inquiry.estimated_total,
            status: 'baru',
          },
        ])
        .select('id')
        .single();

      if (!error && data) {
        return { success: true, id: data.id };
      }
    } catch (e) {
      console.warn('Gagal menyimpan inquiry ke Supabase:', e);
    }
  }

  // Fallback to localStorage
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem('mahalaleel-local-inquiries') || '[]');
      const newRecord = {
        ...inquiry,
        id: `local-${Date.now()}`,
        status: 'baru',
        created_at: new Date().toISOString(),
      };
      existing.unshift(newRecord);
      localStorage.setItem('mahalaleel-local-inquiries', JSON.stringify(existing));
      return { success: true, id: newRecord.id };
    } catch {
      // ignore
    }
  }

  return { success: false };
}

/**
 * Mengambil riwayat RAB inquiries untuk halaman admin
 */
export async function getRabInquiries(): Promise<RabInquiryRecord[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('rab_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as RabInquiryRecord[];
      }
    } catch (e) {
      console.warn('Gagal memuat inquiries dari Supabase:', e);
    }
  }

  // Fallback to localStorage
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem('mahalaleel-local-inquiries') || '[]');
    } catch {
      return [];
    }
  }

  return [];
}
