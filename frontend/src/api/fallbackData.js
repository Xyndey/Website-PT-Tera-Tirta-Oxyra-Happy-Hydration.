// Local fallback fixtures — kept in perfect sync with the backend's JSON
// data (backend/src/data/*.json). These are only used if the API request
// fails (e.g. backend not running yet), so the storefront still renders
// with the correct OXYRA content out of the box.

export const FALLBACK_BRAND = {
  name: 'OXYRA',
  tagline: 'Happy Hydration Era',
  serviceArea: 'Batam, Indonesia',
  instagram: { handle: 'oxyrawater.id', url: 'https://instagram.com/oxyrawater.id' },
  whatsapp: {
    number: '628117710369',
    displayNumber: '0811-7710-369',
    link: 'https://wa.me/628117710369',
    partnershipLink:
      'https://wa.me/628117710369?text=Halo%20OXYRA%2C%20saya%20tertarik%20untuk%20kemitraan%20%2F%20pembelian%20grosir.',
  },
  logoUrl: 'https://i.imgur.com/QiQ40UB.jpeg',
  splashImageUrl: 'https://i.imgur.com/SKOAvML.png',
  copyrightYear: new Date().getFullYear(),
};

function waLink(text) {
  return `https://wa.me/628117710369?text=${encodeURIComponent(text)}`;
}

