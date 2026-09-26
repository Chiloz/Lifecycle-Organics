<?php
$activePage = 'products';
$baseDir = '../';
$pageStyleFile = 'products.css';
include('../header.php');

// Define full dataset
$products = [
    'bio-fertilizer' => [
        'id' => 'bio-fertilizer',
        'name' => 'Bio-Fertilizer',
        'brand' => 'GREEN & ORGANICS',
        'tagline' => 'Nourishes Soil, Boosts Growth',
        'description' => 'A powerful, 100% organic bio-superfertilizer solution designed to nourish crops and restore long-term soil fertility. Maximizes harvest density and provides essential root nutrients up to 10x faster than traditional composts.',
        'benefits' => [
            'Improves soil biological health',
            'Increases active nutrient uptake',
            'Promotes stronger, deeper root systems',
            'Ensures substantially higher crop yields'
        ],
        'features' => [
            '100% natural and residue-free',
            '10x faster bio-absorption rate',
            'Safe for food crops and local pollinators',
            'Reduces dependency on synthetic alternatives'
        ],
        'specs' => [
            'Volume: 5 Liters',
            'Type: Liquid Concentrate',
            'Dilution: 1:100 ratio',
            'Crops: Corn, Tomatoes, Cabbage, etc.'
        ],
        'badge' => '10x Faster Growth',
        'image' => '../src/assets/images/bio_fertilizer_1783345223620.jpg',
        'usage' => 'Dilute with clean water and apply evenly as a foliar spray or through root irrigation during early morning or late afternoon for best results.',
        'price' => 150 // Estimated ZMW price
    ],
    'bio-sulphur' => [
        'id' => 'bio-sulphur',
        'name' => 'Bio-Sulphur 4',
        'brand' => 'GREEN & ORGANICS',
        'tagline' => 'Protects Maize, Prevents Yellowing',
        'description' => 'A unique organic 4-in-1 formulation serving as a liquid fungicide, pesticide, germicide, and fertilizer in one. Supplies essential sulphur—the fourth major nutrient—to bolster crop immune systems and prevent yellowing leaf deficiencies.',
        'benefits' => [
            'Eradicates yellowing and stunted growth',
            'Essential for vital protein synthesis',
            'Accelerates chlorophyll formation',
            'Fights structural fungal pathogens'
        ],
        'features' => [
            '4-in-1 multi-action protection',
            'Maize specific formulation',
            'Provides key mineral sulphur',
            'Environmentally safe and biodegradable'
        ],
        'specs' => [
            'Volume: 5 Liters',
            'Type: Multi-action Liquid',
            'Defends: Maize and cereals',
            'Safety: Non-toxic residue'
        ],
        'badge' => '4-in-1 Protection',
        'image' => '../src/assets/images/bio_sulphur_1783345245681.jpg',
        'usage' => 'Apply as a foliar mist over leaves, focusing on fields showing yellowing indicators. Repeat applications every 14 days under low-light conditions.',
        'price' => 180
    ],
    'bio-soapcide' => [
        'id' => 'bio-soapcide',
        'name' => 'Bio-Soapcide',
        'brand' => 'GREEN & ORGANICS',
        'tagline' => 'Insecticidal Soap, Spreader, Sticker',
        'description' => 'A premium, fully sustainable contact insecticidal soap. Formulated with natural active wetting agents that act as an effective spreader and sticker, ensuring the formulation adheres to leaf layers to protect against sucking insects.',
        'benefits' => [
            'Eradicates sucking and biting pests',
            'Acts as a professional surfactant sticker',
            'Leaves absolutely zero toxic chemical residues',
            'High adherence rate on waxy crop leaves'
        ],
        'features' => [
            'Broad-spectrum pest protection',
            'Sticker and spreader capabilities',
            'No chemical withholding period',
            'Highly concentrated formula'
        ],
        'specs' => [
            'Volume: 5 Liters',
            'Type: Insecticidal Soap',
            'Combats: Aphids, Mites, Thrips, Bugs',
            'Action: Contact spray'
        ],
        'badge' => '100% Sustainable',
        'image' => '../src/assets/images/bio_soapcide_1783345266462.jpg',
        'usage' => 'Mix and spray directly on pest clusters. Target undersides of leaves where bugs gather. Spray during early morning or evening to prevent leaf burn.',
        'price' => 165
    ]
];

