import React from 'react';
import { ShieldCheck, ChevronRight, Zap, RefreshCw, Layers, TrendingUp, Sparkles, Leaf, Quote, Bell } from 'lucide-react';
import { Page, Product, Testimonial, Announcement } from '../types';
import { GreenOrganicsLogo } from './Logos';

// Image imports
import heroBannerImg from '../assets/images/hero_banner_1783345201244.jpg';
import bioFertilizerImg from '../assets/images/bio_fertilizer_1783345223620.jpg';
import bioSulphurImg from '../assets/images/bio_sulphur_1783345245681.jpg';
import bioSoapcideImg from '../assets/images/bio_soapcide_1783345266462.jpg';

interface HomeViewProps {
  setActivePage: (page: Page) => void;
  products: Product[];
  testimonials?: Testimonial[];
  announcements?: Announcement[];
}

export const HomeView: React.FC<HomeViewProps> = ({ 
  setActivePage, 
  products, 
  testimonials = [], 
  announcements = [] 
}) => {
  // Map our product assets to products
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

  // Filter live announcements & testimonials for Home page
  const liveAnnouncements = announcements.filter(a => a.status === 'live' && a.destination === 'Home page');
  const homeTestimonials = testimonials.filter(t => t.status === 'live' && t.destination === 'Home page');

  return (
    <div className="space-y-20 pb-16 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section id="hero-section" className="relative min-h-screen flex items-center justify-center bg-secondary">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0">
          <img
            src={heroBannerImg}
            alt="Lifecycle Organics Sweeping Farmland"
            className="w-full h-full object-cover opacity-50 filter grayscale-[10%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col justify-center h-full z-10">
          
          {/* Live Announcement Banner (if posted in Admin) */}
          {liveAnnouncements.length > 0 && (
            <div className="mb-6 max-w-2xl bg-amber-500/20 border border-accent-tan/40 text-cream px-4 py-2.5 rounded-2xl backdrop-blur-md flex items-center gap-3 text-left">
              <span className="p-1 rounded-lg bg-accent-tan text-secondary shrink-0">
                <Bell className="w-3.5 h-3.5" />
              </span>
              <div className="text-xs">
                <span className="font-bold text-accent-tan font-mono uppercase tracking-wider mr-1.5">Announcement:</span>
                <span className="text-white font-medium">{liveAnnouncements[0].title}</span>
                <p className="text-cream/80 text-[11px] mt-0.5 line-clamp-1">{liveAnnouncements[0].body}</p>
              </div>
            </div>
          )}

          <div className="max-w-3xl space-y-6 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-sage/20 backdrop-blur-md border border-sage/30 px-4 py-2 rounded-full text-sage text-xs sm:text-sm font-semibold tracking-wider uppercase">
              <Sparkles className="h-4 w-4 animate-spin text-accent-tan" />
              100% Natural, Sustainable &amp; Safe
            </div>

            {/* Main Catchphrase */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-white leading-none">
              Cultivating the <span className="italic font-normal text-accent-tan">Future</span> <br className="hidden sm:inline" /> from the Ground Up.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-cream/90 font-sans max-w-2xl leading-relaxed">
              Ditch synthetic chemicals and protect your crops the natural way. Our premium bio-fertilizers and bio-protectors nourish soils, prevent yellowing, and keep aphids and mites away.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => {
                  setActivePage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-accent-tan hover:bg-accent-tan/90 text-white font-bold text-sm uppercase tracking-wider shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore Products
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                Talk to Regional Agent
              </button>
            </div>

            {/* Mini Contact Summary */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-cream/70">
              <div>
                <p className="text-xs text-accent-tan uppercase font-bold tracking-widest font-mono">Zambia Coverage</p>
                <p className="text-sm font-semibold text-white">Nationwide Delivery</p>
              </div>
              <div>
                <p className="text-xs text-accent-tan uppercase font-bold tracking-widest font-mono">Expert Support</p>
                <p className="text-sm font-semibold text-white">4 Main Regions Served</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-accent-tan uppercase font-bold tracking-widest font-mono">Contact Us</p>
                <p className="text-sm font-semibold text-white">lifecycleorganics@yahoo.com</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Carousel (right under hero section, as specified in Admin design) */}
      {homeTestimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="bg-white rounded-3xl border border-sand shadow-lg p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-sand pb-4">
              <div className="text-left">
                <span className="text-[11px] font-mono font-bold text-forest uppercase tracking-wider">
                  Verified Zambian Growers
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-secondary font-semibold mt-0.5">
                  Real Results from the Field
                </h2>
              </div>
              <span className="text-xs text-secondary/60 font-mono">
                {homeTestimonials.length} Stories Live
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {homeTestimonials.slice(0, 3).map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#fdfbf7] p-5 rounded-2xl border border-sand/80 flex flex-col justify-between text-left space-y-3 hover:border-forest/40 transition"
                >
                  <div className="space-y-2">
                    <Quote className="w-5 h-5 text-accent-tan opacity-70" />
                    <p className="text-xs sm:text-sm text-secondary/90 leading-relaxed italic">
                      "{item.text}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-sand/60">
                    <p className="font-serif font-bold text-secondary text-sm">{item.name}</p>
                    <p className="text-[11px] text-forest font-mono">{item.farmOrCompany}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. Brand Core Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center">
            <GreenOrganicsLogo className="h-10" showText={true} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-secondary leading-tight">
            Start Your Crop Protection The <span className="italic">Organic Way</span>
          </h2>
          <p className="text-secondary/80">
            Lifecycle Organics specializes in bridging rich nature with modern agricultural demands, boosting root defense and ensuring lush, robust growth safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-taupe/30 hover:bg-taupe/60 p-8 rounded-[32px] border border-sand shadow-sm transition duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-secondary font-serif">100% Organic &amp; Safe</h3>
            <p className="text-sm text-secondary/80 leading-relaxed">
              Formulated purely from nature. Guaranteed safe for crops, local farmers, consumers, livestock, and the surrounding environment.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-taupe/30 hover:bg-taupe/60 p-8 rounded-[32px] border border-sand shadow-sm transition duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-secondary font-serif">Multi-Action Protection</h3>
            <p className="text-sm text-secondary/80 leading-relaxed">
              Provides multi-action defenses serving as a fungicide, pesticide, germicide, and fertilizer to build plants' immune systems.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-taupe/30 hover:bg-taupe/60 p-8 rounded-[32px] border border-sand shadow-sm transition duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-secondary font-serif">Healthier &amp; Larger Crops</h3>
            <p className="text-sm text-secondary/80 leading-relaxed">
              Dramatically enhances chlorophyll formation and protein synthesis, leading to larger, greener leaves and taller corn.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-taupe/30 hover:bg-taupe/60 p-8 rounded-[32px] border border-sand shadow-sm transition duration-300 space-y-4 group">
            <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-secondary font-serif">Enriches Soil Fertility</h3>
            <p className="text-sm text-secondary/80 leading-relaxed">
              Restores natural soil micro-flora, fixes root nitrogen uptake, and maintains stable organic carbon balances for long-term productivity.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Featured Flagship Products */}
      <section className="bg-gradient-to-b from-cream to-taupe/40 py-20 border-y border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div className="space-y-2 text-left">
              <p className="text-primary font-bold tracking-widest uppercase text-xs">Flagship Lineup</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-secondary">
                Complete Crop <span className="italic font-normal">Nutrition &amp; Defense</span>
              </h2>
            </div>
            <button
              onClick={() => {
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-primary font-bold hover:text-forest inline-flex items-center gap-1 group text-sm cursor-pointer"
            >
              View detailed guidelines
              <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-[32px] border border-sand shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-cream shrink-0">
                  <img
                    src={getProductImage(product.id)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-accent-tan text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow space-y-4 text-left">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-sage uppercase tracking-widest font-mono">
                      {product.brand}
                    </p>
                    <h3 className="text-xl font-bold text-secondary group-hover:text-primary font-serif transition">
                      {product.name}
                    </h3>
                    <p className="text-xs italic text-secondary/60 font-medium">
                      {product.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-secondary/80 leading-relaxed flex-grow">
                    {product.description}
                  </p>

                  <div className="pt-2 border-t border-sand flex flex-wrap gap-1.5">
                    {product.features.slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="bg-moss text-primary text-[11px] font-bold px-2.5 py-1 rounded-lg border border-sage/10"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setActivePage('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full mt-4 py-3 rounded-xl bg-taupe/40 hover:bg-primary hover:text-white text-secondary font-bold text-xs uppercase tracking-wider transition-colors duration-200 border border-sand flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    View Specifications
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Crop Improvement - Before/After Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-cream rounded-[40px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          {/* Subtle leaves pattern in background */}
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-20 -translate-y-20">
            <svg className="h-[400px] w-[400px] text-sage" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.58,17.5C8.58,18 9.58,18.5 10.58,19C11.58,19.5 12.58,20 13.58,20.5L14,20.5C14,20.5 14,20.5 14,20.5C18.6,18.2 21.6,14.2 21.6,9C21.6,5.3 19.3,2 15.6,2C13.2,2 10.7,3.3 9,5.3C10.7,3.3 13.2,2 15.6,2C19.3,2 21.6,5.3 21.6,9C21.6,14.2 18.6,18.2 14,20.5M15.6,4C17.8,4 19.6,5.8 19.6,9C19.6,12.7 17.5,15.8 13.9,17.7C12.4,17.1 11,16.3 9.7,15.6C11,14.3 12.3,13 13.6,11.7C14.1,11.2 14.1,10.3 13.6,9.8C13.1,9.3 12.2,9.3 11.7,9.8C10.4,11.1 9.1,12.4 7.8,13.7C6.8,13 5.8,12.3 4.8,11.6C6.7,8.2 10.4,4 15.6,4Z" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual description */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <p className="text-accent-tan font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-1.5">
                <Leaf className="h-3.5 w-3.5" /> Proven Crop Improvement
              </p>
              <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-white leading-tight">
                The Power Of Nature For <span className="italic">Better Yields</span>
              </h2>
              <p className="text-sm sm:text-base text-cream/80 leading-relaxed font-sans">
                Experience the visual transformation of your maize, tomatoes, and vegetables. Our 100% natural formula replaces chemical stress with deep root nourishment and lasting structural vigor.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/10 text-accent-tan flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Stronger Nitrogen Fixation</h4>
                    <p className="text-xs text-cream/70">Increases structural protein synthesis inside leaves.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/10 text-accent-tan flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Prevents Yellowing</h4>
                    <p className="text-xs text-cream/70">Ensures chlorophyll formations develop strongly and safely.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Before / After comparison visual */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-neutral-800 text-left">
              
              {/* Before Card */}
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 space-y-4">
                <span className="bg-white/10 border border-white/20 text-cream/80 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  Deficient crops
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white font-serif">Without Bio-Nutrition</h3>
                  <p className="text-xs text-cream/70 leading-relaxed font-sans">
                    Stunted growth, pale yellow leaves, weak stalks, thin root depth, high vulnerability to aphid swarm attacks, and low crop harvest weight.
                  </p>
                </div>
                <div className="bg-black/20 p-3 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center text-xs font-mono text-cream/80">
                    <span>Root Structure:</span>
                    <span className="font-bold">Shallow</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div className="bg-red-400 h-1.5 w-1/4 rounded-full" />
                  </div>
                </div>
              </div>

              {/* After Card (Moss colored) */}
              <div className="bg-moss text-secondary border border-sage/40 rounded-3xl p-6 space-y-4 relative shadow-lg">
                <span className="bg-primary text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  The Organic Way
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-primary font-serif">After Lifecycle Organics</h3>
                  <p className="text-xs text-secondary/80 leading-relaxed font-sans">
                    Vibrant deep-green leaves, rapid healthy growth, thick stalks, extensive strong roots, full resistance to pests, and much heavier yields.
                  </p>
                </div>
                <div className="bg-white/50 p-3 rounded-xl border border-sage/20">
                  <div className="flex justify-between items-center text-xs font-mono text-primary">
                    <span>Root Structure:</span>
                    <span className="font-bold">Extensive &amp; Deep</span>
                  </div>
                  <div className="w-full bg-sage/30 h-1.5 rounded-full mt-1 overflow-hidden">
                    <div className="bg-primary h-1.5 w-full rounded-full" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Quick CTA Call To Action */}
      <section className="bg-butter border-y border-sand py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif text-secondary leading-tight">
            Ready to secure healthier yields and boost crop defenses?
          </h2>
          <p className="text-secondary/70 max-w-2xl mx-auto text-sm sm:text-base font-sans">
            Reach out directly to our authorized regional sales representatives in Lusaka, Mkushi, Copperbelt, and Central Province for product catalogs, pricing, and advice.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3 rounded-full bg-primary hover:bg-forest text-white font-bold text-sm uppercase tracking-wider shadow-md transition cursor-pointer"
            >
              Contact Local Agents
            </button>
            <button
              onClick={() => {
                setActivePage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3 rounded-full bg-white hover:bg-taupe text-secondary font-bold text-sm uppercase tracking-wider border border-sand shadow-sm transition cursor-pointer"
            >
              Our Consultancy Services
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
