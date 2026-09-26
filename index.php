<?php
$activePage = 'home';
$baseDir = './';
include('header.php');

// Standalone Products array for PHP Version
$products = [
    [
        'id' => 'bio-fertilizer',
        'name' => 'Bio-Fertilizer (Nourish Soil)',
        'brand' => 'SOIL STIMULANT',
        'tagline' => 'Active organic carbon + mycorrhizae',
        'description' => 'A heavy-duty microbial root charger. Restores natural soil ecology, stabilizes pH acidity, fixes organic nitrogen, and maximizes soil water retention capacity for high drought tolerance.',
        'badge' => 'High Root Vitality',
        'features' => ['pH Acid Neutralizer', 'Mycorrhizae Charged', 'Nitrogen-Fixing Hub'],
        'image' => 'assets/images/bio_fertilizer_1783345223620.jpg'
    ],
    [
        'id' => 'bio-sulphur',
        'name' => 'Bio-Sulphur (Defend Maize)',
        'brand' => 'CROP IMMUNITY',
        'tagline' => 'High potency bio-sulphur with botanical extracts',
        'description' => 'Double-action natural plant defense. Wards off persistent fungal leaf spores and repels common maize pests. Rapidly absorbs to reverse yellow leaves into deep, healthy greens.',
        'badge' => 'Double-Action Immunity',
        'features' => ['Maize Leaf Yellowing Cure', 'Natural Fungal Barrier', 'Eco Insect Repellent'],
        'image' => 'assets/images/bio_sulphur_1783345245681.jpg'
    ],
    [
        'id' => 'bio-soapcide',
        'name' => 'Bio-Booster (Fruit & Crop Booster)',
        'brand' => 'YEILD BOOSTER',
        'tagline' => 'Concentrated organic potassium & micro-nutrients',
        'description' => 'Fast-acting botanical booster designed for fruit sets, corn cob weight, and flower retention. Supercharges chlorophyll formation and guarantees higher yields within weeks.',
        'badge' => 'Maximum Potency Booster',
        'features' => ['Fruit & Cob Swelling', 'Chlorophyll Formation', 'Zambian Certified Safe'],
        'image' => 'assets/images/bio_soapcide_1783345266462.jpg'
    ]
];
?>

