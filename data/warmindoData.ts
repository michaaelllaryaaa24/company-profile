import {
  Branch,
  DonenessOption,
  FAQItem,
  FranchisePackage,
  GalleryPhoto,
  MenuCategory,
  MenuItem,
  MieBaseOption,
  NobarPackage,
  StoryMilestone,
  Testimonial,
  ToppingOption,
} from "@/types/warmindo";

export const BRAND_CONFIG = {
  name: "Warmindo Nusantara",
  shortName: "WARMINDO NUSANTARA",
  tagline: "Cita Rasa Jalanan, Kenyamanan Tongkrongan Modern",
  subTagline: "Buka 24 Jam • Racikan Indomie Artisan • Kopi Nusantara • Arena Nobar",
  whatsappOrderNumber: "6281234567890",
  whatsappFranchiseNumber: "6281298765432",
  email: "halo@warmindonusantara.id",
  instagram: "@warmindonusantara.id",
  tiktok: "@warmindonusantara",
  foundedYear: 2019,
  heroImage:
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85",
  heroFoodImage:
    "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=1000&q=85",
};

export const HERO_STATS = [
  {
    id: "portions",
    label: "Porsi Indomie Terjual",
    value: 1482500,
    suffix: "+",
    caption: "Sejak dapur pertama di Purwokerto 2019",
  },
  {
    id: "branches",
    label: "Cabang Aktif 24 Jam",
    value: 18,
    suffix: " Outlet",
    caption: "Tersebar di 5 kota pelajar & kreatif",
  },
  {
    id: "rating",
    label: "Rating Google Maps",
    value: 4.9,
    decimals: 1,
    suffix: "/5.0",
    caption: "Dari 14.200+ ulasan nongkrongers",
  },
  {
    id: "wifi",
    label: "Kecepatan WiFi Fiber",
    value: 100,
    suffix: " Mbps",
    caption: "Anti buffering buat push rank & skripsian",
  },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  "Semua",
  "Mie Goreng",
  "Mie Kuah",
  "Roti Bakar",
  "Kue Pancong Lumer",
  "Kopi Tubruk/Susu",
  "Minuman Segar",
  "Camilan",
];

