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
};
