

## Ubah Warna "Sari Lemon" Menjadi Kuning (Lemon Gold)

Mengubah semua teks "Sari Lemon" / "SariLemon" yang memiliki warna hijau (text-primary) menjadi warna kuning/lemon gold agar sesuai dengan identitas produk lemon.

---

### Perubahan yang akan dilakukan:

**1. WhyUsSection.tsx** (seperti di screenshot)
- Teks `SariLemon.com` yang saat ini berwarna hijau (`text-primary`) akan diubah menjadi kuning (`text-lemon-gold`)

**2. Cek dan sesuaikan komponen lain** jika ada teks "Sari Lemon" yang perlu diubah warnanya di:
- MaklonSection (judul "Bangun Brand Sari Lemon")
- ProductsSection (judul "Sari Lemon Murni untuk")
- BuyersSection (heading)

---

### Detail Teknis

Menggunakan class `text-lemon-gold` yang sudah tersedia di Tailwind config (warna `hsl(var(--lemon-gold))` = kuning keemasan) untuk menggantikan `text-primary` (hijau) pada kata-kata "Sari Lemon" / "SariLemon.com".

Perubahan hanya pada class CSS, tidak ada perubahan konten teks.