export const MENU_ITEMS: MenuItem[] = [
  // Mie Goreng
  {
    id: "mg-dokdok-telur-asin",
    name: "Indomie Goreng Telur Asin Nyemek",
    category: "Mie Goreng",
    description:
      "Indomie goreng racikan kuali besi berlumur saus kuning telur asin creamy, telur omega setengah matang, daun jeruk goreng, dan taburan rawit merah.",
    price: 22000,
    calories: 560,
    spicyLevel: 2,
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=80",
    badge: "Best Seller",
    isSignature: true,
    prepTimeMinutes: 7,
    tags: ["Signature", "Creamy", "Telur Asin"],
  },
  {
    id: "mg-aceh-kornet-moza",
    name: "Indomie Goreng Aceh Kornet Mozzarella",
    category: "Mie Goreng",
    description:
      "Bumbu rempah khas Aceh yang wangi dan nendang, ditumis bareng kornet sapi premium lalu di-torch keju mozzarella melimpah di atasnya.",
    price: 26000,
    calories: 640,
    spicyLevel: 4,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=80",
    badge: "Chef's Pick",
    isSignature: true,
    prepTimeMinutes: 8,
    tags: ["Rempah", "Keju Lumer", "Pedas Mantap"],
  },
  {
    id: "mg-rendang-bakso-urat",
    name: "Indomie Goreng Rendang Bakso Urat Bakar",
    category: "Mie Goreng",
    description:
      "Perpaduan gurihnya Indomie Rendang dengan potongan bakso urat bakar bumbu kecap pedas, kerupuk pangsit, dan bawang goreng Sumenep.",
    price: 24000,
    calories: 610,
    spicyLevel: 3,
    image:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=80",
    prepTimeMinutes: 8,
    tags: ["Gurih", "Smoky", "Ngenyangin"],
  },
  {
    id: "mg-geprek-sambal-matah",
    name: "Indomie Goreng Sambal Matah & Ayam Krispi",
    category: "Mie Goreng",
    description:
      "Indomie Goreng Original disajikan dengan fillet ayam krispi geprek dan guyuran sambal matah Bali segar yang pedasnya bikin melek tengah malam.",
    price: 25000,
    calories: 620,
    spicyLevel: 5,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
    badge: "Pedas Nampol",
    prepTimeMinutes: 9,
    tags: ["Ekstrem", "Ayam Krispi", "Segar"],
  },

  // Mie Kuah
  {
    id: "mk-kari-susu-ceker",
    name: "Indomie Kuah Kari Susu & Ceker Pedas",
    category: "Mie Kuah",
    description:
      "Kuah Kari Ayam dimasak dengan susu evaporasi kental hingga gurih ala ramen lokal, ditemani 3 ceker mercon empuk lepas tulang dan telur rebus.",
    price: 24000,
    calories: 590,
    spicyLevel: 4,
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
    badge: "Favorit Hujan",
    isSignature: true,
    prepTimeMinutes: 8,
    tags: ["Kuah Creamy", "Ceker Empuk", "Hangat"],
  },
  {
    id: "mk-soto-banjar-koya",
    name: "Indomie Kuah Soto Koya & Telur Setengah Matang",
    category: "Mie Kuah",
    description:
      "Kuah soto hangat dengan perasan jeruk nipis, taburan bubuk koya gurih khas Lamongan, sawi hijau segar, dan telur setengah matang lumer.",
    price: 19000,
    calories: 480,
    spicyLevel: 1,
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=80",
    prepTimeMinutes: 6,
    tags: ["Comfort Food", "Segar", "Klasik"],
  },
  {
    id: "mk-seblak-rawit-dewa",
    name: "Indomie Kuah Seblak Rawit Dewa",
    category: "Mie Kuah",
    description:
      "Kuah kencur merah menyala dengan 15 cabai rawit setan, kerupuk oranye kenyal, sosis sapi, dan ceker lunak. Khusus pecinta tantangan pedas!",
    price: 23000,
    calories: 540,
    spicyLevel: 5,
    image:
      "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=900&q=80",
    badge: "Level 5 🔥",
    prepTimeMinutes: 8,
    tags: ["Ekstrem", "Kencur", "Wajib Coba"],
  },

  // Roti Bakar
  {
    id: "rb-coklat-keju-ovaltine",
    name: "Roti Bakar Bandung Cokelat Keju Malt",
    category: "Roti Bakar",
    description:
      "Roti kasino tebal panggang mentega Wijsman, isi selai cokelat Belgia, keju parut melimpah, susu kental manis, dan taburan malt renyah.",
    price: 18000,
    calories: 490,
    spicyLevel: 0,
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80",
    badge: "Teman Kopi",
    prepTimeMinutes: 6,
    tags: ["Manis", "Sharing", "Mentega Wijsman"],
  },
  {
    id: "rb-kornet-telur-moza",
    name: "Roti Bakar Gurih Kornet Keju Melt",
    category: "Roti Bakar",
    description:
      "Versi gurih dari roti bakar legendaris: isian kornet sapi tumis lada hitam, telur dadar fluffy, dan lelehan keju cheddar-mozzarella.",
    price: 22000,
    calories: 530,
    spicyLevel: 1,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    prepTimeMinutes: 7,
    tags: ["Gurih", "Protein", "Ngenyangin"],
  },

  // Kue Pancong Lumer
  {
    id: "kp-matcha-almond",
    name: "Kue Pancong Lumer Uji Matcha & Almond",
    category: "Kue Pancong Lumer",
    description:
      "Adonan pancong setengah matang yang lembut meleleh di mulut, disiram glaze matcha Jepang autentik dan potongan kacang almond panggang.",
    price: 17000,
    calories: 410,
    spicyLevel: 0,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80",
    badge: "Viral TikTok",
    isSignature: true,
    prepTimeMinutes: 7,
    tags: ["Lumer", "Dessert", "Matcha"],
  },
  {
    id: "kp-choco-cheese-biscoff",
    name: "Kue Pancong Lumer Choco Cheese Lotus",
    category: "Kue Pancong Lumer",
    description:
      "Pancong hangat super lumer dengan double topping dark chocolate ganache, parutan keju cheddar, dan crumble karamel kayu manis.",
    price: 19000,
    calories: 460,
    spicyLevel: 0,
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80",
    prepTimeMinutes: 7,
    tags: ["Lumer", "Cokelat", "Favorit Cewek"],
  },

  // Kopi Tubruk/Susu
  {
    id: "kp-susu-gula-aren",
    name: "Es Kopi Susu Nusantara Gula Aren",
    category: "Kopi Tubruk/Susu",
    description:
      "Double shot house-blend Robusta Temanggung & Arabika Gayo dipadukan susu fresh milk creamy dan sirup gula aren organik asli.",
    price: 18000,
    calories: 210,
    spicyLevel: 0,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    badge: "Best Seller",
    isSignature: true,
    prepTimeMinutes: 4,
    tags: ["House Blend", "Gula Aren", "Melek 24 Jam"],
  },
  {
    id: "kp-tubruk-temanggung",
    name: "Kopi Tubruk Klasik Robusta Temanggung",
    category: "Kopi Tubruk/Susu",
    description:
      "Seduhan kopi tubruk giling halus beraroma cokelat gelap dan sedikit smoky. Disajikan panas dengan pilihan gula terpisah.",
    price: 12000,
    calories: 45,
    spicyLevel: 0,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    prepTimeMinutes: 4,
    tags: ["Panas", "Bold", "Tradisional"],
  },
  {
    id: "kp-butterscotch-latte",
    name: "Salted Butterscotch Warkop Latte",
    category: "Kopi Tubruk/Susu",
    description:
      "Espresso nikmat dengan saus butterscotch gurih-manis dan sea salt foam lembut di atasnya. Sensasi kafe modern harga warkop!",
    price: 21000,
    calories: 250,
    spicyLevel: 0,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    prepTimeMinutes: 5,
    tags: ["Creamy", "Modern", "Iced/Hot"],
  },

  // Minuman Segar
  {
    id: "ms-es-teh-jumbo-solo",
    name: "Es Teh Kampul Jumbo Racikan Solo",
    category: "Minuman Segar",
    description:
      "Perpaduan 3 daun teh melati legendaris Solo dengan es batu kristal melimpah dan irisan jeruk nipis segar. Manis, sepet, wangi!",
    price: 9000,
    calories: 130,
    spicyLevel: 0,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
    badge: "Wajib Pesan",
    prepTimeMinutes: 3,
    tags: ["Jumbo 650ml", "Segar", "Hemat"],
  },
  {
    id: "ms-soda-gembira-yakult",
    name: "Lychee Yakult Mojito Sparkling",
    category: "Minuman Segar",
    description:
      "Soda dingin menyegarkan dengan buah leci utuh, probiotik Yakult, daun mint segar, dan perasan lemon. Penetral sempurna habis makan pedas!",
    price: 16000,
    calories: 165,
    spicyLevel: 0,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    prepTimeMinutes: 4,
    tags: ["Sparkling", "Penetral Pedas", "Segar"],
  },

  // Camilan
  {
    id: "cm-platter-nobar",
    name: "Platter Nobar Nusantara (Sharing 3-4 Org)",
    category: "Camilan",
    description:
      "Kombinasi kentang goreng bumbu balado, sosis bakar bratwurst, cireng rujak kriuk, dan pangsit ayam lengkap dengan 3 saus cocolan.",
    price: 38000,
    calories: 780,
    spicyLevel: 2,
    image:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=900&q=80",
    badge: "Menu Nobar",
    prepTimeMinutes: 10,
    tags: ["Sharing", "Kriuk", "Favorit Grup"],
  },
  {
    id: "cm-mendoan-purwokerto",
    name: "Tempe Mendoan Purwokerto & Sambal Kecap",
    category: "Camilan",
    description:
      "5 lembar tempe mendoan tipis hangat digoreng setengah kering dengan irisan daun bawang melimpah dan sambal kecap rawit ulek.",
    price: 14000,
    calories: 360,
    spicyLevel: 2,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80",
    badge: "Asli Banyumas",
    prepTimeMinutes: 6,
    tags: ["Lokal", "Hangat", "Klasik"],
  },
];

