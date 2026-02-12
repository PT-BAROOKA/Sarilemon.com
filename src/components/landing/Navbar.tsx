import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { products, getWhatsAppLink } from "@/data/products";
import { Button } from "@/components/ui/button";
import barookaLogo from "@/assets/barooka-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={barookaLogo} alt="Barooka" className="h-14 md:h-16 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div
              className="relative pb-2 -mb-2"
              onMouseEnter={() => setShowProducts(true)}
              onMouseLeave={() => setShowProducts(false)}
            >
              <button className="flex items-center gap-1 font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
                Produk <ChevronDown className={`w-3 h-3 transition-transform ${showProducts ? 'rotate-180' : ''}`} />
              </button>
              {showProducts && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-56 bg-background rounded-lg shadow-lg border border-border p-2 animate-fade-in">
                    {products.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/produk/${p.slug}`}
                        onClick={() => setShowProducts(false)}
                        className="block px-4 py-2 rounded-md text-sm font-body text-foreground/70 hover:bg-muted hover:text-primary transition-colors"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <a href="#maklon" className="font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Maklon
            </a>
            <a href="#proses" className="font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Proses
            </a>
            <a href="#kontak" className="font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Kontak
            </a>
            <Link to="/blog" className="font-body text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
              Blog
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="sm">
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              <div className="px-4 py-2">
                <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Produk</p>
                {products.map((p) => (
                  <Link key={p.slug} to={`/produk/${p.slug}`} onClick={() => setIsOpen(false)} className="block py-1.5 text-sm font-body text-foreground/70 hover:text-primary">
                    {p.name}
                  </Link>
                ))}
              </div>
              <a href="#maklon" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-md font-body text-sm text-foreground/70 hover:bg-muted">Maklon</a>
              <a href="#proses" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-md font-body text-sm text-foreground/70 hover:bg-muted">Proses</a>
              <a href="#kontak" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-md font-body text-sm text-foreground/70 hover:bg-muted">Kontak</a>
              <Link to="/blog" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-md font-body text-sm text-foreground/70 hover:bg-muted">Blog</Link>
              <div className="px-4 pt-2">
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" className="w-full">WhatsApp</Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