// Determine pre-selected product
$selectedId = isset($_GET['id']) && isset($products[$_GET['id']]) ? $_GET['id'] : 'bio-fertilizer';
?>

<div class="space-y-16 pb-16 pt-24">
  
  <!-- Title Header -->
  <section class="bg-secondary text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
      <p class="text-accent-tan font-bold uppercase tracking-widest text-xs font-mono">
        Organic Product Lineup
      </p>
      <h1 class="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
        Green &amp; <span class="italic font-normal">Organics Catalog</span>
      </h1>
      <p class="text-cream/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
        Our specialized product line is engineered for high efficacy, rapid absorption, and 100% natural crop preservation. Switch tabs below to explore details.
      </p>
    </div>
  </section>

  <!-- Product Tabs Switcher -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
      <?php foreach ($products as $id => $p): 
          $isSelected = ($id === $selectedId);
      ?>
          <button 
              class="product-filter-btn px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all duration-200 cursor-pointer <?php echo $isSelected ? 'bg-primary text-cream shadow-md' : 'bg-white hover:bg-sand/40 text-secondary border border-sand'; ?>" 
              data-filter="<?php echo $id; ?>">
              <?php echo $p['name']; ?>
          </button>
      <?php endforeach; ?>
    </div>

    <!-- Product Grid of detailed cards (filtered via javascript) -->
    <div class="space-y-12">
      <?php foreach ($products as $id => $product): 
          $isHidden = ($id !== $selectedId);
      ?>
          <div class="product-card-item bg-white rounded-[32px] border border-sand shadow-sm overflow-hidden <?php echo $isHidden ? 'hidden' : ''; ?>" data-category="<?php echo $id; ?>" style="transition: opacity 0.3s ease;">
              <div class="grid grid-cols-1 lg:grid-cols-12">
                  
                  <!-- Left: Product Image -->
                  <div class="lg:col-span-5 relative aspect-square bg-cream min-h-[300px]">
                      <img
                        src="<?php echo $product['image']; ?>"
                        alt="<?php echo $product['name']; ?>"
                        class="w-full h-full object-cover"
                      />
                      <span class="absolute top-6 left-6 text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm shimmer-badge">
                        <?php echo $product['badge']; ?>
                      </span>
                  </div>

                  <!-- Right: Technical Details -->
                  <div class="lg:col-span-7 p-6 sm:p-10 md:p-12 space-y-8 flex flex-col justify-between">
                      
                      <!-- Product Header -->
                      <div class="space-y-3 text-left">
                        <span class="text-xs font-bold text-sage uppercase tracking-widest font-mono">
                          <?php echo $product['brand']; ?>
                        </span>
                        <h2 class="text-3xl sm:text-4xl font-serif font-bold text-secondary tracking-tight leading-tight">
                          <?php echo $product['name']; ?>
                        </h2>
                        <p class="text-sm italic font-medium text-accent-tan">
                          "<?php echo $product['tagline']; ?>"
                        </p>
                        <p class="text-sm sm:text-base text-secondary/80 leading-relaxed pt-2">
                          <?php echo $product['description']; ?>
                        </p>
                      </div>

                      <!-- Benefits & Features Grid -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-sand text-left">
                        <!-- Benefits -->
                        <div class="space-y-3">
                          <h4 class="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
                              <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                              </svg>
                              Key Benefits
                          </h4>
                          <ul class="space-y-2">
                            <?php foreach ($product['benefits'] as $b): ?>
                              <li class="flex items-start gap-2 text-xs text-secondary/85">
                                <svg class="h-4 w-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                                <span><?php echo $b; ?></span>
                              </li>
                            <?php endforeach; ?>
                          </ul>
                        </div>

                        <!-- Features -->
                        <div class="space-y-3">
                          <h4 class="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
                              <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                              Key Features
                          </h4>
                          <ul class="space-y-2">
                            <?php foreach ($product['features'] as $f): ?>
                              <li class="flex items-start gap-2 text-xs text-secondary/85">
                                <svg class="h-4 w-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                                <span><?php echo $f; ?></span>
                              </li>
                            <?php endforeach; ?>
                          </ul>
                        </div>
                      </div>

                      <!-- Technical Specifications -->
                      <div class="p-5 bg-moss/40 rounded-2xl border border-sage/20 space-y-3 text-left">
                        <h4 class="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                            <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            Technical Specifications
                        </h4>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-sans text-secondary/90">
                          <?php foreach ($product['specs'] as $s): 
                              $parts = explode(': ', $s);
                              $key = $parts[0];
                              $val = isset($parts[1]) ? $parts[1] : '';
                          ?>
                              <div class="space-y-0.5">
                                <span class="font-semibold text-secondary/60 block text-[10px] uppercase tracking-wide">
                                  <?php echo $key; ?>
                                </span>
                                <span class="font-bold text-primary"><?php echo $val; ?></span>
                              </div>
                          <?php endforeach; ?>
                        </div>
                      </div>

                      <!-- Usage Guidelines -->
                      <div class="p-5 bg-taupe/30 rounded-2xl border border-sand space-y-2 text-left">
                        <h4 class="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-1.5">
                            <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Application Guidelines
                        </h4>
                        <p class="text-xs text-secondary/80 leading-relaxed font-sans">
                          <?php echo $product['usage']; ?>
                        </p>
                      </div>

                      <!-- Canister Quotes Calculator -->
                      <div class="product-quote-container p-6 bg-cream border border-sand rounded-2xl text-left space-y-4" data-price="<?php echo $product['price']; ?>" data-name="<?php echo $product['name']; ?>">
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div>
                                <h4 class="text-xs font-bold text-secondary uppercase tracking-widest font-mono">Instant Quote Estimator</h4>
                                <p class="text-[11px] text-secondary/60">Estimates based on regional wholesale price (5L Canisters)</p>
                            </div>
                            <div class="flex items-center gap-2">
                                <button class="btn-canister-minus h-8 w-8 rounded-full bg-sand/60 hover:bg-sand text-secondary font-bold flex items-center justify-center cursor-pointer select-none">-</button>
                                <span class="canister-count-val font-bold text-sm w-8 text-center">1</span>
                                <button class="btn-canister-plus h-8 w-8 rounded-full bg-sand/60 hover:bg-sand text-secondary font-bold flex items-center justify-center cursor-pointer select-none">+</button>
                            </div>
                        </div>
                        <div class="pt-3 border-t border-sand/40 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div class="flex items-baseline gap-2">
                                <span class="text-xs text-secondary/60">Estimated Total:</span>
                                <span class="price-quote-display text-2xl font-serif font-bold text-primary"><?php echo $product['price']; ?> ZMW</span>
                            </div>
                            <a href="#" target="_blank" class="btn-whatsapp-quote flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25d366] hover:bg-[#20ba5a] text-white shadow-sm transition">
                                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.008 14.069.98 11.512.98c-5.441 0-9.867 4.371-9.871 9.8.001 1.97.525 3.561 1.517 5.08L2.144 22l6.503-1.705c1.554.85 3.09 1.294 4.6 1.295z"/>
                                </svg>
                                WhatsApp Agent Order
                            </a>
                        </div>
                      </div>

                  </div>
              </div>
          </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- Safety Tip Segment -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-moss/40 rounded-[32px] p-8 sm:p-10 border border-sand grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
      <div class="lg:col-span-8 space-y-4">
        <h3 class="text-xl font-serif text-secondary flex items-center gap-2">
            <svg class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            Agronomic Safety Tip
        </h3>
        <p class="text-xs sm:text-sm text-secondary/80 leading-relaxed">
          When applying **Bio-Soapcide** or **Bio-Sulphur**, it is best to spray early in the morning or late in the evening. Spraying under full, hot mid-day sun may cause the natural formulation to dry out too quickly before the leaf surfaces fully absorb the active nutrition, reducing overall efficacy.
        </p>
      </div>
      <div class="lg:col-span-4 text-right">
        <a href="<?php echo $baseDir; ?>Contact/contact.php" class="block w-full lg:w-auto px-6 py-3 rounded-full bg-white hover:bg-taupe text-secondary font-bold text-xs uppercase tracking-wider text-center border border-sand shadow-sm transition">
          Ask Our Experts
        </a>
      </div>
    </div>
  </section>

</div>

<?php
include('../footer.php');
?>
