import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ibu Sarah",
    role: "Konsumen Eceran",
    text: "Sari lemonnya segar banget dan murni! Saya pakai setiap pagi untuk diet dan hasilnya luar biasa. Kulit juga jadi lebih cerah.",
    rating: 5,
  },
  {
    name: "Pak Budi",
    role: "Pemilik Café, Jakarta",
    text: "Kualitas konsisten dan harga grosirnya sangat kompetitif. Sudah jadi supplier tetap untuk café kami sejak 2 tahun lalu.",
    rating: 5,
  },
  {
    name: "Diana",
    role: "Reseller Online",
    text: "Produknya laris manis di marketplace! Customer repeat order terus. Pengiriman dari gudang Tangerang juga cepat sampai.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Apa Kata <span className="text-primary">Pelanggan</span> Kami?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="relative p-6 rounded-xl bg-card border border-border hover:shadow-elegant transition-all">
              <Quote className="w-8 h-8 text-accent/40 mb-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                "{t.text}"
              </p>
              <div>
                <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
                <p className="font-body text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
