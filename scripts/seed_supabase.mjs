#!/usr/bin/env node
/**
 * Script Seeding Otomatis 137 Produk (G1–G137) ke Supabase PostgreSQL.
 * Jalankan: node scripts/seed_supabase.mjs
 * Membutuhkan: NEXT_PUBLIC_SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY di .env.local
 */
import fs from 'node:fs';
import path from 'node:path';

// Load .env.local jika ada
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('ERROR: Set NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'data/products.json'), 'utf8'));
const rows = raw.products.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  category: p.category,
  school_area: p.school_area,
  price_numeric: p.price_numeric,
  price_display: p.price_display,
  unit: p.unit,
  specs: p.specs,
  pdf_page: p.pdf_page,
  featured: p.featured,
  customizable: p.customizable,
  image_url: p.image_path,
  is_active: true,
}));

async function seed() {
  console.log(`Mengunggah ${rows.length} produk ke ${SUPABASE_URL}/rest/v1/products ...`);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`GAGAL (${res.status}):`, errText);
    process.exit(1);
  }
  console.log(`BERHASIL! ${rows.length} produk (G1–G137) telah tersimpan di Supabase.`);
}

seed();
