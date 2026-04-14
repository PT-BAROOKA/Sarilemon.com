import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/data/products";
import heroImage from "@/assets/hero-orchard.jpg";

const HeroSection = () => {
  return (
    <section id="beranda" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Kebun lemon segar di Jawa Barat" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 mb-6 animate-fade-in">
            <span className="font-body text-sm font-medium text-primary-foreground/90">
              🍋 100% Alami dari Jawa Barat
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-up">
            Sari Lemon Murni
            <span className="block text-accent">untuk Hidup Lebih Sehat</span>
          </h1>
          <p
            className="text-lg md:text-xl font-body text-primary-foreground/85 mb-8 max-w-lg animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Produk alami berkualitas tinggi dari PT Barooka Global Indonesia. Tersedia eceran, grosir, hingga curah
            untuk kebutuhan bisnis Anda.
          </p>
          <div className="inline-block px-5 py-3 rounded-xl bg-accent/30 border-2 border-accent/60 backdrop-blur-sm mb-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <span className="font-display text-lg md:text-xl font-bold text-accent drop-shadow-md">
              🍋 Update Harga Rp. 29.500/liter — Min. Pembelian / MOQ 20L
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <a href="#produk">
              <Button variant="accent" size="lg" className="text-base px-8">
                Lihat Produk
              </Button>
            </a>
            <a href={getWhatsAppLink("Halo SariLemon.com, saya tertarik dengan produk SariLemon. Bisa minta info lebih lanjut?")} target="_blank" rel="noopener noreferrer">
              <Button variant="hero-outline" size="lg" className="text-base px-8">
                Hubungi Kami
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