export const MIE_BASES: MieBaseOption[] = [
  {
    id: "goreng-original",
    name: "Indomie Goreng Original",
    style: "Goreng",
    description: "Klasik legendaris dengan minyak bawang & kecap manis khas",
    price: 11000,
    calories: 380,
    image: "/images/hero-indomie.jpg",
    colorAccent: "#F59E0B",
    brothColor: "rgba(245, 158, 11, 0.16)",
    noodleColor: "#FBBF24",
    popular: true,
  },
  {
    id: "goreng-rendang",
    name: "Indomie Goreng Rendang",
    style: "Goreng",
    description: "Bumbu rendang Minang kaya rempah, gurih & sedikit smoky",
    price: 12000,
    calories: 400,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=85",
    colorAccent: "#D97706",
    brothColor: "rgba(180, 83, 9, 0.25)",
    noodleColor: "#D97706",
    popular: true,
  },
  {
    id: "goreng-aceh",
    name: "Indomie Goreng Aceh",
    style: "Goreng",
    description: "Mie lebih tebal dengan bumbu kari rempah pedas khas Aceh",
    price: 12500,
    calories: 415,
    image:
      "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=85",
    colorAccent: "#EF4444",
    brothColor: "rgba(239, 68, 68, 0.22)",
    noodleColor: "#EA580C",
  },
  {
    id: "kuah-soto",
    name: "Indomie Kuah Soto Spesial",
    style: "Kuah",
    description: "Kuah soto segar wangi jeruk nipis & bubuk koya hangat",
    price: 11500,
    calories: 340,
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=85",
    colorAccent: "#EAB308",
    brothColor: "rgba(250, 204, 21, 0.32)",
    noodleColor: "#FDE047",
  },
  {
    id: "kuah-kari",
    name: "Indomie Kuah Kari Ayam",
    style: "Kuah",
    description: "Kuah kari kental gurih berempah, makin nikmat pakai keju/telur",
    price: 12000,
    calories: 370,
    image: "/images/promo-kuah-kopi.jpg",
    colorAccent: "#F97316",
    brothColor: "rgba(249, 115, 22, 0.34)",
    noodleColor: "#FDBA74",
    popular: true,
  },
];

export const DONENESS_OPTIONS: DonenessOption[] = [
  {
    id: "Al Dente",
    label: "Al Dente",
    description: "Sedikit firm & kenyal, tekstur mie terjaga sampai suapan terakhir",
    cookTime: "2 mnt 15 dtk",
  },
  {
    id: "Pas (Kenyal)",
    label: "Pas (Standar Warkop)",
    description: "Kematangan presisi favorit 80% pelanggan Warmindo Nusantara",
    cookTime: "2 mnt 45 dtk",
  },
  {
    id: "Lembek",
    label: "Lembek Nyemek",
    description: "Empuk lembut menyerap bumbu maksimal, nikmat untuk diseruput",
    cookTime: "3 mnt 30 dtk",
  },
];

