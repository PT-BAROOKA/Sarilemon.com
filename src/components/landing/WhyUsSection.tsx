import { Leaf, Shield, Truck, Award } from "lucide-react";

const reasons = [
  {
    icon: Leaf,
    title: "100% Alami",
    description: "Produk murni tanpa bahan kimia, pengawet, atau pewarna buatan. Langsung dari kebun ke botol."
  },
  {
    icon: Shield,
    title: "Bersertifikat PIRT",
    description: "Produk telah terdaftar dan memenuhi standar keamanan pangan dari Dinas Kesehatan."
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat",
    description: "Gudang di Tangerang Selatan memastikan pengiriman cepat ke seluruh Indonesia."
  },
  {
    icon: Award,
    title: "Harga Kompetitif",
    description: "Langsung dari produsen, tanpa perantara. Harga terbaik untuk eceran maupun grosir."
  }
];

const WhyUsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Mengapa Memilih <span className="text-primary">Sarilemon</span>?
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Kami berkomitmen menghadirkan produk alami terbaik dengan standar kualitas tertinggi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl bg-card border border-border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <r.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