export const FALLBACK_PRODUCTS = [
  {
    id: 'refill-mineral-19l',
    category: 'refill',
    badge: 'MINERAL · 19L',
    badgeVariant: 'default',
    name: 'Air Mineral',
    volumeLabel: 'Isi Ulang Galon 19 Liter',
    price: 10000,
    priceLabel: 'Rp 10.000',
    unit: '/ galon',
    description: 'Air mineral murni yang segar untuk memenuhi kebutuhan hidrasi harian keluarga.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Air Mineral Isi Ulang Galon 19 Liter (Rp 10.000).'),
  },
  {
    id: 'refill-hexagonal-oxygen-19l',
    category: 'refill',
    badge: 'BEST SELLER ⭐ · 19L',
    badgeVariant: 'best',
    name: 'Hexagonal Oxygen',
    volumeLabel: 'Isi Ulang Galon 19 Liter',
    price: 15000,
    priceLabel: 'Rp 15.000',
    unit: '/ galon',
    description:
      'Kaya oksigen dengan struktur molekul heksagonal untuk penyerapan nutrisi dan hidrasi yang optimal.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Hexagonal Oxygen Isi Ulang Galon 19 Liter (Rp 15.000).'),
  },
  {
    id: 'refill-alkaline-19l',
    category: 'refill',
    badge: 'ALKALINE · 19L',
    badgeVariant: 'default',
    name: 'Air Alkali (Alkaline)',
    volumeLabel: 'Isi Ulang Galon 19 Liter',
    price: 25000,
    priceLabel: 'Rp 25.000',
    unit: '/ galon',
    description:
      'pH basa seimbang yang membantu menetralkan keasaman tubuh dan memulihkan energi setelah beraktivitas.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Air Alkali (Alkaline) Isi Ulang Galon 19 Liter (Rp 25.000).'),
  },
  {
    id: 'refill-terahertz-19l',
    category: 'refill',
    badge: 'ULTRA PREMIUM 💎 · 19L',
    badgeVariant: 'tera',
    name: 'Air Terahertz',
    volumeLabel: 'Isi Ulang Galon 19 Liter',
    price: 50000,
    priceLabel: 'Rp 50.000',
    unit: '/ galon',
    description:
      'Teknologi resonansi Terahertz terdepan (Oxy + Alkaline + Tera) untuk vitalitas dan hidrasi tingkat seluler.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Air Terahertz Isi Ulang Galon 19 Liter (Rp 50.000).'),
  },
  {
    id: 'paket-hexagonal-oxygen-galon',
    category: 'paket',
    badge: 'PAKET GALON BARU',
    badgeVariant: 'default',
    name: 'Hexagonal Oxygen + Galon',
    volumeLabel: 'Galon Baru Oxyra 19L + Isi',
    price: 60000,
    priceLabel: 'Rp 60.000',
    unit: '/ paket',
    description: 'Paket lengkap galon baru OXYRA yang higienis beserta isi air Hexagonal Oxygen siap minum.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Hexagonal Oxygen + Galon Galon Baru Oxyra 19L + Isi (Rp 60.000).'),
  },
  {
    id: 'paket-alkaline-galon',
    category: 'paket',
    badge: 'PAKET TERFAVORIT ⭐',
    badgeVariant: 'best',
    name: 'Oxyra Alkaline + Galon',
    volumeLabel: 'Galon Baru Oxyra 19L + Isi',
    price: 65000,
    priceLabel: 'Rp 65.000',
    unit: '/ paket',
    description: 'Paket lengkap galon baru OXYRA beserta isi air Alkaline berkualitas tinggi untuk memulai hidup sehat.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Oxyra Alkaline + Galon Galon Baru Oxyra 19L + Isi (Rp 65.000).'),
  },
  {
    id: 'paket-terahertz-galon',
    category: 'paket',
    badge: 'PAKET PREMIUM 💎',
    badgeVariant: 'tera',
    name: 'Oxyra Terahertz + Galon',
    volumeLabel: 'Galon Baru Oxyra 19L + Isi',
    price: 70000,
    priceLabel: 'Rp 70.000',
    unit: '/ paket',
    description: 'Paket galon baru dengan air Terahertz ultra-premium untuk pengalaman minum air terbaik.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Oxyra Terahertz + Galon Galon Baru Oxyra 19L + Isi (Rp 70.000).'),
  },
  {
    id: 'mini-alkaline-5l',
    category: 'mini',
    badge: 'GALON MINI · 5L',
    badgeVariant: 'default',
    name: 'Oxyra Alkaline 5L',
    volumeLabel: 'Galon Mini Praktis',
    price: 35000,
    priceLabel: 'Rp 35.000',
    unit: '/ galon',
    description:
      'Ukuran kompak 5 liter yang praktis dan higienis. Sangat cocok untuk apartemen, kamar pribadi, atau meja kerja.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Oxyra Alkaline 5L Galon Mini Praktis (Rp 35.000).'),
  },
  {
    id: 'amdk-alkaline-330ml',
    category: 'amdk',
    badge: 'BOTOL · 330 ML',
    badgeVariant: 'default',
    name: 'Oxyra Alkaline 330ml',
    volumeLabel: '1 Dus (24 Botol)',
    price: 60000,
    priceLabel: 'Rp 60.000',
    unit: '/ dus',
    description: 'Botol ukuran pas untuk acara seminar, rapat kantor, bekal perjalanan, dan hidrasi cepat di mana saja.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Oxyra Alkaline 330ml 1 Dus (24 Botol) (Rp 60.000).'),
  },
  {
    id: 'amdk-alkaline-500ml',
    category: 'amdk',
    badge: 'FAVORIT AKTIF ⭐ · 500 ML',
    badgeVariant: 'best',
    name: 'Oxyra Alkaline 500ml',
    volumeLabel: '1 Dus (24 Botol)',
    price: 75000,
    priceLabel: 'Rp 75.000',
    unit: '/ dus',
    description: 'Ukuran ideal untuk menemani aktivitas olahraga, gym, lari, bersepeda, maupun aktivitas dinamis lainnya.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Oxyra Alkaline 500ml 1 Dus (24 Botol) (Rp 75.000).'),
  },
  {
    id: 'amdk-alkaline-1000ml',
    category: 'amdk',
    badge: 'OLD STYLE PREMIUM · 1 LITER',
    badgeVariant: 'tera',
    name: 'Oxyra Alkaline 1000ml',
    volumeLabel: '1 Dus (12 Botol)',
    price: 100000,
    priceLabel: 'Rp 100.000',
    unit: '/ dus',
    description: 'Kapasitas maksimal 1 liter untuk stok hidrasi harian premium.',
    orderLink: waLink('Halo OXYRA, saya ingin memesan Oxyra Alkaline 1000ml 1 Dus (12 Botol) (Rp 100.000).'),
  },
];

export const FALLBACK_CATEGORIES = [
  { id: 'all', label: 'Semua Produk' },
  { id: 'refill', label: 'Galon Isi Ulang (19L)' },
  { id: 'paket', label: 'Paket Galon Baru' },
  { id: 'mini', label: 'Galon Mini (5L)' },
  { id: 'amdk', label: 'Kemasan Botol' },
];

export const FALLBACK_WHY = [
  {
    id: 'hidrasi-lebih-baik',
    icon: 'droplet',
    title: 'Hidrasi Lebih Baik',
    description: 'Air dengan kualitas premium, diproses dengan standar tertinggi untuk hidrasi yang optimal.',
  },
  {
    id: 'move-better',
    icon: 'bolt',
    title: 'Move Better',
    description: 'Dukung gaya hidup aktifmu dengan hidrasi yang tepat di setiap aktivitas.',
  },
  {
    id: 'live-happier',
    icon: 'heart',
    title: 'Live Happier',
    description: 'Jadikan momen minum air sebagai bagian dari kebahagiaan harianmu.',
  },
  {
    id: 'pelayanan-prima',
    icon: 'check',
    title: 'Pelayanan Prima',
    description: 'Pengantaran setiap hari ke seluruh Batam, dengan layanan yang selalu bisa diandalkan.',
  },
];