<div class="space-y-20 pb-16 overflow-hidden">
  
  <!-- 1. Hero Section -->
  <section id="hero-section" class="relative min-h-screen flex items-center justify-center bg-secondary">
    <!-- Background Image with elegant overlay -->
    <div class="absolute inset-0">
      <img
        src="assets/images/hero_banner_1783345201244.jpg"
        alt="Lifecycle Organics Sweeping Farmland"
        class="w-full h-full object-cover opacity-50 filter grayscale-[10%]"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/75 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-black/30"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col justify-center h-full z-10 w-full">
      <div class="max-w-3xl space-y-6 text-left">
        
        <!-- Tagline Badge -->
        <div class="inline-flex items-center gap-2 bg-sage/20 backdrop-blur-md border border-sage/30 px-4 py-2 rounded-full text-sage text-xs sm:text-sm font-semibold tracking-wider uppercase animate-fade-in">
            <span class="text-base select-none leading-none">🌳</span>
            100% Natural, Sustainable &amp; Safe
        </div>

        <!-- Main Catchphrase -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight text-white leading-none">
          Cultivating the <span class="italic font-normal text-accent-tan">Future</span> <br class="hidden sm:inline" /> from the Ground Up.
        </h1>

        <!-- Description -->
        <p class="text-base sm:text-lg md:text-xl text-cream/90 font-sans max-w-2xl leading-relaxed">
          Ditch synthetic chemicals and protect your crops the natural way. Our premium bio-fertilizers and bio-protectors nourish soils, prevent yellowing, and keep aphids and mites away.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <a href="<?php echo $baseDir; ?>Products/products.php" class="px-8 py-4 rounded-full bg-accent-tan hover:bg-accent-tan/90 text-white font-bold text-sm uppercase tracking-wider shadow-md transition-all duration-300 flex items-center justify-center gap-2">
            Explore Products
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="<?php echo $baseDir; ?>Contact/contact.php" class="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
            Talk to Regional Agent
          </a>
        </div>

        <!-- Mini Contact Summary -->
        <div class="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-cream/70">
          <div>
            <p class="text-xs text-accent-tan uppercase font-bold tracking-widest font-mono">Zambia Coverage</p>
            <p class="text-sm font-semibold text-white">Nationwide Delivery</p>
          </div>
          <div>
            <p class="text-xs text-accent-tan uppercase font-bold tracking-widest font-mono">Expert Support</p>
            <p class="text-sm font-semibold text-white">4 Main Regions Served</p>
          </div>
          <div class="hidden sm:block">
            <p class="text-xs text-accent-tan uppercase font-bold tracking-widest font-mono">Contact Us</p>
            <p class="text-sm font-semibold text-white">lifecycleorganics@yahoo.com</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- 2. Brand Core Pillars -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
      <div class="flex justify-center items-center gap-2 text-primary font-bold text-2xl font-serif">
        <span class="text-3xl italic text-leaf">Green</span> &amp; Organics
      </div>
      <h2 class="text-3xl sm:text-4xl font-serif font-light tracking-tight text-secondary leading-tight">
        Start Your Crop Protection The <span class="italic">Organic Way</span>
      </h2>
      <p class="text-secondary/80">
        Lifecycle Organics specializes in bridging rich nature with modern agricultural demands, boosting root defense and ensuring lush, robust growth safely.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      <!-- Pillar 1 -->
      <div class="bg-taupe/30 hover:bg-taupe/60 p-8 rounded-[32px] border border-sand shadow-sm transition duration-300 space-y-4 group text-left">
        <div class="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
        </div>
        <h3 class="text-lg font-bold text-secondary font-serif">100% Organic &amp; Safe</h3>
        <p class="text-sm text-secondary/80 leading-relaxed">
          Formulated purely from nature. Guaranteed safe for crops, local farmers, consumers, livestock, and the surrounding environment.
        </p>
      </div>

      <!-- Pillar 2 -->
      <div class="bg-taupe/30 hover:bg-taupe/60 p-8 rounded-[32px] border border-sand shadow-sm transition duration-300 space-y-4 group text-left">
        <div class="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
        </div>
        <h3 class="text-lg font-bold text-secondary font-serif">Multi-Action Protection</h3>
        <p class="text-sm text-secondary/80 leading-relaxed">
          Provides multi-action defenses serving as a fungicide, pesticide, germicide, and fertilizer to build plants' immune systems.
        </p>
      </div>

      <!-- Pillar 3 -->
      <div class="bg-taupe/30 hover:bg-taupe/60 p-8 rounded-[32px] border border-sand shadow-sm transition duration-300 space-y-4 group text-left">
        <div class="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
        </div>
        <h3 class="text-lg font-bold text-secondary font-serif">Healthier &amp; Larger Crops</h3>
        <p class="text-sm text-secondary/80 leading-relaxed">
          Dramatically enhances chlorophyll formation and protein synthesis, leading to larger, greener leaves and taller corn.
        </p>
      </div>

      <!-- Pillar 4 -->
      <div class="bg-taupe/30 hover:bg-taupe/60 p-8 rounded-[32px] border border-sand shadow-sm transition duration-300 space-y-4 group text-left">
        <div class="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
        </div>
        <h3 class="text-lg font-bold text-secondary font-serif">Enriches Soil Fertility</h3>
        <p class="text-sm text-secondary/80 leading-relaxed">
          Restores natural soil micro-flora, fixes root nitrogen uptake, and maintains stable organic carbon balances for long-term productivity.
        </p>
      </div>

    </div>
  </section>

  <!-- 3. Featured Flagship Products -->
  <section class="bg-gradient-to-b from-cream to-taupe/40 py-20 border-y border-sand">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
        <div class="space-y-2 text-left">
          <p class="text-primary font-bold tracking-widest uppercase text-xs">Flagship Lineup</p>
          <h2 class="text-3xl sm:text-4xl font-serif font-light tracking-tight text-secondary">
            Complete Crop <span class="italic font-normal">Nutrition &amp; Defense</span>
          </h2>
        </div>
        <a href="<?php echo $baseDir; ?>Products/products.php" class="text-primary font-bold hover:text-forest inline-flex items-center gap-1 group text-sm">
          View detailed guidelines
          <svg class="h-4 w-4 transform group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <?php foreach ($products as $product): ?>
          <div class="bg-white rounded-[32px] border border-sand shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group">
            <!-- Image Container -->
            <div class="relative aspect-square overflow-hidden bg-cream shrink-0">
              <img
                src="<?php echo $product['image']; ?>"
                alt="<?php echo $product['name']; ?>"
                class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <!-- Badge -->
              <span class="absolute top-4 left-4 bg-accent-tan text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                <?php echo $product['badge']; ?>
              </span>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow space-y-4 text-left">
              <div class="space-y-1">
                <p class="text-xs font-bold text-sage uppercase tracking-widest font-mono">
                  <?php echo $product['brand']; ?>
                </p>
                <h3 class="text-xl font-bold text-secondary group-hover:text-primary font-serif transition">
                  <?php echo $product['name']; ?>
                </h3>
                <p class="text-xs italic text-secondary/60 font-medium">
                  <?php echo $product['tagline']; ?>
                </p>
              </div>

              <p class="text-sm text-secondary/80 leading-relaxed flex-grow">
                <?php echo $product['description']; ?>
              </p>

              <div class="pt-2 border-t border-sand flex flex-wrap gap-1.5">
                <?php foreach ($product['features'] as $f): ?>
                  <span class="bg-moss text-primary text-[11px] font-bold px-2.5 py-1 rounded-lg border border-sage/10">
                    <?php echo $f; ?>
                  </span>
                <?php endforeach; ?>
              </div>

              <a href="<?php echo $baseDir; ?>Products/products.php" class="w-full mt-4 py-3 rounded-xl bg-taupe/40 hover:bg-primary hover:text-white text-secondary font-bold text-xs uppercase tracking-wider transition-colors duration-200 border border-sand flex items-center justify-center gap-1.5">
                View Specifications
              </a>
            </div>
          </div>
        <?php endforeach; ?>
      </div>

    </div>
  </section>

  <!-- 4. Crop Improvement - Before/After Comparison -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-primary text-cream rounded-[40px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
      <!-- Subtle leaves pattern in background -->
      <div class="absolute top-0 right-0 opacity-10 transform translate-x-20 -translate-y-20">
        <svg class="h-[400px] w-[400px] text-sage" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7.58,17.5C8.58,18 9.58,18.5 10.58,19C11.58,19.5 12.58,20 13.58,20.5L14,20.5C14,20.5 14,20.5 14,20.5C18.6,18.2 21.6,14.2 21.6,9C21.6,5.3 19.3,2 15.6,2C13.2,2 10.7,3.3 9,5.3C10.7,3.3 13.2,2 15.6,2C19.3,2 21.6,5.3 21.6,9C21.6,14.2 18.6,18.2 14,20.5M15.6,4C17.8,4 19.6,5.8 19.6,9C19.6,12.7 17.5,15.8 13.9,17.7C12.4,17.1 11,16.3 9.7,15.6C11,14.3 12.3,13 13.6,11.7C14.1,11.2 14.1,10.3 13.6,9.8C13.1,9.3 12.2,9.3 11.7,9.8C10.4,11.1 9.1,12.4 7.8,13.7C6.8,13 5.8,12.3 4.8,11.6C6.7,8.2 10.4,4 15.6,4Z" />
        </svg>
      </div>

      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Visual description -->
        <div class="lg:col-span-5 space-y-6 text-left">
          <p class="text-accent-tan font-mono text-xs uppercase font-bold tracking-widest flex items-center gap-1.5">
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Proven Crop Improvement
          </p>
          <h2 class="text-3xl sm:text-4xl font-serif font-light tracking-tight text-white leading-tight">
            The Power Of Nature For <span class="italic">Better Yields</span>
          </h2>
          <p class="text-sm sm:text-base text-cream/80 leading-relaxed font-sans">
            Experience the visual transformation of your maize, tomatoes, and vegetables. Our 100% natural formula replaces chemical stress with deep root nourishment and lasting structural vigor.
          </p>

          <div class="space-y-4 pt-2">
            <div class="flex items-start gap-3">
              <div class="h-6 w-6 rounded-full bg-white/10 text-accent-tan flex items-center justify-center shrink-0 mt-0.5">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-sm">Stronger Nitrogen Fixation</h4>
                <p class="text-xs text-cream/70">Increases structural protein synthesis inside leaves.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="h-6 w-6 rounded-full bg-white/10 text-accent-tan flex items-center justify-center shrink-0 mt-0.5">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-sm">Prevents Yellowing</h4>
                <p class="text-xs text-cream/70">Ensures chlorophyll formations develop strongly and safely.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Before / After comparison visual -->
        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-neutral-800 text-left">
          
          <!-- Before Card -->
          <div class="bg-white/10 border border-white/20 rounded-3xl p-6 space-y-4">
            <span class="bg-white/10 border border-white/20 text-cream/80 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
              Deficient crops
            </span>
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-white font-serif">Without Bio-Nutrition</h3>
              <p class="text-xs text-cream/70 leading-relaxed font-sans">
                Stunted growth, pale yellow leaves, weak stalks, thin root depth, high vulnerability to aphid swarm attacks, and low crop harvest weight.
              </p>
            </div>
            <div class="bg-black/20 p-3 rounded-xl border border-white/10">
              <div class="flex justify-between items-center text-xs font-mono text-cream/80">
                <span>Root Structure:</span>
                <span class="font-bold">Shallow</span>
              </div>
              <div class="w-full bg-white/10 h-1.5 rounded-full mt-1 overflow-hidden">
                <div class="bg-red-400 h-1.5 w-1/4 rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- After Card (Moss colored) -->
          <div class="bg-moss text-secondary border border-sage/40 rounded-3xl p-6 space-y-4 relative shadow-lg">
            <span class="bg-primary text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              The Organic Way
            </span>
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-primary font-serif">After Lifecycle Organics</h3>
              <p class="text-xs text-secondary/80 leading-relaxed font-sans">
                Vibrant deep-green leaves, rapid healthy growth, thick stalks, extensive strong roots, full resistance to pests, and much heavier yields.
              </p>
            </div>
            <div class="bg-white/50 p-3 rounded-xl border border-sage/20">
              <div class="flex justify-between items-center text-xs font-mono text-primary">
                <span>Root Structure:</span>
                <span class="font-bold">Extensive &amp; Deep</span>
              </div>
              <div class="w-full bg-sage/30 h-1.5 rounded-full mt-1 overflow-hidden">
                <div class="bg-primary h-1.5 w-full rounded-full"></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>

  <!-- 5. Quick CTA Call To Action -->
  <section class="bg-taupe/20 border-y border-sand py-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <h2 class="text-2xl sm:text-3xl font-serif text-secondary leading-tight">
        Ready to secure healthier yields and boost crop defenses?
      </h2>
      <p class="text-secondary/70 max-w-2xl mx-auto text-sm sm:text-base font-sans">
        Reach out directly to our authorized regional sales representatives in Lusaka, Mkushi, Copperbelt, and Central Province for product catalogs, pricing, and advice.
      </p>
      <div class="pt-2 flex flex-wrap justify-center gap-4">
        <a href="<?php echo $baseDir; ?>Contact/contact.php" class="px-8 py-3 rounded-full bg-primary hover:bg-forest text-white font-bold text-sm uppercase tracking-wider shadow-md transition">
          Contact Local Agents
        </a>
        <a href="<?php echo $baseDir; ?>Services/services.php" class="px-8 py-3 rounded-full bg-white hover:bg-taupe text-secondary font-bold text-sm uppercase tracking-wider border border-sand shadow-sm transition">
          Our Consultancy Services
        </a>
      </div>
    </div>
  </section>

</div>

<?php
include('footer.php');
?>
