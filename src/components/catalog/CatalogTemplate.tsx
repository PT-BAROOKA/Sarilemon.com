import React, { forwardRef } from "react";
import { CatalogPricing } from "@/data/catalogData";
import barookaLogo from "@/assets/barooka-logo.png";

interface Props {
  productName: string;
  tagline: string;
  category: string;
  description: string;
  productImage: string;
  pricing: CatalogPricing;
}

const C = {
  green: "#2a5c1a",
  greenDark: "#1a3a10",
  gold: "#c4870e",
  goldLight: "#e6a820",
  cream: "#f8f5ee",
  white: "#ffffff",
  textDark: "#1a1a1a",
  textMuted: "#555555",
  border: "#d9d3c7",
};

const PAGE: React.CSSProperties = {
  width: "794px",
  minHeight: "1123px",
  backgroundColor: C.cream,
  fontFamily: "'Arial', sans-serif",
  position: "relative",
  overflow: "hidden",
  pageBreakAfter: "always",
};

const Header: React.FC<{ subtitle?: string }> = ({ subtitle }) => (
  <div style={{ backgroundColor: C.greenDark, padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <img src={barookaLogo} alt="Barooka" style={{ height: "36px", filter: "brightness(0) invert(1)" }} />
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={{ color: C.white, fontSize: "11px", fontWeight: "700", letterSpacing: "1px" }}>PT. BAROOKA GLOBAL INDONESIA</div>
      {subtitle && <div style={{ color: C.goldLight, fontSize: "10px", marginTop: "2px" }}>{subtitle}</div>}
    </div>
  </div>
);

const Footer: React.FC = () => (
  <div style={{ backgroundColor: C.greenDark, padding: "12px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <img src={barookaLogo} alt="Barooka" style={{ height: "22px", filter: "brightness(0) invert(1)" }} />
    </div>
    <div style={{ color: "#ffffff99", fontSize: "9px" }}>© 2025 PT. Barooka Global Indonesia | SariLemon.com</div>
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ backgroundColor: C.greenDark, color: C.white, padding: "14px 32px", fontSize: "20px", fontWeight: "800", letterSpacing: "1px", textAlign: "center" }}>
    {children}
  </div>
);

const CatalogTemplate = forwardRef<HTMLDivElement, Props>(
  ({ productName, tagline, category, description, productImage, pricing }, ref) => {
    return (
      <div ref={ref} style={{ position: "absolute", left: "-9999px", top: "0", zIndex: -1, width: "794px" }}>

        {/* PAGE 1 — COVER */}
        <div style={PAGE} className="catalog-page">
          <Header />
          <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            {/* Stars */}
            <div style={{ textAlign: "center", marginBottom: "8px" }}>
              <span style={{ color: C.gold, fontSize: "20px" }}>★★★★★</span>
              <div style={{ color: C.textMuted, fontSize: "11px", marginTop: "4px" }}>Kualitas terbaik, pelanggan puas.</div>
            </div>

            {/* Category badge */}
            <div style={{ backgroundColor: C.gold, color: C.white, padding: "4px 16px", borderRadius: "20px", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", marginBottom: "16px", textTransform: "uppercase" }}>
              {category}
            </div>

            {/* Product name */}
            <h1 style={{ color: C.green, fontSize: "40px", fontWeight: "900", textAlign: "center", lineHeight: "1.15", margin: "0 0 8px 0" }}>
              {productName}
            </h1>
            <p style={{ color: C.textMuted, fontSize: "14px", textAlign: "center", marginBottom: "24px", fontStyle: "italic" }}>{tagline}</p>

            {/* Product image */}
            <div style={{ width: "340px", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <img src={productImage} alt={productName} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }} />
            </div>

            {/* Feature box */}
            <div style={{ backgroundColor: C.greenDark, borderRadius: "12px", padding: "20px 28px", width: "100%", marginBottom: "20px" }}>
              <div style={{ color: C.white, fontSize: "14px", fontWeight: "700", textAlign: "center", marginBottom: "12px" }}>
                Dukung Maklon Produk & Pembelian Grosir
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {pricing.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: C.gold, fontSize: "12px" }}>✓</span>
                    <span style={{ color: "#ffffff99", fontSize: "11px" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ border: `2px solid ${C.border}`, borderRadius: "10px", padding: "14px 20px", width: "100%" }}>
              <p style={{ color: C.textMuted, fontSize: "12px", textAlign: "center", lineHeight: "1.6", margin: 0 }}>
                {description}
              </p>
              <div style={{ textAlign: "center", marginTop: "8px" }}>
                <span style={{ color: C.gold, fontSize: "11px", fontWeight: "700" }}>
                  100% Tanpa Bahan Kimia • Aman & Terpercaya
                </span>
              </div>
            </div>
          </div>
          <Footer />
        </div>

        {/* PAGE 2 — DAFTAR HARGA */}
        <div style={{ ...PAGE, display: "flex", flexDirection: "column" }} className="catalog-page">
          <Header subtitle="Update: 2025" />
          <SectionTitle>DAFTAR HARGA GROSIR</SectionTitle>

          <div style={{ padding: "28px 40px", flex: 1 }}>

            {/* Harga Curah */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ backgroundColor: C.green, color: C.white, padding: "6px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "700" }}>
                  HARGA CURAH (Tanpa Kemasan)
                </div>
              </div>
              <div style={{ backgroundColor: C.white, borderRadius: "10px", overflow: "hidden", border: `1px solid ${C.border}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: C.green }}>
                  <div style={{ padding: "10px 16px", color: C.white, fontSize: "12px", fontWeight: "700" }}>Volume</div>
                  <div style={{ padding: "10px 16px", color: C.white, fontSize: "12px", fontWeight: "700", textAlign: "right" }}>Harga</div>
                </div>
                {pricing.curah.map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: i % 2 === 0 ? C.white : C.cream, borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: "10px 16px", fontSize: "13px", color: C.textDark }}>{item.volume}</div>
                    <div style={{ padding: "10px 16px", fontSize: "14px", fontWeight: "700", color: C.green, textAlign: "right" }}>{item.price}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: C.textMuted, fontSize: "10px", marginTop: "6px", fontStyle: "italic" }}>* Harga bahan sudah include margin 50%</p>
            </div>

            {/* Harga Dengan Packaging */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ backgroundColor: C.gold, color: C.white, padding: "6px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "700" }}>
                  HARGA DENGAN PACKAGING & STIKER
                </div>
              </div>
              <div style={{ backgroundColor: C.white, borderRadius: "10px", overflow: "hidden", border: `1px solid ${C.border}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: C.gold }}>
                  <div style={{ padding: "10px 16px", color: C.white, fontSize: "12px", fontWeight: "700" }}>Kemasan</div>
                  <div style={{ padding: "10px 16px", color: C.white, fontSize: "12px", fontWeight: "700", textAlign: "right" }}>Harga</div>
                </div>
                {pricing.packaging.map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: i % 2 === 0 ? C.white : C.cream, borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: "10px 16px", fontSize: "12px", color: C.textDark }}>{item.volume}</div>
                    <div style={{ padding: "10px 16px", fontSize: "14px", fontWeight: "700", color: "#a06b00", textAlign: "right" }}>{item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Harga Eceran */}
            {pricing.eceran.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <div style={{ backgroundColor: "#5a8a3a", color: C.white, padding: "6px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "700" }}>
                    HARGA ECERAN (Via Marketplace)
                  </div>
                </div>
                <div style={{ backgroundColor: C.white, borderRadius: "10px", overflow: "hidden", border: `1px solid ${C.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "#5a8a3a" }}>
                    <div style={{ padding: "10px 16px", color: C.white, fontSize: "12px", fontWeight: "700" }}>Kemasan</div>
                    <div style={{ padding: "10px 16px", color: C.white, fontSize: "12px", fontWeight: "700", textAlign: "right" }}>Harga Jual</div>
                  </div>
                  {pricing.eceran.map((item, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: i % 2 === 0 ? C.white : C.cream, borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: "10px 16px", fontSize: "13px", color: C.textDark }}>{item.volume}</div>
                      <div style={{ padding: "10px 16px", fontSize: "14px", fontWeight: "700", color: "#5a8a3a", textAlign: "right" }}>{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Min Order + Maklon */}
            <div style={{ backgroundColor: C.greenDark, color: C.white, borderRadius: "10px", padding: "14px 20px", textAlign: "center", marginBottom: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700" }}>MINIMUM ORDER</div>
              <div style={{ fontSize: "12px", color: "#ffffff99", marginTop: "4px" }}>{pricing.minOrder}</div>
            </div>

            <div style={{ border: `2px solid ${C.gold}`, borderRadius: "10px", padding: "14px 20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: C.green, marginBottom: "8px" }}>LAYANAN MAKLON — Buat Brand Anda Sendiri!</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                {["Produksi dengan label & kemasan brand Anda", "Bantuan pengajuan izin PIRT & BPOM", "Pendaftaran HAKI untuk brand Anda", "MOQ khusus maklon — konsultasi gratis"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                    <span style={{ color: C.gold, fontSize: "11px" }}>•</span>
                    <span style={{ color: C.textMuted, fontSize: "11px" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ padding: "0 40px 12px" }}>
            <p style={{ color: C.textMuted, fontSize: "10px", textAlign: "center", fontStyle: "italic" }}>
              Pengiriman CARGO & REGULAR setiap hari ke seluruh Indonesia • Harga dapat berubah sewaktu-waktu
            </p>
          </div>
          <Footer />
        </div>

        {/* PAGE 3 — CARA PEMESANAN & KONTAK */}
        <div style={{ ...PAGE, display: "flex", flexDirection: "column" }} className="catalog-page">
          <Header />
          <SectionTitle>CARA PEMESANAN</SectionTitle>

          <div style={{ padding: "28px 40px", flex: 1 }}>
            {/* Steps */}
            <div style={{ marginBottom: "28px" }}>
              {[
                { n: "1", title: "Hubungi Kami", desc: "Chat via WhatsApp untuk konsultasi, cek harga, dan stok produk" },
                { n: "2", title: "Pilih Produk & Kemasan", desc: "Tentukan jenis kemasan dan jumlah pesanan sesuai kebutuhan" },
                { n: "3", title: "Konfirmasi Order", desc: "Dapatkan total harga termasuk ongkir ke lokasi Anda" },
                { n: "4", title: "Pembayaran", desc: "Transfer ke rekening yang akan diberikan setelah konfirmasi order" },
                { n: "5", title: "Pengiriman", desc: "Pesanan dikemas dan dikirim ke seluruh Indonesia via CARGO & REGULAR" },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: C.green, color: C.white, fontSize: "16px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {step.n}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: C.textDark }}>{step.title}</div>
                    <div style={{ fontSize: "12px", color: C.textMuted, marginTop: "2px" }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact box */}
            <div style={{ backgroundColor: C.greenDark, borderRadius: "12px", padding: "24px 28px", marginBottom: "20px", textAlign: "center" }}>
              <div style={{ color: C.goldLight, fontSize: "16px", fontWeight: "800", marginBottom: "16px", fontStyle: "italic" }}>
                HUBUNGI KAMI SEKARANG!
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ color: "#ffffff99", fontSize: "10px", marginBottom: "4px" }}>WhatsApp</div>
                  <div style={{ color: C.white, fontSize: "18px", fontWeight: "700" }}>0856-4748-6700</div>
                </div>
                <div>
                  <div style={{ color: "#ffffff99", fontSize: "10px", marginBottom: "4px" }}>Website</div>
                  <div style={{ color: C.white, fontSize: "14px", fontWeight: "700" }}>SariLemon.com</div>
                </div>
              </div>
            </div>

            {/* Keunggulan */}
            <div style={{ border: `2px solid ${C.border}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: C.green, marginBottom: "10px", textAlign: "center" }}>
                Keuntungan Order di PT. Barooka Global Indonesia:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {[
                  "Langsung dari pabrik — harga lebih murah",
                  "Kualitas terjamin — 100% alami tanpa bahan kimia",
                  "Pengiriman CARGO & REGULAR ke seluruh Indonesia",
                  "Support PPN dan Tanpa PPN",
                  "Support Maklon, pengajuan PIRT, BPOM & HAKI",
                  "Konsultasi gratis & stok selalu siap",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                    <span style={{ color: C.green, fontSize: "12px" }}>■</span>
                    <span style={{ color: C.textMuted, fontSize: "11px" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tentang perusahaan */}
            <div style={{ backgroundColor: C.cream, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img src={barookaLogo} alt="Barooka" style={{ height: "40px" }} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: C.textDark }}>PT. Barooka Global Indonesia</div>
                  <div style={{ fontSize: "11px", color: C.textMuted, marginTop: "2px" }}>
                    Gudang: Tangerang Selatan, Banten • Asal Produksi: Jawa Barat
                  </div>
                  <div style={{ fontSize: "11px", color: C.gold, marginTop: "2px", fontWeight: "600" }}>
                    Bisa urus PIRT, BPOM & HAKI untuk brand Anda!
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }
);

CatalogTemplate.displayName = "CatalogTemplate";

export default CatalogTemplate;
