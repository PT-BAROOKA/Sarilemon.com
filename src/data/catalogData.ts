export interface CatalogPricing {
  curah: { volume: string; price: string }[];
  packaging: { volume: string; price: string }[];
  eceran: { volume: string; price: string }[];
  minOrder: string;
  highlights: string[];
}

export const catalogData: Record<string, CatalogPricing> = {
  "sari-lemon": {
    curah: [
      { volume: "1 Liter", price: "Rp 33.000" },
      { volume: "5 Liter", price: "Rp 165.000" },
      { volume: "10 Liter", price: "Rp 330.000" },
      { volume: "20 Liter", price: "Rp 660.000" },
    ],
    packaging: [
      { volume: "1 Liter (Botol + Stiker)", price: "Rp 82.000" },
      { volume: "5 Liter (Jerigen + Stiker)", price: "Rp 312.875" },
      { volume: "10 Liter (Jerigen + Stiker)", price: "Rp 636.250" },
      { volume: "20 Liter (Jerigen + Stiker)", price: "Rp 1.204.167" },
    ],
    eceran: [
      { volume: "250 ml", price: "Rp 24.799" },
      { volume: "500 ml", price: "Rp 32.799" },
    ],
    minOrder: "Min. 1 Liter untuk pembelian curah",
    highlights: [
      "100% Sari Lemon Murni Tanpa Pengawet",
      "Kaya Vitamin C & Antioksidan Alami",
      "Sertifikasi PIRT",
      "Layanan Maklon / Private Label Tersedia",
      "Pengiriman ke Seluruh Indonesia",
    ],
  },
  "cuka-apel": {
    curah: [
      { volume: "1 Liter", price: "Rp 23.250" },
      { volume: "5 Liter", price: "Rp 116.250" },
      { volume: "10 Liter", price: "Rp 232.500" },
      { volume: "20 Liter", price: "Rp 465.000" },
    ],
    packaging: [
      { volume: "1 Liter (Botol + Stiker)", price: "Rp 65.750" },
      { volume: "5 Liter (Jerigen + Stiker)", price: "Rp 231.625" },
      { volume: "10 Liter (Jerigen + Stiker)", price: "Rp 473.750" },
      { volume: "20 Liter (Jerigen + Stiker)", price: "Rp 879.167" },
    ],
    eceran: [
      { volume: "250 ml", price: "Rp 53.599" },
      { volume: "500 ml", price: "Rp 95.199" },
    ],
    minOrder: "Min. 1 Liter untuk pembelian curah",
    highlights: [
      "100% Fermentasi Alami dari Apel Pilihan",
      "Mengandung Enzim & Probiotik Alami",
      "Sertifikasi PIRT",
      "Layanan Maklon / Private Label Tersedia",
      "Pengiriman ke Seluruh Indonesia",
    ],
  },
  "sari-jeruk-nipis": {
    curah: [
      { volume: "1 Liter", price: "Rp 54.000" },
      { volume: "5 Liter", price: "Rp 270.000" },
      { volume: "10 Liter", price: "Rp 540.000" },
      { volume: "20 Liter", price: "Rp 1.080.000" },
    ],
    packaging: [
      { volume: "1 Liter (Botol + Stiker)", price: "Rp 117.000" },
      { volume: "5 Liter (Jerigen + Stiker)", price: "Rp 487.875" },
      { volume: "10 Liter (Jerigen + Stiker)", price: "Rp 986.250" },
      { volume: "20 Liter (Jerigen + Stiker)", price: "Rp 1.904.167" },
    ],
    eceran: [
      { volume: "250 ml", price: "Rp 20.800" },
      { volume: "500 ml", price: "Rp 30.400" },
    ],
    minOrder: "Min. 1 Liter untuk pembelian curah",
    highlights: [
      "100% Sari Jeruk Nipis Murni Tanpa Pengawet",
      "Vitamin C Tinggi, Segar & Alami",
      "Sertifikasi PIRT",
      "Layanan Maklon / Private Label Tersedia",
      "Pengiriman ke Seluruh Indonesia",
    ],
  },
  "chia-seed": {
    curah: [
      { volume: "1 Kg", price: "Rp 90.000" },
      { volume: "5 Kg", price: "Rp 450.000" },
      { volume: "10 Kg", price: "Rp 900.000" },
      { volume: "20 Kg", price: "Rp 1.800.000" },
    ],
    packaging: [
      { volume: "1 Kg (Pouch Ziplock + Stiker)", price: "Rp 174.575" },
      { volume: "5 Kg (Pouch Kopi + Stiker)", price: "Rp 797.375" },
      { volume: "10 Kg (Pouch Plastik + Stiker)", price: "Rp 1.524.962" },
      { volume: "20 Kg (Karung Foil + Stiker)", price: "Rp 3.040.000" },
    ],
    eceran: [
      { volume: "250 gr", price: "Rp 25.400" },
      { volume: "500 gr", price: "Rp 32.600" },
    ],
    minOrder: "Min. 1 Kg untuk pembelian curah",
    highlights: [
      "100% Chia Seed Murni Tanpa Campuran",
      "Kaya Serat, Omega-3 & Protein Nabati",
      "Sertifikasi PIRT",
      "Layanan Maklon / Private Label Tersedia",
      "Pengiriman ke Seluruh Indonesia",
    ],
  },
  "garam-himalaya": {
    curah: [
      { volume: "1 Kg", price: "Rp 27.750" },
      { volume: "5 Kg", price: "Rp 138.750" },
      { volume: "10 Kg", price: "Rp 277.500" },
      { volume: "20 Kg", price: "Rp 555.000" },
    ],
    packaging: [
      { volume: "1 Kg (Pouch Ziplock + Stiker)", price: "Rp 70.825" },
      { volume: "5 Kg (Pouch Kopi + Stiker)", price: "Rp 278.625" },
      { volume: "10 Kg (Pouch Plastik + Stiker)", price: "Rp 487.462" },
      { volume: "20 Kg (Karung Foil + Stiker)", price: "Rp 965.000" },
    ],
    eceran: [],
    minOrder: "Min. 1 Kg untuk pembelian curah",
    highlights: [
      "100% Garam Himalaya Pink Asli",
      "Mengandung 84 Mineral Alami",
      "Sertifikasi PIRT",
      "Layanan Maklon / Private Label Tersedia",
      "Pengiriman ke Seluruh Indonesia",
    ],
  },
};
