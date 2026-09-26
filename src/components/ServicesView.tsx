import React from 'react';
import { Leaf, Users, CheckCircle, Award, Compass, Sprout, ShieldAlert, BarChart4 } from 'lucide-react';
import { Service } from '../types';

export const ServicesView: React.FC = () => {
  const services: Service[] = [
    {
      id: 'soil-analysis',
      title: 'Soil Fertility & Health Analysis',
      icon: 'BarChart4',
      description: 'We test and evaluate soil composition to detect severe sulphur, nitrogen, or phosphorous deficiencies before planting.',
      details: [
        'Detailed soil carbon level monitoring',
        'Customized bio-nutrition recommendations',
        'In-depth nitrogen absorption evaluations',
        'Root-depth enrichment consultation'
      ]
    },
    {
      id: 'crop-protection-consultancy',
      title: 'Crop Disease & Pest Management',
      icon: 'Compass',
      description: 'Personalized scheduling for crop protection. We help you eradicate aphid, mite, thrips, and red cotton bug infestations safely.',
      details: [
        'Eradication schedules for major maize pests',
        'Natural fungicide and germicide sprays',
        'Application guidance for Bio-Soapcide & Bio-Sulphur',
        'Preventative treatments against crop stunting'
      ]
    },
    {
      id: 'yield-optimization',
      title: 'Yield Optimization Advisories',
      icon: 'Sprout',
      description: 'Work with our agronomic experts to maximize tomato sizes, leaf thickness, and maize harvest weights by adopting natural practices.',
      details: [
        'Optimizing chlorophyll formation schedules',
        '10x faster fertilizer absorption techniques',
        'Transition pathways from synthetic to bio-inputs',
        'Sustainable organic soil stewardship programs'
      ]
    },
    {
      id: 'agro-dealer-networks',
      title: 'Bulk Agro-Dealer Distribution',
      icon: 'Users',
      description: 'We partner with the best agro-dealers to stock 5L canisters, ensuring direct accessibility for local farmers.',
      details: [
        'Guaranteed nationwide delivery structures',
        'Authorized dealer signage and display resources',
        'Volume-tiered margin structures for dealers',
        'Regional rep coordination for seamless re-stocking'
      ]
    }
  ];

  // Helper to render icons
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart4':
        return <BarChart4 className="h-6 w-6 text-primary" />;
      case 'Compass':
        return <Compass className="h-6 w-6 text-primary" />;
      case 'Sprout':
        return <Sprout className="h-6 w-6 text-primary" />;
      case 'Users':
        return <Users className="h-6 w-6 text-primary" />;
      default:
        return <Leaf className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="space-y-20 pb-16 pt-24">
      
      {/* Header Banner */}
      <section className="bg-secondary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
          <p className="text-accent-tan font-bold uppercase tracking-widest text-xs font-mono">
            Professional Agronomy
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
            Our Agronomic <span className="italic font-normal">Services</span>
          </h1>
          <p className="text-cream/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We don't just sell products; we partner with you on the ground. Explore our professional consultations, soil test monitors, and distribution services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-[32px] p-8 border border-sand hover:border-sage shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5 text-left">
                {/* Icon Circle */}
                <div className="h-12 w-12 rounded-2xl bg-moss/40 flex items-center justify-center">
                  {renderIcon(svc.icon)}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-secondary">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-secondary/80 leading-relaxed font-sans">
                    {svc.description}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 pt-2">
                  {svc.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-secondary/90">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact indicator */}
              <div className="pt-6 mt-6 border-t border-sand flex justify-between items-center text-xs">
                <span className="text-secondary/60 font-medium">Service Available Nationwide</span>
                <span className="text-primary font-bold uppercase tracking-wider font-mono">
                  100% Certified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Consulting Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-cream rounded-[40px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <svg className="h-[300px] w-[300px] text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,3C6.48,3 2,7.48 2,13C2,18.52 6.48,23 12,23C17.52,23 22,18.52 22,13C22,7.48 17.52,3 12,3M12,21C7.58,21 4,17.42 4,13C4,8.58 7.58,5 12,5C16.42,5 20,8.58 20,13C20,17.42 16.42,21 12,21M16.5,12H13V8.5C13,7.67 12.33,7 11.5,7C10.67,7 10,7.67 10,8.5V12H6.5C5.67,12 5,12.67 5,13.5C5,14.33 5.67,15 6.5,15H10V18.5C10,19.33 10.67,20 11.5,20C12.33,20 13,19.33 13,18.5V15H16.5C17.33,15 18,14.33 18,13.5C18,12.67 17.33,12 16.5,12Z" />
            </svg>
          </div>
          
          <div className="relative z-10 max-w-3xl space-y-6 text-left">
            <span className="bg-forest text-cream text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-sage/20">
              Commercial Estates &amp; Cooperatives
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight">
              Large Scale Farm Cooperatives <span className="italic">Support</span>
            </h2>
            <p className="text-sm sm:text-base text-cream/80 leading-relaxed font-sans">
              Are you a cooperative manager or commercial estate supervisor? We provide on-site agronomic assessments, coordinated product trials, customized safety briefings for application crews, and bulk pricing systems.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent-tan shrink-0" />
                <span className="text-xs font-semibold text-cream/90">Direct Delivery Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent-tan shrink-0" />
                <span className="text-xs font-semibold text-cream/90">Guaranteed Potency Checks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent-tan shrink-0" />
                <span className="text-xs font-semibold text-cream/90">Soil Restoration Oversight</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex h-10 w-10 bg-moss text-primary rounded-full items-center justify-center">
          <Award className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-serif font-bold text-secondary">100% Certified Safe &amp; Sustainable</h3>
        <p className="text-secondary/70 max-w-xl mx-auto text-xs leading-relaxed font-sans">
          Our products are tested extensively. They contain absolutely no synthetic chemical residues, ensuring complete safety for livestock, local pollinators, and agricultural runoffs.
        </p>
      </section>

    </div>
  );
};
