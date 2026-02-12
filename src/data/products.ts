export interface ProductData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  origin: string;
  warehouse: string;
  category: string;
  benefits: string[];
  useCases: string[];
  specifications: { label: string; value: string }[];
  pricing: {
    type: string;
    unit: string;
    priceRange: string;
    minOrder?: string;
  }[];
  leadTime: {
    small: string;
    medium: string;
    large: string;
  };
  certifications: string[];
  isFeatured: boolean;
}

export const products: ProductData[] = [
  {
    slug: "sari-lemon",
    name: "Sari Lemon",
    tagline: "Sari lemon murni untuk kesehatan & kecantikan Anda",
    description: "Sari lemon murni 100% tanpa campuran, diproduksi dari lemon pilihan berkualitas tinggi. Kaya vitamin C dan antioksidan alami, cocok untuk diet, detox, perawatan kulit, dan campuran minuman segar.",
    origin: "Malang, Jawa Timur",
    warehouse: "Tangerang Selatan, Banten",
    category: "Sari Buah",
    benefits: [
      "Kaya vitamin C untuk meningkatkan imunitas tubuh",
      "Membantu program diet dan detoksifikasi",
      "Mencerahkan kulit wajah secara alami",
      "Melancarkan pencernaan dan metabolisme",
      "Antioksidan alami melawan radikal bebas"
    ],
    useCases: [
      "Minuman diet harian — campurkan dengan air hangat",
      "Masker wajah alami untuk kulit cerah",
      "Campuran salad dressing yang menyegarkan",
      "Bahan dasar infused water",
      "Campuran teh dan minuman herbal",
      "Bahan baku industri F&B"
    ],
    specifications: [
      { label: "Bahan", value: "100% Sari Lemon Murni" },
      { label: "Volume", value: "500ml / 1L / 5L / 25L" },
      { label: "Warna", value: "Kuning keemasan alami" },
      { label: "Rasa", value: "Asam segar khas lemon" },
      { label: "Penyimpanan", value: "Simpan di tempat sejuk, hindari sinar matahari langsung" },
      { label: "Masa Simpan", value: "12 bulan (sebelum dibuka)" }
    ],
    pricing: [
      { type: "Eceran", unit: "Botol 500ml", priceRange: "Hubungi kami" },
      { type: "Grosir", unit: "Karton (12 botol)", priceRange: "Hubungi kami", minOrder: "5 karton" },
      { type: "Curah", unit: "Jerigen 5L", priceRange: "Hubungi kami", minOrder: "10 jerigen" },
      { type: "Curah Besar", unit: "Drum 200L", priceRange: "Hubungi kami", minOrder: "1 drum" }
    ],
    leadTime: {
      small: "1-3 hari kerja",
      medium: "3-7 hari kerja",
      large: "7-14 hari kerja"
    },
    certifications: ["PIRT"],
    isFeatured: true
  },
  {
    slug: "cuka-apel",
    name: "Cuka Apel",
    tagline: "Cuka apel fermentasi alami untuk kesehatan",
    description: "Cuka apel murni hasil fermentasi alami dari apel pilihan Malang. Mengandung enzim dan probiotik yang baik untuk pencernaan, diet, dan perawatan kulit.",
    origin: "Malang, Jawa Timur",
    warehouse: "Tangerang Selatan, Banten",
    category: "Cuka Buah",
    benefits: [
      "Membantu mengontrol gula darah",
      "Melancarkan pencernaan",
      "Mendukung program diet",
      "Menjaga kesehatan kulit",
      "Mengandung probiotik alami"
    ],
    useCases: [
      "Minuman kesehatan harian",
      "Salad dressing alami",
      "Toner wajah alami",
      "Campuran smoothie",
      "Bahan masakan sehat"
    ],
    specifications: [
      { label: "Bahan", value: "100% Cuka Apel Fermentasi" },
      { label: "Volume", value: "500ml / 1L / 5L" },
      { label: "Keasaman", value: "4-5%" },
      { label: "Penyimpanan", value: "Simpan di tempat sejuk" },
      { label: "Masa Simpan", value: "24 bulan" }
    ],
    pricing: [
      { type: "Eceran", unit: "Botol 500ml", priceRange: "Hubungi kami" },
      { type: "Grosir", unit: "Karton (12 botol)", priceRange: "Hubungi kami", minOrder: "5 karton" },
      { type: "Curah", unit: "Jerigen 5L", priceRange: "Hubungi kami", minOrder: "10 jerigen" }
    ],
    leadTime: { small: "1-3 hari kerja", medium: "3-7 hari kerja", large: "7-14 hari kerja" },
    certifications: ["PIRT"],
    isFeatured: false
  },
  {
    slug: "chia-seed",
    name: "Chia Seed",
    tagline: "Superfood kaya serat dan omega-3",
    description: "Chia seed berkualitas tinggi, kaya serat, omega-3, dan protein nabati. Cocok untuk diet sehat, topping smoothie bowl, dan campuran minuman.",
    origin: "Malang, Jawa Timur",
    warehouse: "Tangerang Selatan, Banten",
    category: "Superfood",
    benefits: [
      "Kaya serat untuk pencernaan sehat",
      "Sumber omega-3 nabati terbaik",
      "Protein nabati tinggi",
      "Membantu menurunkan berat badan",
      "Mengandung mineral esensial"
    ],
    useCases: [
      "Topping smoothie bowl",
      "Campuran overnight oats",
      "Chia pudding sehat",
      "Taburan yogurt",
      "Campuran minuman segar"
    ],
    specifications: [
      { label: "Bahan", value: "100% Chia Seed" },
      { label: "Berat", value: "250g / 500g / 1kg" },
      { label: "Penyimpanan", value: "Simpan di tempat kering" },
      { label: "Masa Simpan", value: "18 bulan" }
    ],
    pricing: [
      { type: "Eceran", unit: "Pack 250g", priceRange: "Hubungi kami" },
      { type: "Grosir", unit: "Pack 1kg", priceRange: "Hubungi kami", minOrder: "10 pack" }
    ],
    leadTime: { small: "1-3 hari kerja", medium: "3-7 hari kerja", large: "7-14 hari kerja" },
    certifications: ["PIRT"],
    isFeatured: false
  },
  {
    slug: "garam-himalaya",
    name: "Garam Himalaya",
    tagline: "Garam pink alami kaya mineral",
    description: "Garam himalaya pink asli, mengandung 84 mineral alami. Alternatif sehat pengganti garam meja biasa untuk masakan dan minuman kesehatan.",
    origin: "Malang, Jawa Timur",
    warehouse: "Tangerang Selatan, Banten",
    category: "Bumbu Sehat",
    benefits: [
      "Mengandung 84 mineral alami",
      "Rendah natrium dibanding garam biasa",
      "Membantu keseimbangan elektrolit",
      "Mendukung fungsi tiroid",
      "Bebas bahan kimia tambahan"
    ],
    useCases: [
      "Pengganti garam meja",
      "Campuran minuman elektrolit",
      "Bumbu masakan sehat",
      "Salt sole therapy",
      "Bath salt relaksasi"
    ],
    specifications: [
      { label: "Bahan", value: "100% Garam Himalaya" },
      { label: "Berat", value: "250g / 500g / 1kg" },
      { label: "Bentuk", value: "Halus / Kasar" },
      { label: "Masa Simpan", value: "36 bulan" }
    ],
    pricing: [
      { type: "Eceran", unit: "Pack 250g", priceRange: "Hubungi kami" },
      { type: "Grosir", unit: "Pack 1kg", priceRange: "Hubungi kami", minOrder: "10 pack" }
    ],
    leadTime: { small: "1-3 hari kerja", medium: "3-7 hari kerja", large: "7-14 hari kerja" },
    certifications: ["PIRT"],
    isFeatured: false
  },
  {
    slug: "sari-jeruk-nipis",
    name: "Sari Jeruk Nipis",
    tagline: "Sari jeruk nipis murni segar alami",
    description: "Sari jeruk nipis murni 100% tanpa pengawet, cocok untuk minuman segar, bumbu masakan, dan campuran jamu tradisional.",
    origin: "Malang, Jawa Timur",
    warehouse: "Tangerang Selatan, Banten",
    category: "Sari Buah",
    benefits: [
      "Vitamin C tinggi",
      "Menyegarkan dan melancarkan pencernaan",
      "Bumbu masakan alami",
      "Membantu detoksifikasi",
      "Meningkatkan daya tahan tubuh"
    ],
    useCases: [
      "Campuran minuman segar",
      "Bumbu masakan & seafood",
      "Campuran jamu tradisional",
      "Bahan dasar es jeruk nipis",
      "Industri F&B"
    ],
    specifications: [
      { label: "Bahan", value: "100% Sari Jeruk Nipis" },
      { label: "Volume", value: "500ml / 1L / 5L" },
      { label: "Masa Simpan", value: "12 bulan" }
    ],
    pricing: [
      { type: "Eceran", unit: "Botol 500ml", priceRange: "Hubungi kami" },
      { type: "Grosir", unit: "Karton (12 botol)", priceRange: "Hubungi kami", minOrder: "5 karton" }
    ],
    leadTime: { small: "1-3 hari kerja", medium: "3-7 hari kerja", large: "7-14 hari kerja" },
    certifications: ["PIRT"],
    isFeatured: false
  }
];

export const WHATSAPP_NUMBER = "6285647486700";
export const WHATSAPP_MESSAGE = "Halo SariLemon.com, saya tertarik dengan produk SariLemon. Bisa minta info lebih lanjut?";
export const getWhatsAppLink = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || WHATSAPP_MESSAGE)}`;
