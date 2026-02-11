import { ShieldCheck } from "lucide-react";

const CertificationsSection = () => {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            <span className="text-primary">Sertifikasi</span> & Legalitas
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Produk kami telah memenuhi standar keamanan pangan dan terdaftar resmi
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {["PIRT — Pangan Industri Rumah Tangga", "Halal — Proses produksi halal", "BPOM — Dalam proses pendaftaran"].map((cert, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-xl bg-background border border-border shadow-sm">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
              <span className="font-body text-sm font-medium text-foreground">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
