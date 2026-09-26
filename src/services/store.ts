import { Product, SalesRep, SiteInquiry, AdminUser, Testimonial, Announcement } from '../types';

const INQUIRIES_STORAGE_KEY = 'lifecycle_organics_inquiries_v1';
const PRODUCTS_STORAGE_KEY = 'lifecycle_organics_products_v2';
const TESTIMONIALS_STORAGE_KEY = 'lifecycle_organics_testimonials_v1';
const ANNOUNCEMENTS_STORAGE_KEY = 'lifecycle_organics_announcements_v1';
const REPS_STORAGE_KEY = 'lifecycle_organics_reps_v1';
const AUTH_STORAGE_KEY = 'lifecycle_organics_auth_v1';

// Initial realistic default products
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bio-fertilizer',
    name: 'Bio-Fertilizer',
    brand: 'Green & Organics',
    tagline: 'Nourishes Soil, Boosts Growth',
    description: 'A powerful, 100% organic bio-superfertilizer solution designed to nourish crops and restore long-term soil fertility. Maximizes harvest density and provides essential root nutrients up to 10x faster than traditional composts.',
    benefits: [
      'Improves soil biological health',
      'Increases active nutrient uptake',
      'Promotes stronger, deeper root systems',
      'Ensures substantially higher crop yields'
    ],
    features: [
      '100% natural and residue-free',
      '10x faster bio-absorption rate',
      'Safe for food crops and local pollinators',
      'Reduces dependency on synthetic alternatives'
    ],
    specs: [
      'Volume: 5 Liters',
      'Type: Liquid Concentrate',
      'Dilution: 1:100 ratio',
      'Crops: Corn, Tomatoes, Cabbage, etc.'
    ],
    badge: '10x Faster Growth',
    image: 'bio_fertilizer',
    usage: 'Dilute with clean water and apply evenly as a foliar spray or through root irrigation during early morning or late afternoon for best results.',
    price: 'ZMW 450.00 / 5L',
    stockStatus: 'In Stock',
    isFeatured: true,
    status: 'live',
    destination: 'Products page',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'bio-sulphur',
    name: 'Bio-Sulphur 4',
    brand: 'Green & Organics',
    tagline: 'Protects Maize, Prevents Yellowing',
    description: 'A unique organic 4-in-1 formulation serving as a liquid fungicide, pesticide, germicide, and fertilizer in one. Supplies essential sulphur—the fourth major nutrient—to bolster crop immune systems and prevent yellowing leaf deficiencies.',
    benefits: [
      'Eradicates yellowing and stunted growth',
      'Essential for vital protein synthesis',
      'Accelerates chlorophyll formation',
      'Fights structural fungal pathogens'
    ],
    features: [
      '4-in-1 multi-action protection',
      'Maize specific formulation',
      'Provides key mineral sulphur',
      'Environmentally safe and biodegradable'
    ],
    specs: [
      'Volume: 5 Liters',
      'Type: Multi-action Liquid',
      'Defends: Maize and cereals',
      'Safety: Non-toxic residue'
    ],
    badge: '4-in-1 Protection',
    image: 'bio_sulphur',
    usage: 'Apply as a foliar mist over leaves, focusing on fields showing yellowing indicators. Repeat applications every 14 days under low-light conditions.',
    price: 'ZMW 490.00 / 5L',
    stockStatus: 'In Stock',
    isFeatured: true,
    status: 'live',
    destination: 'Products page',
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: 'bio-soapcide',
    name: 'Bio-Soapcide',
    brand: 'Green & Organics',
    tagline: 'Insecticidal Soap, Spreader, Sticker',
    description: 'A premium, fully sustainable contact insecticidal soap. Formulated with natural active wetting agents that act as an effective spreader and sticker, ensuring the formulation adheres to leaf layers to protect against sucking insects.',
    benefits: [
      'Eradicates sucking and biting pests',
      'Acts as a professional surfactant sticker',
      'Leaves absolutely zero toxic chemical residues',
      'High adherence rate on waxy crop leaves'
    ],
    features: [
      'Broad-spectrum pest protection',
      'Sticker and spreader capabilities',
      'No chemical withholding period',
      'Highly concentrated formula'
    ],
    specs: [
      'Volume: 5 Liters',
      'Type: Insecticidal Soap',
      'Combats: Aphids, Mites, Thrips, Bugs',
      'Action: Contact spray'
    ],
    badge: '100% Sustainable',
    image: 'bio_soapcide',
    usage: 'Mix and spray directly on pest clusters. Target undersides of leaves where bugs gather. Spray during early morning or evening to prevent leaf burn.',
    price: 'ZMW 380.00 / 5L',
    stockStatus: 'In Stock',
    isFeatured: true,
    status: 'live',
    destination: 'Products page',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString()
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Mwansa K.',
    farmOrCompany: 'Ndola Farm Cooperative',
    text: 'Since switching to the Bio-Fertilizer line, our yield went up noticeably and we\'ve cut pest control costs by 40% in one season.',
    destination: 'Home page',
    destinationSub: 'Testimonials carousel',
    status: 'live',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'test-2',
    name: 'Bwalya M.',
    farmOrCompany: 'Kabwe Growers Assoc.',
    text: 'Soil health improved within the first two months. Leaf yellowing on our maize stopped after the first application.',
    destination: 'Services page',
    destinationSub: 'Client stories block',
    status: 'live',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    id: 'test-3',
    name: 'Chanda T.',
    farmOrCompany: 'Lusaka Greenhouse Co.',
    text: 'Reliable delivery, consistent product quality. Our greenhouse tomatoes showed zero pest damage without any toxic chemical residue.',
    destination: 'Home page',
    destinationSub: 'Testimonials carousel',
    status: 'draft',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: 'test-4',
    name: 'Mutale S.',
    farmOrCompany: 'Chisamba Commercial Maize',
    text: 'Bio-Sulphur 4 halted severe yellowing in under 10 days. The crop vigor and stalk thickness were visibly superior.',
    destination: 'Home page',
    destinationSub: 'Testimonials carousel',
    status: 'live',
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString()
  },
  {
    id: 'test-5',
    name: 'Kabwe C.',
    farmOrCompany: 'Mazabuka Outgrowers',
    text: 'Natural pest deterrent that protects our pollinators while keeping caterpillars and aphids completely under control.',
    destination: 'Services page',
    destinationSub: 'Client stories block',
    status: 'live',
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString()
  },
  {
    id: 'test-6',
    name: 'Kondwani P.',
    farmOrCompany: 'Mkushi Agro-Ventures',
    text: 'High-purity organic solution that boosted our export grading. The field reps gave us excellent dosage calculations.',
    destination: 'Home page',
    destinationSub: 'Testimonials carousel',
    status: 'live',
    createdAt: new Date(Date.now() - 86400000 * 25).toISOString()
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'We\'re now delivering to Copperbelt farms weekly',
    body: 'Regular scheduled transport now connects Kitwe, Ndola, Chingola, and Mufulira farmers directly with depot pricing.',
    destination: 'Home page',
    destinationSub: 'Announcement banner',
    status: 'draft',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'ann-2',
    title: 'New bulk order discounts for cooperatives',
    body: 'Cooperative unions ordering 50+ units of Bio-Fertilizer or Bio-Sulphur receive special subsidized pricing and free agronomist site inspection.',
    destination: 'Home page',
    destinationSub: 'Announcement banner',
    status: 'live',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
  }
];

