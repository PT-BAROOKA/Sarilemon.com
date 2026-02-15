import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "sarilemon_lead_submitted";

const LeadCapturePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    const alreadySubmitted = localStorage.getItem(STORAGE_KEY);
    if (alreadySubmitted) return;

    const timer = setTimeout(() => setIsOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
      });

      if (error) throw error;

      setIsSuccess(true);
      localStorage.setItem(STORAGE_KEY, "true");
      setTimeout(() => setIsOpen(false), 2000);
    } catch {
      alert("Gagal mengirim data. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">&#10003;</span>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">Terima Kasih!</h3>
            <p className="font-body text-sm text-muted-foreground">Data Anda sudah kami terima. Tim kami akan segera menghubungi Anda.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Dapatkan Penawaran Terbaik</h3>
              <p className="font-body text-sm text-muted-foreground">
                Isi data di bawah ini dan tim kami akan menghubungi Anda dengan harga spesial.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-1">
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama lengkap"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-1">
                  No. HP / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@contoh.com (opsional)"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Mengirim..." : "Kirim & Dapatkan Penawaran"}
              </Button>

              <p className="font-body text-xs text-muted-foreground text-center">
                Data Anda aman dan tidak akan dibagikan ke pihak lain.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadCapturePopup;