export const FALLBACK_CLUB = {
  heroImage: 'https://i.imgur.com/skZCgCT.jpeg',
  heroBadge: '✨ Stay Oxy, Stay Happy',
  intro: 'Komunitas untuk kamu yang ingin hidup aktif, seimbang, dan penuh energi positif setiap hari.',
  activities: [
    { id: 'running', emoji: '🏃', title: 'Running', description: 'Setiap langkah, lebih berenergi dan ringan dengan hidrasi heksagonal yang tepat.' },
    { id: 'gym-fitness', emoji: '🏋️', title: 'Gym / Fitness', description: 'Dukung performa terbaikmu di setiap sesi latihan dengan mineral seimbang.' },
    { id: 'cycling', emoji: '🚴', title: 'Cycling', description: 'Jaga stamina dan fokus optimal di setiap rute perjalanan panjangmu.' },
    { id: 'office-kerja', emoji: '💼', title: 'Office / Kerja', description: 'Tetap segar, fokus, dan produktif sepanjang hari kerja di kantor.' },
    { id: 'family', emoji: '👨‍👩‍👧', title: 'Family', description: 'Hidrasi berkualitas terbaik dan terjamin untuk keluarga yang kamu sayangi.' },
  ],
  benefits: [
    { id: 'event-eksklusif', title: '🎁 Event Eksklusif', description: 'Ikuti event seru bersama komunitas' },
    { id: 'tips-edukasi', title: '💡 Tips & Edukasi', description: 'Edukasi hidrasi & gaya hidup dari ahli' },
    { id: 'komunitas-positif', title: '🤝 Komunitas Positif', description: 'Bertemu teman baru berenergi positif' },
    { id: 'promo-spesial', title: '🏷️ Promo Spesial', description: 'Keuntungan & diskon khusus member' },
  ],
};

export const FALLBACK_TESTIMONIALS = [
  {
    id: 'testi-keluarga-hendra',
    rating: 5,
    quote:
      'OXYRA selalu jadi pilihan utama keluarga kami. Airnya terasa lebih segar, bersih, dan ringan di tenggorokan. Anak-anak jadi lebih rajin minum air putih!',
    author: 'Keluarga Hendra',
    location: 'Batam Centre',
  },
  {
    id: 'testi-rina-s',
    rating: 5,
    quote:
      'Setelah rutin minum Oxyra Alkaline dan Hexagonal Oxygen, stamina saat lari pagi dan gym jauh lebih terjaga. Kemasan botol 500ml juga praktis banget dibawa kemana-mana.',
    author: 'Rina S.',
    location: 'Happy Hydration Member',
  },
  {
    id: 'testi-budi-hartono',
    rating: 5,
    quote:
      'Pelayanan pengantarannya selalu tepat waktu setiap hari ke kantor kami di Nagoya. Kurir ramah dan kualitas galon selalu bersih dan higienis.',
    author: 'Budi Hartono',
    location: 'Nagoya, Batam',
  },
];

export const FALLBACK_LAB_REPORT = {
  isIllustrative: true,
  batch: 'OXA-2026-XXXX',
  testDate: 'XX/XX/2026',
  laboratory: 'Lab Terakreditasi',
  metrics: [
    { label: 'pH', value: '8,6' },
    { label: 'TDS', value: '148 mg/L' },
    { label: 'Kalsium (Ca)', value: 'XX mg/L' },
    { label: 'Magnesium (Mg)', value: 'XX mg/L' },
    { label: 'Kalium (K)', value: 'XX mg/L' },
    { label: 'Natrium (Na)', value: 'XX mg/L' },
    { label: 'E. coli', value: 'NEGATIF', highlight: true },
    { label: 'Coliform', value: 'NEGATIF', highlight: true },
  ],
  bpom: 'MD [NOMOR]',
  halalBpjph: '[NOMOR]',
  footNote: 'Semua data di atas bersifat ilustrasi dan akan diganti setelah laporan laboratorium resmi diterima.',
  disclaimer: 'Angka-angka di atas adalah placeholder. Data resmi menyusul dari laporan lab.',
};
