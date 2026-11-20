export type MenuCategory =
  | "Semua"
  | "Mie Goreng"
  | "Mie Kuah"
  | "Roti Bakar"
  | "Kue Pancong Lumer"
  | "Kopi Tubruk/Susu"
  | "Minuman Segar"
  | "Camilan";

export type SpicyFilter = "Semua" | "Tidak Pedas" | "Sedang" | "Pedas" | "Ekstrem";

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, "Semua">;
  description: string;
  price: number;
  calories: number;
  spicyLevel: 0 | 1 | 2 | 3 | 4 | 5;
  image: string;
  badge?: string;
  isSignature?: boolean;
  prepTimeMinutes: number;
  tags: string[];
}

export interface MieBaseOption {
  id: string;
  name: string;
  style: "Goreng" | "Kuah";
  description: string;
  price: number;
  calories: number;
  image: string;
  colorAccent: string;
  brothColor: string;
  noodleColor: string;
  popular?: boolean;
}

export type DonenessLevel = "Al Dente" | "Pas (Kenyal)" | "Lembek";

export interface DonenessOption {
  id: DonenessLevel;
  label: string;
  description: string;
  cookTime: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  shortName: string;
  price: number;
  calories: number;
  image: string;
  category: "Protein" | "Keju & Saus" | "Pedas & Ekstra";
  badgeColor: string;
  emoji: string;
}

export interface CustomMieConfig {
  baseId: string;
  doneness: DonenessLevel;
  spicyLevel: 0 | 1 | 2 | 3 | 4 | 5;
  toppingIds: string[];
  doublePortion: boolean;
  customName: string;
  note: string;
}

export interface CartItem {
  cartItemId: string;
  type: "regular" | "custom";
  menuItemId?: string;
  name: string;
  image?: string;
  unitPrice: number;
  calories: number;
  quantity: number;
  customDetails?: {
    baseName: string;
    style: "Goreng" | "Kuah";
    doneness: DonenessLevel;
    spicyLevel: number;
    toppings: string[];
    doublePortion: boolean;
    note?: string;
  };
}

export type OrderMethod = "dine-in" | "takeaway" | "delivery";

export interface BranchFacility {
  wifi100Mbps: boolean;
  powerOutlets: boolean;
  nobarProjector: boolean;
  mushola: boolean;
  wideParking: boolean;
  indoorAC: boolean;
  open24Hours: boolean;
}

export interface Branch {
  id: string;
  name: string;
  city: "Purwokerto" | "Yogyakarta" | "Bandung" | "Semarang" | "Jakarta";
  address: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
  image: string;
  openHours: string;
  indoorSeatsTotal: number;
  outdoorSeatsTotal: number;
  baseIndoorOccupancy: number; // percentage 0-100
  baseOutdoorOccupancy: number; // percentage 0-100
  rating: number;
  reviewCount: number;
  highlight: string;
  facilities: BranchFacility;
}

export interface NobarPackage {
  id: string;
  name: string;
  pricePerPerson: number;
  description: string;
  includes: string[];
}

export interface ReservationTicket {
  bookingCode: string;
  branchId: string;
  branchName: string;
  branchCity: string;
  branchAddress: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: "Indoor AC" | "Outdoor Smoking" | "Area Nobar VIP";
  nobarPackageId?: string;
  nobarPackageName?: string;
  estimatedTotal?: number;
  notes?: string;
  createdAt: string;
}

export interface FranchisePackage {
  id: string;
  name: string;
  tagline: string;
  investment: number; // IDR
  spaceRequirement: string;
  recommendedDailyPortions: number;
  recommendedAvgTicket: number;
  monthlyOperationalFixed: number; // sewa, listrik, gaji rata-rata
  grossMarginPercent: number; // e.g., 52%
  roiTargetMonths: string;
  featured?: boolean;
  highlights: string[];
  includes: string[];
}

export interface StoryMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: "Suasana" | "Kuliner" | "Nobar & Komunitas" | "Bar Kopi";
  image: string;
  branch: string;
  span?: "tall" | "wide" | "normal";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  branch: string;
  rating: number;
  quote: string;
  favoriteMenu: string;
  avatarInitials: string;
  date: string;
}

export interface FAQItem {
  id: string;
  category: "Menu & Halal" | "Reservasi & Nobar" | "Kemitraan" | "Operasional";
  question: string;
  answer: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "info" | "warning";
}

