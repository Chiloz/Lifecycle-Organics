import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Leaf, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Page } from '../types';
import { LifecycleOrganicsLogo } from './Logos';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scrolling to add translucent background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', value: 'home' as Page },
    { label: 'Products', value: 'products' as Page },
    { label: 'Services', value: 'services' as Page },
    { label: 'About Us', value: 'about' as Page },
    { label: 'Contact', value: 'contact' as Page },
  ];

  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
        isScrolled
          ? 'bg-cream/60 backdrop-blur-xl shadow-sm/30 py-3 border-sand/40'
          : 'bg-cream/20 backdrop-blur-md py-4 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 transition"
            id="header-logo-btn"
          >
            <LifecycleOrganicsLogo
              className="h-11"
              showText={true}
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activePage === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-cream shadow-md'
                      : 'text-secondary hover:text-primary hover:bg-taupe/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-md bg-primary hover:bg-forest text-cream transition duration-200 cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5" />
              Get in Touch
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg focus:outline-none cursor-pointer text-secondary hover:bg-taupe/50"
              id="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (translucent backdrop) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 top-[60px] bg-secondary/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Panel */}
      <div
        id="mobile-nav-panel"
        className={`md:hidden fixed top-[60px] right-0 w-4/5 max-w-sm h-screen bg-cream shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-5 py-6 space-y-4 flex flex-col h-full bg-cream/95">
          <div className="pb-4 border-b border-sand">
            <p className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-2">
              <Leaf className="h-3 w-3 text-leaf" /> Complete Nutrition
            </p>
            <p className="text-xs text-secondary/70 leading-relaxed">
              Sustainable agriculture solutions for higher crop yields.
            </p>
          </div>

          <div className="space-y-1.5 flex-grow">
            {navItems.map((item) => {
              const isActive = activePage === item.value;
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-secondary hover:bg-taupe hover:text-primary'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Leaf className="h-4 w-4" />}
                </button>
              );
            })}
          </div>

          {/* Contact Details at bottom of Mobile nav */}
          <div className="pt-4 border-t border-sand pb-20 space-y-3">
            <p className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-leaf" /> 100% Sustainable &amp; Safe
            </p>
            <a
              href="mailto:lifecycleorganics@yahoo.com"
              className="block text-sm text-secondary/80 hover:text-primary font-mono"
            >
              lifecycleorganics@yahoo.com
            </a>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-forest text-white font-semibold text-sm shadow-md transition"
            >
              <Phone className="h-4 w-4" />
              Contact Regional Agents
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
