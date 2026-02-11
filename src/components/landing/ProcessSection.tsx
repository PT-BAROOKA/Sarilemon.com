import productionImage from "@/assets/production-lemons.jpg";

const steps = [
  { number: "01", title: "Seleksi Bahan Baku", desc: "Lemon segar pilihan dari petani lokal Malang" },
  { number: "02", title: "Pencucian & Sortir", desc: "Dibersihkan dan disortir untuk kualitas terbaik" },
  { number: "03", title: "Ekstraksi Sari", desc: "Proses pemerasan modern menjaga nutrisi" },
  { number: "04", title: "Pasteurisasi", desc: "Proses pasteurisasi untuk keamanan & daya tahan" },
  { number: "05", title: "Pengemasan", desc: "Dikemas dalam botol steril siap kirim" },
];

const ProcessSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-elegant-lg order-2 lg:order-1">
            <img
              src={productionImage}
              alt="Proses produksi sari lemon"
              className="w-full h-[450px] object-cover"
              loading="lazy"
              style={{ filter: "brightness(1.05) saturate(1.15)" }}
            />
          </div>

          <div className="order-1 lg:order-2">
            <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">Proses Produksi</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-8">
              Dari <span className="text-primary">Kebun</span> ke Botol
            </h2>

            <div className="space-y-6">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center shrink-0">
                    <span className="font-body text-xs font-bold text-primary-foreground">{s.number}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground">{s.title}</h3>
                    <p className="font-body text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
