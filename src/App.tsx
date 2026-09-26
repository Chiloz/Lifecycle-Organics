import { useState, useEffect } from 'react';
import { Page, Product, SalesRep, Testimonial, Announcement } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { ProductsView } from './components/ProductsView';
import { ContactView } from './components/ContactView';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { 
  getProducts, 
  getRepresentatives, 
  getTestimonials, 
  getAnnouncements, 
  getAdminAuth, 
  subscribeToStore 
} from './services/store';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [salesRepresentatives, setSalesRepresentatives] = useState<SalesRep[]>(getRepresentatives());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials());
  const [announcements, setAnnouncements] = useState<Announcement[]>(getAnnouncements());
  const [adminAuth, setAdminAuth] = useState(getAdminAuth());

  // Subscribe to live store updates (products, reps, testimonials, announcements, auth)
  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setProducts(getProducts());
      setSalesRepresentatives(getRepresentatives());
      setTestimonials(getTestimonials());
      setAnnouncements(getAnnouncements());
      setAdminAuth(getAdminAuth());
    });
    return unsubscribe;
  }, []);

  // Synchronize hash with state for browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
      const hash = (rawHash === 'admin' ? 'admin' : rawHash) as Page;
      const validPages: Page[] = ['home', 'products', 'services', 'about', 'contact', 'admin'];
      if (validPages.includes(hash)) {
        if (hash === 'admin' && !getAdminAuth()) {
          setIsLoginModalOpen(true);
          setActivePage('home');
        } else {
          setActivePage(hash);
        }
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when page state changes
  const handlePageChange = (page: Page) => {
    if (page === 'admin' && !getAdminAuth()) {
      setIsLoginModalOpen(true);
      return;
    }
    setActivePage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminLogin = () => {
    if (getAdminAuth()) {
      handlePageChange('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setAdminAuth(getAdminAuth());
    setActivePage('admin');
    window.location.hash = '#/admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If active page is the Admin Dashboard
  if (activePage === 'admin') {
    return (
      <div className="min-h-screen bg-cream font-sans">
        <AdminDashboard
          onBackToSite={() => handlePageChange('home')}
          onLogout={() => handlePageChange('home')}
          setActivePage={handlePageChange}
        />
      </div>
    );
  }

  // Router handler for public site pages
  const renderActiveView = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomeView 
            setActivePage={handlePageChange} 
            products={products}
            testimonials={testimonials}
            announcements={announcements}
          />
        );
      case 'products':
        return <ProductsView products={products} setActivePage={handlePageChange} />;
      case 'services':
        return <ServicesView />;
      case 'about':
        return <AboutView representatives={salesRepresentatives} />;
      case 'contact':
        return <ContactView representatives={salesRepresentatives} />;
      default:
        return (
          <HomeView 
            setActivePage={handlePageChange} 
            products={products}
            testimonials={testimonials}
            announcements={announcements}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream font-sans flex flex-col justify-between selection:bg-moss selection:text-primary">
      
      {/* Discreet Admin Session Indicator when browsing public site */}
      {adminAuth && (
        <div className="bg-secondary text-cream py-1.5 px-4 text-xs font-mono flex items-center justify-between border-b border-forest/80 relative z-50">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] text-sage">Operations Director Session Active</span>
          </div>
          <button
            onClick={() => handlePageChange('admin')}
            className="text-accent-tan hover:text-white font-bold flex items-center gap-1 transition cursor-pointer text-[11px]"
          >
            <span>Open Admin Dashboard</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Shared Header Navigation */}
      <Header activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Page Area */}
      <main id="app-view-container" className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Shared Footer Area with Hidden Login Trigger and Automatic Year */}
      <Footer setActivePage={handlePageChange} onOpenAdminLogin={handleOpenAdminLogin} />

      {/* Hidden Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
