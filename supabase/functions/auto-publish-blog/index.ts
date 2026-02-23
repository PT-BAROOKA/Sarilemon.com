import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const IMAGE_PROMPTS = [
  "Fresh whole lemons and sliced lemons on a rustic wooden cutting board with water droplets, bright natural lighting, food photography style, ultra high resolution",
  "A glass of fresh lemon juice with lemon slices and mint leaves on a clean white table, morning sunlight, minimalist food photography, ultra high resolution",
  "Beautiful lemon orchard with ripe yellow lemons hanging from green trees, golden hour sunlight, landscape photography, ultra high resolution",
  "Close-up of freshly squeezed lemon juice being poured into a glass bottle, with whole lemons around it, studio lighting, product photography, ultra high resolution",
  "A refreshing lemon detox water with cucumber and mint in a glass pitcher, bright kitchen background, healthy lifestyle photography, ultra high resolution",
  "Basket full of bright yellow lemons with green leaves, Mediterranean style, outdoor market setting, vibrant colors, food photography, ultra high resolution",
  "Sliced lemons arranged in a beautiful pattern on a marble surface, top-down view, flat lay food photography, ultra high resolution",
  "Fresh lemon tree branch with blossoms and ripe lemons, bokeh background, nature photography, ultra high resolution",
  "A healthy morning routine setup with lemon water, honey, and fresh lemons on a wooden tray, cozy lifestyle photography, ultra high resolution",
  "Cold-pressed lemon juice bottles lined up with fresh lemons and ice, commercial product photography, clean background, ultra high resolution",
];

const TOPICS = [
  "manfaat minum sari lemon murni setiap pagi untuk kesehatan tubuh",
  "cara detox tubuh alami dengan sari lemon murni SariLemon",
  "tips diet sehat dengan sari lemon murni tanpa gula tambahan",
  "manfaat sari lemon untuk meningkatkan imunitas dan daya tahan tubuh",
  "sari lemon murni vs air lemon biasa: apa bedanya dan mana lebih efektif",
  "resep minuman segar dengan sari lemon murni untuk sehari-hari",
  "manfaat vitamin C alami dari sari lemon untuk kulit cerah dan sehat",
  "cara memilih sari lemon murni berkualitas tinggi tanpa pengawet",
  "peluang bisnis reseller sari lemon murni SariLemon yang menguntungkan",
  "manfaat sari lemon untuk pencernaan dan metabolisme tubuh",
  "sari lemon murni untuk menurunkan berat badan secara alami",
  "keunggulan sari lemon cold-pressed dibanding sari lemon biasa",
  "manfaat rutin minum sari lemon murni untuk kesehatan jantung",
  "sari lemon murni sebagai antioksidan alami penangkal radikal bebas",
  "tips mengonsumsi sari lemon murni yang benar untuk hasil maksimal",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function generateAndUploadImage(
  supabase: any,
  prompt: string,
  slug: string
): Promise<string | null> {
  try {
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.warn("OPENAI_API_KEY not available, skipping image generation");
      return null;
    }

    const imageResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1792x1024",
        quality: "standard",
        response_format: "b64_json",
      }),
    });

    if (!imageResponse.ok) {
      const errText = await imageResponse.text();
      console.error("OpenAI image generation failed:", imageResponse.status, errText);
      return null;
    }

    const imageData = await imageResponse.json();
    const b64 = imageData.data?.[0]?.b64_json;

    if (!b64) {
      console.error("No image in OpenAI response");
      return null;
    }

    const binaryData = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

    const fileName = `${slug}-${Date.now()}.png`;
    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(fileName, binaryData, {
        contentType: "image/png",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from("blog-images")
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  } catch (err) {
    console.error("Image generation error:", err);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not configured");

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

    // Pick random topic and image prompt
    const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const imagePromptIndex = Math.floor(Math.random() * IMAGE_PROMPTS.length);
    const featuredImagePrompt = IMAGE_PROMPTS[imagePromptIndex];
    const ogImagePrompt = IMAGE_PROMPTS[(imagePromptIndex + 1) % IMAGE_PROMPTS.length];

    // Generate article via OpenAI
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Kamu adalah penulis blog profesional untuk SariLemon.com, produsen dan supplier sari lemon murni 100% asli tanpa pengawet dari PT Barooka Global Indonesia. 

PENTING: Setiap artikel HARUS fokus pada topik sari lemon murni. JANGAN menulis tentang produk lain seperti chia seed, cuka apel, garam himalaya, atau produk kesehatan lainnya yang bukan sari lemon. Semua konten harus relevan dengan sari lemon murni dan manfaatnya.

Tulis artikel SEO-friendly dalam bahasa Indonesia yang informatif dan menarik. Format output sebagai JSON dengan struktur:
{
  "title": "judul artikel menarik tentang sari lemon",
  "excerpt": "ringkasan 2-3 kalimat tentang sari lemon",
  "content_html": "konten artikel lengkap dalam HTML (gunakan h2, h3, p, ul, li, strong, em, blockquote)",
  "meta_title": "judul SEO max 60 karakter",
  "meta_description": "deskripsi meta max 160 karakter",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags": ["tag1", "tag2", "tag3"]
}
Pastikan konten minimal 800 kata, informatif, dan selalu menyebutkan produk sari lemon murni SariLemon.com secara natural sebagai solusi terbaik.`,
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
      console.error("OpenAI API error:", aiResponse.status, errorText);
      throw new Error(`OpenAI API error [${aiResponse.status}]: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in AI response");

    const article = JSON.parse(toolCall.function.arguments);
    const slug = slugify(article.title) + "-" + Date.now();
    const wordCount = article.content_html.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Generate AI images for the blog post
    console.log("Generating featured image...");
    const featuredImageUrl = await generateAndUploadImage(supabase, featuredImagePrompt, slug);
    console.log("Generating OG image...");
    const ogImageUrl = await generateAndUploadImage(supabase, ogImagePrompt, slug);

    // Fallback to static images if generation fails
    const fallbackImages = [
      "/images/blog-lemon-1.png",
      "/images/blog-lemon-2.png",
      "/images/blog-lemon-3.png",
    ];
    const fallbackIdx = Math.floor(Math.random() * fallbackImages.length);

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
        featured_image_url: featuredImageUrl || fallbackImages[fallbackIdx],
        og_image_url: ogImageUrl || fallbackImages[(fallbackIdx + 1) % fallbackImages.length],
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
