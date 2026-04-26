# LegalBridge — Supabase Plan

## Purpose

Supabase will become the main backend layer for LegalBridge.

The current Google Sheets CRM remains the operational view for the team, but Supabase will become the structured database and file storage layer.

Current phase:

Website → Supabase

Next phase:

Website / Bots → Supabase → Google Sheets operational sync

---

## MVP Backend Goals

The first Supabase integration should support:

* website order submission
* structured order storage
* file upload
* order-file relationship
* future Google Sheets sync
* future Telegram / Viber bot intake

The first version does not need:

* admin dashboard
* customer login
* online payment
* public order tracking
* complex role management

---

## Tables

## 1. orders

Stores one submitted request / order.

Recommended MVP schema:

```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  customer_name text not null,
  phone text not null,
  subject_full_name text not null,

  service_group text not null,
  service_id text not null,

  source text not null default 'website_form',
  status text not null default 'new',

  intake_details text,
  files_count int not null default 0,

  urgency text,
  apostille text,
  translation text,
  extract_type text,
  purpose_code text,

  customer_type text not null default 'b2c',
  payment_status text not null default 'unpaid',

  internal_note text
);
```

---

## 2. order_files

Stores files attached to orders.

Recommended MVP schema:

```sql
create table order_files (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  order_id uuid not null references orders(id) on delete cascade,

  file_name text not null,
  file_path text not null,
  file_type text,
  file_size bigint,

  source text not null default 'website_form'
);
```

---

## Storage

Create a private Supabase Storage bucket:

```text
order-files
```

Recommended file path format:

```text
order-files/{order_id}/{safe_filename}
```

Files must not be public.

Future access should use signed URLs.

---

## API Flow

Website form submits to:

```text
POST /api/orders
```

API flow:

```text
1. Validate request
2. Create order row in orders
3. Upload files to order-files bucket
4. Create order_files rows
5. Return success response
```

---

## Security Rules

This system handles sensitive personal and legal data.

Do not expose uploaded files publicly.

Do not log:

* passports
* tax IDs
* personal document data
* raw file URLs
* sensitive intake details

Use private storage bucket.

Use signed URLs later when files need to be viewed.

---

## Future Google Sheets Sync

Google Sheets should not be the public backend.

Future flow:

```text
Supabase orders
        ↓
Google Sheets Orders
```

Possible sync methods:

* Supabase Edge Function
* scheduled sync
* webhook
* Apps Script pull from Supabase
* manual export initially

---

## Future Bot Compatibility

Telegram and Viber bots should create the same order payload as the website.

All intake sources should map into the same `orders` table.

Expected sources:

* website_form
* telegram_bot
* viber_bot
* whatsapp_manual
* telegram_manual
* viber_manual
* instagram_manual
* manual

---

## Future Extensions

Possible future tables:

```text
customers
services
service_content
pricing
tasks
order_status_history
order_messages
order_assignments
executors
```

Do not overbuild these in MVP.

Start with:

* orders
* order_files
* storage bucket

```
```