export const TOPPING_OPTIONS: ToppingOption[] = [
  {
    id: "telur-setengah-matang",
    name: "Telur Setengah Matang",
    shortName: "Telur ½ Matang",
    price: 5000,
    calories: 85,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=85",
    category: "Protein",
    badgeColor: "#F59E0B",
    emoji: "🍳",
  },
  {
    id: "kornet-sapi",
    name: "Kornet Sapi Tumis",
    shortName: "Kornet Sapi",
    price: 6500,
    calories: 130,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=85",
    category: "Protein",
    badgeColor: "#DC2626",
    emoji: "🥩",
  },
  {
    id: "keju-mozzarella",
    name: "Keju Mozzarella Torch",
    shortName: "Mozzarella",
    price: 7000,
    calories: 145,
    image:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=85",
    category: "Keju & Saus",
    badgeColor: "#FACC15",
    emoji: "🧀",
  },
  {
    id: "sosis-bakar",
    name: "Sosis Bakar Bratwurst",
    shortName: "Sosis Bakar",
    price: 7500,
    calories: 165,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=85",
    category: "Protein",
    badgeColor: "#EA580C",
    emoji: "🌭",
  },
  {
    id: "bakso-urat",
    name: "Bakso Urat Sapi (3 pcs)",
    shortName: "Bakso Urat",
    price: 6500,
    calories: 120,
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&q=85",
    category: "Protein",
    badgeColor: "#A16207",
    emoji: "🍡",
  },
  {
    id: "ceker-pedas",
    name: "Ceker Pedas Empuk (2 pcs)",
    shortName: "Ceker Pedas",
    price: 7000,
    calories: 115,
    image:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=400&q=85",
    category: "Pedas & Ekstra",
    badgeColor: "#EF4444",
    emoji: "🔥",
  },
  {
    id: "saus-telur-asin",
    name: "Saus Kuning Telur Asin",
    shortName: "Saus Telur Asin",
    price: 6000,
    calories: 110,
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=400&q=85",
    category: "Keju & Saus",
    badgeColor: "#F59E0B",
    emoji: "✨",
  },
  {
    id: "pangsit-kriuk",
    name: "Pangsit Goreng & Bawang Kriuk",
    shortName: "Pangsit Kriuk",
    price: 3500,
    calories: 75,
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=85",
    category: "Pedas & Ekstra",
    badgeColor: "#D97706",
    emoji: "🥟",
  },
];

export const SPICY_LEVEL_INFO: Record<
  0 | 1 | 2 | 3 | 4 | 5,
  { label: string; rawitCount: string; badgeClass: string; extraPrice: number }
> = {
  0: {
    label: "Original (Tanpa Rawit)",
    rawitCount: "0 cabai rawit",
    badgeClass: "text-zinc-300 bg-zinc-800 border-zinc-700",
    extraPrice: 0,
  },
  1: {
    label: "Level 1 • Hangat Santai",
    rawitCount: "3 cabai rawit ulek",
    badgeClass: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    extraPrice: 0,
  },
  2: {
    label: "Level 2 • Sedang Nendang",
    rawitCount: "6 cabai rawit ulek",
    badgeClass: "text-amber-400 bg-amber-500/15 border-amber-500/40",
    extraPrice: 1000,
  },
  3: {
    label: "Level 3 • Pedas Tongkrongan",
    rawitCount: "10 cabai rawit ulek",
    badgeClass: "text-orange-400 bg-orange-500/15 border-orange-500/40",
    extraPrice: 1500,
  },
  4: {
    label: "Level 4 • Rawit Membara",
    rawitCount: "15 cabai rawit + chili oil",
    badgeClass: "text-red-400 bg-red-500/15 border-red-500/40",
    extraPrice: 2500,
  },
  5: {
    label: "Level 5 • Pedas Dewa 🔥",
    rawitCount: "22 cabai rawit setan + chili oil",
    badgeClass: "text-red-300 bg-red-600/25 border-red-500/60",
    extraPrice: 3500,
  },
};

