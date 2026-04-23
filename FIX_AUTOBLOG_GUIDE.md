# Panduan Fix Auto Blogpost untuk Website Lovable + Supabase

## Konteks Masalah
Website dibangun dengan Lovable yang otomatis membuat Supabase project sendiri (PROJECT_LOVABLE).
Namun, data sebenarnya disimpan di Supabase project milik user (PROJECT_USER) via `externalClient.ts`.
Akibatnya, Edge Function, cron job, dan frontend sering salah mengarah ke project Lovable.

---

## Langkah-Langkah Fix

### 1. Identifikasi Dua Project Supabase

Cari project ref masing-masing:

- **PROJECT_LOVABLE**: Lihat di `.env` file → `VITE_SUPABASE_PROJECT_ID`
- **PROJECT_USER**: Lihat di `src/integrations/supabase/externalClient.ts` → URL-nya mengandung project ref

Contoh:
```
PROJECT_LOVABLE = "xjuncfctptangrqvnrdb"  (dari .env)
PROJECT_USER    = "wfthvovlhphnrodrqxqt"  (dari externalClient.ts)
```

### 2. Fix `supabase/config.toml`

Pastikan `project_id` mengarah ke PROJECT_USER, bukan PROJECT_LOVABLE:

```toml
project_id = "<PROJECT_USER>"

[functions.auto-publish-blog]
verify_jwt = false
```

### 3. Deploy Edge Function ke Project User

```bash
# Login dulu jika belum
supabase login

# Deploy edge function ke project yang benar
supabase functions deploy auto-publish-blog --project-ref <PROJECT_USER> --no-verify-jwt
```

### 4. Pastikan Secrets Sudah Ada di Supabase Project User

Buka Supabase Dashboard → Project User → Settings → Edge Functions → Secrets.
Pastikan secrets berikut sudah ada:
- `OPENAI_API_KEY` (atau `OPENAI_API_KEY_V2` sesuai kode Edge Function)
- `SUPABASE_URL` (otomatis ada)
- `SUPABASE_SERVICE_ROLE_KEY` (otomatis ada)

Cek nama env var di file `supabase/functions/auto-publish-blog/index.ts`:
```typescript
Deno.env.get("OPENAI_API_KEY")  // pastikan nama secret sesuai
```

### 5. Disable JWT Verification di Dashboard

Buka Supabase Dashboard → Project User → Edge Functions → `auto-publish-blog` → Settings:
- Matikan toggle **"Verify JWT with legacy secret"**
- Ini wajib agar cron job bisa memanggil function tanpa Authorization header

### 6. Test Edge Function Manual

```bash
curl -X POST "https://<PROJECT_USER>.supabase.co/functions/v1/auto-publish-blog" \
  -H "Content-Type: application/json" \
  -d "{}"
```

Jika response 200 dan blog post terbuat → lanjut ke langkah berikutnya.

Jika error:
- **401**: JWT verification masih aktif, matikan di Dashboard
- **"Post already exists within 2 days"**: Function lama masih ter-deploy, redeploy dari repo
- **500**: Cek Edge Function logs di Dashboard

### 7. Setup Cron Job di SQL Editor

Buka Supabase Dashboard → Project User → SQL Editor, jalankan:

```sql
-- Hapus cron lama jika ada
SELECT cron.unschedule('auto-publish-blog') WHERE EXISTS (
  SELECT 1 FROM cron.job WHERE jobname = 'auto-publish-blog'
);

-- Buat cron baru: setiap hari jam 01:00 UTC (08:00 WIB)
SELECT cron.schedule(
  'auto-publish-blog',
  '0 1 * * *',
  $$
  SELECT net.http_post(
    url := 'https://<PROJECT_USER>.supabase.co/functions/v1/auto-publish-blog',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
```

Verifikasi cron terdaftar:
```sql
SELECT jobid, jobname, schedule, command FROM cron.job WHERE jobname = 'auto-publish-blog';
```

### 8. Fix Frontend — Blog.tsx dan BlogPost.tsx

Pastikan `Blog.tsx` dan `BlogPost.tsx` mengimport dari `externalClient`, BUKAN dari `client.ts`:

```typescript
// BENAR - pakai externalClient (project user)
import { externalSupabase as supabase } from "@/integrations/supabase/externalClient";

// SALAH - ini mengarah ke project Lovable
// import { supabase } from "@/integrations/supabase/client";
```

### 9. Fix Migration Files

Update semua URL di folder `supabase/migrations/` yang masih mengarah ke PROJECT_LOVABLE:

Cari dan ganti:
```
https://<PROJECT_LOVABLE>.supabase.co → https://<PROJECT_USER>.supabase.co
```

### 10. Migrasi Blog Posts Lama (Jika Ada)

Jika ada blog posts yang sudah ada di PROJECT_LOVABLE dan perlu dipindahkan ke PROJECT_USER:

1. Buka Supabase Dashboard → PROJECT_LOVABLE → SQL Editor
2. Jalankan query untuk export data:
```sql
SELECT * FROM lemon_blog_posts WHERE status = 'published' ORDER BY published_at;
```
3. Buat INSERT statement dari data tersebut
4. Jalankan INSERT di PROJECT_USER → SQL Editor

**Penting**: Jangan pakai `ON CONFLICT (slug) DO NOTHING` kecuali sudah ada unique index pada kolom slug.

### 11. Verifikasi Semua Berjalan

- [ ] Edge Function ter-deploy di PROJECT_USER
- [ ] JWT verification dimatikan
- [ ] Test manual curl berhasil (200)
- [ ] Cron job terdaftar di `cron.job`
- [ ] Frontend menampilkan blog posts dari PROJECT_USER
- [ ] Blog posts lama sudah dimigrasikan
- [ ] Push perubahan ke git

---

## Diagnostik Cron Job

Jika cron tidak jalan, cek dengan query berikut di SQL Editor PROJECT_USER:

```sql
-- Cek semua cron job
SELECT jobid, jobname, schedule, command FROM cron.job;

-- Cek run history
SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;

-- Cek HTTP response dari cron
SELECT id, status_code, content FROM net._http_response ORDER BY created DESC LIMIT 10;
```

---

## Checklist Singkat

1. Identifikasi PROJECT_LOVABLE vs PROJECT_USER
2. Fix config.toml → project_id = PROJECT_USER
3. Deploy Edge Function ke PROJECT_USER
4. Cek secrets di Supabase Dashboard
5. Matikan JWT verification
6. Test curl manual
7. Setup cron job via SQL Editor
8. Fix import di Blog.tsx & BlogPost.tsx → externalClient
9. Fix URL di migration files
10. Migrasi data blog lama
11. Push ke git