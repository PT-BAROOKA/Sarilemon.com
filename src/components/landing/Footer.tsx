import { Link } from "react-router-dom";
import { products } from "@/data/products";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">
              Sari<span className="text-accent">Lemon</span>.id
            </h3>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed mb-4">
              Produsen sari lemon murni dan produk alami berkualitas dari Malang, Jawa Timur. Diproduksi oleh PT Barooka Global Indonesia.
            </p>
            <p className="font-body text-xs text-primary-foreground/50">
              PT Barooka Global Indonesia
            </p>
          </div>

          {/* Produk */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Produk</h4>
            <div className="space-y-2">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  to={`/produk/${p.slug}`}
                  className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Informasi</h4>
            <div className="space-y-2">
              <a href="#beranda" className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors">Beranda</a>
              <a href="#produk" className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors">Katalog Produk</a>
              <a href="#maklon" className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors">Layanan Maklon</a>
              <a href="#kontak" className="block font-body text-sm text-primary-foreground/70 hover:text-accent transition-colors">Hubungi Kami</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center">
          <p className="font-body text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Sarilemon.id — PT Barooka Global Indonesia. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
