import React, { useState } from 'react';
import { Check, ShieldCheck, HelpCircle, FileText, Settings, Heart, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

// Image imports
import bioFertilizerImg from '../assets/images/bio_fertilizer_1783345223620.jpg';
import bioSulphurImg from '../assets/images/bio_sulphur_1783345245681.jpg';
import bioSoapcideImg from '../assets/images/bio_soapcide_1783345266462.jpg';

interface ProductsViewProps {
  products: Product[];
  setActivePage: (page: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ products, setActivePage }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('bio-fertilizer');

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

  const activeProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <div className="space-y-16 pb-16 pt-24">
      
      {/* Title Header */}
      <section className="bg-secondary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
          <p className="text-accent-tan font-bold uppercase tracking-widest text-xs font-mono">
            Organic Product Lineup
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
            Green &amp; <span className="italic font-normal">Organics Catalog</span>
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our specialized product line is engineered for high efficacy, rapid absorption, and 100% natural crop preservation. Click on any product below to view detailed specs.
          </p>
        </div>
      </section>

      {/* Product Switcher buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {products.map((p) => {
            const isSelected = p.id === selectedProductId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white hover:bg-taupe/40 text-secondary border border-sand'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Detailed Product Card */}
        <div className="bg-white rounded-[32px] border border-sand shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Product Image */}
            <div className="lg:col-span-5 relative aspect-square bg-cream min-h-[300px]">
              <img
                src={getProductImage(activeProduct.id)}
                alt={activeProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-6 left-6 bg-accent-tan text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                {activeProduct.badge}
              </span>
            </div>

            {/* Right: Technical Details */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 space-y-8 flex flex-col justify-between">
              
              {/* Product Header */}
              <div className="space-y-3 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sage uppercase tracking-widest font-mono">
                    {activeProduct.brand}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    {activeProduct.stockStatus && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        activeProduct.stockStatus === 'Out of Stock'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : activeProduct.stockStatus === 'Low Stock'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        ● {activeProduct.stockStatus}
                      </span>
                    )}
                    {activeProduct.price && (
                      <span className="text-xs font-bold text-accent-tan bg-forest/10 px-2.5 py-0.5 rounded-full border border-forest/20">
                        {activeProduct.price}
                      </span>
                    )}
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-secondary tracking-tight leading-tight">
                  {activeProduct.name}
                </h2>
                <p className="text-sm italic font-medium text-accent-tan">
                  "{activeProduct.tagline}"
                </p>
                <p className="text-sm sm:text-base text-secondary/80 leading-relaxed pt-2">
                  {activeProduct.description}
                </p>
              </div>

              {/* Benefits & Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-sand text-left">
                
                {/* Benefits */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    {activeProduct.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-secondary/85">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features / Marketing */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
                    <Settings className="h-4 w-4 text-primary" /> Key Features
                  </h4>
                  <ul className="space-y-2">
                    {activeProduct.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-secondary/85">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Technical Specifications */}
              <div className="p-5 bg-moss/40 rounded-2xl border border-sage/20 space-y-3 text-left">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-primary" /> Technical Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans text-secondary/90">
                  {activeProduct.specs.map((s, i) => {
                    const [key, val] = s.split(': ');
                    return (
                      <div key={i} className="space-y-0.5">
                        <span className="font-semibold text-secondary/60 block text-[10px] uppercase tracking-wide">
                          {key}
                        </span>
                        <span className="font-bold text-primary">{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Usage & Application Guidelines */}
              <div className="p-5 bg-taupe/30 rounded-2xl border border-sand space-y-2 text-left">
                <h4 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-primary" /> Application Guidelines
                </h4>
                <p className="text-xs text-secondary/80 leading-relaxed font-sans">
                  {activeProduct.usage}
                </p>
              </div>

              {/* CTA Section */}
              <div className="pt-6 border-t border-sand flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
                <div className="text-left">
                  <p className="text-xs text-secondary/60">Contact regional agent to order:</p>
                  <p className="text-sm font-bold text-secondary font-serif">Packaged in durable 5L canisters</p>
                </div>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-primary hover:bg-forest text-white font-bold text-xs uppercase tracking-wider shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Order from Authorized Reps
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Helpful Crop Protection Advice segment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-butter rounded-[32px] p-8 sm:p-10 border border-sand grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xl font-serif text-secondary flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Agronomic Safety Tip
            </h3>
            <p className="text-xs sm:text-sm text-secondary/80 leading-relaxed">
              When applying **Bio-Soapcide** or **Bio-Sulphur**, it is best to spray early in the morning or late in the evening. Spraying under full, hot mid-day sun may cause the natural formulation to dry out too quickly before the leaf surfaces fully absorb the active nutrition, reducing overall efficacy.
            </p>
          </div>

          <div className="lg:col-span-4 text-right">
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full lg:w-auto px-6 py-3 rounded-full bg-white hover:bg-taupe text-secondary font-bold text-xs uppercase tracking-wider border border-sand shadow-sm transition cursor-pointer"
            >
              Ask Our Experts
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
