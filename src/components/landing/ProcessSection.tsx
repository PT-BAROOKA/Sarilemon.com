import productionImage from "@/assets/production-lemons.jpg";
import { Leaf } from "lucide-react";

const steps = [
  { number: "01", title: "Panen Lemon", desc: "Dipetik langsung dari petani mitra di Malang saat kematangan optimal." },
  { number: "02", title: "Pencucian & Sortir", desc: "Proses higienis untuk mempersiapkan bahan baku berkualitas." },
  { number: "03", title: "Ekstraksi & Pasteurisasi", desc: "Pemerasan modern dan pasteurisasi untuk kualitas optimal." },
  { number: "04", title: "Filtrasi & Pengemasan", desc: "Penyaringan dan pengemasan sesuai standar keamanan pangan." },
];

const ProcessSection = () => {
  return (
    <section id="proses" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">PROSES PRODUKSI</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Dari <span className="text-primary">Kebun</span> ke Botol
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Proses produksi alami yang menjaga kualitas dan keaslian sari lemon
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Steps */}
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center shrink-0">
                  <span className="font-display text-sm font-bold text-primary-foreground">{s.number}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image with floating badge */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-elegant-lg">
              <img
                src={productionImage}
                alt="Proses produksi sari lemon"
                className="w-full h-[450px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-6 right-6 bg-background/95 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-md flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-lemon flex items-center justify-center">
                <Leaf className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-foreground">Produksi Alami</p>
                <p className="font-body text-xs text-primary">Tanpa Bahan Kimia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
