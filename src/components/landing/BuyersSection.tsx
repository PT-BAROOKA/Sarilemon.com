import { Store, Building2, Users, ShoppingBag } from "lucide-react";

const buyers = [
  {
    icon: Store,
    title: "Reseller & Dropshipper",
    desc: "Harga khusus grosir untuk reseller dan dropshipper di seluruh Indonesia."
  },
  {
    icon: Building2,
    title: "Bisnis F&B",
    desc: "Pasokan curah untuk restoran, kafe, catering, dan industri makanan & minuman."
  },
  {
    icon: Users,
    title: "Konsumen Langsung",
    desc: "Pembelian eceran untuk kebutuhan kesehatan dan kecantikan pribadi."
  },
  {
    icon: ShoppingBag,
    title: "Toko & Distributor",
    desc: "Kerjasama distribusi dengan harga khusus dan minimum order fleksibel."
  }
];

const BuyersSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Siapa yang Bisa <span className="text-primary">Membeli</span>?
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Kami melayani berbagai segmen pelanggan — dari konsumen pribadi hingga perusahaan besar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {buyers.map((b, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-card border border-border hover:shadow-elegant transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl gradient-lemon flex items-center justify-center mx-auto mb-4">
                <b.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyersSection;
