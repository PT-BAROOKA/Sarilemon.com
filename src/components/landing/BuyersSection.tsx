import { ShoppingCart, Stethoscope, UtensilsCrossed, Sparkles, FlaskConical } from "lucide-react";

const buyers = [
  {
    icon: ShoppingCart,
    title: "Toko E-commerce",
    desc: "Shopee, Tokopedia, dan marketplace lainnya"
  },
  {
    icon: Stethoscope,
    title: "Distributor Kesehatan",
    desc: "Produk herbal dan suplemen kesehatan"
  },
  {
    icon: UtensilsCrossed,
    title: "Industri HORECA",
    desc: "Hotel, restoran, dan katering"
  },
  {
    icon: Sparkles,
    title: "Brand Beauty & Wellness",
    desc: "Skincare dan produk perawatan"
  },
  {
    icon: FlaskConical,
    title: "UMKM Minuman Sehat",
    desc: "Minuman herbal dan jus sehat lainnya"
  }
];

const BuyersSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="font-body text-sm font-semibold text-primary uppercase tracking-wider">SEGMENTASI PEMBELI</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
            Cocok untuk <span className="text-primary">Berbagai Industri</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Kami melayani berbagai segmen bisnis dengan kebutuhan sari lemon berkualitas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {buyers.map((b, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <b.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-sm font-display font-bold text-foreground mb-1">{b.title}</h3>
              <p className="font-body text-xs text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyersSection;