export const BRANCHES: Branch[] = [
  {
    id: "pwt-unsoed",
    name: "Warmindo Nusantara Flagship HR Bunyamin",
    city: "Purwokerto",
    address: "Jl. HR Bunyamin No. 88, Bancarkembar (300m dari UNSOED), Purwokerto Utara",
    phone: "(0281) 642-8810",
    whatsapp: "6281234567891",
    mapsUrl: "https://maps.google.com/?q=Jl.+HR+Bunyamin+Purwokerto",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
    openHours: "Buka 24 Jam Nonstop",
    indoorSeatsTotal: 54,
    outdoorSeatsTotal: 42,
    baseIndoorOccupancy: 64,
    baseOutdoorOccupancy: 52,
    rating: 4.9,
    reviewCount: 3420,
    highlight: "Outlet Pertama • Layar Nobar 150 Inch",
    facilities: {
      wifi100Mbps: true,
      powerOutlets: true,
      nobarProjector: true,
      mushola: true,
      wideParking: true,
      indoorAC: true,
      open24Hours: true,
    },
  },
  {
    id: "yk-jakal",
    name: "Warmindo Nusantara Jakal KM 6,5",
    city: "Yogyakarta",
    address: "Jl. Kaliurang KM 6.5 No. 14, Kentungan, Depok, Sleman, DI Yogyakarta",
    phone: "(0274) 885-2219",
    whatsapp: "6281234567892",
    mapsUrl: "https://maps.google.com/?q=Jalan+Kaliurang+KM+6.5+Yogyakarta",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    openHours: "Buka 24 Jam Nonstop",
    indoorSeatsTotal: 72,
    outdoorSeatsTotal: 58,
    baseIndoorOccupancy: 76,
    baseOutdoorOccupancy: 68,
    rating: 4.9,
    reviewCount: 4180,
    highlight: "Favorit Mahasiswa UGM & UII • 2 Lantai",
    facilities: {
      wifi100Mbps: true,
      powerOutlets: true,
      nobarProjector: true,
      mushola: true,
      wideParking: true,
      indoorAC: true,
      open24Hours: true,
    },
  },
  {
    id: "yk-seturan",
    name: "Warmindo Nusantara Seturan Hub",
    city: "Yogyakarta",
    address: "Jl. Seturan Raya No. 45, Caturtunggal, Depok, Sleman, DI Yogyakarta",
    phone: "(0274) 433-9012",
    whatsapp: "6281234567893",
    mapsUrl: "https://maps.google.com/?q=Seturan+Raya+Yogyakarta",
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80",
    openHours: "Buka 24 Jam Nonstop",
    indoorSeatsTotal: 48,
    outdoorSeatsTotal: 36,
    baseIndoorOccupancy: 58,
    baseOutdoorOccupancy: 61,
    rating: 4.8,
    reviewCount: 2190,
    highlight: "Co-Working Corner • Live Acoustic Jumat",
    facilities: {
      wifi100Mbps: true,
      powerOutlets: true,
      nobarProjector: true,
      mushola: true,
      wideParking: false,
      indoorAC: true,
      open24Hours: true,
    },
  },
  {
    id: "bdg-dago",
    name: "Warmindo Nusantara Dipatiukur & Dago",
    city: "Bandung",
    address: "Jl. Dipati Ukur No. 112, Lebakgede, Coblong, Kota Bandung",
    phone: "(022) 250-7741",
    whatsapp: "6281234567894",
    mapsUrl: "https://maps.google.com/?q=Jalan+Dipati+Ukur+Bandung",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
    openHours: "Buka 24 Jam Nonstop",
    indoorSeatsTotal: 60,
    outdoorSeatsTotal: 50,
    baseIndoorOccupancy: 71,
    baseOutdoorOccupancy: 74,
    rating: 4.9,
    reviewCount: 2890,
    highlight: "Rooftop Sejuk Bandung • Slow Bar Kopi",
    facilities: {
      wifi100Mbps: true,
      powerOutlets: true,
      nobarProjector: true,
      mushola: true,
      wideParking: true,
      indoorAC: true,
      open24Hours: true,
    },
  },
  {
    id: "smg-tembalang",
    name: "Warmindo Nusantara Tembalang Arena",
    city: "Semarang",
    address: "Jl. Sirojudin No. 27, Tembalang (Dekat Kampus UNDIP), Kota Semarang",
    phone: "(024) 764-8821",
    whatsapp: "6281234567895",
    mapsUrl: "https://maps.google.com/?q=Tembalang+Semarang",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
    openHours: "Buka 24 Jam Nonstop",
    indoorSeatsTotal: 52,
    outdoorSeatsTotal: 40,
    baseIndoorOccupancy: 55,
    baseOutdoorOccupancy: 48,
    rating: 4.8,
    reviewCount: 1640,
    highlight: "Arena Mabar E-Sports & Turnamen Lokal",
    facilities: {
      wifi100Mbps: true,
      powerOutlets: true,
      nobarProjector: true,
      mushola: true,
      wideParking: true,
      indoorAC: true,
      open24Hours: true,
    },
  },
  {
    id: "jkt-kemang",
    name: "Warmindo Nusantara Kemang Selatan",
    city: "Jakarta",
    address: "Jl. Kemang Selatan Raya No. 19C, Cilandak Timur, Jakarta Selatan",
    phone: "(021) 781-9920",
    whatsapp: "6281234567896",
    mapsUrl: "https://maps.google.com/?q=Kemang+Selatan+Jakarta",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
    openHours: "Buka 24 Jam Nonstop",
    indoorSeatsTotal: 64,
    outdoorSeatsTotal: 44,
    baseIndoorOccupancy: 79,
    baseOutdoorOccupancy: 65,
    rating: 4.9,
    reviewCount: 2510,
    highlight: "Modern Street-Cafe Concept • Midnight DJ Lo-Fi",
    facilities: {
      wifi100Mbps: true,
      powerOutlets: true,
      nobarProjector: true,
      mushola: true,
      wideParking: true,
      indoorAC: true,
      open24Hours: true,
    },
  },
];

export const NOBAR_PACKAGES: NobarPackage[] = [
  {
    id: "reguler-only",
    name: "Reservasi Meja Reguler (Tanpa Paket)",
    pricePerPerson: 0,
    description: "Pesan menu bebas langsung di lokasi tanpa minimum charge tambahan.",
    includes: ["Meja dipastikan tersedia saat tiba", "Akses WiFi 100Mbps & Colokan"],
  },
  {
    id: "nobar-hemat",
    name: "Paket Nobar Suporter",
    pricePerPerson: 35000,
    description: "Cocok untuk nobar Liga Inggris, Liga Champions, atau Timnas Indonesia.",
    includes: [
      "1 Indomie Custom (2 Topping Pilihan)",
      "1 Es Teh Jumbo / Kopi Susu Gula Aren",
      "Spot duduk pandangan lurus ke Layar Proyektor 4K",
    ],
  },
  {
    id: "nobar-vip",
    name: "Paket Nobar VIP Komunitas",
    pricePerPerson: 55000,
    description: "Pengalaman nobar maksimal dengan camilan sharing & prioritas layanan.",
    includes: [
      "1 Indomie Signature / Custom Bebas 3 Topping",
      "1 Minuman Bebas Pilih + Refill Es Teh",
      "Sharing Platter Nobar & Tempe Mendoan per 4 orang",
      "Sofa/Baris Depan Proyektor + Prioritas Pesanan",
    ],
  },
];

