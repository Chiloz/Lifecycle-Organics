import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldAlert, HeartHandshake, Leaf } from 'lucide-react';
import { Page, SalesRep } from '../types';
import { LifecycleOrganicsLogo, GreenOrganicsLogo } from './Logos';

interface FooterProps {
  setActivePage: (page: Page) => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenAdminLogin }) => {
  const currentYear = new Date().getFullYear();

  const representatives: SalesRep[] = [
    { name: 'Stanford', phone: '0767421417', region: 'Copperbelt / NW', avatarColor: 'bg-teal-600' },
    { name: 'Ricky', phone: '0972304539', region: 'Mkushi', avatarColor: 'bg-lime-600' },
    { name: 'Peter', phone: '0973279761', region: 'Lusaka', avatarColor: 'bg-emerald-600' },
    { name: 'Francis', phone: '0760072470', region: 'Central Province', avatarColor: 'bg-green-700' },
  ];

  const handleLinkClick = (page: Page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-secondary text-cream/95 pt-16 pb-8 border-t-4 border-accent-tan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="bg-white/10 p-3 rounded-xl inline-block">
              <LifecycleOrganicsLogo className="h-10 text-white" showText={true} />
            </div>
            <p className="text-sm text-cream/80 leading-relaxed">
              We provide 100% natural and sustainable organic crop nutrition and protection systems for healthier plants and higher yields. Start your crop protection the organic way today.
            </p>
            <div className="pt-2">
              <GreenOrganicsLogo className="h-6" showText={false} />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-wide border-b border-forest pb-2 flex items-center gap-2 font-serif">
              <Leaf className="h-4 w-4 text-accent-tan" />
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-accent-tan transition duration-150 flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3 text-sage" /> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('products')}
                  className="hover:text-accent-tan transition duration-150 flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3 text-sage" /> Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="hover:text-accent-tan transition duration-150 flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3 text-sage" /> Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('about')}
                  className="hover:text-accent-tan transition duration-150 flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3 text-sage" /> About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="hover:text-accent-tan transition duration-150 flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3 text-sage" /> Contact Agents
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Sales Representative Contacts */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="text-lg font-bold text-white tracking-wide border-b border-forest pb-2 flex items-center gap-2 font-serif">
              <HeartHandshake className="h-4 w-4 text-accent-tan" />
              Regional Agents
            </h3>
            <div className="space-y-3">
              {representatives.map((rep, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm">
                  <div className={`h-8 w-8 rounded-full ${rep.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5`}>
                    {rep.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white leading-tight">{rep.name}</p>
                    <p className="text-xs text-sage">{rep.region}</p>
                    <a
                      href={`tel:${rep.phone}`}
                      className="text-xs font-mono text-cream/80 hover:text-white flex items-center gap-1 mt-0.5"
                    >
                      <Phone className="h-3 w-3 text-accent-tan" /> {rep.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Corporate Offices & Mail */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-wide border-b border-forest pb-2 flex items-center gap-2 font-serif">
              <MapPin className="h-4 w-4 text-accent-tan" />
              Contact Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-accent-tan mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Email Address</p>
                  <a
                    href="mailto:lifecycleorganics@yahoo.com"
                    className="hover:text-accent-tan font-mono break-all text-xs text-cream/95"
                  >
                    lifecycleorganics@yahoo.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent-tan mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Coverage</p>
                  <p className="text-xs text-cream/80 leading-relaxed">
                    Copperbelt, North-Western, Mkushi, Lusaka, Central Province, and Nationwide Delivery across Zambia.
                  </p>
                </div>
              </div>
              <div className="bg-forest/40 p-3 rounded-xl border border-forest/50 mt-2">
                <p className="text-xs font-semibold text-accent-tan flex items-center gap-1 mb-1">
                  <ShieldAlert className="h-3.5 w-3.5 text-accent-tan" /> 100% Guaranteed Quality
                </p>
                <p className="text-[11px] text-cream/75">
                  Our organic formulations are certified for safe application on food crops, boosting plants' natural immunities.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-forest/60 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-cream/60 select-text font-mono">
          <p>
            © {currentYear}{' '}
            <button
              type="button"
              id="php-admin-login-btn"
              onClick={onOpenAdminLogin}
              className="hover:text-accent-tan transition-colors duration-150 underline-offset-2 hover:underline font-semibold cursor-pointer text-cream/90 inline-block bg-transparent border-none p-0 font-mono text-[11px]"
              title="Staff Portal"
            >
              Lifecycle Organics Limited
            </button>
            . All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <span>100% Eco-Friendly</span>
            <span>No Synthetic Chemicals</span>
            <span>Proudly Zambian</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
