import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/data/products";
import { Package, Paintbrush, FlaskConical, Truck } from "lucide-react";
import maklonImage from "@/assets/maklon-bottles.jpg";

const steps = [
  { icon: FlaskConical, title: "Formulasi", desc: "Konsultasi resep & formulasi produk" },
  { icon: Paintbrush, title: "Desain", desc: "Desain kemasan sesuai brand Anda" },
  { icon: Package, title: "Produksi", desc: "Produksi dengan standar PIRT" },
  { icon: Truck, title: "Pengiriman", desc: "Kirim langsung ke gudang Anda" },
];

const MaklonSection = () => {
  return (
    <section id="maklon" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">Layanan Maklon</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
              Private Label & <span className="text-primary">Maklon</span> Produk
            </h2>
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              Wujudkan brand minuman kesehatan Anda sendiri. Kami menyediakan layanan maklon lengkap dari formulasi, produksi, hingga pengemasan dengan brand Anda.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                  <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                    <s.icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">{s.title}</p>
                    <p className="font-body text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href={getWhatsAppLink("Halo, saya tertarik dengan layanan maklon Sarilemon.id")} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="lg">Konsultasi Maklon</Button>
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-elegant-lg">
            <img
              src={maklonImage}
              alt="Fasilitas produksi maklon Sarilemon"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-xl font-bold text-background">
                Fasilitas Produksi Modern
              </p>
              <p className="font-body text-sm text-background/80">
                Malang, Jawa Timur — Kapasitas produksi besar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaklonSection;
