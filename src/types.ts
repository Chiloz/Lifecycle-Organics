export type Page = 'home' | 'about' | 'services' | 'products' | 'contact' | 'admin';

export interface Product {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  benefits: string[];
  specs: string[];
  features: string[];
  image: string;
  badge: string;
  usage: string;
  price?: string;
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isFeatured?: boolean;
  status?: 'live' | 'draft';
  destination?: string;
  createdAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  farmOrCompany: string;
  text: string;
  destination: string; // 'Home page' | 'Services page'
  destinationSub?: string;
  status: 'live' | 'draft';
  createdAt: string;
  image?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  destination: string; // 'Home page' | 'Products page'
  destinationSub?: string;
  status: 'live' | 'draft';
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export interface SalesRep {
  id?: string;
  name: string;
  phone: string;
  region: string;
  avatarColor: string;
  active?: boolean;
}

export interface SiteInquiry {
  id: string;
  name: string;
  phoneOrEmail: string;
  region: string;
  productInterest: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'fulfilled';
  assignedRep?: string;
  notes?: string;
  source?: 'contact_form' | 'product_inquiry' | 'direct_agent';
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  lastLogin?: string;
}


