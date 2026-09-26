import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { SalesRep } from '../types';
import { addInquiry } from '../services/store';

interface ContactViewProps {
  representatives: SalesRep[];
}

export const ContactView: React.FC<ContactViewProps> = ({ representatives }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneOrEmail: '',
    region: 'Lusaka',
    productInterest: 'Bio-Fertilizer',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Verification
    if (!formData.name.trim()) {
      setErrorMsg('Please provide your name.');
      return;
    }
    if (!formData.phoneOrEmail.trim()) {
      setErrorMsg('Please provide a contact phone number or email address.');
      return;
    }

    setIsSubmitting(true);

    // Save real inquiry to persistent operational store
    const matchedRep = getRepByRegion(formData.region);
    addInquiry({
      name: formData.name.trim(),
      phoneOrEmail: formData.phoneOrEmail.trim(),
      region: formData.region,
      productInterest: formData.productInterest,
      message: formData.message.trim() || 'General agricultural supply and pricing inquiry.',
      assignedRep: matchedRep?.name,
      source: 'contact_form'
    });

    // Provide user feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: '',
        phoneOrEmail: '',
        region: 'Lusaka',
        productInterest: 'Bio-Fertilizer',
        message: '',
      });
    }, 600);
  };

  const getRepByRegion = (regionName: string): SalesRep | undefined => {
    if (regionName === 'Lusaka') return representatives.find(r => r.name === 'Peter');
    if (regionName === 'Mkushi') return representatives.find(r => r.name === 'Ricky');
    if (regionName === 'Copperbelt') return representatives.find(r => r.name === 'Stanford');
    if (regionName === 'Central') return representatives.find(r => r.name === 'Francis');
    return undefined;
  };

  return (
    <div className="space-y-16 pb-16 pt-24">
      
      {/* Title Header */}
      <section className="bg-secondary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
          <p className="text-accent-tan font-bold uppercase tracking-widest text-xs font-mono">
            Get Quick Answers
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
            Contact <span className="italic font-normal">Lifecycle Organics</span>
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Connect directly with our corporate team or dial your nearest regional agent for immediate supply fulfillment and crop protection assistance.
          </p>
        </div>
      </section>

      {/* Main Layout: Left Representative list / Right Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Instant Agents list */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2 text-left">
              <span className="text-xs font-bold text-sage uppercase tracking-widest font-mono">
                Direct Agents
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-secondary tracking-tight">
                Skip The Form &amp; Call Now
              </h2>
              <p className="text-sm text-secondary/80 leading-relaxed">
                Our representatives are authorized to process immediate deliveries, answer pricing requests, and recommend products.
              </p>
            </div>

            <div className="space-y-4 text-left">
              {representatives.map((rep, idx) => {
                const waUrl = `https://wa.me/260${rep.phone.slice(1)}`;
                return (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-[24px] border border-sand shadow-sm flex items-start gap-4 hover:border-sage hover:shadow-md transition duration-200"
                  >
                    <div className={`h-10 w-10 rounded-full ${rep.avatarColor} text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5`}>
                      {rep.name[0]}
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif font-bold text-secondary text-sm sm:text-base">{rep.name}</h4>
                        <span className="bg-moss/40 text-primary text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border border-sage/20">
                          {rep.region}
                        </span>
                      </div>
                      <p className="text-xs text-secondary/60 font-medium">Authorized Agent</p>
                      
                      <div className="flex gap-3 pt-3">
                        <a
                          href={`tel:${rep.phone}`}
                          className="flex items-center gap-1.5 bg-primary hover:bg-forest text-white font-bold text-[10px] sm:text-xs uppercase tracking-wide px-4 py-2 rounded-lg shadow-sm"
                        >
                          <Phone className="h-3 w-3" /> Call Rep
                        </a>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 bg-taupe/40 hover:bg-moss/20 text-secondary font-bold text-[10px] sm:text-xs uppercase tracking-wide px-4 py-2 rounded-lg border border-sand"
                        >
                          <MessageSquare className="h-3 w-3" /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Corporate email info box */}
            <div className="p-6 bg-moss/40 rounded-2xl border border-sage/20 space-y-3 text-left">
              <h3 className="font-serif font-bold text-primary text-sm flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-primary" /> Corporate Enquiries
              </h3>
              <p className="text-xs text-secondary/80 leading-relaxed font-sans">
                For corporate partnerships, official distributor licenses, export opportunities, or cooperative supply agreements, please email our executive team.
              </p>
              <a
                href="mailto:lifecycleorganics@yahoo.com"
                className="block text-sm font-bold text-primary hover:text-forest font-mono"
              >
                lifecycleorganics@yahoo.com
              </a>
            </div>
          </div>

          {/* Right Column: Direct Contact form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[32px] border border-sand shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-accent-tan" />
            
            <div className="space-y-6">
              <div className="space-y-1 text-left">
                <h3 className="text-2xl font-serif font-bold text-secondary tracking-tight">
                  Send A Direct Message
                </h3>
                <p className="text-xs text-secondary/60">
                  Fill out your requirements below and we will route your inquiry to the appropriate regional representative.
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-8 text-center space-y-4 bg-moss/30 border border-sage/20 rounded-2xl animate-fade-in">
                  <div className="inline-flex h-14 w-14 bg-moss/50 text-primary rounded-full items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-serif font-bold text-secondary">Message Transmitted Successfully!</h4>
                    <p className="text-xs text-secondary/80 max-w-md mx-auto">
                      Thank you for contacting Lifecycle Organics. We have routed your inquiry. Our regional agent will respond shortly via phone or email.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2 rounded-full bg-primary hover:bg-forest text-white font-bold text-xs uppercase tracking-wider shadow-sm transition cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Validation Error Banner */}
                  {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-800 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name input */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                        Your Name / Farm Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. John Banda"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary placeholder-secondary/40"
                      />
                    </div>

                    {/* Email/Phone input */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                        Phone Number or Email *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 097XXXXXXXX or email"
                        value={formData.phoneOrEmail}
                        onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary placeholder-secondary/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Region Selector */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                        Your Region hub
                      </label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary"
                      >
                        <option value="Lusaka">Lusaka Province</option>
                        <option value="Mkushi">Mkushi Area</option>
                        <option value="Copperbelt">Copperbelt / NW</option>
                        <option value="Central">Central Province</option>
                        <option value="Other">Other Provinces / Nationwide</option>
                      </select>
                    </div>

                    {/* Product interest selector */}
                    <div className="space-y-1.5 text-left">
                      <label className="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                        Product of Interest
                      </label>
                      <select
                        value={formData.productInterest}
                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary"
                      >
                        <option value="Bio-Fertilizer">Bio-Fertilizer (Nourish Soil)</option>
                        <option value="Bio-Sulphur">Bio-Sulphur (Defend Maize)</option>
                        <option value="Bio-Soapcide">Bio-Soapcide (Insecticide Soap)</option>
                        <option value="Consultancy">General Agronomic Services</option>
                      </select>
                    </div>
                  </div>

                  {/* Message box */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                      Message / Order Details
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Specify estimated canister count (5L) or outline your plant symptoms..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary resize-none placeholder-secondary/40"
                    />
                  </div>

                  {/* Submission buttons */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-primary hover:bg-forest text-white font-bold text-xs uppercase tracking-wider shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>Transmitting Message...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send Direct Inquiry
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
