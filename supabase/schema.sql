-- ============================================================================
-- UKM MAHALALEEL SCHOOL SUPPLIES — SUPABASE POSTGRESQL SCHEMA
-- Jalankan otomatis oleh Agent AI (via Supabase CLI / MCP) atau SQL Editor
-- ============================================================================

-- 1. Tabel Produk (137 item G1-G137)
create table if not exists public.products (
  id text primary key,                          -- Contoh: 'G1', 'G136'
  slug text unique not null,                    -- URL ramah SEO
  name text not null,
  category text not null,
  school_area text not null,
  price_numeric bigint not null default 0,      -- 0 = 'Hubungi WA'
  price_display text not null,
  unit text not null default 'unit',
  specs text,
  pdf_page integer,
  featured boolean not null default false,
  customizable boolean not null default false,
  image_url text,                               -- URL publik Supabase Storage / lokal
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_category on public.products (category);
create index if not exists idx_products_area on public.products (school_area);
create index if not exists idx_products_featured on public.products (featured);

-- 2. Tabel Riwayat Permintaan RAB / Penawaran Sekolah (Lead Tracking)
create table if not exists public.rab_inquiries (
  id uuid primary key default gen_random_uuid(),
  school_name text not null,
  city_regency text,
  contact_name text not null,
  contact_phone text,
  notes text,
  target_admin text not null default 'Dina P',  -- 'Dina P' atau 'Elmar S'
  items jsonb not null default '[]'::jsonb,     -- [{id, name, qty, price_numeric, subtotal}]
  estimated_total bigint not null default 0,
  status text not null default 'baru',          -- 'baru', 'diproses', 'deal', 'selesai'
  created_at timestamptz not null default now()
);

-- 3. Tabel Pengaturan Situs (Nomor WA, Pengumuman, Banner)
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value)
values (
  'contacts',
  '{"dina": {"name": "Dina P", "phone_display": "0857 0914 8987", "wa_e164": "6285709148987"}, "elmar": {"name": "Elmar S", "phone_display": "0821 8158705", "wa_e164": "628218158705"}}'::jsonb
)
on conflict (key) do nothing;

-- 4. Row Level Security (RLS)
alter table public.products enable row level security;
alter table public.rab_inquiries enable row level security;
alter table public.site_settings enable row level security;

-- Publik boleh membaca produk aktif & pengaturan situs
drop policy if exists "Public can view active products" on public.products;
create policy "Public can view active products"
  on public.products for select
  using (is_active = true);

drop policy if exists "Public can view site settings" on public.site_settings;
create policy "Public can view site settings"
  on public.site_settings for select
  using (true);

-- Publik boleh mengirim permintaan RAB baru (insert only)
drop policy if exists "Public can submit RAB inquiry" on public.rab_inquiries;
create policy "Public can submit RAB inquiry"
  on public.rab_inquiries for insert
  with check (true);

-- Admin yang login (authenticated) memiliki akses penuh CRUD
drop policy if exists "Admin full access products" on public.products;
create policy "Admin full access products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Admin full access inquiries" on public.rab_inquiries;
create policy "Admin full access inquiries"
  on public.rab_inquiries for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "Admin full access settings" on public.site_settings;
create policy "Admin full access settings"
  on public.site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 5. Storage Bucket publik untuk foto produk
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "Admin manage product images" on storage.objects;
create policy "Admin manage product images"
  on storage.objects for all
  using (bucket_id = 'product-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');
