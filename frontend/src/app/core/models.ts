export interface Product {
  id: string;
  category: 'refill' | 'paket' | 'mini' | 'amdk';
  badge: string;
  badgeVariant: 'default' | 'best' | 'tera';
  name: string;
  volumeLabel: string;
  price: number;
  priceLabel: string;
  unit: string;
  description: string;
  image: string | null;
  orderLink: string;
}

export interface ProductCategory {
  id: string;
  label: string;
}

export interface WhyReason {
  id: string;
  icon: 'droplet' | 'bolt' | 'heart' | 'check';
  title: string;
  description: string;
}

export interface ClubActivity {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export interface ClubBenefit {
  id: string;
  title: string;
  description: string;
}

export interface Club {
  heroImage: string;
  heroBadge: string;
  intro: string;
  activities: ClubActivity[];
  benefits: ClubBenefit[];
}

export interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  author: string;
  location: string;
}

export interface LabMetric {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface LabReport {
  isIllustrative: boolean;
  batch: string;
  testDate: string;
  laboratory: string;
  metrics: LabMetric[];
  bpom: string;
  halalBpjph: string;
  footNote: string;
  disclaimer: string;
}

export interface Brand {
  name: string;
  tagline: string;
  serviceArea: string;
  instagram: { handle: string; url: string };
  whatsapp: { number: string; displayNumber: string; link: string; partnershipLink: string };
  logoUrl: string;
  splashImageUrl: string;
  copyrightYear: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface CreateOrderPayload {
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: Array<{ productId: string; quantity: number }>;
}

export interface OrderResult {
  order: {
    id: string;
    estimatedTotal: number;
    [key: string]: unknown;
  };
  whatsappLink: string;
}