export const FRANCHISE_PACKAGES: FranchisePackage[] = [
  {
    id: "booth-express",
    name: "Paket Booth Express",
    tagline: "Konsep grab-and-go & teras mini ideal di area kampus atau perkantoran",
    investment: 85000000,
    spaceRequirement: "15 – 25 m² (Teras / Foodcourt / Kios)",
    recommendedDailyPortions: 85,
    recommendedAvgTicket: 24000,
    monthlyOperationalFixed: 14500000,
    grossMarginPercent: 52,
    roiTargetMonths: "6 – 9 Bulan",
    highlights: [
      "Investasi paling terjangkau dengan risiko rendah",
      "Setup cepat siap operasional dalam 21 hari kerja",
      "Full SOP dapur cepat & sistem kasir POS terintegrasi",
    ],
    includes: [
      "Lisensi Brand Warmindo Nusantara (3 Tahun)",
      "Booth Industrial Custom + Neon Sign Eksklusif",
      "Peralatan Dapur Komersial & Mesin Espresso Compact",
      "Bahan Baku & Bumbu Racikan Awal 500 Porsi",
      "Training Intensif 3 Kru di Outlet Pusat",
    ],
  },
  {
    id: "ruko-standar",
    name: "Paket Ruko Standar",
    tagline: "Format warkop modern paling laris dengan Indoor AC & Outdoor nongkrong",
    investment: 195000000,
    spaceRequirement: "60 – 100 m² (1 Ruko 1–2 Lantai)",
    recommendedDailyPortions: 165,
    recommendedAvgTicket: 28000,
    monthlyOperationalFixed: 34000000,
    grossMarginPercent: 54,
    roiTargetMonths: "8 – 11 Bulan",
    featured: true,
    highlights: [
      "Paling diminati mitra (72% cabang menggunakan paket ini)",
      "Mendukung fitur Nobar Proyektor & operasional 24 jam",
      "Pendampingan survey lokasi & strategi Grand Opening",
    ],
    includes: [
      "Lisensi Brand Warmindo Nusantara (5 Tahun)",
      "Desain Interior 3D Street-Cafe Dark Aesthetic",
      "Full Kitchen Set, Kompor High Pressure & Bar Kopi",
      "Set Proyektor Nobar + Sound System + POS Cloud",
      "Bahan Baku Awal 1.200 Porsi & Support Marketing Lokal",
      "Training 6 Kru + Pendampingan On-Site 7 Hari Pertama",
    ],
  },
  {
    id: "flagship-cafe",
    name: "Paket Flagship Cafe",
    tagline: "Destinasi tongkrongan 24 jam skala besar, arena nobar, & slow bar kopi",
    investment: 385000000,
    spaceRequirement: "150 – 250 m² (Bangunan Mandiri / 2 Ruko)",
    recommendedDailyPortions: 280,
    recommendedAvgTicket: 33000,
    monthlyOperationalFixed: 62000000,
    grossMarginPercent: 56,
    roiTargetMonths: "10 – 14 Bulan",
    highlights: [
      "Potensi omzet terbesar dengan daya tampung 100+ kursi",
      "Dilengkapi Slow Bar Kopi Nusantara & VIP Nobar Area",
      "Dukungan kampanye digital KOL & manajemen operasional",
    ],
    includes: [
      "Lisensi Brand Warmindo Nusantara (5 Tahun + Prioritas Area)",
      "Full Renovasi & Furnitur Custom Dark-Industrial",
      "Mesin Espresso 2-Group Commercial & Kitchen Heavy-Duty",
      "Videotron/Proyektor Laser 4K + Acoustic Wall Treatment",
      "Bahan Baku Awal 2.500 Porsi & Kampanye Grand Opening",
      "Tim Pembukaan Khusus dari Pusat selama 14 Hari",
    ],
  },
];

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    year: "2019",
    title: "Kuali Pertama di Gang Kampus Purwokerto",
    subtitle: "Berawal dari 6 meja kayu & mimpi menaikkan kelas warkop",
    description:
      "Warmindo Nusantara lahir dari keresahan sederhana: kenapa tempat makan Indomie tengah malam harus pengap dan tidak nyaman? Kami memulai dengan resep saus telur asin racikan sendiri, WiFi kencang, dan dapur terbuka yang higienis.",
    metric: "1 Outlet • 6 Meja",
  },
  {
    year: "2021",
    title: "Lahirnya 'Racik Indomie-mu' Studio",
    subtitle: "Inovasi personalisasi kematangan & level rawit",
    description:
      "Kami menjadi warmindo pertama yang memperkenalkan standar timer kematangan mie (Al Dente hingga Lembek) dan sistem racik topping modular yang langsung viral di kalangan mahasiswa Yogyakarta dan Purwokerto.",
    metric: "5 Outlet • 250K+ Porsi",
  },
  {
    year: "2023",
    title: "Ekspansi Konsep Modern Street-Cafe 24 Jam",
    subtitle: "Menyatukan warkop, slow-bar kopi lokal, dan arena nobar",
    description:
      "Memasuki Bandung, Semarang, dan Jakarta dengan identitas visual Dark Industrial hangat, AC sejuk, layar nobar 4K, serta pasokan biji kopi langsung dari petani Temanggung dan Gayo.",
    metric: "12 Outlet • 5 Kota",
  },
  {
    year: "2026",
    title: "Ekosistem Kemitraan & Digital Experience",
    subtitle: "18 cabang aktif, 1,4 juta+ porsi, dan pemesanan cerdas",
    description:
      "Kini Warmindo Nusantara dipercaya lebih dari 14.000 ulasan pelanggan setia dengan rating 4,9. Kami terus bertumbuh bersama mitra lokal untuk membawa kehangatan budaya warkop Indonesia ke standar kelas dunia.",
    metric: "18 Outlet • 1,48 Juta+ Porsi",
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Suasana Malam Flagship Purwokerto",
    caption: "Pencahayaan amber hangat yang nyaman untuk nugas, ngobrol, maupun makan tengah malam.",
    category: "Suasana",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
    branch: "Purwokerto HR Bunyamin",
    span: "wide",
  },
  {
    id: "gal-2",
    title: "Indomie Telur Asin Nyemek Signature",
    caption: "Dimasak fresh per porsi di wajan besi panas agar aroma smokey-nya keluar sempurna.",
    category: "Kuliner",
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=900&q=80",
    branch: "Semua Cabang",
    span: "tall",
  },
  {
    id: "gal-3",
    title: "Slow Bar Kopi Susu Nusantara",
    caption: "Ekstraksi espresso segar biji Robusta Temanggung & Arabika Gayo setiap 24 jam.",
    category: "Bar Kopi",
    image:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80",
    branch: "Bandung Dipatiukur",
    span: "normal",
  },
  {
    id: "gal-4",
    title: "Keseruan Malam Minggu & Arena Nobar",
    caption: "Ratusan suporter dan komunitas kumpul bareng ditemani platter hangat dan proyektor 4K.",
    category: "Nobar & Komunitas",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    branch: "Yogyakarta Jakal KM 6,5",
    span: "wide",
  },
  {
    id: "gal-5",
    title: "Kue Pancong Lumer & Roti Bakar Wijsman",
    caption: "Teman ngobrol manis sampai subuh dengan lelehan matcha dan cokelat premium.",
    category: "Kuliner",
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80",
    branch: "Semua Cabang",
    span: "normal",
  },
  {
    id: "gal-6",
    title: "Indoor AC & Co-Working Corner",
    caption: "Colokan listrik di tiap meja plus WiFi 100Mbps stabil untuk pejuang deadline.",
    category: "Suasana",
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80",
    branch: "Jakarta Kemang Selatan",
    span: "normal",
  },
  {
    id: "gal-7",
    title: "Kuah Kari Susu Ceker Empuk",
    caption: "Comfort food paling dicari saat hujan deras melanda kota pelajar.",
    category: "Kuliner",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
    branch: "Semarang Tembalang",
    span: "normal",
  },
  {
    id: "gal-8",
    title: "Late Night Espresso & Acoustic Vibes",
    caption: "Tongkrongan modern bernuansa gelap yang tetap ramah di kantong mahasiswa.",
    category: "Bar Kopi",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80",
    branch: "Yogyakarta Seturan",
    span: "normal",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-1",
    name: "Raka Pratama",
    role: "Mahasiswa Teknik UGM • Pelanggan Sejak 2022",
    branch: "Yogyakarta Jakal KM 6,5",
    rating: 5,
    quote:
      "Skripsi saya kelar di cabang Jakal jam 3 pagi! WiFi-nya beneran kenceng, tiap meja ada colokan, dan Indomie Goreng Aceh + Mozzarella + Telur ½ Matang Al Dente-nya nggak ada obat!",
    favoriteMenu: "Indomie Aceh Mozzarella (Al Dente)",
    avatarInitials: "RP",
    date: "2 minggu lalu",
  },
  {
    id: "testi-2",
    name: "Nadia Kusuma",
    role: "UI/UX Designer • Remote Worker",
    branch: "Bandung Dipatiukur",
    rating: 5,
    quote:
      "Jujur kaget ada warmindo se-estetik ini tapi harganya tetap waras. Indoor AC-nya dingin, bersih banget, nggak bau asap rokok karena terpisah dengan outdoor. Pancong Matcha Lumer-nya wajib coba!",
    favoriteMenu: "Kue Pancong Uji Matcha & Kopi Susu Aren",
    avatarInitials: "NK",
    date: "5 hari lalu",
  },
  {
    id: "testi-3",
    name: "Dimas Aji Saputra",
    role: "Ketua Komunitas Nobar Purwokerto",
    branch: "Purwokerto HR Bunyamin",
    rating: 5,
    quote:
      "Sering banget reservasi 25 orang buat nobar Timnas dan Liga Champions di sini. Proses booking pakai E-Ticket digitalnya gampang, proyektornya jernih, dan Platter Nobar-nya cepat keluar.",
    favoriteMenu: "Paket Nobar VIP & Platter Nusantara",
    avatarInitials: "DA",
    date: "1 minggu lalu",
  },
  {
    id: "testi-4",
    name: "Hendra Wijaya",
    role: "Mitra Franchise Cabang Semarang",
    branch: "Semarang Tembalang",
    rating: 5,
    quote:
      "Awalnya tertarik karena nyoba simulasi ROI-nya, ternyata setelah jalan realisasinya bahkan lebih cepat — 9 bulan sudah balik modal untuk paket Ruko Standar. Support SOP dari pusat sangat rapi.",
    favoriteMenu: "Mitra Paket Ruko Standar",
    avatarInitials: "HW",
    date: "1 bulan lalu",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Menu & Halal",
    question: "Apakah seluruh menu dan bahan baku di Warmindo Nusantara 100% Halal?",
    answer:
      "Ya, 100% Halal dan tersertifikasi MUI (LPPOM). Seluruh bahan baku mulai dari mie, kornet sapi, sosis bratwurst, ceker, hingga saus telur asin dipasok dari vendor tersertifikasi halal dengan standar kebersihan dapur terbuka.",
  },
  {
    id: "faq-2",
    category: "Menu & Halal",
    question: "Bagaimana cara kerja fitur 'Racik Indomie-mu' dan apakah bisa dipesan via WhatsApp?",
    answer:
      "Anda cukup memilih base mie, tingkat kematangan (Al Dente, Pas, atau Lembek), level cabai rawit (0–5), serta topping favorit di Studio Racik. Klik 'Masukkan ke Keranjang', lalu di Cart Drawer pilih Dine-in/Takeaway/Delivery dan klik Checkout — struk pesanan lengkap langsung terformat otomatis ke WhatsApp kasir kami.",
  },
  {
    id: "faq-3",
    category: "Operasional",
    question: "Apakah semua cabang benar-benar buka 24 jam termasuk hari libur?",
    answer:
      "Betul! Seluruh 18 cabang Warmindo Nusantara beroperasi 24 jam nonstop (termasuk akhir pekan dan tanggal merah) dengan sistem 3 shift dapur sehingga kualitas makanan tetap konsisten bahkan pukul 03.00 dini hari.",
  },
  {
    id: "faq-4",
    category: "Reservasi & Nobar",
    question: "Apakah reservasi meja atau acara nobar dikenakan biaya DP?",
    answer:
      "Untuk reservasi meja reguler (1–10 orang) GRATIS tanpa DP, cukup tunjukkan E-Ticket Reservasi Digital maksimal 15 menit setelah jam booking. Khusus reservasi grup besar (>12 orang) atau Paket Nobar VIP, konfirmasi DP 30% dilakukan via WhatsApp cabang setelah E-Ticket terbit.",
  },
  {
    id: "faq-5",
    category: "Kemitraan",
    question: "Apakah calon mitra franchise harus sudah memiliki pengalaman F&B sebelumnya?",
    answer:
      "Tidak wajib. Tim Warmindo Nusantara menyediakan sistem autopilot berbasis SOP terstandar, pelatihan kru di outlet pusat, pendampingan survey lokasi, pasokan bumbu racikan sentral, hingga sistem kasir POS cloud yang bisa Anda pantau real-time dari HP.",
  },
  {
    id: "faq-6",
    category: "Kemitraan",
    question: "Berapa royalty fee bulanan untuk kemitraan Warmindo Nusantara?",
    answer:
      "Kami menerapkan skema transparan: 0% royalty fee selama 6 bulan pertama masa pembukaan, dan hanya 3% dari omzet bersih setelahnya yang dikembalikan penuh untuk support marketing nasional, riset menu musiman, dan audit kualitas.",
  },
];

