import { FileCheck, ShieldCheck, Award, Scale } from "lucide-react";

const certs = [
  { icon: FileCheck, title: "PKP", desc: "Pengusaha Kena Pajak terdaftar" },
  { icon: ShieldCheck, title: "Halal", desc: "Proses sertifikasi halal (opsional)" },
  { icon: Award, title: "Pendaftaran Merek", desc: "Bantuan HAKI untuk brand maklon" },
  { icon: Scale, title: "Legal & Terstruktur", desc: "Proses maklon sesuai regulasi" },
];

const CertificationsSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="font-body text-sm font-semibold text-accent uppercase tracking-wider">SERTIFIKASI & LEGAL</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mt-2 mb-4">
            Legalitas <span className="text-accent">Terjamin</span>
          </h2>
          <p className="font-body text-primary-foreground/70 max-w-xl mx-auto">
            Keamanan dan kepatuhan regulasi adalah prioritas kami
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((c, i) => (
            <div key={i} className="text-center p-8 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                <c.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-base font-bold text-primary-foreground mb-1">{c.title}</h3>
              <p className="font-body text-sm text-primary-foreground/70">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