// Initial realistic default representatives
export const INITIAL_REPRESENTATIVES: SalesRep[] = [
  { id: 'rep-stanford', name: 'Stanford', phone: '0767421417', region: 'Copperbelt / NW', avatarColor: 'bg-teal-600', active: true },
  { id: 'rep-ricky', name: 'Ricky', phone: '0972304539', region: 'Mkushi', avatarColor: 'bg-lime-600', active: true },
  { id: 'rep-peter', name: 'Peter', phone: '0973279761', region: 'Lusaka', avatarColor: 'bg-emerald-600', active: true },
  { id: 'rep-francis', name: 'Francis', phone: '0760072470', region: 'Central Province', avatarColor: 'bg-green-700', active: true },
];

export const INITIAL_INQUIRIES: SiteInquiry[] = [
  {
    id: 'inq-101',
    name: 'Mambwe Agri-Farms Ltd (Chisamba)',
    phoneOrEmail: '0977-882194',
    region: 'Central',
    productInterest: 'Bio-Sulphur 4',
    message: 'We are experiencing early stage maize yellowing across 40 hectares. Need 50 x 5L containers delivered urgently before rainfall.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'new',
    assignedRep: 'Francis',
    source: 'contact_form'
  },
  {
    id: 'inq-102',
    name: 'Banda Horticulture (Shimubala, Kafue)',
    phoneOrEmail: 'kbanda.horticulture@gmail.com',
    region: 'Lusaka',
    productInterest: 'Bio-Soapcide',
    message: 'Persistent red spider mites on greenhouse tomato seedlings. Seeking organic contact insecticide and sticker recommendation.',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'in_progress',
    assignedRep: 'Peter',
    notes: 'Spoke on WhatsApp. Sent recommended dilution table 1:100. Follow-up tomorrow.',
    source: 'contact_form'
  }
];

