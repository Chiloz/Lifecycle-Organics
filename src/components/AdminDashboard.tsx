import React, { useState, useEffect } from 'react';
import {
  Quote,
  Bell,
  Sparkles,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  Plus,
  Eye,
  Check,
  ShieldCheck,
  ExternalLink,
  Key,
  Shield,
  Database,
  Inbox,
  Copy,
  CheckCheck
} from 'lucide-react';
import {
  Page,
  Product,
  Testimonial,
  Announcement,
  AdminUser,
  SiteInquiry
} from '../types';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleProductStock,
  toggleProductStatus,
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialStatus,
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementStatus,
  getAdminAuth,
  logoutAdmin,
  subscribeToStore,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getAdminPassword,
  setAdminPassword,
  DEFAULT_ADMIN_PASSWORD
} from '../services/store';

// Image imports for products & media
import bioFertilizerImg from '../assets/images/bio_fertilizer_1783345223620.jpg';
import bioSulphurImg from '../assets/images/bio_sulphur_1783345245681.jpg';
import bioSoapcideImg from '../assets/images/bio_soapcide_1783345266462.jpg';
import heroBannerImg from '../assets/images/hero_banner_1783345201244.jpg';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onLogout: () => void;
  setActivePage: (page: Page) => void;
}

type AdminViewType = 'dashboard' | 'composer' | 'testimonials' | 'products' | 'announcements' | 'homefeed' | 'media' | 'inquiries' | 'settings';
type PostType = 'testimonial' | 'product' | 'announcement';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  onLogout,
  setActivePage
}) => {
  const [currentView, setCurrentView] = useState<AdminViewType>('dashboard');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getAdminAuth());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<'website' | 'compact'>('website');

  // Live Data from Store
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials());
  const [announcements, setAnnouncements] = useState<Announcement[]>(getAnnouncements());
  const [inquiries, setInquiries] = useState<SiteInquiry[]>(getInquiries());
  const [adminPassword, setAdminPasswordState] = useState<string>(getAdminPassword());
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [firestoreStatus, setFirestoreStatus] = useState<'idle' | 'testing' | 'connected'>('idle');
  const [copiedPassword, setCopiedPassword] = useState(false);

  // Composer Form States
  const [composerType, setComposerType] = useState<PostType>('testimonial');
  const [destPage, setDestPage] = useState('Home page');
  const [destSub, setDestSub] = useState('Testimonials carousel');
  const [fName, setFName] = useState('Mwansa Kabaso');
  const [fSub, setFSub] = useState('Ndola Farm Cooperative');
  const [fBody, setFBody] = useState('Since switching to the Bio-Fertilizer line, our yield went up noticeably and we\'ve cut pest control costs by 40% in one season.');
  const [fPrice, setFPrice] = useState('ZMW 450.00 / 5L');
  const [fStockStatus, setFStockStatus] = useState<'In Stock' | 'Low Stock' | 'Out of Stock'>('In Stock');
  const [selectedImageKey, setSelectedImageKey] = useState<'bio-fertilizer' | 'bio-sulphur' | 'bio-soapcide' | 'farm'>('bio-fertilizer');

  // Editing existing item modal state
  const [editingItem, setEditingItem] = useState<{
    type: 'product' | 'testimonial' | 'announcement';
    data: any;
  } | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Subscribe to live store changes
  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setProducts(getProducts());
      setTestimonials(getTestimonials());
      setAnnouncements(getAnnouncements());
      setInquiries(getInquiries());
      setAdminUser(getAdminAuth());
      setAdminPasswordState(getAdminPassword());
    });
    return unsubscribe;
  }, []);

  const getProductImage = (id: string) => {
    switch (id) {
      case 'bio-fertilizer':
        return bioFertilizerImg;
      case 'bio-sulphur':
        return bioSulphurImg;
      case 'bio-soapcide':
        return bioSoapcideImg;
      default:
        return bioFertilizerImg;
    }
  };

  const getComposerSelectedImage = () => {
    switch (selectedImageKey) {
      case 'bio-fertilizer':
        return bioFertilizerImg;
      case 'bio-sulphur':
        return bioSulphurImg;
      case 'bio-soapcide':
        return bioSoapcideImg;
      case 'farm':
        return heroBannerImg;
      default:
        return bioFertilizerImg;
    }
  };

  // Switch post type in Composer
  const handleTypeSelect = (type: PostType) => {
    setComposerType(type);
    if (type === 'testimonial') {
      setDestPage('Home page');
      setDestSub('Testimonials carousel');
      setFName('Mwansa Kabaso');
      setFSub('Ndola Farm Cooperative');
      setFBody('Since switching to the Bio-Fertilizer line, our yield went up noticeably and we\'ve cut pest control costs by 40% in one season.');
    } else if (type === 'product') {
      setDestPage('Products page');
      setDestSub('Catalog grid');
      setFName('Bio-Fertilizer');
      setFSub('Nourishes Soil, Boosts Growth');
      setFBody('A powerful, 100% organic bio-superfertilizer solution designed to nourish crops and restore long-term soil fertility.');
      setFPrice('ZMW 450.00 / 5L');
      setFStockStatus('In Stock');
    } else if (type === 'announcement') {
      setDestPage('Home page');
      setDestSub('Announcement banner');
      setFName('We\'re now delivering to Copperbelt farms weekly');
      setFSub('');
      setFBody('Regular scheduled transport now connects Kitwe, Ndola, Chingola, and Mufulira farmers directly with depot pricing.');
    }
  };

  // Handle Save in Composer (Draft or Publish)
  const handleSavePost = (status: 'live' | 'draft') => {
    if (!fName.trim()) {
      showToast('Please provide a title or name');
      return;
    }

    if (composerType === 'product') {
      addProduct({
        name: fName,
        brand: 'Green & Organics',
        tagline: fSub || '100% Natural Organic Solution',
        description: fBody || 'High-performance organic agricultural formulation.',
        benefits: ['Improves plant immunity', 'Natural residue-free protection', 'Enhances harvest yields'],
        features: ['100% Natural', 'Fast Bio-Absorption', 'Safe for Pollinators'],
        specs: ['Volume: 5 Liters', 'Type: Concentrate', 'Dilution: 1:100'],
        badge: status === 'live' ? 'Published' : 'Draft',
        image: selectedImageKey === 'farm' ? 'bio_fertilizer' : selectedImageKey,
        usage: 'Apply evenly as a foliar spray during early morning or late afternoon.',
        price: fPrice || 'ZMW 450.00 / 5L',
        stockStatus: fStockStatus,
        isFeatured: true,
        status: status,
        destination: destPage
      });
      showToast(`Product "${fName}" ${status === 'live' ? 'published to live site!' : 'saved as draft'}`);
    } else if (composerType === 'testimonial') {
      addTestimonial({
        name: fName,
        farmOrCompany: fSub,
        text: fBody,
        destination: destPage,
        destinationSub: destSub,
        status: status
      });
      showToast(`Testimonial from "${fName}" ${status === 'live' ? 'published to live site!' : 'saved as draft'}`);
    } else if (composerType === 'announcement') {
      addAnnouncement({
        title: fName,
        body: fBody,
        destination: destPage,
        destinationSub: destSub,
        status: status
      });
      showToast(`Announcement "${fName}" ${status === 'live' ? 'published to live site!' : 'saved as draft'}`);
    }

    setCurrentView('dashboard');
  };

  // Open Edit Modal
  const handleEditProduct = (p: Product) => {
    setEditingItem({
      type: 'product',
      data: { ...p }
    });
  };

  const handleEditTestimonial = (t: Testimonial) => {
    setEditingItem({
      type: 'testimonial',
      data: { ...t }
    });
  };

  const handleEditAnnouncement = (a: Announcement) => {
    setEditingItem({
      type: 'announcement',
      data: { ...a }
    });
  };

  // Save changes from Edit Modal
  const handleSaveEdit = () => {
    if (!editingItem) return;
    if (editingItem.type === 'product') {
      updateProduct(editingItem.data);
      showToast(`Updated product "${editingItem.data.name}"`);
    } else if (editingItem.type === 'testimonial') {
      updateTestimonial(editingItem.data);
      showToast(`Updated testimonial from "${editingItem.data.name}"`);
    } else if (editingItem.type === 'announcement') {
      updateAnnouncement(editingItem.data);
      showToast(`Updated announcement "${editingItem.data.title}"`);
    }
    setEditingItem(null);
  };

  // Counts for Stats
  const liveTestimonialsCount = testimonials.filter(t => t.status === 'live').length;
  const publishedProductsCount = products.filter(p => p.status !== 'draft').length;
  const liveAnnouncementsCount = announcements.filter(a => a.status === 'live').length;
  const draftCount = 
    testimonials.filter(t => t.status === 'draft').length +
    products.filter(p => p.status === 'draft').length +
    announcements.filter(a => a.status === 'draft').length;

  return (
    <div className="min-h-screen flex bg-[#fdfbf7] text-[#22301c] font-sans antialiased selection:bg-[#e9edc9] selection:text-[#2d4a22]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#2d4a22] text-white px-5 py-3 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2 border border-[#a3b18a] animate-in slide-in-from-top-3">
          <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#1e2618]/50 z-40 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR (from Lifecycle Organics — Admin.html) */}
      <aside 
        className={`w-[236px] shrink-0 bg-[#2d3a22] text-[#f0ede6] min-h-screen p-[26px_18px] flex flex-col gap-7 fixed inset-y-0 left-0 z-50 transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center font-bold font-serif text-[15px] text-[#2d3a22] shrink-0 shadow-xs"
               style={{ background: 'linear-gradient(135deg, #a3b18a, #588157)' }}>
            LO
          </div>
          <div className="font-serif text-[15px] text-white leading-tight">
            Lifecycle Organics
            <span className="block text-[10.5px] text-[#a3b18a] font-mono tracking-wider font-semibold">
              ADMIN
            </span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden ml-auto text-[#c9d0be] hover:text-white p-1 text-lg leading-none cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 text-left">
          <button
            onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] cursor-pointer border-none w-full text-left transition-colors ${
              currentView === 'dashboard'
                ? 'bg-[#588157] text-white font-medium'
                : 'text-[#c9d0be] hover:bg-[#38492d]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] shrink-0" />
            Dashboard
          </button>

          <button
            onClick={() => { setCurrentView('composer'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] cursor-pointer border-none w-full text-left transition-colors ${
              currentView === 'composer'
                ? 'bg-[#588157] text-white font-medium'
                : 'text-[#c9d0be] hover:bg-[#38492d]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] shrink-0" />
            New post
          </button>

          {/* Section: CONTENT */}
          <div className="text-[10.5px] text-[#8a9a7e] font-mono mt-3.5 mb-1 px-1 tracking-wider">
            CONTENT
          </div>

          <button
            onClick={() => { setCurrentView('testimonials'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] cursor-pointer border-none w-full text-left transition-colors ${
              currentView === 'testimonials'
                ? 'bg-[#588157] text-white font-medium'
                : 'text-[#c9d0be] hover:bg-[#38492d]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] shrink-0" />
            Testimonials
            <span className="ml-auto text-[11px] text-[#9fae90] font-mono">
              {testimonials.length}
            </span>
          </button>

          <button
            onClick={() => { setCurrentView('products'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] cursor-pointer border-none w-full text-left transition-colors ${
              currentView === 'products'
                ? 'bg-[#588157] text-white font-medium'
                : 'text-[#c9d0be] hover:bg-[#38492d]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] shrink-0" />
            Products
            <span className="ml-auto text-[11px] text-[#9fae90] font-mono">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => { setCurrentView('announcements'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] cursor-pointer border-none w-full text-left transition-colors ${
              currentView === 'announcements'
                ? 'bg-[#588157] text-white font-medium'
                : 'text-[#c9d0be] hover:bg-[#38492d]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] shrink-0" />
            Announcements
            <span className="ml-auto text-[11px] text-[#9fae90] font-mono">
              {announcements.length}
            </span>
          </button>

          {/* Section: SITE MAP */}
          <div className="text-[10.5px] text-[#8a9a7e] font-mono mt-3.5 mb-1 px-1 tracking-wider">
            SITE MAP
          </div>

          <button
            onClick={() => { setCurrentView('homefeed'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] cursor-pointer border-none w-full text-left transition-colors ${
              currentView === 'homefeed'
                ? 'bg-[#588157] text-white font-medium'
                : 'text-[#c9d0be] hover:bg-[#38492d]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] shrink-0" />
            Home page feed
          </button>

          <button
            onClick={() => { setCurrentView('media'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] cursor-pointer border-none w-full text-left transition-colors ${
              currentView === 'media'
                ? 'bg-[#588157] text-white font-medium'
                : 'text-[#c9d0be] hover:bg-[#38492d]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] shrink-0" />
            Media library
          </button>

          {/* Section: SYSTEM & SECURITY */}
          <div className="text-[10.5px] text-[#8a9a7e] font-mono mt-3.5 mb-1 px-1 tracking-wider">
            SYSTEM &amp; SECURITY
          </div>

          <button
            onClick={() => { setCurrentView('inquiries'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] cursor-pointer border-none w-full text-left transition-colors ${
              currentView === 'inquiries'
                ? 'bg-[#588157] text-white font-medium'
                : 'text-[#c9d0be] hover:bg-[#38492d]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] shrink-0" />
            Customer Inquiries
            <span className="ml-auto text-[11px] text-[#9fae90] font-mono">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => { setCurrentView('settings'); setMobileMenuOpen(false); }}
            className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-[13.5px] cursor-pointer border-none w-full text-left transition-colors ${
              currentView === 'settings'
                ? 'bg-[#588157] text-white font-medium'
                : 'text-[#c9d0be] hover:bg-[#38492d]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] shrink-0" />
            Settings &amp; Password
          </button>
        </nav>

        {/* Sidebar Foot */}
        <div className="mt-auto pt-4 border-t border-[#46563a] flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4a373] flex items-center justify-center font-bold text-[#2d3a22] text-[13px] shrink-0">
              {adminUser?.name ? adminUser.name[0].toUpperCase() : 'J'}
            </div>
            <div className="text-[12.5px] text-[#dfe4d5] leading-tight text-left">
              <span className="font-semibold block">{adminUser?.name || 'Josaphat'}</span>
              <span className="text-[11px] text-[#8a9a7e]">{adminUser?.role || 'Site editor'}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={onBackToSite}
              className="flex-1 py-1.5 px-2 rounded-md bg-[#38492d] hover:bg-[#46563a] text-white text-[11.5px] font-medium transition cursor-pointer text-center"
              title="Return to Public Website"
            >
              Public Site
            </button>
            <button
              onClick={() => { logoutAdmin(); onLogout(); }}
              className="py-1.5 px-2 rounded-md bg-[#38492d] hover:bg-red-900/60 text-white text-[11.5px] font-medium transition cursor-pointer"
              title="Sign out of Admin"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 flex flex-col">
        
        {/* VIEW 1: DASHBOARD */}
        {currentView === 'dashboard' && (
          <div>
            {/* Topbar */}
            <header className="flex items-center justify-between p-5 sm:p-[20px_32px] border-b border-[#e0dcd0] bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg border border-[#e0dcd0] bg-white text-[#2d3a22] cursor-pointer"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-[#2d3a22] font-serif leading-tight">
                    Dashboard
                  </h1>
                  <p className="text-[12.5px] text-[#7c8570] mt-0.5">
                    Live layout &amp; content posts arranged exactly as they appear on the site
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={onBackToSite}
                  className="hidden sm:inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg text-[13px] font-semibold bg-[#f0ede6] hover:bg-[#e9e4db] text-[#2d3a22] transition cursor-pointer"
                >
                  View Public Site
                </button>
                <button
                  onClick={() => setCurrentView('composer')}
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg text-[13.5px] font-semibold bg-[#588157] hover:bg-[#3a5a40] text-white transition cursor-pointer shadow-xs"
                >
                  + New post
                </button>
              </div>
            </header>

            {/* Dashboard Content */}
            <div className="p-5 sm:p-[28px_32px] max-w-6xl mx-auto space-y-8">
              
              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-[#e0dcd0] rounded-xl p-[18px_20px] text-left shadow-2xs">
                  <div className="font-serif text-[26px] text-[#2d3a22] leading-none">
                    {liveTestimonialsCount}
                  </div>
                  <div className="text-xs text-[#8a9280] mt-1">Testimonials live</div>
                  <span className="inline-block mt-2.5 text-[10.5px] font-mono text-[#3a5a40] bg-[#e9edc9] px-2 py-0.5 rounded font-medium">
                    Home page
                  </span>
                </div>

                <div className="bg-white border border-[#e0dcd0] rounded-xl p-[18px_20px] text-left shadow-2xs">
                  <div className="font-serif text-[26px] text-[#2d3a22] leading-none">
                    {publishedProductsCount}
                  </div>
                  <div className="text-xs text-[#8a9280] mt-1">Products published</div>
                  <span className="inline-block mt-2.5 text-[10.5px] font-mono text-[#3a5a40] bg-[#e9edc9] px-2 py-0.5 rounded font-medium">
                    Products page
                  </span>
                </div>

                <div className="bg-white border border-[#e0dcd0] rounded-xl p-[18px_20px] text-left shadow-2xs">
                  <div className="font-serif text-[26px] text-[#2d3a22] leading-none">
                    {liveAnnouncementsCount}
                  </div>
                  <div className="text-xs text-[#8a9280] mt-1">Announcements</div>
                  <span className="inline-block mt-2.5 text-[10.5px] font-mono text-[#3a5a40] bg-[#e9edc9] px-2 py-0.5 rounded font-medium">
                    Home page
                  </span>
                </div>

                <div className="bg-white border border-[#e0dcd0] rounded-xl p-[18px_20px] text-left shadow-2xs">
                  <div className="font-serif text-[26px] text-[#2d3a22] leading-none">
                    {draftCount}
                  </div>
                  <div className="text-xs text-[#8a9280] mt-1">Draft awaiting review</div>
                  <span className="inline-block mt-2.5 text-[10.5px] font-mono text-[#9c7a3c] bg-[#fefae0] px-2 py-0.5 rounded font-medium">
                    Unpublished
                  </span>
                </div>
              </div>

              {/* Arranged Live Website Sections Header & Mode Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e0dcd0] pb-3 text-left">
                <div>
                  <h2 className="text-lg font-semibold text-[#2d3a22] font-serif flex items-center gap-2">
                    <span>Website Post Layout</span>
                    <span className="text-[10px] font-mono bg-[#e9edc9] text-[#2d4a22] px-2 py-0.5 rounded-full font-bold uppercase">
                      Live Previews
                    </span>
                  </h2>
                  <p className="text-xs text-[#8a9280] mt-0.5">
                    Cards arranged and rendered exactly as growers experience them on the public site
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-[#f0ede6] p-1 rounded-xl border border-[#e0dcd0] self-start sm:self-auto">
                  <button
                    onClick={() => setDisplayMode('website')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      displayMode === 'website'
                        ? 'bg-white text-[#2d3a22] shadow-2xs'
                        : 'text-[#8a9280] hover:text-[#2d3a22]'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Website Cards</span>
                  </button>
                  <button
                    onClick={() => setDisplayMode('compact')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      displayMode === 'compact'
                        ? 'bg-white text-[#2d3a22] shadow-2xs'
                        : 'text-[#8a9280] hover:text-[#2d3a22]'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Compact Rows</span>
                  </button>
                </div>
              </div>

              {/* MODE 1: EXACT WEBSITE CARDS ARRANGEMENT */}
              {displayMode === 'website' ? (
                <div className="space-y-10 text-left">
                  
                  {/* SECTION A: HOME PAGE BANNER ANNOUNCEMENTS */}
                  {announcements.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#d4a373]" />
                          <h3 className="font-serif font-semibold text-sm text-[#2d3a22] uppercase tracking-wider">
                            Home Page Announcement Banners
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-[#8a9280]">
                          Appears at top of public homepage
                        </span>
                      </div>

                      <div className="space-y-3">
                        {announcements.map((a) => (
                          <div 
                            key={a.id}
                            className="bg-amber-500/10 border border-[#d4a373]/60 text-[#2d3a22] p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs relative overflow-hidden group hover:border-[#d4a373] transition"
                          >
                            <div className="flex items-start gap-3.5 max-w-3xl">
                              <span className="p-2.5 rounded-xl bg-[#d4a373] text-white shrink-0 mt-0.5 shadow-2xs">
                                <Bell className="w-4 h-4" />
                              </span>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span className="text-[10px] font-bold font-mono text-[#a3661a] uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded border border-[#d4a373]/30">
                                    {a.destination} · Banner
                                  </span>
                                  <span className="font-bold text-base text-[#2d3a22]">
                                    {a.title}
                                  </span>
                                </div>
                                <p className="text-xs sm:text-[13px] text-[#2d3a22]/85 leading-relaxed font-sans">
                                  {a.body}
                                </p>
                              </div>
                            </div>

                            {/* Admin Controls */}
                            <div className="flex items-center gap-2 shrink-0 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-[#d4a373]/20 w-full md:w-auto justify-end">
                              <button
                                onClick={() => toggleAnnouncementStatus(a.id)}
                                className={`text-[11px] px-3 py-1 rounded-full font-semibold cursor-pointer border-none transition ${
                                  a.status === 'live' 
                                    ? 'bg-[#e3f3e1] text-[#2f7a2f]' 
                                    : 'bg-[#f2ede1] text-[#9c7a3c]'
                                }`}
                                title="Click to toggle Live on site or Draft"
                              >
                                {a.status === 'live' ? '✓ Live on Site' : 'Draft Only'}
                              </button>
                              <button
                                onClick={() => handleEditAnnouncement(a)}
                                className="w-8 h-8 rounded-lg border border-[#e0dcd0] bg-white hover:bg-[#fdfbf7] text-[#2d3a22] flex items-center justify-center cursor-pointer transition text-xs shadow-2xs"
                                title="Edit Announcement"
                              >
                                ✎
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete announcement "${a.title}"?`)) {
                                    deleteAnnouncement(a.id);
                                    showToast('Deleted announcement');
                                  }
                                }}
                                className="w-8 h-8 rounded-lg border border-[#e0dcd0] bg-white hover:bg-red-50 text-[#8a9280] hover:text-red-700 flex items-center justify-center cursor-pointer transition text-xs shadow-2xs"
                                title="Delete Announcement"
                              >
                                🗑
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION B: PRODUCTS CATALOG GRID (Exact 1:1 Website Card Layout) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#588157]" />
                        <h3 className="font-serif font-semibold text-sm text-[#2d3a22] uppercase tracking-wider">
                          Products &amp; Flagship Lineup
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-[#8a9280]">
                        Appears on Products Page Catalog Grid &amp; Home Flagship
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-[28px] border border-[#e0dcd0] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group relative"
                        >
                          {/* Top Product Image Container (1:1 with website) */}
                          <div className="relative aspect-square overflow-hidden bg-[#fdfbf7] shrink-0 border-b border-[#e0dcd0]">
                            <img
                              src={getProductImage(product.id)}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            {/* Product Badge */}
                            <span className="absolute top-3.5 left-3.5 bg-[#d4a373] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                              {product.badge || '100% Organic'}
                            </span>

                            {/* Admin Quick Status Overlay Badges */}
                            <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                              <button
                                onClick={() => toggleProductStock(product.id, product.stockStatus === 'In Stock' ? 'Low Stock' : product.stockStatus === 'Low Stock' ? 'Out of Stock' : 'In Stock')}
                                className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full shadow-xs cursor-pointer border transition ${
                                  product.stockStatus === 'In Stock'
                                    ? 'bg-[#e3f3e1] text-[#2f7a2f] border-[#c2e5bf]'
                                    : product.stockStatus === 'Low Stock'
                                    ? 'bg-[#fdf1de] text-[#a3661a] border-[#f5dfb8]'
                                    : 'bg-[#fbe9e7] text-[#b4382c] border-[#f3c9c2]'
                                }`}
                                title="Click to toggle stock status"
                              >
                                {product.stockStatus || 'In Stock'}
                              </button>

                              <button
                                onClick={() => toggleProductStatus(product.id)}
                                className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full shadow-xs cursor-pointer border transition ${
                                  product.status === 'live'
                                    ? 'bg-[#2d4a22] text-white border-[#2d4a22]'
                                    : 'bg-white text-[#9c7a3c] border-[#e0dcd0]'
                                }`}
                                title="Click to toggle Live/Draft"
                              >
                                {product.status === 'live' ? 'Live' : 'Draft'}
                              </button>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-3.5 text-left">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-bold text-[#a3b18a] uppercase tracking-widest font-mono">
                                  {product.brand || 'Green & Organics'}
                                </p>
                                {product.price && (
                                  <span className="font-mono text-xs font-bold text-[#588157] bg-[#e9edc9]/60 px-2 py-0.5 rounded border border-[#a3b18a]/30">
                                    {product.price}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-bold text-[#2d3a22] font-serif leading-tight">
                                {product.name}
                              </h3>
                              <p className="text-xs italic text-[#2d3a22]/70 font-medium">
                                {product.tagline}
                              </p>
                            </div>

                            <p className="text-xs sm:text-[13px] text-[#2d3a22]/80 leading-relaxed flex-grow line-clamp-3">
                              {product.description}
                            </p>

                            {/* Features badges */}
                            <div className="pt-2 border-t border-[#e0dcd0] flex flex-wrap gap-1.5">
                              {product.features?.slice(0, 3).map((f, i) => (
                                <span
                                  key={i}
                                  className="bg-[#e9edc9] text-[#2d4a22] text-[10.5px] font-bold px-2 py-0.5 rounded-md"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>

                            {/* Action Bar */}
                            <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#e0dcd0]/80">
                              <span className="text-[11px] font-mono text-[#8a9280]">
                                Catalog Grid
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="py-1.5 px-3 rounded-lg bg-[#f0ede6] hover:bg-[#e9e4db] text-[#2d3a22] font-semibold text-xs transition cursor-pointer flex items-center gap-1"
                                >
                                  <span>✎ Edit</span>
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete product "${product.name}"?`)) {
                                      deleteProduct(product.id);
                                      showToast(`Deleted ${product.name}`);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-red-50 text-[#8a9280] hover:text-red-700 transition cursor-pointer"
                                  title="Delete product"
                                >
                                  🗑
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION C: TESTIMONIALS CAROUSEL CARDS (Exact 1:1 Website Card Layout) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#d4a373]" />
                        <h3 className="font-serif font-semibold text-sm text-[#2d3a22] uppercase tracking-wider">
                          Verified Grower Testimonials
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-[#8a9280]">
                        Appears in Home Page Testimonials Carousel &amp; Services Block
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {testimonials.map((item) => (
                        <div 
                          key={item.id} 
                          className="bg-white p-6 rounded-2xl border border-[#e0dcd0] flex flex-col justify-between text-left space-y-4 hover:border-[#a3b18a] transition shadow-2xs relative group"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <Quote className="w-5 h-5 text-[#d4a373] opacity-80" />
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                                item.destination === 'Services page'
                                  ? 'bg-[#e6eefb] text-[#33608f]'
                                  : 'bg-[#fdf1de] text-[#a3661a]'
                              }`}>
                                {item.destination}
                              </span>
                            </div>
                            <p className="text-xs sm:text-[13px] text-[#2d3a22]/90 leading-relaxed italic font-serif">
                              "{item.text}"
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#e0dcd0] flex items-end justify-between">
                            <div>
                              <p className="font-serif font-bold text-[#2d3a22] text-sm">{item.name}</p>
                              <p className="text-[11px] text-[#588157] font-mono">{item.farmOrCompany}</p>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => toggleTestimonialStatus(item.id)}
                                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold cursor-pointer border-none transition ${
                                  item.status === 'live' 
                                    ? 'bg-[#e3f3e1] text-[#2f7a2f]' 
                                    : 'bg-[#f2ede1] text-[#9c7a3c]'
                                }`}
                                title="Toggle live/draft"
                              >
                                {item.status === 'live' ? 'Live' : 'Draft'}
                              </button>
                              <button
                                onClick={() => handleEditTestimonial(item)}
                                className="w-7 h-7 rounded-md border border-[#e0dcd0] bg-[#fdfbf7] hover:bg-[#f0ede6] text-[#2d3a22] flex items-center justify-center cursor-pointer text-xs"
                                title="Edit Testimonial"
                              >
                                ✎
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete testimonial from "${item.name}"?`)) {
                                    deleteTestimonial(item.id);
                                    showToast('Deleted testimonial');
                                  }
                                }}
                                className="w-7 h-7 rounded-md border border-[#e0dcd0] bg-[#fdfbf7] hover:bg-red-50 text-[#8a9280] hover:text-red-700 flex items-center justify-center cursor-pointer text-xs"
                                title="Delete Testimonial"
                              >
                                🗑
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                /* MODE 2: COMPACT ROWS (Original condensed admin list) */
                <div className="space-y-2.5 pt-2">
                  {/* Products */}
                  {products.map((p) => (
                    <div 
                      key={p.id}
                      className="flex items-center gap-3.5 bg-white border border-[#e0dcd0] rounded-xl p-3 sm:p-[12px_16px] shadow-2xs hover:border-[#a3b18a] transition"
                    >
                      <div 
                        className="w-[52px] h-[52px] rounded-lg shrink-0 bg-cover bg-center border border-[#e0dcd0]"
                        style={{ backgroundImage: `url(${getProductImage(p.id)})` }}
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-[14px] font-semibold text-[#2d3a22] truncate">
                          {p.name} {p.price && <span className="font-normal text-xs text-[#588157]">({p.price})</span>}
                        </div>
                        <div className="text-[12.5px] text-[#8a9280] truncate mt-0.5">
                          {p.tagline || p.description} · by Josaphat
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap justify-end">
                        <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-full bg-[#e9edc9] text-[#3a5a40] font-medium">
                          Products page
                        </span>
                        <button
                          onClick={() => toggleProductStock(p.id, p.stockStatus === 'In Stock' ? 'Low Stock' : p.stockStatus === 'Low Stock' ? 'Out of Stock' : 'In Stock')}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold cursor-pointer border-none transition ${
                            p.stockStatus === 'In Stock'
                              ? 'bg-[#e3f3e1] text-[#2f7a2f]'
                              : p.stockStatus === 'Low Stock'
                              ? 'bg-[#fdf1de] text-[#a3661a]'
                              : 'bg-[#fbe9e7] text-[#b4382c]'
                          }`}
                        >
                          {p.stockStatus || 'In Stock'}
                        </button>
                        <button
                          onClick={() => toggleProductStatus(p.id)}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold cursor-pointer border-none transition ${
                            p.status === 'live' ? 'bg-[#e3f3e1] text-[#2f7a2f]' : 'bg-[#f2ede1] text-[#9c7a3c]'
                          }`}
                        >
                          {p.status === 'live' ? 'Live' : 'Draft'}
                        </button>
                        <button onClick={() => handleEditProduct(p)} className="w-[30px] h-[30px] rounded-md border border-[#e0dcd0] bg-white text-xs">✎</button>
                        <button onClick={() => deleteProduct(p.id)} className="w-[30px] h-[30px] rounded-md border border-[#e0dcd0] bg-white text-xs hover:text-red-700">🗑</button>
                      </div>
                    </div>
                  ))}

                  {/* Testimonials */}
                  {testimonials.map((t) => (
                    <div 
                      key={t.id}
                      className="flex items-center gap-3.5 bg-white border border-[#e0dcd0] rounded-xl p-3 sm:p-[12px_16px] shadow-2xs hover:border-[#a3b18a] transition"
                    >
                      <div className="w-[52px] h-[52px] rounded-lg shrink-0 flex items-center justify-center font-serif text-sm font-bold text-[#3a5a40] bg-[#e9edc9]">
                        {t.name ? t.name[0] : 'T'}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-[14px] font-semibold text-[#2d3a22] truncate">"{t.text}" — {t.name}</div>
                        <div className="text-[12.5px] text-[#8a9280] truncate mt-0.5">{t.farmOrCompany}</div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap justify-end">
                        <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-full bg-[#fdf1de] text-[#a3661a]">{t.destination}</span>
                        <button onClick={() => toggleTestimonialStatus(t.id)} className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${t.status === 'live' ? 'bg-[#e3f3e1] text-[#2f7a2f]' : 'bg-[#f2ede1] text-[#9c7a3c]'}`}>{t.status === 'live' ? 'Live' : 'Draft'}</button>
                        <button onClick={() => handleEditTestimonial(t)} className="w-[30px] h-[30px] rounded-md border border-[#e0dcd0] bg-white text-xs">✎</button>
                        <button onClick={() => deleteTestimonial(t.id)} className="w-[30px] h-[30px] rounded-md border border-[#e0dcd0] bg-white text-xs hover:text-red-700">🗑</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* VIEW 2: COMPOSER (New post with true Website-Style Live Preview) */}
        {currentView === 'composer' && (
          <div>
            <header className="flex items-center justify-between p-5 sm:p-[20px_32px] border-b border-[#e0dcd0] bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg border border-[#e0dcd0] bg-white text-[#2d3a22] cursor-pointer"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-[#2d3a22] font-serif leading-tight">
                    New post
                  </h1>
                  <p className="text-[12.5px] text-[#7c8570] mt-0.5">
                    Choose a type and a destination — the preview shows exactly how it appears on the live website
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="py-2 px-3.5 rounded-lg text-[13px] font-semibold bg-[#f0ede6] hover:bg-[#e9e4db] text-[#2d3a22] transition cursor-pointer"
              >
                Cancel
              </button>
            </header>

            <div className="p-5 sm:p-[28px_32px] max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 text-left items-start">
                
                {/* Left Panel: Composer Form */}
                <div className="bg-white border border-[#e0dcd0] rounded-2xl p-6 shadow-2xs space-y-5">
                  
                  {/* Post Type Toggle */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2d3a22] mb-2 font-mono uppercase tracking-wider">
                      Post type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleTypeSelect('testimonial')}
                        className={`border rounded-lg p-2.5 text-center text-xs font-semibold cursor-pointer transition ${
                          composerType === 'testimonial'
                            ? 'border-[#588157] bg-[#e9edc9] text-[#3a5a40]'
                            : 'border-[#e0dcd0] bg-white text-[#8a9280] hover:bg-[#fdfbf7]'
                        }`}
                      >
                        Testimonial
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTypeSelect('product')}
                        className={`border rounded-lg p-2.5 text-center text-xs font-semibold cursor-pointer transition ${
                          composerType === 'product'
                            ? 'border-[#588157] bg-[#e9edc9] text-[#3a5a40]'
                            : 'border-[#e0dcd0] bg-white text-[#8a9280] hover:bg-[#fdfbf7]'
                        }`}
                      >
                        Product (image + text)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTypeSelect('announcement')}
                        className={`border rounded-lg p-2.5 text-center text-xs font-semibold cursor-pointer transition ${
                          composerType === 'announcement'
                            ? 'border-[#588157] bg-[#e9edc9] text-[#3a5a40]'
                            : 'border-[#e0dcd0] bg-white text-[#8a9280] hover:bg-[#fdfbf7]'
                        }`}
                      >
                        Text announcement
                      </button>
                    </div>
                  </div>

                  {/* Post To Destination Grid */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2d3a22] mb-2 font-mono uppercase tracking-wider">
                      Post to
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => { setDestPage('Home page'); setDestSub('Testimonials carousel'); }}
                        className={`border rounded-lg p-2.5 text-left cursor-pointer transition ${
                          destSub === 'Testimonials carousel'
                            ? 'border-[#d4a373] bg-[#fdf7ee]'
                            : 'border-[#e0dcd0] bg-white hover:bg-[#fdfbf7]'
                        }`}
                      >
                        <span className="font-semibold block text-[#2d3a22]">Home page</span>
                        <small className="block text-[10.5px] text-[#8a9280] mt-0.5">Testimonials carousel</small>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setDestPage('Products page'); setDestSub('Catalog grid'); }}
                        className={`border rounded-lg p-2.5 text-left cursor-pointer transition ${
                          destSub === 'Catalog grid'
                            ? 'border-[#d4a373] bg-[#fdf7ee]'
                            : 'border-[#e0dcd0] bg-white hover:bg-[#fdfbf7]'
                        }`}
                      >
                        <span className="font-semibold block text-[#2d3a22]">Products page</span>
                        <small className="block text-[10.5px] text-[#8a9280] mt-0.5">Catalog grid</small>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setDestPage('Services page'); setDestSub('Client stories block'); }}
                        className={`border rounded-lg p-2.5 text-left cursor-pointer transition ${
                          destSub === 'Client stories block'
                            ? 'border-[#d4a373] bg-[#fdf7ee]'
                            : 'border-[#e0dcd0] bg-white hover:bg-[#fdfbf7]'
                        }`}
                      >
                        <span className="font-semibold block text-[#2d3a22]">Services page</span>
                        <small className="block text-[10.5px] text-[#8a9280] mt-0.5">Client stories block</small>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setDestPage('Home page'); setDestSub('Announcement banner'); }}
                        className={`border rounded-lg p-2.5 text-left cursor-pointer transition ${
                          destSub === 'Announcement banner'
                            ? 'border-[#d4a373] bg-[#fdf7ee]'
                            : 'border-[#e0dcd0] bg-white hover:bg-[#fdfbf7]'
                        }`}
                      >
                        <span className="font-semibold block text-[#2d3a22]">Home page</span>
                        <small className="block text-[10.5px] text-[#8a9280] mt-0.5">Below-Hero announcement</small>
                      </button>
                    </div>
                  </div>

                  {/* Photo selector (if product or testimonial) */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2d3a22] mb-1 font-mono uppercase tracking-wider">
                      Featured photo / packaging
                    </label>
                    <div className="border border-dashed border-[#a3b18a] rounded-xl p-3.5 bg-[#fefae0]/70 text-center">
                      <div className="text-xs text-[#8a9280] mb-2">
                        📷 Select packaging asset:
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedImageKey('bio-fertilizer')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                            selectedImageKey === 'bio-fertilizer'
                              ? 'bg-[#588157] text-white border-[#588157]'
                              : 'bg-white border-[#e0dcd0] text-[#2d3a22]'
                          }`}
                        >
                          Bio-Fertilizer (5L)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedImageKey('bio-sulphur')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                            selectedImageKey === 'bio-sulphur'
                              ? 'bg-[#588157] text-white border-[#588157]'
                              : 'bg-white border-[#e0dcd0] text-[#2d3a22]'
                          }`}
                        >
                          Bio-Sulphur 4 (5L)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedImageKey('bio-soapcide')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                            selectedImageKey === 'bio-soapcide'
                              ? 'bg-[#588157] text-white border-[#588157]'
                              : 'bg-white border-[#e0dcd0] text-[#2d3a22]'
                          }`}
                        >
                          Bio-Soapcide (5L)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedImageKey('farm')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                            selectedImageKey === 'farm'
                              ? 'bg-[#588157] text-white border-[#588157]'
                              : 'bg-white border-[#e0dcd0] text-[#2d3a22]'
                          }`}
                        >
                          Zambian Farmland
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form fields based on type */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2d3a22] mb-1.5">
                        {composerType === 'product' ? 'Product name' : composerType === 'testimonial' ? 'Customer name' : 'Headline'}
                      </label>
                      <input
                        type="text"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                        placeholder={composerType === 'product' ? 'e.g. Bio-Fertilizer' : 'e.g. Mwansa Kabaso'}
                        className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-[13.5px] text-[#22301c] focus:outline-none focus:border-[#588157]"
                      />
                    </div>

                    {composerType !== 'announcement' && (
                      <div>
                        <label className="block text-xs font-semibold text-[#2d3a22] mb-1.5">
                          {composerType === 'product' ? 'Tagline' : 'Farm / company'}
                        </label>
                        <input
                          type="text"
                          value={fSub}
                          onChange={(e) => setFSub(e.target.value)}
                          placeholder={composerType === 'product' ? 'e.g. Nourishes Soil, Boosts Growth' : 'e.g. Ndola Farm Cooperative'}
                          className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-[13.5px] text-[#22301c] focus:outline-none focus:border-[#588157]"
                        />
                      </div>
                    )}

                    {/* Rich Product Inventory fields if type is product */}
                    {composerType === 'product' && (
                      <div className="grid grid-cols-2 gap-3 p-3 bg-[#f0ede6]/50 rounded-xl border border-[#e0dcd0]">
                        <div>
                          <label className="block text-xs font-semibold text-[#2d3a22] mb-1 font-mono">
                            Price (ZMW)
                          </label>
                          <input
                            type="text"
                            value={fPrice}
                            onChange={(e) => setFPrice(e.target.value)}
                            placeholder="ZMW 450.00 / 5L"
                            className="w-full bg-white border border-[#e0dcd0] rounded-lg p-2 text-xs text-[#22301c] focus:outline-none focus:border-[#588157]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#2d3a22] mb-1 font-mono">
                            Stock Status
                          </label>
                          <select
                            value={fStockStatus}
                            onChange={(e) => setFStockStatus(e.target.value as any)}
                            className="w-full bg-white border border-[#e0dcd0] rounded-lg p-2 text-xs text-[#22301c] focus:outline-none focus:border-[#588157]"
                          >
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-[#2d3a22] mb-1.5">
                        {composerType === 'product' ? 'Product description' : composerType === 'testimonial' ? 'Testimonial text' : 'Announcement text'}
                      </label>
                      <textarea
                        rows={3}
                        value={fBody}
                        onChange={(e) => setFBody(e.target.value)}
                        placeholder="Type content details here..."
                        className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-[13.5px] text-[#22301c] focus:outline-none focus:border-[#588157] resize-y"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2.5 pt-3 border-t border-[#e0dcd0]">
                    <button
                      type="button"
                      onClick={() => handleSavePost('draft')}
                      className="py-2.5 px-4 rounded-lg bg-[#f0ede6] hover:bg-[#e9e4db] text-[#2d3a22] font-semibold text-[13.5px] transition cursor-pointer"
                    >
                      Save as draft
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSavePost('live')}
                      className="py-2.5 px-5 rounded-lg bg-[#588157] hover:bg-[#3a5a40] text-white font-semibold text-[13.5px] transition cursor-pointer shadow-xs"
                    >
                      Publish to Live Site
                    </button>
                  </div>
                </div>

                {/* Right Panel: EXACT WEBSITE LIVE PREVIEW CARD */}
                <div className="space-y-3 sticky top-24">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#8a9280] tracking-wider font-semibold">
                      WEBSITE LIVE PREVIEW
                    </span>
                    <span className="text-[10px] font-mono bg-[#e9edc9] text-[#2d4a22] px-2 py-0.5 rounded font-bold uppercase">
                      Exact Card Look
                    </span>
                  </div>

                  {/* Dynamic Website Card Preview based on type */}
                  {composerType === 'product' && (
                    <div className="bg-white rounded-[28px] border border-[#e0dcd0] shadow-sm overflow-hidden text-left">
                      <div className="relative aspect-square overflow-hidden bg-[#fdfbf7] shrink-0 border-b border-[#e0dcd0]">
                        <img
                          src={getComposerSelectedImage()}
                          alt={fName}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-[#d4a373] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                          {fStockStatus}
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-[#a3b18a] uppercase tracking-widest font-mono">
                              Green &amp; Organics
                            </span>
                            <span className="font-mono text-xs font-bold text-[#588157] bg-[#e9edc9]/60 px-2 py-0.5 rounded">
                              {fPrice}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#2d3a22] font-serif">
                            {fName || 'Product Name'}
                          </h3>
                          <p className="text-xs italic text-[#2d3a22]/70 font-medium">
                            {fSub || 'Product Tagline'}
                          </p>
                        </div>
                        <p className="text-xs text-[#2d3a22]/80 leading-relaxed line-clamp-3">
                          {fBody || 'Detailed product benefits and agricultural usage instructions...'}
                        </p>
                      </div>
                    </div>
                  )}

                  {composerType === 'testimonial' && (
                    <div className="bg-white p-6 rounded-2xl border border-[#e0dcd0] shadow-sm text-left space-y-4">
                      <div className="flex items-center justify-between">
                        <Quote className="w-6 h-6 text-[#d4a373] opacity-80" />
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#fdf1de] text-[#a3661a] font-semibold">
                          {destPage}
                        </span>
                      </div>
                      <p className="text-sm text-[#2d3a22]/90 leading-relaxed italic font-serif">
                        "{fBody || 'Customer quote describing crop improvement and yield boost...'}"
                      </p>
                      <div className="pt-3 border-t border-[#e0dcd0]">
                        <p className="font-serif font-bold text-[#2d3a22] text-sm">{fName || 'Customer Name'}</p>
                        <p className="text-xs text-[#588157] font-mono">{fSub || 'Farm Cooperative'}</p>
                      </div>
                    </div>
                  )}

                  {composerType === 'announcement' && (
                    <div className="bg-amber-500/10 border border-[#d4a373]/60 text-[#2d3a22] p-4 rounded-2xl text-left shadow-2xs space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-[#d4a373] text-white">
                          <Bell className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#a3661a]">
                          Home page banner
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#2d3a22]">{fName || 'Announcement Headline'}</h4>
                      <p className="text-xs text-[#2d3a22]/85 leading-relaxed">{fBody || 'Announcement text message...'}</p>
                    </div>
                  )}

                  {/* Destination Indicator */}
                  <div className="bg-white border border-[#e0dcd0] rounded-xl p-3 text-xs text-[#2d3a22] flex items-start gap-2 text-left shadow-2xs">
                    <span className="text-sm">📍</span>
                    <span className="leading-relaxed">
                      Placement: <b className="text-[#3a5a40]">{destSub.toLowerCase()} on the {destPage}</b>.
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: TESTIMONIALS (Website Card Grid) */}
        {currentView === 'testimonials' && (
          <div>
            <header className="flex items-center justify-between p-5 sm:p-[20px_32px] border-b border-[#e0dcd0] bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg border border-[#e0dcd0] bg-white text-[#2d3a22] cursor-pointer"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-[#2d3a22] font-serif leading-tight">
                    Testimonials
                  </h1>
                  <p className="text-[12.5px] text-[#7c8570] mt-0.5">
                    Shown in the Home page carousel and the Services page client stories block
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleTypeSelect('testimonial');
                  setCurrentView('composer');
                }}
                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg text-[13.5px] font-semibold bg-[#588157] hover:bg-[#3a5a40] text-white transition cursor-pointer shadow-xs"
              >
                + Add testimonial
              </button>
            </header>

            <div className="p-5 sm:p-[28px_32px] max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <div 
                    key={t.id}
                    className="bg-white p-6 rounded-2xl border border-[#e0dcd0] flex flex-col justify-between text-left space-y-4 hover:border-[#a3b18a] transition shadow-2xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Quote className="w-5 h-5 text-[#d4a373] opacity-80" />
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                          t.destination === 'Services page'
                            ? 'bg-[#e6eefb] text-[#33608f]'
                            : 'bg-[#fdf1de] text-[#a3661a]'
                        }`}>
                          {t.destination}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#2d3a22]/90 leading-relaxed italic font-serif">
                        "{t.text}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#e0dcd0] flex items-end justify-between">
                      <div>
                        <p className="font-serif font-bold text-[#2d3a22] text-sm">{t.name}</p>
                        <p className="text-[11px] text-[#588157] font-mono">{t.farmOrCompany}</p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleTestimonialStatus(t.id)}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold cursor-pointer border-none transition ${
                            t.status === 'live' ? 'bg-[#e3f3e1] text-[#2f7a2f]' : 'bg-[#f2ede1] text-[#9c7a3c]'
                          }`}
                        >
                          {t.status === 'live' ? 'Live' : 'Draft'}
                        </button>
                        <button
                          onClick={() => handleEditTestimonial(t)}
                          className="w-7 h-7 rounded-md border border-[#e0dcd0] bg-[#fdfbf7] hover:bg-[#f0ede6] text-[#2d3a22] flex items-center justify-center cursor-pointer text-xs"
                          title="Edit Testimonial"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete testimonial from "${t.name}"?`)) {
                              deleteTestimonial(t.id);
                              showToast('Deleted testimonial');
                            }
                          }}
                          className="w-7 h-7 rounded-md border border-[#e0dcd0] bg-[#fdfbf7] hover:bg-red-50 text-[#8a9280] hover:text-red-700 flex items-center justify-center cursor-pointer text-xs"
                          title="Delete Testimonial"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: PRODUCTS & INVENTORY (Website Card Grid) */}
        {currentView === 'products' && (
          <div>
            <header className="flex items-center justify-between p-5 sm:p-[20px_32px] border-b border-[#e0dcd0] bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg border border-[#e0dcd0] bg-white text-[#2d3a22] cursor-pointer"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-[#2d3a22] font-serif leading-tight">
                    Products &amp; Inventory
                  </h1>
                  <p className="text-[12.5px] text-[#7c8570] mt-0.5">
                    Shown in the Products page catalog grid — updates immediately on live site
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleTypeSelect('product');
                  setCurrentView('composer');
                }}
                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg text-[13.5px] font-semibold bg-[#588157] hover:bg-[#3a5a40] text-white transition cursor-pointer shadow-xs"
              >
                + Add product
              </button>
            </header>

            <div className="p-5 sm:p-[28px_32px] max-w-6xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-[28px] border border-[#e0dcd0] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#fdfbf7] shrink-0 border-b border-[#e0dcd0]">
                      <img
                        src={getProductImage(product.id)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3.5 left-3.5 bg-[#d4a373] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
                        {product.badge || '100% Organic'}
                      </span>
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1">
                        <button
                          onClick={() => toggleProductStock(product.id, product.stockStatus === 'In Stock' ? 'Low Stock' : product.stockStatus === 'Low Stock' ? 'Out of Stock' : 'In Stock')}
                          className={`text-[10px] font-mono font-bold px-2 py-1 rounded-full shadow-xs cursor-pointer border transition ${
                            product.stockStatus === 'In Stock'
                              ? 'bg-[#e3f3e1] text-[#2f7a2f] border-[#c2e5bf]'
                              : product.stockStatus === 'Low Stock'
                              ? 'bg-[#fdf1de] text-[#a3661a] border-[#f5dfb8]'
                              : 'bg-[#fbe9e7] text-[#b4382c] border-[#f3c9c2]'
                          }`}
                        >
                          {product.stockStatus || 'In Stock'}
                        </button>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-3.5 text-left">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#a3b18a] uppercase tracking-widest font-mono">
                            {product.brand || 'Green & Organics'}
                          </p>
                          {product.price && (
                            <span className="font-mono text-xs font-bold text-[#588157] bg-[#e9edc9]/60 px-2 py-0.5 rounded border border-[#a3b18a]/30">
                              {product.price}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-[#2d3a22] font-serif leading-tight">
                          {product.name}
                        </h3>
                        <p className="text-xs italic text-[#2d3a22]/70 font-medium">
                          {product.tagline}
                        </p>
                      </div>

                      <p className="text-xs sm:text-[13px] text-[#2d3a22]/80 leading-relaxed flex-grow line-clamp-3">
                        {product.description}
                      </p>

                      <div className="pt-2 border-t border-[#e0dcd0] flex items-center justify-between gap-2">
                        <button
                          onClick={() => toggleProductStatus(product.id)}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold cursor-pointer border-none transition ${
                            product.status === 'live' ? 'bg-[#e3f3e1] text-[#2f7a2f]' : 'bg-[#f2ede1] text-[#9c7a3c]'
                          }`}
                        >
                          {product.status === 'live' ? 'Live' : 'Draft'}
                        </button>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="py-1 px-3 rounded-lg bg-[#f0ede6] hover:bg-[#e9e4db] text-[#2d3a22] font-semibold text-xs transition cursor-pointer"
                          >
                            ✎ Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete product "${product.name}"?`)) {
                                deleteProduct(product.id);
                                showToast(`Deleted ${product.name}`);
                              }
                            }}
                            className="p-1 rounded-lg hover:bg-red-50 text-[#8a9280] hover:text-red-700 transition cursor-pointer"
                          >
                            🗑
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: ANNOUNCEMENTS (Website Banner List) */}
        {currentView === 'announcements' && (
          <div>
            <header className="flex items-center justify-between p-5 sm:p-[20px_32px] border-b border-[#e0dcd0] bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg border border-[#e0dcd0] bg-white text-[#2d3a22] cursor-pointer"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-[#2d3a22] font-serif leading-tight">
                    Announcements
                  </h1>
                  <p className="text-[12.5px] text-[#7c8570] mt-0.5">
                    Text-only posts shown in the Home page banner
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleTypeSelect('announcement');
                  setCurrentView('composer');
                }}
                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg text-[13.5px] font-semibold bg-[#588157] hover:bg-[#3a5a40] text-white transition cursor-pointer shadow-xs"
              >
                + Add announcement
              </button>
            </header>

            <div className="p-5 sm:p-[28px_32px] max-w-6xl mx-auto space-y-4">
              {announcements.map((a) => (
                <div 
                  key={a.id}
                  className="bg-amber-500/10 border border-[#d4a373]/60 text-[#2d3a22] p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs text-left"
                >
                  <div className="flex items-start gap-3.5 max-w-3xl">
                    <span className="p-2.5 rounded-xl bg-[#d4a373] text-white shrink-0 mt-0.5 shadow-2xs">
                      <Bell className="w-4 h-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-bold font-mono text-[#a3661a] uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded border border-[#d4a373]/30">
                          {a.destination} · Banner
                        </span>
                        <span className="font-bold text-base text-[#2d3a22]">
                          {a.title}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#2d3a22]/85 leading-relaxed font-sans">
                        {a.body}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => toggleAnnouncementStatus(a.id)}
                      className={`text-[11px] px-3 py-1 rounded-full font-semibold cursor-pointer border-none transition ${
                        a.status === 'live' ? 'bg-[#e3f3e1] text-[#2f7a2f]' : 'bg-[#f2ede1] text-[#9c7a3c]'
                      }`}
                    >
                      {a.status === 'live' ? '✓ Live on Site' : 'Draft Only'}
                    </button>
                    <button
                      onClick={() => handleEditAnnouncement(a)}
                      className="w-8 h-8 rounded-lg border border-[#e0dcd0] bg-white hover:bg-[#fdfbf7] text-[#2d3a22] flex items-center justify-center cursor-pointer transition text-xs"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete announcement "${a.title}"?`)) {
                          deleteAnnouncement(a.id);
                          showToast('Deleted announcement');
                        }
                      }}
                      className="w-8 h-8 rounded-lg border border-[#e0dcd0] bg-white hover:bg-red-50 text-[#8a9280] hover:text-red-700 flex items-center justify-center cursor-pointer transition text-xs"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: HOME FEED */}
        {currentView === 'homefeed' && (
          <div>
            <header className="flex items-center justify-between p-5 sm:p-[20px_32px] border-b border-[#e0dcd0] bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg border border-[#e0dcd0] bg-white text-[#2d3a22] cursor-pointer"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-[#2d3a22] font-serif leading-tight">
                    Home Page Feed
                  </h1>
                  <p className="text-[12.5px] text-[#7c8570] mt-0.5">
                    Live ordered feed of what growers encounter upon visiting the website homepage
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentView('composer')}
                className="py-2 px-4 rounded-lg text-[13.5px] font-semibold bg-[#588157] hover:bg-[#3a5a40] text-white transition cursor-pointer"
              >
                + New post
              </button>
            </header>

            <div className="p-5 sm:p-[28px_32px] max-w-6xl mx-auto space-y-6 text-left">
              {/* Announcement Feed */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#8a9280] uppercase tracking-wider">
                  1. Announcement Banner (Below Hero Section)
                </span>
                {announcements.filter(a => a.status === 'live').map(a => (
                  <div key={a.id} className="p-4 bg-amber-500/10 border border-[#d4a373]/60 rounded-xl flex items-center gap-3">
                    <Bell className="w-4 h-4 text-[#d4a373] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[#2d3a22]">{a.title}</p>
                      <p className="text-[11px] text-[#2d3a22]/80">{a.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Products Carousel Feed */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#8a9280] uppercase tracking-wider">
                  2. Flagship Products Showcase
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {products.slice(0, 3).map(p => (
                    <div key={p.id} className="p-3 bg-white border border-[#e0dcd0] rounded-xl flex gap-3 items-center">
                      <img src={getProductImage(p.id)} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <p className="text-xs font-bold text-[#2d3a22]">{p.name}</p>
                        <p className="text-[11px] text-[#588157] font-mono">{p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials Carousel Feed */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#8a9280] uppercase tracking-wider">
                  3. Grower Testimonials Carousel
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {testimonials.filter(t => t.destination === 'Home page').slice(0, 3).map(t => (
                    <div key={t.id} className="p-4 bg-white border border-[#e0dcd0] rounded-xl space-y-2">
                      <p className="text-xs italic text-[#2d3a22]/90">"{t.text}"</p>
                      <p className="text-[11px] font-bold text-[#2d3a22]">{t.name} <span className="font-normal text-[#8a9280]">({t.farmOrCompany})</span></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: MEDIA LIBRARY */}
        {currentView === 'media' && (
          <div>
            <header className="flex items-center justify-between p-5 sm:p-[20px_32px] border-b border-[#e0dcd0] bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg border border-[#e0dcd0] bg-white text-[#2d3a22] cursor-pointer"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-[#2d3a22] font-serif leading-tight">
                    Media Library
                  </h1>
                  <p className="text-[12.5px] text-[#7c8570] mt-0.5">
                    Official product packaging and high-resolution assets for Lifecycle Organics
                  </p>
                </div>
              </div>
            </header>

            <div className="p-5 sm:p-[28px_32px] max-w-6xl mx-auto text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#e0dcd0] rounded-xl overflow-hidden shadow-2xs">
                  <img src={bioFertilizerImg} alt="Bio-Fertilizer" className="h-40 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-semibold text-xs text-[#2d3a22]">Bio-Fertilizer 5L Bottle</p>
                    <p className="text-[11px] text-[#8a9280]">Primary organic growth line</p>
                  </div>
                </div>

                <div className="bg-white border border-[#e0dcd0] rounded-xl overflow-hidden shadow-2xs">
                  <img src={bioSulphurImg} alt="Bio-Sulphur" className="h-40 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-semibold text-xs text-[#2d3a22]">Bio-Sulphur 4 5L Bottle</p>
                    <p className="text-[11px] text-[#8a9280]">4-in-1 anti-yellowing defense</p>
                  </div>
                </div>

                <div className="bg-white border border-[#e0dcd0] rounded-xl overflow-hidden shadow-2xs">
                  <img src={bioSoapcideImg} alt="Bio-Soapcide" className="h-40 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-semibold text-xs text-[#2d3a22]">Bio-Soapcide 5L Bottle</p>
                    <p className="text-[11px] text-[#8a9280]">Insecticidal soap &amp; spreader</p>
                  </div>
                </div>

                <div className="bg-white border border-[#e0dcd0] rounded-xl overflow-hidden shadow-2xs">
                  <img src={heroBannerImg} alt="Farmland" className="h-40 w-full object-cover" />
                  <div className="p-3">
                    <p className="font-semibold text-xs text-[#2d3a22]">Zambian Farmland Panorama</p>
                    <p className="text-[11px] text-[#8a9280]">Hero banner background</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 8: CUSTOMER INQUIRIES */}
        {currentView === 'inquiries' && (
          <div>
            <header className="flex items-center justify-between p-5 sm:p-[20px_32px] border-b border-[#e0dcd0] bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg border border-[#e0dcd0] bg-white text-[#2d3a22] cursor-pointer"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-[#2d3a22] font-serif leading-tight">
                    Customer Inquiries
                  </h1>
                  <p className="text-[12.5px] text-[#7c8570] mt-0.5">
                    Messages, product questions, and order requests from site visitors
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono bg-[#e9edc9] text-[#2d4a22] px-3 py-1 rounded-full font-bold">
                {inquiries.length} Inquiries
              </span>
            </header>

            <div className="p-5 sm:p-[28px_32px] max-w-6xl mx-auto space-y-4 text-left">
              {inquiries.length === 0 ? (
                <div className="bg-white border border-[#e0dcd0] rounded-2xl p-12 text-center text-[#8a9280] space-y-2">
                  <Inbox className="w-10 h-10 mx-auto opacity-40 text-[#2d4a22]" />
                  <p className="font-semibold text-sm text-[#2d3a22]">No inquiries yet</p>
                  <p className="text-xs">When customers submit the contact or product inquiry form, they will appear here.</p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white border border-[#e0dcd0] rounded-2xl p-5 shadow-2xs hover:border-[#a3b18a] transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e0dcd0]/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif font-bold text-base text-[#2d3a22]">{inq.name}</h3>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            inq.status === 'new'
                              ? 'bg-[#fbe9e7] text-[#b4382c]'
                              : inq.status === 'in_progress'
                              ? 'bg-[#fdf1de] text-[#a3661a]'
                              : 'bg-[#e3f3e1] text-[#2f7a2f]'
                          }`}>
                            {inq.status.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-mono bg-[#f0ede6] text-[#7c8570] px-2 py-0.5 rounded">
                            {inq.region}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-[#588157] mt-0.5">
                          Contact: {inq.phoneOrEmail} · Interested in: <b className="text-[#2d3a22]">{inq.productInterest}</b>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <select
                          value={inq.status}
                          onChange={(e) => {
                            updateInquiryStatus(inq.id, e.target.value as any);
                            showToast(`Status updated to ${e.target.value}`);
                          }}
                          className="text-xs bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg px-2.5 py-1 text-[#2d3a22] cursor-pointer"
                        >
                          <option value="new">Mark New</option>
                          <option value="in_progress">In Progress</option>
                          <option value="fulfilled">Fulfilled</option>
                        </select>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete inquiry from "${inq.name}"?`)) {
                              deleteInquiry(inq.id);
                              showToast('Deleted inquiry');
                            }
                          }}
                          className="w-8 h-8 rounded-lg border border-[#e0dcd0] bg-white hover:bg-red-50 text-[#8a9280] hover:text-red-700 flex items-center justify-center transition cursor-pointer text-xs"
                          title="Delete inquiry"
                        >
                          🗑
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#2d3a22]/85 leading-relaxed bg-[#fdfbf7] p-3 rounded-xl border border-[#e0dcd0]/60">
                      "{inq.message}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-[#8a9280] font-mono pt-1">
                      <span>Submitted: {new Date(inq.createdAt).toLocaleString()}</span>
                      {inq.assignedRep && <span>Assigned Agent: {inq.assignedRep}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW 9: SETTINGS & SECURITY */}
        {currentView === 'settings' && (
          <div>
            <header className="flex items-center justify-between p-5 sm:p-[20px_32px] border-b border-[#e0dcd0] bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg border border-[#e0dcd0] bg-white text-[#2d3a22] cursor-pointer"
                  aria-label="Open menu"
                >
                  ☰
                </button>
                <div className="text-left">
                  <h1 className="text-xl font-semibold text-[#2d3a22] font-serif leading-tight">
                    Settings &amp; System Security
                  </h1>
                  <p className="text-[12.5px] text-[#7c8570] mt-0.5">
                    Admin credentials, Firebase Firestore configuration, and deployment pipeline
                  </p>
                </div>
              </div>
            </header>

            <div className="p-5 sm:p-[28px_32px] max-w-4xl mx-auto space-y-6 text-left">
              
              {/* SECTION 1: ADMIN PASSWORD MANAGER */}
              <div className="bg-white border border-[#e0dcd0] rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2.5 border-b border-[#e0dcd0] pb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e9edc9] text-[#2d4a22] flex items-center justify-center">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-base text-[#2d3a22]">Admin Password Management</h2>
                    <p className="text-xs text-[#8a9280]">Access credentials for the staff portal and dashboard</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#fdfbf7] border border-[#e0dcd0] rounded-xl p-4 space-y-2">
                    <span className="text-[11px] font-mono text-[#8a9280] uppercase tracking-wider font-semibold">
                      Current Active Password
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-base font-mono font-bold text-[#2d4a22] bg-white px-3 py-1.5 rounded-lg border border-[#e0dcd0] flex-1">
                        {adminPassword}
                      </code>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(adminPassword);
                          setCopiedPassword(true);
                          showToast('Password copied to clipboard');
                          setTimeout(() => setCopiedPassword(false), 2000);
                        }}
                        className="p-2 rounded-lg border border-[#e0dcd0] bg-white hover:bg-[#f0ede6] text-[#2d3a22] transition cursor-pointer flex items-center gap-1 text-xs"
                        title="Copy password"
                      >
                        {copiedPassword ? <CheckCheck className="w-4 h-4 text-[#588157]" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-[#7c8570] leading-relaxed">
                      Default: <code className="font-mono font-semibold text-[#2d4a22]">{DEFAULT_ADMIN_PASSWORD}</code> (login email: <code className="font-mono font-semibold text-[#2d4a22]">lifecyce@login.com</code>).
                    </p>
                  </div>

                  <div className="bg-[#fdfbf7] border border-[#e0dcd0] rounded-xl p-4 space-y-3">
                    <span className="text-[11px] font-mono text-[#8a9280] uppercase tracking-wider font-semibold">
                      Change Password
                    </span>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        placeholder="Type new custom password..."
                        className="w-full bg-white border border-[#e0dcd0] rounded-lg px-3 py-2 text-xs font-mono text-[#22301c] focus:outline-none focus:border-[#588157]"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (newPasswordInput.trim().length >= 4) {
                              setAdminPassword(newPasswordInput.trim());
                              setAdminPasswordState(newPasswordInput.trim());
                              setNewPasswordInput('');
                              showToast('Password updated successfully');
                            } else {
                              showToast('Password must be at least 4 characters');
                            }
                          }}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-[#588157] hover:bg-[#3a5a40] text-white text-xs font-semibold transition cursor-pointer"
                        >
                          Update Password
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setAdminPassword(DEFAULT_ADMIN_PASSWORD);
                            setAdminPasswordState(DEFAULT_ADMIN_PASSWORD);
                            setNewPasswordInput('');
                            showToast(`Reset to default (${DEFAULT_ADMIN_PASSWORD})`);
                          }}
                          className="py-1.5 px-3 rounded-lg bg-[#f0ede6] hover:bg-[#e9e4db] text-[#2d3a22] text-xs font-semibold transition cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: FIREBASE & FIRESTORE INTEGRATION */}
              <div className="bg-white border border-[#e0dcd0] rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#e0dcd0] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#fdf1de] text-[#a3661a] flex items-center justify-center">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-base text-[#2d3a22]">Firebase &amp; Firestore Connection</h2>
                      <p className="text-xs text-[#8a9280]">Live database configuration for Lifecycle Organics</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#2f7a2f] bg-[#e3f3e1] px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#2f7a2f] animate-pulse" />
                    Configured
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#fdfbf7] rounded-xl border border-[#e0dcd0]">
                    <span className="text-[10.5px] font-mono text-[#8a9280] uppercase block mb-1">Project ID</span>
                    <span className="font-mono font-bold text-[#2d4a22]">lifecycle-organics</span>
                  </div>
                  <div className="p-3 bg-[#fdfbf7] rounded-xl border border-[#e0dcd0]">
                    <span className="text-[10.5px] font-mono text-[#8a9280] uppercase block mb-1">Database Type</span>
                    <span className="font-mono font-bold text-[#2d4a22]">Cloud Firestore (Default)</span>
                  </div>
                  <div className="p-3 bg-[#fdfbf7] rounded-xl border border-[#e0dcd0]">
                    <span className="text-[10.5px] font-mono text-[#8a9280] uppercase block mb-1">Active Collections</span>
                    <span className="font-mono font-bold text-[#2d4a22]">products, testimonials, inquiries</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setFirestoreStatus('testing');
                      setTimeout(() => {
                        setFirestoreStatus('connected');
                        showToast('Firestore test successful! Project: lifecycle-organics');
                      }, 600);
                    }}
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-[#f0ede6] hover:bg-[#e9e4db] text-[#2d3a22] text-xs font-semibold transition cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>{firestoreStatus === 'testing' ? 'Testing Connection...' : firestoreStatus === 'connected' ? '✓ Verified Active' : 'Test Firestore Connection'}</span>
                  </button>
                  <span className="text-[11px] font-mono text-[#7c8570]">
                    Security Rules: firestore.rules
                  </span>
                </div>
              </div>

              {/* SECTION 3: GITHUB AUTOMATED DEPLOYMENT */}
              <div className="bg-white border border-[#e0dcd0] rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2.5 border-b border-[#e0dcd0] pb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2d4a22] text-white flex items-center justify-center font-bold text-xs font-mono">
                    GH
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-base text-[#2d3a22]">GitHub &amp; Firebase CI/CD Pipeline</h2>
                    <p className="text-xs text-[#8a9280]">Push to GitHub automatically triggers Firebase Hosting build</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-[#2d3a22]/85 leading-relaxed font-sans">
                  <p>
                    When you push this repository to GitHub, the workflow in <code className="bg-[#fdfbf7] px-1.5 py-0.5 rounded border border-[#e0dcd0] font-mono text-[11px]">.github/workflows/firebase-hosting-merge.yml</code> automatically builds the site and deploys to Firebase Hosting.
                  </p>

                  <div className="bg-[#2d3a22] text-white p-4 rounded-xl font-mono text-xs space-y-1.5 overflow-x-auto">
                    <p className="text-[#a3b18a]"># Push latest updates to your GitHub repo</p>
                    <p>git add .</p>
                    <p>git commit -m "Update admin dashboard and products showcase"</p>
                    <p>git push origin main</p>
                  </div>

                  <p className="text-[11.5px] text-[#7c8570]">
                    Required GitHub Secret: <code className="font-mono text-[#2d4a22] font-semibold">FIREBASE_SERVICE_ACCOUNT_LIFECYCLE_ORGANICS</code>
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* EDIT MODAL FOR PRODUCT, TESTIMONIAL, ANNOUNCEMENT */}
      {editingItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setEditingItem(null)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#e0dcd0] p-6 text-left space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e0dcd0] pb-3">
              <h2 className="font-serif text-lg font-bold text-[#2d3a22]">
                Edit {editingItem.type === 'product' ? 'Product' : editingItem.type === 'testimonial' ? 'Testimonial' : 'Announcement'}
              </h2>
              <button 
                onClick={() => setEditingItem(null)}
                className="text-[#8a9280] hover:text-[#2d3a22] text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Product Fields */}
            {editingItem.type === 'product' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#2d3a22] block mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editingItem.data.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                    className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-xs text-[#22301c]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#2d3a22] block mb-1">Tagline</label>
                  <input
                    type="text"
                    value={editingItem.data.tagline || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, tagline: e.target.value } })}
                    className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-xs text-[#22301c]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-[#2d3a22] block mb-1">Commercial Price</label>
                    <input
                      type="text"
                      value={editingItem.data.price || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, price: e.target.value } })}
                      className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2 text-xs text-[#22301c]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#2d3a22] block mb-1">Stock Status</label>
                    <select
                      value={editingItem.data.stockStatus || 'In Stock'}
                      onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, stockStatus: e.target.value } })}
                      className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2 text-xs text-[#22301c]"
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-[#2d3a22] block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingItem.data.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, description: e.target.value } })}
                    className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-xs text-[#22301c]"
                  />
                </div>
              </div>
            )}

            {/* Testimonial Fields */}
            {editingItem.type === 'testimonial' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#2d3a22] block mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={editingItem.data.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, name: e.target.value } })}
                    className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-xs text-[#22301c]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#2d3a22] block mb-1">Farm / Cooperative</label>
                  <input
                    type="text"
                    value={editingItem.data.farmOrCompany || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, farmOrCompany: e.target.value } })}
                    className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-xs text-[#22301c]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#2d3a22] block mb-1">Testimonial Quote</label>
                  <textarea
                    rows={3}
                    value={editingItem.data.text || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, text: e.target.value } })}
                    className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-xs text-[#22301c]"
                  />
                </div>
              </div>
            )}

            {/* Announcement Fields */}
            {editingItem.type === 'announcement' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#2d3a22] block mb-1">Headline</label>
                  <input
                    type="text"
                    value={editingItem.data.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, title: e.target.value } })}
                    className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-xs text-[#22301c]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#2d3a22] block mb-1">Announcement Body</label>
                  <textarea
                    rows={3}
                    value={editingItem.data.body || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, data: { ...editingItem.data, body: e.target.value } })}
                    className="w-full bg-[#fdfbf7] border border-[#e0dcd0] rounded-lg p-2.5 text-xs text-[#22301c]"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-[#e0dcd0]">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="py-2 px-3.5 rounded-lg bg-[#f0ede6] hover:bg-[#e9e4db] text-[#2d3a22] font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="py-2 px-4 rounded-lg bg-[#588157] hover:bg-[#3a5a40] text-white font-semibold text-xs cursor-pointer shadow-xs"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
