import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import productBottles from "@/assets/product-bottles.jpg";

const ProductsSection = () => {
  return (
    <section id="produk" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Produk <span className="text-primary">Unggulan</span> Kami
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Berbagai produk alami berkualitas tinggi untuk kesehatan dan kebutuhan bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              to={`/produk/${product.slug}`}
              className="group relative rounded-xl overflow-hidden bg-background border border-border hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1"
            >
              {product.isFeatured && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full gradient-lemon">
                  <Star className="w-3 h-3 text-foreground" />
                  <span className="font-body text-xs font-semibold text-foreground">Unggulan</span>
                </div>
              )}
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={productBottles}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  style={{ filter: "brightness(1.05) saturate(1.1)" }}
                />
              </div>
              <div className="p-5">
                <span className="font-body text-xs font-medium text-primary uppercase tracking-wider">
                  {product.category}
                </span>
                <h3 className="text-lg font-display font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">
                  {product.tagline}
                </p>
                <div className="flex items-center gap-1 text-primary font-body text-sm font-medium">
                  Lihat Detail <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