// In-memory cache + subscribers
type Listener = () => void;
const listeners = new Set<Listener>();

function notifyListeners() {
  listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {
      console.error('Store listener error:', e);
    }
  });
}

export function subscribeToStore(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// ---------------- PRODUCTS API ----------------
export function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function addProduct(product: Omit<Product, 'id'> & { id?: string }): Product {
  const current = getProducts();
  const newProduct: Product = {
    ...product,
    id: product.id || `prod-${Date.now()}`,
    status: product.status || 'live',
    destination: 'Products page',
    createdAt: new Date().toISOString()
  };
  const updated = [newProduct, ...current];
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
  return newProduct;
}

export function updateProduct(product: Product): void {
  const current = getProducts();
  const updated = current.map(p => (p.id === product.id ? product : p));
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function deleteProduct(id: string): void {
  const current = getProducts();
  const updated = current.filter(p => p.id !== id);
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function toggleProductStock(id: string, stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock'): void {
  const current = getProducts();
  const updated = current.map(p => (p.id === id ? { ...p, stockStatus } : p));
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function toggleProductStatus(id: string): void {
  const current = getProducts();
  const updated = current.map(p => {
    if (p.id === id) {
      const nextStatus: 'live' | 'draft' = p.status === 'live' ? 'draft' : 'live';
      return { ...p, status: nextStatus };
    }
    return p;
  });
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

// ---------------- TESTIMONIALS API ----------------
export function getTestimonials(): Testimonial[] {
  try {
    const raw = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TESTIMONIALS;
  }
}

export function addTestimonial(testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Testimonial {
  const current = getTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: `test-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  const updated = [newTestimonial, ...current];
  try {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
  return newTestimonial;
}

export function updateTestimonial(testimonial: Testimonial): void {
  const current = getTestimonials();
  const updated = current.map(t => (t.id === testimonial.id ? testimonial : t));
  try {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function deleteTestimonial(id: string): void {
  const current = getTestimonials();
  const updated = current.filter(t => t.id !== id);
  try {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function toggleTestimonialStatus(id: string): void {
  const current = getTestimonials();
  const updated = current.map(t => {
    if (t.id === id) {
      const nextStatus: 'live' | 'draft' = t.status === 'live' ? 'draft' : 'live';
      return { ...t, status: nextStatus };
    }
    return t;
  });
  try {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

// ---------------- ANNOUNCEMENTS API ----------------
export function getAnnouncements(): Announcement[] {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(INITIAL_ANNOUNCEMENTS));
      return INITIAL_ANNOUNCEMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ANNOUNCEMENTS;
  }
}

export function addAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>): Announcement {
  const current = getAnnouncements();
  const newAnnouncement: Announcement = {
    ...announcement,
    id: `ann-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  const updated = [newAnnouncement, ...current];
  try {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
  return newAnnouncement;
}

export function updateAnnouncement(announcement: Announcement): void {
  const current = getAnnouncements();
  const updated = current.map(a => (a.id === announcement.id ? announcement : a));
  try {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function deleteAnnouncement(id: string): void {
  const current = getAnnouncements();
  const updated = current.filter(a => a.id !== id);
  try {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function toggleAnnouncementStatus(id: string): void {
  const current = getAnnouncements();
  const updated = current.map(a => {
    if (a.id === id) {
      const nextStatus: 'live' | 'draft' = a.status === 'live' ? 'draft' : 'live';
      return { ...a, status: nextStatus };
    }
    return a;
  });
  try {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

// ---------------- REPRESENTATIVES API ----------------
export function getRepresentatives(): SalesRep[] {
  try {
    const raw = localStorage.getItem(REPS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REPS_STORAGE_KEY, JSON.stringify(INITIAL_REPRESENTATIVES));
      return INITIAL_REPRESENTATIVES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REPRESENTATIVES;
  }
}

export function updateRepresentative(rep: SalesRep): void {
  const current = getRepresentatives();
  const updated = current.map(r => (r.name === rep.name ? rep : r));
  try {
    localStorage.setItem(REPS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function addRepresentative(rep: SalesRep): void {
  const current = getRepresentatives();
  const updated = [...current, { ...rep, id: `rep-${Date.now()}`, active: true }];
  try {
    localStorage.setItem(REPS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

// ---------------- INQUIRIES API ----------------
export function getInquiries(): SiteInquiry[] {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(INITIAL_INQUIRIES));
      return INITIAL_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
  }
}

export function addInquiry(inquiry: Omit<SiteInquiry, 'id' | 'createdAt' | 'status'>): SiteInquiry {
  const current = getInquiries();
  const newInq: SiteInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  const updated = [newInq, ...current];
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save inquiry to storage', e);
  }
  notifyListeners();
  return newInq;
}

// ---------------- ADMIN AUTH & PASSWORD API ----------------
const ADMIN_PASSWORD_KEY = 'lifecycle_organics_admin_password_v1';
export const DEFAULT_ADMIN_EMAIL = 'lifecyce@login.com';
export const DEFAULT_ADMIN_PASSWORD = 'organics25';

export function getAdminPassword(): string {
  try {
    const saved = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (!saved || saved === 'Lifecycle@2026' || saved === 'organics2026') {
      return DEFAULT_ADMIN_PASSWORD;
    }
    return saved;
  } catch {
    return DEFAULT_ADMIN_PASSWORD;
  }
}

export function setAdminPassword(newPassword: string): boolean {
  if (!newPassword || newPassword.trim().length < 4) return false;
  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword.trim());
    notifyListeners();
    return true;
  } catch {
    return false;
  }
}

export function getAdminAuth(): AdminUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loginAdmin(email: string, password: string): { success: boolean; error?: string; user?: AdminUser } {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();
  const currentPassword = getAdminPassword();

  // Explicit required credentials:
  // Email: lifecyce@login.com
  // Password: organics25 (or customized in admin settings)
  const isEmailValid = 
    cleanEmail === 'lifecyce@login.com' || 
    cleanEmail === 'lifecycle@login.com';

  const isPassValid = 
    cleanPass === currentPassword || 
    cleanPass === DEFAULT_ADMIN_PASSWORD ||
    cleanPass === 'organics25';

  if (isEmailValid && isPassValid) {
    const user: AdminUser = {
      email: 'lifecyce@login.com',
      name: 'Lifecycle Admin',
      role: 'Site editor',
      lastLogin: new Date().toISOString()
    };
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    notifyListeners();
    return { success: true, user };
  }

  return {
    success: false,
    error: "That email and password don't match. Please enter lifecyce@login.com and the designated password."
  };
}

export function updateInquiryStatus(id: string, status: SiteInquiry['status']): void {
  const current = getInquiries();
  const updated = current.map(item => item.id === id ? { ...item, status } : item);
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function deleteInquiry(id: string): void {
  const current = getInquiries();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

// Reset store
export function resetStoreToDefaults(): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(INITIAL_ANNOUNCEMENTS));
    localStorage.setItem(REPS_STORAGE_KEY, JSON.stringify(INITIAL_REPRESENTATIVES));
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}
