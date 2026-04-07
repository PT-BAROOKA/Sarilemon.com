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

/* ─── Brand Colors ──────────────────────────────────────────── */
const C = {
  green:       "#3a8c1e",   // primary vibrant green
  greenDark:   "#246010",   // header / footer
  greenDeep:   "#163a09",   // deepest accent
  greenLight:  "#e6f5da",   // table alternate rows
  greenPale:   "#f2fcea",   // section bg
  gold:        "#e8a500",   // primary gold
  goldBright:  "#f5c030",   // highlight gold
  goldDark:    "#b87d00",   // gold text
  goldLight:   "#fff8e0",   // gold bg tint
  teal:        "#2a8050",   // eceran section
  tealLight:   "#e4f4ec",   // eceran row alternate
  cream:       "#fafdf4",   // page background
  white:       "#ffffff",
  text:        "#1e2410",   // near-black with green tint
  muted:       "#5a6a4a",   // muted text
  border:      "#b8d89a",   // light green border
  borderLight: "#deeece",
};

const PAGE: React.CSSProperties = {
  width: "794px",
  minHeight: "1123px",
  backgroundColor: C.cream,
  fontFamily: "'Arial', 'Helvetica Neue', sans-serif",
  position: "relative",
  overflow: "hidden",
  pageBreakAfter: "always",
  display: "flex",
  flexDirection: "column",
};

/* ─── Logo pill — always visible on white ───────────────────── */
const LogoPill: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <div style={{ backgroundColor: C.white, borderRadius: "8px", padding: "5px 10px", display: "inline-flex", alignItems: "center" }}>
    <img src={barookaLogo} alt="Barooka" style={{ height: `${size}px`, objectFit: "contain" }} />
  </div>
);

/* ─── Gold accent divider ───────────────────────────────────── */
const AccentBar: React.FC = () => (
  <div style={{ height: "5px", backgroundColor: C.gold }} />
);

