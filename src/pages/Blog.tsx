import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Calendar, Clock, Tag } from "lucide-react";
import { externalSupabase as supabase } from "@/integrations/supabase/externalClient";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import FloatingChatbot from "@/components/landing/FloatingChatbot";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url: string | null;
  tags: string[];
  reading_time_minutes: number;
  published_at: string;
}

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setLoading(true);
    const from = page * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    const { data, error } = await supabase
      .from("lemon_blog_posts")
      .select("id, title, slug, excerpt, featured_image_url, tags, reading_time_minutes, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to);

    if (!error && data) {
      setPosts(data);
      setHasMore(data.length === POSTS_PER_PAGE);
    }
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Blog — SariLemon.com | Tips Kesehatan & Produk Alami</title>
        <meta name="description" content="Baca artikel terbaru seputar manfaat sari lemon, tips kesehatan, diet alami, dan produk kesehatan dari SariLemon.com" />
      </Helmet>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Blog <span className="text-primary">SariLemon</span>
              </h1>
              <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                Tips kesehatan, manfaat sari lemon, resep minuman sehat, dan informasi produk alami terbaru.
              </p>
            </div>

            {/* Posts Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-border bg-card">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-body text-muted-foreground text-lg">Belum ada artikel. Nantikan artikel terbaru kami!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featured_image_url || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-4 text-xs font-body text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.published_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.reading_time_minutes} menit baca
                        </span>
                      </div>
                      <h2 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="font-body text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && (posts.length > 0 || page > 0) && (
              <div className="flex justify-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-6 py-2 rounded-lg font-body text-sm font-medium border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  ← Sebelumnya
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasMore}
                  className="px-6 py-2 rounded-lg font-body text-sm font-medium border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
        <FloatingChatbot />
        <FloatingWhatsApp />
      </div>
    </HelmetProvider>
  );
};

export default Blog;
