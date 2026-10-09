-- ========================================================
-- ThermalPOS Pro: Supabase Database Schema
-- Run this script in your Supabase SQL Editor
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. STORE SETTINGS TABLE
create table if not exists public.store_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  store_name text not null default 'UD BENTHENK KOMPUTER',
  tagline text default '',
  address text default 'Komp Balikpapan Baru Blok C No.6',
  phone text default 'Telp: 085251822145 | 087886935070',
  logo_url text default '/img/ben.jpeg',
  footer_note text default 'Barang yang sudah dibeli tidak dapat ditukar\natau dikembalikan\nTerima Kasih\nWA Admin : 085251822145',
  wifi_info text default '',
  qr_text text default '',
  paper_size text default '58mm',
  show_barcode boolean default false,
  show_qrcode boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PRODUCTS / INVENTORY TABLE
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  category text default 'Umum',
  price numeric not null default 0,
  unit text default 'pcs',
  stock integer default 100,
  sku text default '',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TRANSACTIONS / RECEIPT HISTORY TABLE
create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  receipt_no text not null,
  date_time timestamp with time zone default timezone('utc'::text, now()) not null,
  store_name text not null,
  cashier_name text default 'Kasir',
  sales_name text default 'Sales',
  customer_name text default '',
  items jsonb not null default '[]'::jsonb,
  subtotal numeric not null default 0,
  discount numeric not null default 0,
  tax_pct numeric not null default 0,
  service_amount numeric not null default 0,
  service_label text default 'Layanan',
  total_amount numeric not null default 0,
  payment_type text not null default 'TUNAI',
  payment_amount numeric not null default 0,
  change_amount numeric not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. BUSINESS TEMPLATES TABLE
create table if not exists public.business_templates (
  id uuid primary key default uuid_generate_v4(),
  template_key text unique not null,
  name text not null,
  store_name text not null,
  tagline text default '',
  address text default '',
  phone text default '',
  payment_method text default 'TUNAI',
  footer_note text default '',
  wifi_info text default '',
  qr_text text default '',
  show_barcode boolean default true,
  show_qrcode boolean default false,
  default_items jsonb not null default '[]'::jsonb,
  catalog_items jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS)
alter table public.store_settings enable row level security;
alter table public.products enable row level security;
alter table public.transactions enable row level security;
alter table public.business_templates enable row level security;

-- Policies for Authenticated Users (Read & Write own data)
create policy "Allow user all on store_settings" on public.store_settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Allow user all on products" on public.products
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Allow user all on transactions" on public.transactions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Templates can be read by all authenticated or public users
create policy "Allow read on business_templates" on public.business_templates
  for select using (true);

-- SEED INITIAL DATA FOR UD BENTHENK KOMPUTER TEMPLATE
insert into public.business_templates (template_key, name, store_name, tagline, address, phone, payment_method, footer_note, wifi_info, qr_text, show_barcode, show_qrcode, default_items, catalog_items)
values (
  'benthenk',
  'Benthenk Komputer',
  'UD BENTHENK KOMPUTER',
  '',
  'Komp Balikpapan Baru Blok C No.6',
  'Telp: 085251822145 | 087886935070',
  'QRIS',
  'Barang yang sudah dibeli tidak dapat ditukar\natau dikembalikan\nTerima Kasih\nWA Admin : 085251822145',
  '',
  '',
  false,
  false,
  '[{"name": "MEM VENOM RX DDR4 8GB/2666", "qty": 1, "unit": "pcs", "price": 900000}]'::jsonb,
  '[
    {"name": "MEM VENOM RX DDR4 8GB/2666", "unit": "pcs", "price": 900000},
    {"name": "SSD NVMe 512GB PCIe Gen3", "unit": "pcs", "price": 420000},
    {"name": "SSD SATA 2.5 256GB", "unit": "pcs", "price": 235000},
    {"name": "RAM DDR4 8GB 3200MHz", "unit": "pcs", "price": 280000},
    {"name": "Flashdisk SanDisk 32GB 3.0", "unit": "pcs", "price": 65000},
    {"name": "Mouse Wireless Silent", "unit": "pcs", "price": 85000},
    {"name": "Keyboard Mechanical RGB", "unit": "pcs", "price": 275000},
    {"name": "Kabel HDMI 2.0 4K 1.5M", "unit": "pcs", "price": 35000},
    {"name": "Thermal Paste Arctic MX-4", "unit": "pcs", "price": 75000},
    {"name": "Jasa Install Ulang + Software", "unit": "unit", "price": 100000}
  ]'::jsonb
) on conflict (template_key) do nothing;