/* ─── Header ────────────────────────────────────────────────── */
const Header: React.FC<{ subtitle?: string }> = ({ subtitle }) => (
  <>
    <div style={{ backgroundColor: C.greenDark, padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <LogoPill size={34} />
      <div style={{ textAlign: "right" }}>
        <div style={{ color: C.white, fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px" }}>
          PT. BAROOKA GLOBAL INDONESIA
        </div>
        {subtitle && (
          <div style={{ color: C.goldBright, fontSize: "10px", marginTop: "3px", letterSpacing: "0.5px" }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
    <AccentBar />
  </>
);

/* ─── Footer ────────────────────────────────────────────────── */
const Footer: React.FC = () => (
  <>
    <AccentBar />
    <div style={{ backgroundColor: C.greenDark, padding: "10px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
      <LogoPill size={22} />
      <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "9px", letterSpacing: "0.3px" }}>
        © 2026 PT. Barooka Global Indonesia &nbsp;|&nbsp; SariLemon.com &nbsp;|&nbsp; WA: 0856-4748-6700
      </div>
    </div>
  </>
);

/* ─── Section title bar ─────────────────────────────────────── */
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ backgroundColor: C.green, color: C.white, padding: "13px 32px", fontSize: "18px", fontWeight: "900", letterSpacing: "2px", textAlign: "center" }}>
    {children}
  </div>
);

/* ─── Table label with accent bar ───────────────────────────── */
const TableLabel: React.FC<{ label: string; sub: string; color: string }> = ({ label, sub, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
    <div style={{ width: "5px", height: "32px", backgroundColor: color, borderRadius: "3px", flexShrink: 0 }} />
    <div>
      <div style={{ fontSize: "13px", fontWeight: "800", color, letterSpacing: "0.8px" }}>{label}</div>
      <div style={{ fontSize: "10px", color: C.muted, marginTop: "1px" }}>{sub}</div>
    </div>
  </div>
);

/* ─── Price Table ───────────────────────────────────────────── */
interface PriceTableProps {
  rows: { volume: string; price: string }[];
  headerColor: string;
  priceColor: string;
  altBg: string;
  colA: string;
  colB: string;
}
const PriceTable: React.FC<PriceTableProps> = ({ rows, headerColor, priceColor, altBg, colA, colB }) => (
  <div style={{ backgroundColor: C.white, borderRadius: "8px", overflow: "hidden", border: `1px solid ${C.border}` }}>
    <div style={{ display: "flex", backgroundColor: headerColor }}>
      <div style={{ flex: 1, padding: "9px 16px", color: C.white, fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px" }}>{colA}</div>
      <div style={{ width: "180px", padding: "9px 16px", color: C.white, fontSize: "11px", fontWeight: "700", textAlign: "right" }}>{colB}</div>
    </div>
    {rows.map((item, i) => (
      <div key={i} style={{ display: "flex", backgroundColor: i % 2 === 0 ? C.white : altBg, borderTop: `1px solid ${C.borderLight}` }}>
        <div style={{ flex: 1, padding: "9px 16px", fontSize: "12px", color: C.text }}>{item.volume}</div>
        <div style={{ width: "180px", padding: "9px 16px", fontSize: "14px", fontWeight: "800", color: priceColor, textAlign: "right" }}>{item.price}</div>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const CatalogTemplate = forwardRef<HTMLDivElement, Props>(
  ({ productName, tagline, category, description, productImage, pricing }, ref) => {
    return (
      <div ref={ref} style={{ position: "absolute", left: "-9999px", top: "0", zIndex: -1, width: "794px" }}>

        {/* ═══ PAGE 1 — COVER ═══════════════════════════════════ */}
        <div style={PAGE} className="catalog-page">
          <Header />

          <div style={{ flex: 1, padding: "28px 44px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Stars */}
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              <div style={{ fontSize: "22px", letterSpacing: "4px", color: C.gold }}>★★★★★</div>
              <div style={{ fontSize: "10px", color: C.muted, marginTop: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>
                Produk Premium Indonesia
              </div>
            </div>

            {/* Category badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              backgroundColor: C.green, color: C.white,
              padding: "5px 18px", borderRadius: "20px",
              fontSize: "10px", fontWeight: "800", letterSpacing: "1.5px",
              textTransform: "uppercase", marginBottom: "16px",
            }}>
              <span>●</span>
              <span>{category}</span>
            </div>

            {/* Product name */}
            <h1 style={{ color: C.greenDark, fontSize: "42px", fontWeight: "900", textAlign: "center", lineHeight: "1.1", margin: "0 0 4px", letterSpacing: "-0.5px" }}>
              {productName}
            </h1>
            {/* Gold underline accent */}
            <div style={{ width: "80px", height: "4px", backgroundColor: C.gold, borderRadius: "2px", marginBottom: "10px" }} />
            <p style={{ color: C.muted, fontSize: "13px", textAlign: "center", marginBottom: "20px", fontStyle: "italic", lineHeight: "1.5" }}>
              {tagline}
            </p>

            {/* Product image */}
            <div style={{
              width: "300px", height: "260px",
              backgroundColor: C.greenPale,
              borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "22px",
              border: `2px solid ${C.borderLight}`,
            }}>
              <img
                src={productImage}
                alt={productName}
                style={{ maxWidth: "86%", maxHeight: "86%", objectFit: "contain" }}
              />
            </div>

            {/* Feature highlights */}
            <div style={{ backgroundColor: C.greenDark, borderRadius: "12px", padding: "18px 24px", width: "100%", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "14px" }}>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.2)" }} />
                <div style={{ color: C.goldBright, fontSize: "12px", fontWeight: "800", letterSpacing: "1px", whiteSpace: "nowrap" }}>
                  KEUNGGULAN PRODUK
                </div>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.2)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px" }}>
                {pricing.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                    <div style={{
                      width: "16px", height: "16px", borderRadius: "50%",
                      backgroundColor: C.gold, color: C.white,
                      fontSize: "10px", fontWeight: "800",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}>✓</div>
                    <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "11px", lineHeight: "1.45" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{
              border: `2px solid ${C.border}`, borderRadius: "10px",
              padding: "14px 20px", width: "100%",
              backgroundColor: C.greenPale,
            }}>
              <p style={{ color: C.muted, fontSize: "12px", textAlign: "center", lineHeight: "1.65", margin: "0 0 8px" }}>
                {description}
              </p>
              <div style={{ textAlign: "center" }}>
                <span style={{
                  display: "inline-block",
                  backgroundColor: C.goldLight, color: C.goldDark,
                  padding: "3px 14px", borderRadius: "12px",
                  fontSize: "10px", fontWeight: "700", letterSpacing: "0.3px",
                }}>
                  100% Alami &nbsp;•&nbsp; Tanpa Bahan Kimia &nbsp;•&nbsp; Aman &amp; Terpercaya
                </span>
              </div>
            </div>
          </div>

          <Footer />
        </div>

        {/* ═══ PAGE 2 — DAFTAR HARGA ════════════════════════════ */}
        <div style={PAGE} className="catalog-page">
          <Header subtitle="Harga Update: 2026" />
          <SectionTitle>DAFTAR HARGA GROSIR</SectionTitle>

          <div style={{ flex: 1, padding: "22px 40px 16px" }}>

            {/* ── Harga Curah ── */}
            <div style={{ marginBottom: "18px" }}>
              <TableLabel label="HARGA CURAH" sub="Tanpa Kemasan — langsung dari produksi" color={C.green} />
              <PriceTable
                rows={pricing.curah}
                headerColor={C.green}
                priceColor={C.green}
                altBg={C.greenLight}
                colA="Volume"
                colB="Harga / Liter"
              />
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "5px" }}>
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: C.muted }} />
                <span style={{ color: C.muted, fontSize: "10px", fontStyle: "italic" }}>
                  Harga sudah termasuk margin 50% &nbsp;•&nbsp; Minimum order: {pricing.minOrder.replace("Min. ", "")}
                </span>
              </div>
            </div>

            {/* ── Harga Packaging ── */}
            <div style={{ marginBottom: "18px" }}>
              <TableLabel label="HARGA DENGAN PACKAGING" sub="Termasuk botol/jerigen + stiker label" color={C.goldDark} />
              <PriceTable
                rows={pricing.packaging}
                headerColor={C.gold}
                priceColor={C.goldDark}
                altBg={C.goldLight}
                colA="Kemasan"
                colB="Harga / Unit"
              />
            </div>

            {/* ── Harga Eceran ── */}
            {pricing.eceran.length > 0 && (
              <div style={{ marginBottom: "18px" }}>
                <TableLabel label="HARGA ECERAN" sub="Via marketplace / penjualan langsung" color={C.teal} />
                <PriceTable
                  rows={pricing.eceran}
                  headerColor={C.teal}
                  priceColor={C.teal}
                  altBg={C.tealLight}
                  colA="Kemasan"
                  colB="Harga Jual"
                />
              </div>
            )}

            {/* Min Order + Maklon */}
            <div style={{ display: "flex", gap: "14px" }}>
              <div style={{
                flex: 1, backgroundColor: C.greenDark, borderRadius: "10px",
                padding: "14px 18px", textAlign: "center",
              }}>
                <div style={{ color: C.goldBright, fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "6px" }}>
                  Minimum Order
                </div>
                <div style={{ color: C.white, fontSize: "13px", fontWeight: "700" }}>{pricing.minOrder}</div>
              </div>
              <div style={{
                flex: 2, border: `2px solid ${C.gold}`, borderRadius: "10px",
                padding: "14px 18px", backgroundColor: C.goldLight,
              }}>
                <div style={{ fontSize: "12px", fontWeight: "800", color: C.goldDark, marginBottom: "8px", letterSpacing: "0.5px" }}>
                  🏷 LAYANAN MAKLON — Buat Brand Sendiri!
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 10px" }}>
                  {[
                    "Produksi dengan label & kemasan Anda",
                    "Pengajuan izin PIRT & BPOM",
                    "Pendaftaran HAKI brand Anda",
                    "MOQ khusus — konsultasi gratis",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "5px" }}>
                      <span style={{ color: C.gold, fontSize: "11px", flexShrink: 0, marginTop: "1px" }}>◆</span>
                      <span style={{ color: C.muted, fontSize: "10.5px", lineHeight: "1.45" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "0 40px 10px", textAlign: "center" }}>
            <span style={{ color: C.muted, fontSize: "10px", fontStyle: "italic" }}>
              Pengiriman CARGO &amp; REGULAR setiap hari ke seluruh Indonesia &nbsp;•&nbsp; Harga dapat berubah sewaktu-waktu
            </span>
          </div>
          <Footer />
        </div>

        {/* ═══ PAGE 3 — CARA PEMESANAN ══════════════════════════ */}
        <div style={PAGE} className="catalog-page">
          <Header />
          <SectionTitle>CARA PEMESANAN</SectionTitle>

          <div style={{ flex: 1, padding: "24px 44px 16px" }}>

            {/* Steps */}
            <div style={{ marginBottom: "22px", position: "relative" }}>
              {/* Vertical connector line */}
              <div style={{
                position: "absolute", left: "18px", top: "36px",
                width: "2px", height: "calc(100% - 50px)",
                backgroundColor: C.borderLight,
              }} />
              {[
                { title: "Hubungi Kami", desc: "Chat via WhatsApp untuk konsultasi produk, cek harga, dan ketersediaan stok." },
                { title: "Pilih Produk & Kemasan", desc: "Tentukan jenis kemasan (curah / packaging / eceran) dan jumlah pesanan." },
                { title: "Konfirmasi Order", desc: "Dapatkan detail total harga termasuk ongkos kirim ke lokasi Anda." },
                { title: "Pembayaran", desc: "Transfer ke rekening resmi perusahaan setelah mendapat konfirmasi order." },
                { title: "Proses & Pengiriman", desc: "Pesanan dikemas dan dikirim ke seluruh Indonesia via CARGO atau REGULAR." },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "18px", alignItems: "flex-start", marginBottom: "14px", position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    backgroundColor: i === 0 ? C.green : C.white,
                    border: `2px solid ${C.green}`,
                    color: i === 0 ? C.white : C.green,
                    fontSize: "15px", fontWeight: "900",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{
                    flex: 1, backgroundColor: i === 0 ? C.greenPale : C.white,
                    border: `1px solid ${i === 0 ? C.border : C.borderLight}`,
                    borderRadius: "8px", padding: "10px 14px",
                    marginTop: "2px",
                  }}>
                    <div style={{ fontSize: "13px", fontWeight: "800", color: C.greenDark, marginBottom: "3px" }}>{step.title}</div>
                    <div style={{ fontSize: "11px", color: C.muted, lineHeight: "1.5" }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact box */}
            <div style={{
              backgroundColor: C.greenDark, borderRadius: "12px",
              padding: "20px 28px", marginBottom: "18px",
              border: `3px solid ${C.gold}`,
            }}>
              <div style={{ textAlign: "center", marginBottom: "14px" }}>
                <div style={{ color: C.goldBright, fontSize: "11px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase" }}>
                  ★ &nbsp; Hubungi Kami Sekarang &nbsp; ★
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "0", alignItems: "stretch" }}>
                <div style={{ flex: 1, textAlign: "center", padding: "10px 20px", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>WhatsApp</div>
                  <div style={{ color: C.white, fontSize: "20px", fontWeight: "900", letterSpacing: "0.5px" }}>0856-4748-6700</div>
                </div>
                <div style={{ flex: 1, textAlign: "center", padding: "10px 20px" }}>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>Website</div>
                  <div style={{ color: C.goldBright, fontSize: "18px", fontWeight: "700" }}>SariLemon.com</div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div style={{
              border: `2px solid ${C.border}`, borderRadius: "10px",
              padding: "14px 20px", marginBottom: "16px",
              backgroundColor: C.greenPale,
            }}>
              <div style={{
                fontSize: "11px", fontWeight: "800", color: C.green,
                textTransform: "uppercase", letterSpacing: "1px",
                textAlign: "center", marginBottom: "12px",
              }}>
                Keuntungan Order di PT. Barooka Global Indonesia
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px" }}>
                {[
                  "Langsung dari pabrik, harga lebih murah",
                  "100% alami, tanpa bahan kimia berbahaya",
                  "Pengiriman CARGO & REGULAR seluruh Indonesia",
                  "Support invoice PPN maupun non-PPN",
                  "Layanan Maklon, pengajuan PIRT, BPOM & HAKI",
                  "Konsultasi gratis, stok selalu tersedia",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                    <div style={{
                      width: "15px", height: "15px", borderRadius: "50%",
                      backgroundColor: C.green, color: C.white,
                      fontSize: "9px", fontWeight: "800",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "1px",
                    }}>✓</div>
                    <span style={{ color: C.muted, fontSize: "11px", lineHeight: "1.45" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company info */}
            <div style={{
              backgroundColor: C.white, border: `1px solid ${C.border}`,
              borderRadius: "10px", padding: "14px 18px",
              display: "flex", alignItems: "center", gap: "16px",
            }}>
              <LogoPill size={44} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: "800", color: C.text, marginBottom: "3px" }}>
                  PT. Barooka Global Indonesia
                </div>
                <div style={{ fontSize: "10.5px", color: C.muted, lineHeight: "1.6" }}>
                  Gudang &amp; Pengiriman: Tangerang Selatan, Banten<br />
                  Asal Produksi: Jawa Barat &nbsp;•&nbsp; PIRT Terdaftar
                </div>
              </div>
              <div style={{
                backgroundColor: C.goldLight, border: `1px solid ${C.gold}`,
                borderRadius: "8px", padding: "8px 12px", textAlign: "center",
              }}>
                <div style={{ color: C.goldDark, fontSize: "9px", fontWeight: "700", letterSpacing: "0.5px" }}>LAYANAN</div>
                <div style={{ color: C.goldDark, fontSize: "10px", fontWeight: "800", marginTop: "2px" }}>PIRT • BPOM</div>
                <div style={{ color: C.goldDark, fontSize: "10px", fontWeight: "800" }}>HAKI</div>
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
