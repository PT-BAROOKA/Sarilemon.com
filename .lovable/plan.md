

# Sistem Auto Blog Post + Halaman Blog

## Ringkasan

Implementasi sistem blog otomatis berdasarkan dokumen yang diunggah: edge function yang generate artikel via OpenAI GPT-4o-mini, dijadwalkan otomatis via pg_cron, serta halaman blog (list dan detail) di frontend.

## Prasyarat

- **Supabase Backend**: Perlu diaktifkan terlebih dahulu (saat ini belum ada setup Supabase)
- **OpenAI API Key**: Perlu ditambahkan sebagai secret untuk edge function

## Langkah Implementasi

### 1. Aktivasi Supabase Backend

Mengaktifkan Lovable Cloud (Supabase) untuk project ini agar tersedia database, edge functions, dan storage.

### 2. Database Schema

Membuat tabel `lemon_blog_posts` (mengikuti konvensi prefix `lemon_`) dengan kolom:
- `id`, `title`, `slug`, `content_html`, `excerpt`
- `meta_title`, `meta_description`, `keywords[]`, `tags[]`
- `featured_image_url`, `og_image_url`
- `word_count`, `reading_time_minutes`
- `status` (draft/published), `source` (ai/manual)
- `published_at`, `created_at`, `updated_at`

RLS policy: public read untuk status = 'published'.

Storage bucket `blog-images` (public) untuk gambar featured dan OG.

### 3. Edge Function: `auto-publish-blog`

Mengikuti dokumen yang diunggah:
- Generate konten artikel via GPT-4o-mini tentang topik sari lemon, kesehatan, dan produk alami
- Generate gambar featured + OG via DALL-E 3
- Upload gambar ke Supabase Storage
- Insert artikel ke `lemon_blog_posts` dengan status 'published'
- Cek duplikat: maksimal 1 artikel per hari
- `verify_jwt = false` di config.toml

### 4. Cron Job

Setup pg_cron untuk menjalankan edge function setiap hari jam 09:00 UTC (16:00 WIB) via SQL insert.

### 5. Halaman Frontend

#### a. Blog List Page (`/blog`)

- Route baru di App.tsx
- Grid responsif menampilkan semua artikel published
- Setiap card: featured image, judul, excerpt, tanggal, reading time, tags
- Pagination atau infinite scroll
- Styling konsisten dengan desain Sarilemon.id (font Playfair Display untuk judul, DM Sans untuk body)

#### b. Blog Detail Page (`/blog/:slug`)

- Menampilkan artikel lengkap: judul, featured image, metadata, konten HTML
- SEO meta tags via react-helmet-async
- Breadcrumb navigasi (Home > Blog > Judul Artikel)
- Sidebar: artikel terkait
- Tombol share / WhatsApp CTA
- Render HTML via `dangerouslySetInnerHTML` dengan DOMPurify sanitization

#### c. Navigasi

- Tambah link "Blog" di Navbar (desktop dan mobile)
- Tambah link "Blog" di Footer

### 6. Styling Blog Content

Tambah CSS khusus `.blog-content` di index.css untuk formatting paragraf, heading, list, dan blockquote dari konten HTML yang di-generate.

## Detail Teknis

### File yang Dibuat

| File | Keterangan |
|------|-----------|
| `supabase/functions/auto-publish-blog/index.ts` | Edge function generate + publish |
| `src/pages/Blog.tsx` | Halaman daftar artikel |
| `src/pages/BlogPost.tsx` | Halaman detail artikel |
| Migration SQL | Tabel `lemon_blog_posts` + RLS + storage bucket |

### File yang Dimodifikasi

| File | Perubahan |
|------|-----------|
| `src/App.tsx` | Tambah route `/blog` dan `/blog/:slug` |
| `src/components/landing/Navbar.tsx` | Tambah link Blog |
| `src/components/landing/Footer.tsx` | Tambah link Blog |
| `supabase/config.toml` | Config verify_jwt untuk edge function |
| `src/index.css` | CSS `.blog-content` |

### Estimasi Biaya per Artikel

- GPT-4o-mini: ~$0.01
- DALL-E 3 (2 gambar): ~$0.08
- Total: ~$0.09/artikel (~Rp 1.400)

