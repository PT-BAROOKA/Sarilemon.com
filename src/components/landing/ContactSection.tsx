import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/data/products";
import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="kontak" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Hubungi <span className="text-primary">Kami</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Silakan hubungi kami untuk pemesanan, konsultasi maklon, atau pertanyaan seputar produk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">Alamat Gudang</p>
                  <p className="font-body text-sm text-muted-foreground">Tangerang Selatan, Banten</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">Alamat Produksi</p>
                  <p className="font-body text-sm text-muted-foreground">Malang, Jawa Timur</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">Email</p>
                  <p className="font-body text-sm text-muted-foreground">info@sarilemon.id</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">Telepon / WhatsApp</p>
                  <p className="font-body text-sm text-muted-foreground">+62 812-3456-7890</p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="gradient-accent rounded-2xl p-8 text-center flex flex-col items-center justify-center">
              <MessageCircle className="w-12 h-12 text-primary-foreground mb-4" />
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">
                Chat via WhatsApp
              </h3>
              <p className="font-body text-sm text-primary-foreground/80 mb-6 max-w-xs">
                Respon cepat untuk pemesanan, konsultasi harga, dan layanan maklon
              </p>
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <Button variant="accent" size="lg" className="text-base px-8">
                  Chat Sekarang
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
