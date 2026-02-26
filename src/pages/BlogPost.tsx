import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import DOMPurify from "dompurify";
import { externalSupabase as supabase } from "@/integrations/supabase/externalClient";
import { getWhatsAppLink } from "@/data/products";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content_html: string;
  excerpt: string;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[];
  tags: string[];
  featured_image_url: string | null;
  og_image_url: string | null;
  word_count: number;
  reading_time_minutes: number;
  published_at: string;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url: string | null;
  published_at: string;
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchPost(slug);
  }, [slug]);

  const fetchPost = async (slug: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lemon_blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!error && data) {
      setPost(data as BlogPostData);
      // Fetch related posts
      const { data: relatedData } = await supabase
        .from("lemon_blog_posts")
        .select("id, title, slug, excerpt, featured_image_url, published_at")
        .eq("status", "published")
        .neq("id", data.id)
        .order("published_at", { ascending: false })
        .limit(3);

      if (relatedData) setRelated(relatedData);
    }
    setLoading(false);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-6 rounded-xl" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6" />
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16 container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
          <p className="font-body text-muted-foreground mb-6">Artikel yang Anda cari tidak tersedia.</p>
          <Link to="/blog">
            <Button variant="default">← Kembali ke Blog</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{post.meta_title || post.title} — SariLemon.com</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        {post.keywords?.length > 0 && <meta name="keywords" content={post.keywords.join(", ")} />}
        <meta property="og:title" content={post.meta_title || post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt} />
        {post.og_image_url && <meta property="og:image" content={post.og_image_url} />}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://sarilemon.com/blog/${post.slug}`} />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/blog">Blog</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1 max-w-[200px]">{post.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Header */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm font-body text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.published_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.reading_time_minutes} menit baca
                </span>
                <span className="text-xs text-muted-foreground/60">
                  {post.word_count} kata
                </span>
                <button onClick={handleShare} className="ml-auto flex items-center gap-1 hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" /> Bagikan
                </button>
              </div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Featured Image */}
              {post.featured_image_url && (
                <div className="rounded-xl overflow-hidden mb-8">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <article
                className="blog-content font-body"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content_html) }}
              />

              {/* WhatsApp CTA */}
              <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="font-display text-xl font-semibold text-foreground mb-2">
                  Tertarik dengan produk SariLemon?
                </p>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  Hubungi kami untuk informasi harga, MOQ, dan pemesanan.
                </p>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg">Hubungi via WhatsApp</Button>
                </a>
              </div>

              {/* Back link */}
              <div className="mt-8">
                <Link to="/blog" className="inline-flex items-center gap-2 font-body text-sm text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Blog
                </Link>
              </div>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="max-w-4xl mx-auto mt-16">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Artikel Terkait</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/blog/${r.slug}`}
                      className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-elegant transition-all duration-300"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={r.featured_image_url || "/placeholder.svg"}
                          alt={r.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {r.title}
                        </h3>
                        <p className="font-body text-xs text-muted-foreground mt-1">
                          {formatDate(r.published_at)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </HelmetProvider>
  );
};

export default BlogPostPage;
