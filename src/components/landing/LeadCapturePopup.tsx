import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { externalSupabase } from "@/integrations/supabase/externalClient";

const STORAGE_KEY = "sarilemon_lead_submitted";

const LeadCapturePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({ nama: "", kontak: "" });

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
    if (!form.nama.trim() || !form.kontak.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await externalSupabase.from("leads").insert({
        nama: form.nama.trim(),
        kontak: form.kontak.trim(),
        sumber: window.location.hostname,
      });

      if (error) throw error;

      setIsSuccess(true);
      localStorage.setItem(STORAGE_KEY, "true");
      setTimeout(() => setIsOpen(false), 2500);
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
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 animate-fade-in-up">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-primary">&#10003;</span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">Terima Kasih!</h3>
            <p className="font-body text-sm text-muted-foreground">Data Anda sudah kami terima.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground mb-1">Dapatkan Penawaran Terbaik!</h3>
              <p className="font-body text-sm text-muted-foreground">
                Tinggalkan kontak Anda, kami hubungi dengan harga spesial.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                placeholder="Nama Anda"
                className="w-full px-4 py-3 rounded-full border border-gray-200 bg-gray-50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400"
              />

              <input
                type="text"
                required
                value={form.kontak}
                onChange={(e) => setForm({ ...form, kontak: e.target.value })}
                placeholder="Email atau No. HP"
                className="w-full px-4 py-3 rounded-full border border-gray-200 bg-gray-50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-gray-400"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold text-sm transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Mengirim..." : "Kirim"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LeadCapturePopup;
