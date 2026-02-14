import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/data/products";
import { Tag, Package, Paintbrush, ShieldCheck, Award, MessageCircle, Sparkles } from "lucide-react";
import maklonImage from "@/assets/maklon-bottles.jpg";

const features = [
  { icon: Tag, text: "Private label (brand kamu sendiri)" },
  { icon: Package, text: "Pilihan kemasan: 250ml, 500ml, 1L" },
  { icon: Paintbrush, text: "Bisa request desain botol & label" },
  { icon: ShieldCheck, text: "Garansi kualitas batch konsisten" },
  { icon: Award, text: "Bantuan pendaftaran merek (HAKI)" },
];

const MaklonSection = () => {
  return (
    <section id="maklon" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">JASA MAKLON</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
              Bangun Brand <span className="text-lemon-gold">Sari Lemon</span>{" "}
              <span className="text-primary">Kamu Sendiri</span>
            </h2>
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              Kami tangani produksi, legal, packaging, sampai pendaftaran merek. Fokus saja pada pemasaran dan penjualan produkmu.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <f.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-body text-sm font-medium text-foreground">{f.text}</span>
                </div>
              ))}
            </div>

            <a href={getWhatsAppLink("Halo SariLemon.com, saya ingin konsultasi maklon sari lemon gratis. Bisa minta info lebih lanjut?")} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg">
                <MessageCircle className="w-4 h-4 mr-2" /> Konsultasi Maklon Gratis
              </Button>
            </a>
          </div>

          {/* Right: Image with floating badge */}
          <div className="relative">
            <div className="absolute -top-4 right-4 z-10 bg-background border border-border rounded-xl px-4 py-3 shadow-elegant flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-lemon flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-foreground">MOQ Fleksibel</p>
                <p className="font-body text-xs text-primary">Mulai 100 botol</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elegant-lg">
              <img
                src={maklonImage}
                alt="Layanan maklon Sarilemon"
                className="w-full h-[450px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaklonSection;
