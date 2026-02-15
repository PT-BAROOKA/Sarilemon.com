
-- Create lemon_blog_posts table
CREATE TABLE public.lemon_blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content_html TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  featured_image_url TEXT,
  og_image_url TEXT,
  word_count INTEGER DEFAULT 0,
  reading_time_minutes INTEGER DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  source TEXT NOT NULL DEFAULT 'ai' CHECK (source IN ('ai', 'manual')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lemon_blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read for published posts
CREATE POLICY "Anyone can read published blog posts"
ON public.lemon_blog_posts
FOR SELECT
USING (status = 'published');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_lemon_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_lemon_blog_posts_updated_at
BEFORE UPDATE ON public.lemon_blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_lemon_blog_updated_at();

-- Create index on slug and status
CREATE INDEX idx_lemon_blog_posts_slug ON public.lemon_blog_posts (slug);
CREATE INDEX idx_lemon_blog_posts_status ON public.lemon_blog_posts (status);
CREATE INDEX idx_lemon_blog_posts_published_at ON public.lemon_blog_posts (published_at DESC);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Public read for blog images
CREATE POLICY "Anyone can view blog images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog-images');
