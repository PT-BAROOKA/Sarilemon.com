import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_NUMBER } from "@/data/products";
import { MessageCircle, Mail, MapPin, Phone, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    kebutuhan: "",
    volume: "",
    kota: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo Sarilemon.id, saya ingin request price list.\n\nNama: ${formData.name}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\nKebutuhan: ${formData.kebutuhan}\nVolume: ${formData.volume}\nKota Tujuan: ${formData.kota}`;
    window.open(getWhatsAppLink(message), "_blank");
  };

  return (
    <section id="kontak" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Request <span className="text-primary">Price List</span>
              </h2>
              <p className="font-body text-muted-foreground mb-8">
                Isi form di bawah dan tim kami akan segera menghubungi Anda
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Nama Anda"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input
                      type="email"
                      placeholder="email@domain.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Nomor WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Kebutuhan</label>
                    <select
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.kebutuhan}
                      onChange={(e) => setFormData({ ...formData, kebutuhan: e.target.value })}
                      required
                    >
                      <option value="">Pilih kebutuhan</option>
                      <option value="Eceran">Eceran</option>
                      <option value="Grosir">Grosir</option>
                      <option value="Curah">Curah / Bulk</option>
                      <option value="Maklon">Maklon / Private Label</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Volume Kebutuhan</label>
                    <input
                      type="text"
                      placeholder="Contoh: 100 liter/bulan"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Kota Tujuan</label>
                    <input
                      type="text"
                      placeholder="Kota pengiriman"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={formData.kota}
                      onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" variant="whatsapp" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" /> Kirim Permintaan Harga
                </Button>
              </form>
            </div>

            {/* Right: Contact info */}
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Hubungi <span className="text-primary">Kami</span>
              </h2>
              <p className="font-body text-muted-foreground mb-8">
                Tim kami siap membantu kebutuhan bisnis Anda
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-foreground">Alamat</p>
                    <p className="font-body text-sm text-muted-foreground">Tangerang Selatan, Banten</p>
                    <p className="font-body text-sm text-muted-foreground">(Gudang & Pengiriman)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-foreground">WhatsApp</p>
                    <p className="font-body text-sm text-muted-foreground">{WHATSAPP_NUMBER}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-foreground">Email</p>
                    <p className="font-body text-sm text-muted-foreground">info@sarilemon.id</p>
                  </div>
                </div>
              </div>

              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat Langsung via WhatsApp
                </Button>
              </a>

              <div className="mt-8 p-4 rounded-xl bg-muted border border-border">
                <p className="font-display text-sm font-bold text-foreground">PT Barooka Global Indonesia</p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Supplier dan produsen sari lemon berkualitas tinggi untuk berbagai kebutuhan bisnis di Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
