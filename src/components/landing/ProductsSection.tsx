import { Link } from "react-router-dom";
import { products, getWhatsAppLink } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Truck, MessageCircle } from "lucide-react";
import wholesaleImage from "@/assets/wholesale-drums.jpg";

const productEmojis: Record<string, string> = {
  "sari-lemon": "🍋",
  "cuka-apel": "🍎",
  "chia-seed": "🌱",
  "garam-himalaya": "🧂",
  "sari-jeruk-nipis": "🍋",
};

const ProductsSection = () => {
  const featured = products.find(p => p.isFeatured);
  const others = products.filter(p => !p.isFeatured);

  return (
    <section id="produk" className="bg-card">
      {/* Featured product - wholesale section */}
      {featured && (
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-elegant-lg">
                <img
                  src={wholesaleImage}
                  alt="Produk grosir dan curah"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 right-6 bg-background/95 backdrop-blur-sm rounded-xl px-5 py-3 shadow-md">
                  <p className="font-display text-2xl font-bold text-foreground">±5%</p>
                  <p className="font-body text-xs text-muted-foreground">Kadar Keasaman Stabil</p>
                </div>
              </div>

              <div>
                <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">PRODUK GROSIR & CURAH</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
                   <span className="text-lemon-gold">Sari Lemon</span> Murni untuk{" "}
                   <span className="text-primary">Kebutuhan Bisnis</span>
                </h2>
                <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                  Warna keemasan alami, aroma segar khas lemon. Diproduksi dengan standar tinggi untuk kualitas konsisten setiap batch.
                </p>

                <div className="space-y-4 mb-8">
                  {featured.pricing.filter(p => p.type !== "Eceran").map((p, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-display text-base font-bold text-foreground">{p.unit}</p>
                        <p className="font-body text-sm text-muted-foreground">
                          {p.type === "Grosir" && "Ideal untuk toko online, UMKM, dan reseller. Mudah disimpan dan dikirim."}
                          {p.type === "Curah" && "Untuk distributor dan industri menengah dengan kebutuhan volume besar."}
                          {p.type === "Curah Besar" && "Solusi efisien untuk industri besar dan pabrik makanan/minuman."}
                        </p>
                        {p.minOrder && (
                          <p className="font-body text-xs text-primary font-medium mt-1">Min. order: {p.minOrder}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={getWhatsAppLink("Halo, saya mau tanya harga grosir sari lemon")} target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp" size="lg">
                      <MessageCircle className="w-4 h-4 mr-2" /> Tanya Harga Grosir
                    </Button>
                  </a>
                  <Link to={`/produk/${featured.slug}`}>
                    <Button variant="outline" size="lg">
                      Detail Produk →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other products grid */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">PRODUK LAINNYA</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              Tersedia Juga Harga <span className="text-primary">Grosir/Curah</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Selain sari lemon, kami juga menyediakan produk lainnya dengan harga grosir/curah untuk quantity besar. Siap maklon dan kirim ke seluruh Indonesia.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {products.map((product) => (
              <Link
                key={product.slug}
                to={`/produk/${product.slug}`}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 min-w-[120px]"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl">
                  {productEmojis[product.slug] || "🍃"}
                </div>
                <span className="font-body text-sm font-medium text-foreground text-center">{product.name}</span>
              </Link>
            ))}
          </div>

          {/* Shipping banner */}
          <div className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Pengiriman ke Seluruh Indonesia</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Melayani pengiriman <strong>Jabodetabek</strong> dan <strong>seluruh Indonesia</strong> via Cargo, JNE, J&T, SiCepat, dan jasa ekspedisi lainnya. Siap <strong>Maklon/Private Label</strong> untuk brand Anda sendiri.
                </p>
              </div>
            </div>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button variant="whatsapp">
                <MessageCircle className="w-4 h-4 mr-2" /> Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
