'use client';

import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/data/products";
import barookaLogo from "@/assets/barooka-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img src={(barookaLogo as { src?: string }).src ?? (barookaLogo as unknown as string)} alt="Barooka" className="h-14 w-auto mb-4 brightness-0 invert" />
            <h3 className="text-2xl font-display font-bold mb-3">
              <span className="text-lemon-gold">SariLemon</span>.com
            </h3>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              Supplier sari lemon dan jasa maklon terpercaya. 100% alami dari lemon Jawa Barat berkualitas tinggi.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Menu</h4>
            <div className="space-y-3">
              <Link
                href="/"
                className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors"
              >
                Beranda
              </Link>
              <Link
                href="/#produk"
                className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors"
              >
                Produk
              </Link>
              <Link
                href="/#maklon"
                className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors"
              >
                Maklon
              </Link>
              <Link
                href="/#proses"
                className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors"
              >
                Proses
              </Link>
              <Link
                href="/#testimonial"
                className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors"
              >
                Testimoni
              </Link>
              <Link
                href="/#kontak"
                className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors"
              >
                Kontak
              </Link>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-1 font-body text-sm text-primary-foreground/70">
              <p className="font-semibold text-primary-foreground">PT Barooka Global Indonesia</p>
              <p>Tangerang Selatan</p>
              <p className="mt-3">085647486700</p>
              <p>info@sarilemon.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-body text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} SariLemon.com — PT Barooka Global Indonesia. All rights reserved.
          </p>
          <p className="font-body text-xs text-primary-foreground/40">Supplier Sari Lemon Grosir & Maklon Terpercaya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
