<?php
$activePage = 'about';
$baseDir = '../';
$pageStyleFile = 'about.css';
include('../header.php');

$representatives = [
    [
        'name' => 'Stanford',
        'phone' => '0767421417',
        'region' => 'Copperbelt / NW',
        'color' => 'bg-teal-600'
    ],
    [
        'name' => 'Ricky',
        'phone' => '0972304539',
        'region' => 'Mkushi',
        'color' => 'bg-lime-600'
    ],
    [
        'name' => 'Peter',
        'phone' => '0973279761',
        'region' => 'Lusaka',
        'color' => 'bg-emerald-600'
    ],
    [
        'name' => 'Francis',
        'phone' => '0760072470',
        'region' => 'Central Province',
        'color' => 'bg-green-700'
    ]
];
?>

<div class="space-y-20 pb-16 pt-24">
  
  <!-- Page Title & Intro -->
  <section class="bg-secondary text-white py-16 relative overflow-hidden">
    <!-- Decorative backdrop -->
    <div class="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
      <p class="text-accent-tan font-bold uppercase tracking-widest text-xs font-mono">
        Get To Know Us
      </p>
      <h1 class="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
        About <span class="italic font-normal">Lifecycle Organics</span>
      </h1>
      <p class="text-cream/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
        Leading the charge for ecological agricultural reform in Zambia. We empower local farmers and commercial growers with 100% natural, multi-action bio-nutrition.
      </p>
    </div>
  </section>

  <!-- Corporate Philosophy: Vision & Mission -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      
      <!-- Mission Card -->
      <div class="mission-vision-card bg-white p-8 sm:p-10 rounded-[32px] border border-sand shadow-sm flex items-start gap-5 relative overflow-hidden group hover:shadow-md transition duration-300">
        <div class="absolute top-0 left-0 w-2 h-full bg-primary"></div>
        <div class="h-12 w-12 rounded-2xl bg-moss/40 text-primary flex items-center justify-center shrink-0">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
        </div>
        <div class="space-y-3 text-left">
          <h3 class="text-2xl font-serif font-bold text-secondary">Our Mission</h3>
          <p class="text-sm text-secondary/80 leading-relaxed font-sans">
            To engineer and distribute high-yield, 100% natural crop health and soil enhancement products. We aim to replace toxic, synthetic chemical runoffs with safe, organic, and ecologically stable crop protection to boost harvests nationwide.
          </p>
        </div>
      </div>

      <!-- Vision Card -->
      <div class="mission-vision-card bg-white p-8 sm:p-10 rounded-[32px] border border-sand shadow-sm flex items-start gap-5 relative overflow-hidden group hover:shadow-md transition duration-300">
        <div class="absolute top-0 left-0 w-2 h-full bg-primary"></div>
        <div class="h-12 w-12 rounded-2xl bg-moss/40 text-primary flex items-center justify-center shrink-0">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
        </div>
        <div class="space-y-3 text-left">
          <h3 class="text-2xl font-serif font-bold text-secondary">Our Vision</h3>
          <p class="text-sm text-secondary/80 leading-relaxed font-sans">
            To become the premier trusted partner for organic farming across Sub-Saharan Africa. We envision a future where fertile soils are naturally maintained, farming ecosystems are bio-diverse, and farmers achieve robust profit margins through higher and healthier crop yields.
          </p>
        </div>
      </div>

    </div>
  </section>

  <!-- Meet Our Regional Representatives -->
  <section class="bg-taupe/30 py-20 border-y border-sand">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <p class="text-primary font-bold uppercase tracking-widest text-xs font-mono">
          Direct Sales Representatives
        </p>
        <h2 class="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-secondary leading-tight">
          Meet Our Authorized Regional Agents
        </h2>
        <p class="text-secondary/80 text-sm sm:text-base font-sans">
          Need personalized advice, product samples, or direct order fulfillment? Reach out directly to our authorized representatives stationed across major agricultural hubs.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <?php foreach ($representatives as $rep): ?>
          <div class="bg-white rounded-[32px] border border-sand shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center p-8 text-center relative group">
            <!-- Decorative hover band -->
            <div class="absolute top-0 left-0 right-0 h-2 bg-primary transform scale-x-0 group-hover:scale-x-100 transition duration-300"></div>
            
            <!-- Rep Initials Portrait -->
            <div class="rep-avatar-indicator h-20 w-20 rounded-full <?php echo $rep['color']; ?> text-white flex items-center justify-center font-black text-3xl shadow-sm mb-6 relative transition duration-300">
              <?php echo $rep['name'][0]; ?>
              <!-- Small Active Badge -->
              <span class="absolute bottom-1 right-1 h-4 w-4 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>

            <div class="space-y-1 mb-6 flex-grow">
              <h3 class="text-xl font-serif font-bold text-secondary group-hover:text-primary transition">
                <?php echo $rep['name']; ?>
              </h3>
              <p class="text-xs font-bold text-primary uppercase tracking-widest font-mono">
                <?php echo $rep['region']; ?>
              </p>
              <p class="text-xs text-secondary/60 pt-1">
                Authorized Regional Sales Agent
              </p>
            </div>

            <!-- Call & WhatsApp CTAs -->
            <div class="space-y-2 w-full pt-4 border-t border-sand">
              <a href="tel:<?php echo $rep['phone']; ?>" class="w-full py-2.5 rounded-xl bg-moss/20 hover:bg-primary text-primary hover:text-white font-bold text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center gap-2 border border-sage/20">
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg> Call: <?php echo $rep['phone']; ?>
              </a>
              <a href="https://wa.me/260<?php echo $rep['phone']; ?>" target="_blank" class="w-full py-2.5 rounded-xl bg-taupe/40 hover:bg-moss/20 text-secondary font-bold text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center gap-2 border border-sand">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        <?php endforeach; ?>
      </div>

    </div>
  </section>

  <!-- Soil Stewardship Pillar & Quality Guarantees -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <div class="lg:col-span-5 space-y-6 text-left">
        <h3 class="text-2xl font-serif font-bold text-secondary">
          Why Ecological Agriculture Matters Today
        </h3>
        <p class="text-sm text-secondary/80 leading-relaxed font-sans">
          For years, modern farms have relied heavily on chemical synthetic fertilizers to force yields. However, this has resulted in depleted soils, nutrient runoffs, yellowing leaves, and high vulnerability to persistent pest colonies.
        </p>
        <p class="text-sm text-secondary/80 leading-relaxed font-sans">
          At Lifecycle Organics, we focus on **biodegradable soil stewardship**. Our active formulation uses natural agents that enrich soil structures naturally. This means we are restoring soil fertility for long-term productivity instead of quick, destructive boosts.
        </p>
        
        <div class="grid grid-cols-2 gap-4 pt-2">
          <div class="p-4 bg-moss/40 rounded-2xl border border-sage/20">
            <p class="text-2xl font-serif font-bold text-primary">100%</p>
            <p class="text-xs font-semibold text-secondary uppercase tracking-wide">Chemical Free</p>
          </div>
          <div class="p-4 bg-moss/40 rounded-2xl border border-sage/20">
            <p class="text-2xl font-serif font-bold text-primary">10X</p>
            <p class="text-xs font-semibold text-secondary uppercase tracking-wide">Faster Absorption</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[32px] border border-sand shadow-sm space-y-6 relative overflow-hidden text-left">
        <h3 class="text-xl font-serif font-bold text-secondary flex items-center gap-2">
            <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0H4m8 0h8M4 8v11a2 2 0 002 2h12a2 2 0 002-2V8H4z"/>
            </svg>
            Our Quality Commitments
        </h3>

        <div class="space-y-4">
          <div class="quality-commitment-row flex gap-4">
            <div class="h-8 w-8 rounded-full bg-moss/40 text-primary flex items-center justify-center shrink-0 mt-1">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
            </div>
            <div>
              <h4 class="font-serif font-bold text-secondary text-base">Crop-Safe Certification</h4>
              <p class="text-xs sm:text-sm text-secondary/80 font-sans">
                All batches are scientifically tested and guaranteed 100% biodegradable and residue-free, ensuring healthy consumption.
              </p>
            </div>
          </div>

          <div class="quality-commitment-row flex gap-4">
            <div class="h-8 w-8 rounded-full bg-moss/40 text-primary flex items-center justify-center shrink-0 mt-1">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
            </div>
            <div>
              <h4 class="font-serif font-bold text-secondary text-base">Farmer-Centric Pricing</h4>
              <p class="text-xs sm:text-sm text-secondary/80 font-sans">
                We maintain fair pricing structures with bulk discounts, helping both smallholder farmers and commercial estates optimize profit margins.
              </p>
            </div>
          </div>

          <div class="quality-commitment-row flex gap-4">
            <div class="h-8 w-8 rounded-full bg-moss/40 text-primary flex items-center justify-center shrink-0 mt-1">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.757a1 1 0 110 2h-6.414a1 1 0 00-.707.293L7.121 16.8c-.83.83-2.12.83-2.95 0a2.086 2.086 0 010-2.95L8 10H4a1 1 0 110-2h6.414a1 1 0 00.707-.293l4.515-4.515c.83-.83 2.12-.83 2.95 0a2.086 2.086 0 010 2.95L14 10z"/>
                </svg>
            </div>
            <div>
              <h4 class="font-serif font-bold text-secondary text-base">Ongoing Agronomic Support</h4>
              <p class="text-xs sm:text-sm text-secondary/80 font-sans">
                Purchasing our products grants you access to crop protection advice and soil monitoring tips from our field consultants.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- Corporate Contact Footer bar -->
  <section class="bg-secondary py-16 text-center space-y-4 rounded-[40px] mx-4 sm:mx-6 lg:mx-8 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45 opacity-50"></div>
    <div class="relative z-10 max-w-2xl mx-auto space-y-4">
      <h3 class="text-2xl font-serif font-light text-white">
        Have Questions or Custom <span class="italic">Fleet Orders?</span>
      </h3>
      <p class="text-cream/80 max-w-xl mx-auto text-sm font-sans">
        Whether you need a full pallet delivery or a consultation for a large-scale commercial farm, we are ready to assist.
      </p>
      <div class="pt-2">
        <a href="mailto:lifecycleorganics@yahoo.com" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-forest text-white font-bold text-sm tracking-wide uppercase transition shadow-md">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg> Email: lifecycleorganics@yahoo.com
        </a>
      </div>
    </div>
  </section>

</div>

<?php
include('../footer.php');
?>
