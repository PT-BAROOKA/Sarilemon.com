import { useParams, Link } from "react-router-dom";
import { products, getWhatsAppLink } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Package, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import imgSariLemonProduk from "@/assets/sari_lemon_produk.png";
import imgCukaApelProduk from "@/assets/cuka_apel_produk.png";
import imgChiaSeedProduk from "@/assets/chia_seed_produk.png";
import imgGaramHimalayaProduk from "@/assets/garam_himalaya_produk.png";
import imgSariJerukNipisProduk from "@/assets/sari_jeruk_nipis_produk.png";

const productImages: Record<string, string> = {
  "sari-lemon": imgSariLemonProduk,
  "cuka-apel": imgCukaApelProduk,
  "chia-seed": imgChiaSeedProduk,
  "garam-himalaya": imgGaramHimalayaProduk,
  "sari-jeruk-nipis": imgSariJerukNipisProduk,
};

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Produk Tidak Ditemukan</h1>
          <Link to="/">
            <Button variant="default">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back */}
          <Link to="/" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            <div className="rounded-2xl overflow-hidden shadow-elegant-lg">
              <img src={productImages[product.slug]} alt={product.name} className="w-full h-auto object-contain" />
            </div>
            <div>
              <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-3">{product.name}</h1>
              <p className="font-body text-lg text-accent font-medium mb-4">{product.tagline}</p>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" /> {product.origin}
                </div>
                <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
                  <Package className="w-4 h-4 text-primary" /> Gudang: {product.warehouse}
                </div>
              </div>

              <a href={getWhatsAppLink(`Halo, saya tertarik dengan produk ${product.name}`)} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg">Pesan via WhatsApp</Button>
              </a>
            </div>
          </div>

          {/* Benefits & Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-6 rounded-xl bg-card border border-border">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">Manfaat</h2>
              <div className="space-y-3">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-muted-foreground">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">Cara Penggunaan</h2>
              <div className="space-y-3">
                {product.useCases.map((u, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full gradient-lemon flex items-center justify-center shrink-0 mt-0.5">
                      <span className="font-body text-xs font-bold text-foreground">{i + 1}</span>
                    </span>
                    <span className="font-body text-sm text-muted-foreground">{u}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Spesifikasi Produk</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.specifications.map((s, i) => (
                <div key={i} className="p-4 rounded-lg bg-card border border-border">
                  <p className="font-body text-xs font-semibold text-primary uppercase tracking-wider mb-1">{s.label}</p>
                  <p className="font-body text-sm text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Pilihan Kemasan & Harga</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.pricing.map((p, i) => (
                <div key={i} className="p-5 rounded-xl bg-card border border-border text-center hover:shadow-elegant transition-all">
                  <p className="font-display text-lg font-semibold text-foreground mb-1">{p.type}</p>
                  <p className="font-body text-sm text-muted-foreground mb-3">{p.unit}</p>
                  <p className="font-body text-sm font-semibold text-primary">{p.priceRange}</p>
                  {p.minOrder && (
                    <p className="font-body text-xs text-muted-foreground mt-2">Min. order: {p.minOrder}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lead time */}
          <div className="p-6 rounded-xl gradient-accent text-primary-foreground mb-16">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" />
              <h2 className="text-xl font-display font-bold">Estimasi Pengiriman</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="font-body text-sm font-semibold">Pesanan Kecil</p>
                <p className="font-body text-sm text-primary-foreground/80">{product.leadTime.small}</p>
              </div>
              <div>
                <p className="font-body text-sm font-semibold">Pesanan Menengah</p>
                <p className="font-body text-sm text-primary-foreground/80">{product.leadTime.medium}</p>
              </div>
              <div>
                <p className="font-body text-sm font-semibold">Pesanan Besar</p>
                <p className="font-body text-sm text-primary-foreground/80">{product.leadTime.large}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ProductDetail;