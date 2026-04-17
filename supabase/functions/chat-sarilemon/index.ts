import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

const SYSTEM_PROMPT = `Kamu adalah customer service AI dari SariLemon.com, bagian dari PT Barooka Global Indonesia — produsen dan supplier sari lemon murni 100% asli tanpa pengawet.

INFORMASI PERUSAHAAN:
- Nama: SariLemon.com (PT Barooka Global Indonesia)
- Lokasi Gudang: Tangerang Selatan, Banten
- Asal Produksi: Jawa Barat
- WhatsApp: 6285647486700
- Website: SariLemon.com
- Sertifikasi: PIRT

PRODUK:
1. Sari Lemon Murni — 100% sari lemon tanpa campuran, kaya vitamin C dan antioksidan. Volume: 500ml / 1L / 5L / 25L. Masa simpan 12 bulan.
2. Cuka Apel — Fermentasi alami dari apel pilihan, mengandung enzim dan probiotik. Volume: 500ml / 1L / 5L. Masa simpan 24 bulan.
3. Chia Seed — Superfood kaya serat dan omega-3. Berat: 250g / 500g / 1kg. Masa simpan 18 bulan.
4. Garam Himalaya — Garam pink alami mengandung 84 mineral. Berat: 250g / 500g / 1kg. Masa simpan 36 bulan.
5. Sari Jeruk Nipis — 100% sari jeruk nipis murni tanpa pengawet. Volume: 500ml / 1L / 5L. Masa simpan 12 bulan.

MANFAAT SARI LEMON:
- Meningkatkan imunitas tubuh
- Membantu diet dan detoksifikasi
- Mencerahkan kulit wajah alami
- Melancarkan pencernaan dan metabolisme
- Antioksidan alami melawan radikal bebas

KEGUNAAN:
- Minuman diet harian (campurkan air hangat)
- Masker wajah alami
- Salad dressing
- Infused water
- Campuran teh dan minuman herbal
- Bahan baku industri F&B

PEMESANAN:
- Eceran: Botol 500ml
- Grosir: Karton (12 botol), min order 5 karton
- Curah: Jerigen 5L, min order 10 jerigen
- Curah Besar: Drum 200L, min order 1 drum
- Lead time: 1-3 hari (kecil), 3-7 hari (sedang), 7-14 hari (besar)

LAYANAN MAKLON:
- SariLemon menerima jasa maklon/OEM untuk brand sendiri
- Bisa custom label, volume, dan formulasi

ATURAN MENJAWAB:
- Jawab dalam Bahasa Indonesia, sopan, ramah, dan profesional
- Jawaban singkat dan jelas (max 3-4 kalimat per paragraf)
- JANGAN gunakan simbol markdown seperti **, ##, *, -, atau emoji
- Tulis dalam kalimat biasa yang mengalir, bukan poin-poin atau daftar
- Jika ditanya harga spesifik, arahkan ke WhatsApp: 0856-4748-6700
- Jika pertanyaan di luar topik produk, jawab sopan bahwa kamu hanya bisa membantu seputar produk SariLemon
- Jangan mengada-ada informasi yang tidak ada di atas
- Untuk pertanyaan detail atau order, selalu sarankan hubungi WhatsApp: 0856-4748-6700`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is not configured");

    const { message, history } = await req.json();

    if (!message) throw new Error("message is required");

    const messages: Array<{ role: string; content: string }> = [];

    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-10);
      for (const msg of recentHistory) {
        messages.push({ role: msg.role, content: msg.content });
      }
    }

    messages.push({ role: "user", content: message });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Anthropic API error: ${response.status} - ${text}`);
    }

    const data = await response.json();
    const reply = data.content[0].text;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        reply:
          "Maaf, terjadi gangguan. Silakan hubungi kami langsung via WhatsApp di 0856-4748-6700.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
