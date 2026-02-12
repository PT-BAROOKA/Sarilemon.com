import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1590502593747-42a996133562?w=1200&h=630&fit=crop",
  "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=1200&h=630&fit=crop",
  "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=1200&h=630&fit=crop",
  "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=1200&h=630&fit=crop",
  "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&h=630&fit=crop",
  "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=1200&h=630&fit=crop",
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1200&h=630&fit=crop",
  "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=1200&h=630&fit=crop",
  "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&h=630&fit=crop",
  "https://images.unsplash.com/photo-1596181256180-0092e47389d8?w=1200&h=630&fit=crop",
];

const TOPICS = [
  "manfaat sari lemon untuk kesehatan dan kecantikan",
  "cara membuat detox water dengan sari lemon",
  "tips diet sehat dengan sari lemon alami",
  "manfaat cuka apel untuk pencernaan dan metabolisme",
  "chia seed sebagai superfood untuk menurunkan berat badan",
  "garam himalaya vs garam biasa: mana yang lebih sehat",
  "resep minuman sehat dengan sari jeruk nipis",
  "manfaat vitamin C dari lemon untuk imunitas tubuh",
  "cara memilih sari lemon berkualitas tinggi",
  "peluang bisnis reseller sari lemon dan produk kesehatan",
  "manfaat lemon untuk kulit wajah cerah alami",
  "tips memulai gaya hidup sehat dengan produk alami",
  "keunggulan produk sari buah tanpa pengawet",
  "jasa maklon minuman kesehatan untuk brand Anda",
  "tren minuman kesehatan 2025 di Indonesia",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if article already published today
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await supabase
      .from("lemon_blog_posts")
      .select("id")
      .gte("created_at", `${today}T00:00:00Z`)
      .lt("created_at", `${today}T23:59:59Z`)
      .limit(1);

    if (existing && existing.length > 0) {
      return new Response(
        JSON.stringify({ message: "Article already published today" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Pick random topic and image
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const imageIndex = Math.floor(Math.random() * PRODUCT_IMAGES.length);
    const featuredImage = PRODUCT_IMAGES[imageIndex];
    const ogImage = PRODUCT_IMAGES[(imageIndex + 1) % PRODUCT_IMAGES.length];

    // Generate article via Lovable AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Kamu adalah penulis blog profesional untuk SariLemon.com, supplier sari lemon dan produk kesehatan alami dari PT Barooka Global Indonesia. Tulis artikel SEO-friendly dalam bahasa Indonesia yang informatif dan menarik. Format output sebagai JSON dengan struktur:
{
  "title": "judul artikel menarik",
  "excerpt": "ringkasan 2-3 kalimat",
  "content_html": "konten artikel lengkap dalam HTML (gunakan h2, h3, p, ul, li, strong, em, blockquote)",
  "meta_title": "judul SEO max 60 karakter",
  "meta_description": "deskripsi meta max 160 karakter",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags": ["tag1", "tag2", "tag3"]
}
Pastikan konten minimal 800 kata, informatif, dan menyebutkan produk SariLemon.com secara natural.`,
          },
          {
            role: "user",
            content: `Tulis artikel blog tentang: ${topic}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "publish_blog_article",
              description: "Publish a blog article with structured data",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  excerpt: { type: "string" },
                  content_html: { type: "string" },
                  meta_title: { type: "string" },
                  meta_description: { type: "string" },
                  keywords: { type: "array", items: { type: "string" } },
                  tags: { type: "array", items: { type: "string" } },
                },
                required: ["title", "excerpt", "content_html", "meta_title", "meta_description", "keywords", "tags"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "publish_blog_article" } },
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      throw new Error(`AI gateway error [${aiResponse.status}]: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const article = JSON.parse(toolCall.function.arguments);
    const slug = slugify(article.title) + "-" + Date.now();
    const wordCount = article.content_html.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Insert into database
    const { data: post, error: insertError } = await supabase
      .from("lemon_blog_posts")
      .insert({
        title: article.title,
        slug,
        content_html: article.content_html,
        excerpt: article.excerpt,
        meta_title: article.meta_title,
        meta_description: article.meta_description,
        keywords: article.keywords,
        tags: article.tags,
        featured_image_url: featuredImage,
        og_image_url: ogImage,
        word_count: wordCount,
        reading_time_minutes: readingTime,
        status: "published",
        source: "ai",
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) throw insertError;

    console.log("Blog post published:", post.title);

    return new Response(
      JSON.stringify({ success: true, post: { id: post.id, title: post.title, slug: post.slug } }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("auto-publish-blog error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