export const BENTO_HIGHLIGHTS = [
  {
    id: "open-24",
    eyebrow: "OPERASIONAL NONSTOP",
    title: "Buka 24 Jam, Kapan Pun Lapar Melanda",
    description:
      "Dari sarapan pagi, jam istirahat kerja, nongkrong malam minggu, hingga penyelamat lapar jam 3 dini hari dengan 3 shift koki aktif.",
    stat: "24/7",
    accent: "amber",
    span: "md:col-span-2",
  },
  {
    id: "wifi",
    eyebrow: "ANTI BUFFERING",
    title: "WiFi Fiber 100Mbps + Colokan Tiap Meja",
    description:
      "Dedicated dual-ISP di setiap cabang. Ideal buat kerja remote, push rank mabar, sampai revisi skripsi tanpa drama putus.",
    stat: "100 Mbps",
    accent: "zinc",
    span: "md:col-span-1",
  },
  {
    id: "kitchen",
    eyebrow: "OPEN KITCHEN & 100% HALAL",
    title: "Standar Kematangan Timer Presisi",
    description:
      "Setiap porsi dimasak terpisah dengan timer kematangan akurat dan bahan segar setiap hari. Tanpa pengawet tambahan, 100% Halal.",
    stat: "100% Halal",
    accent: "zinc",
    span: "md:col-span-1",
  },
  {
    id: "nobar",
    eyebrow: "KOMUNITAS & HIBURAN",
    title: "Arena Nobar 4K & Zona Indoor AC / Outdoor",
    description:
      "Layar proyektor 150 inch lengkap dengan audio surround untuk nobar Timnas & Liga Eropa. Area AC Bebas Asap dan Outdoor Smoking terpisah total.",
    stat: "150\" 4K",
    accent: "red",
    span: "md:col-span-2",
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

