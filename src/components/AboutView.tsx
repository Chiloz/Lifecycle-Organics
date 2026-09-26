import React from 'react';
import { Phone, Mail, Award, Target, Eye, Users, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SalesRep } from '../types';

interface AboutViewProps {
  representatives: SalesRep[];
}

export const AboutView: React.FC<AboutViewProps> = ({ representatives }) => {
  return (
    <div className="space-y-20 pb-16 pt-24">
      
      {/* Page Title & Intro */}
      <section className="bg-secondary text-white py-16 relative overflow-hidden">
        {/* Decorative backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
          <p className="text-accent-tan font-bold uppercase tracking-widest text-xs font-mono">
            Get To Know Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
            About <span className="italic font-normal">Lifecycle Organics</span>
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Leading the charge for ecological agricultural reform in Zambia. We empower local farmers and commercial growers with 100% natural, multi-action bio-nutrition.
          </p>
        </div>
      </section>

      {/* Corporate Philosophy: Vision & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Mission Card */}
          <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-sand shadow-sm flex items-start gap-5 relative overflow-hidden group hover:shadow-md transition duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <div className="h-12 w-12 rounded-2xl bg-moss/40 text-primary flex items-center justify-center shrink-0">
              <Target className="h-6 w-6" />
            </div>
            <div className="space-y-3 text-left">
              <h3 className="text-2xl font-serif font-bold text-secondary">Our Mission</h3>
              <p className="text-sm text-secondary/80 leading-relaxed font-sans">
                To engineer and distribute high-yield, 100% natural crop health and soil enhancement products. We aim to replace toxic, synthetic chemical runoffs with safe, organic, and ecologically stable crop protection to boost harvests nationwide.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-sand shadow-sm flex items-start gap-5 relative overflow-hidden group hover:shadow-md transition duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            <div className="h-12 w-12 rounded-2xl bg-moss/40 text-primary flex items-center justify-center shrink-0">
              <Eye className="h-6 w-6" />
            </div>
            <div className="space-y-3 text-left">
              <h3 className="text-2xl font-serif font-bold text-secondary">Our Vision</h3>
              <p className="text-sm text-secondary/80 leading-relaxed font-sans">
                To become the premier trusted partner for organic farming across Sub-Saharan Africa. We envision a future where fertile soils are naturally maintained, farming ecosystems are bio-diverse, and farmers achieve robust profit margins through higher and healthier crop yields.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Meet Our Regional Representatives */}
      <section className="bg-taupe/30 py-20 border-y border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-primary font-bold uppercase tracking-widest text-xs font-mono">
              Direct Sales Representatives
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-secondary leading-tight">
              Meet Our Authorized Regional Agents
            </h2>
            <p className="text-secondary/80 text-sm sm:text-base font-sans">
              Need personalized advice, product samples, or direct order fulfillment? Reach out directly to our authorized representatives stationed across major agricultural hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {representatives.map((rep, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[32px] border border-sand shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center p-8 text-center relative group"
              >
                {/* Decorative hover band */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300" />
                
                {/* Rep Initials Portrait */}
                <div className={`h-20 w-20 rounded-full ${rep.avatarColor} text-white flex items-center justify-center font-black text-3xl shadow-sm mb-6 relative group-hover:scale-105 transition duration-300`}>
                  {rep.name[0]}
                  {/* Small Active Badge */}
                  <span className="absolute bottom-1 right-1 h-4 w-4 bg-emerald-400 border-2 border-white rounded-full" />
                </div>

                <div className="space-y-1 mb-6 flex-grow">
                  <h3 className="text-xl font-serif font-bold text-secondary group-hover:text-primary transition">
                    {rep.name}
                  </h3>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest font-mono">
                    {rep.region}
                  </p>
                  <p className="text-xs text-secondary/60 pt-1">
                    Authorized Regional Sales Agent
                  </p>
                </div>

                {/* Call & WhatsApp CTAs */}
                <div className="space-y-2 w-full pt-4 border-t border-sand">
                  <a
                    href={`tel:${rep.phone}`}
                    className="w-full py-2.5 rounded-xl bg-moss/20 hover:bg-primary text-primary hover:text-white font-bold text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center gap-2 border border-sage/20"
                  >
                    <Phone className="h-3.5 w-3.5" /> Call: {rep.phone}
                  </a>
                  <a
                    href={`https://wa.me/260${rep.phone.slice(1)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-taupe/40 hover:bg-moss/20 text-secondary font-bold text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center gap-2 border border-sand"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Soil Stewardship Pillar & Quality Guarantees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="text-2xl font-serif font-bold text-secondary">
              Why Ecological Agriculture Matters Today
            </h3>
            <p className="text-sm text-secondary/80 leading-relaxed font-sans">
              For years, modern farms have relied heavily on chemical synthetic fertilizers to force yields. However, this has resulted in depleted soils, nutrient runoffs, yellowing leaves, and high vulnerability to persistent pest colonies.
            </p>
            <p className="text-sm text-secondary/80 leading-relaxed font-sans">
              At Lifecycle Organics, we focus on **biodegradable soil stewardship**. Our active formulation uses natural agents that enrich soil structures naturally. This means we are restoring soil fertility for long-term productivity instead of quick, destructive boosts.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-moss/40 rounded-2xl border border-sage/20">
                <p className="text-2xl font-serif font-bold text-primary">100%</p>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wide">Chemical Free</p>
              </div>
              <div className="p-4 bg-moss/40 rounded-2xl border border-sage/20">
                <p className="text-2xl font-serif font-bold text-primary">10X</p>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wide">Faster Absorption</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[32px] border border-sand shadow-sm space-y-6 relative overflow-hidden text-left">
            <h3 className="text-xl font-serif font-bold text-secondary flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Our Quality Commitments
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-moss/40 text-primary flex items-center justify-center shrink-0 mt-1">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-secondary text-base">Crop-Safe Certification</h4>
                  <p className="text-xs sm:text-sm text-secondary/80 font-sans">
                    All batches are scientifically tested and guaranteed 100% biodegradable and residue-free, ensuring healthy consumption.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-moss/40 text-primary flex items-center justify-center shrink-0 mt-1">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-secondary text-base">Farmer-Centric Pricing</h4>
                  <p className="text-xs sm:text-sm text-secondary/80 font-sans">
                    We maintain fair pricing structures with bulk discounts, helping both smallholder farmers and commercial estates optimize profit margins.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-moss/40 text-primary flex items-center justify-center shrink-0 mt-1">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-secondary text-base">Ongoing Agronomic Support</h4>
                  <p className="text-xs sm:text-sm text-secondary/80 font-sans">
                    Purchasing our products grants you access to crop protection advice and soil monitoring tips from our field consultants.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Corporate Contact Footer bar */}
      <section className="bg-secondary py-16 text-center space-y-4 rounded-[40px] mx-4 sm:mx-6 lg:mx-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45 opacity-50" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-serif font-light text-white">
            Have Questions or Custom <span className="italic">Fleet Orders?</span>
          </h3>
          <p className="text-cream/80 max-w-xl mx-auto text-sm font-sans">
            Whether you need a full pallet delivery or a consultation for a large-scale commercial farm, we are ready to assist.
          </p>
          <div className="pt-2">
            <a
              href="mailto:lifecycleorganics@yahoo.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-forest text-white font-bold text-sm tracking-wide uppercase transition shadow-md"
            >
              <Mail className="h-4 w-4" /> Email: lifecycleorganics@yahoo.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
