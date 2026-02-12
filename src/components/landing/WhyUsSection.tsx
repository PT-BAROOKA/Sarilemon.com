import { Heart, Users, ShieldCheck, CheckCircle } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "100% Lemon Asli Malang",
    description: "Bukan essence atau perasa buatan. Dibuat langsung dari buah lemon segar pilihan."
  },
  {
    icon: Users,
    title: "Produksi Petani Lokal",
    description: "Mendukung petani Malang dengan kemitraan yang adil dan berkelanjutan."
  },
  {
    icon: ShieldCheck,
    title: "Tanpa Pengawet / Pewarna",
    description: "Proses produksi alami tanpa bahan kimia tambahan apapun."
  },
  {
    icon: CheckCircle,
    title: "Aman untuk Pangan & Kosmetik",
    description: "Kualitas food-grade yang cocok untuk berbagai industri."
  }
];

const WhyUsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Mengapa <span className="text-primary">SariLemon.com</span>?
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Kualitas premium dengan komitmen pada keaslian dan keberlanjutan produk
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="p-8 rounded-xl bg-card border border-border hover:shadow-elegant transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <r.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-2">{r.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
