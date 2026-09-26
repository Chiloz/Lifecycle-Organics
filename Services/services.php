<?php
$activePage = 'services';
$baseDir = '../';
$pageStyleFile = 'services.css';
include('../header.php');

$services = [
    [
        'id' => 'soil-analysis',
        'title' => 'Soil Fertility & Health Analysis',
        'icon' => 'bar-chart',
        'description' => 'We test and evaluate soil composition to detect severe sulphur, nitrogen, or phosphorous deficiencies before planting.',
        'details' => [
            'Detailed soil carbon level monitoring',
            'Customized bio-nutrition recommendations',
            'In-depth nitrogen absorption evaluations',
            'Root-depth enrichment consultation'
        ]
    ],
    [
        'id' => 'crop-protection-consultancy',
        'title' => 'Crop Disease & Pest Management',
        'icon' => 'compass',
        'description' => 'Personalized scheduling for crop protection. We help you eradicate aphid, mite, thrips, and red cotton bug infestations safely.',
        'details' => [
            'Eradication schedules for major maize pests',
            'Natural fungicide and germicide sprays',
            'Application guidance for Bio-Soapcide & Bio-Sulphur',
            'Preventative treatments against crop stunting'
        ]
    ],
    [
        'id' => 'yield-optimization',
        'title' => 'Yield Optimization Advisories',
        'icon' => 'sprout',
        'description' => 'Work with our agronomic experts to maximize tomato sizes, leaf thickness, and maize harvest weights by adopting natural practices.',
        'details' => [
            'Optimizing chlorophyll formation schedules',
            '10x faster fertilizer absorption techniques',
            'Transition pathways from synthetic to bio-inputs',
            'Sustainable organic soil stewardship programs'
        ]
    ],
    [
        'id' => 'agro-dealer-networks',
        'title' => 'Bulk Agro-Dealer Distribution',
        'icon' => 'users',
        'description' => 'We partner with the best agro-dealers to stock 5L canisters, ensuring direct accessibility for local farmers.',
        'details' => [
            'Guaranteed nationwide delivery structures',
            'Authorized dealer signage and display resources',
            'Volume-tiered margin structures for dealers',
            'Regional rep coordination for seamless re-stocking'
        ]
    ]
];
?>

<div class="space-y-20 pb-16 pt-24">
  
  <!-- Header Banner -->
  <section class="bg-secondary text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
      <p class="text-accent-tan font-bold uppercase tracking-widest text-xs font-mono">
        Professional Agronomy
      </p>
      <h1 class="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
        Our Agronomic <span class="italic font-normal">Services</span>
      </h1>
      <p class="text-cream/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
        We don't just sell products; we partner with you on the ground. Explore our professional consultations, soil test monitors, and distribution services.
      </p>
    </div>
  </section>

  <!-- Services Grid -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <?php foreach ($services as $svc): ?>
        <div class="service-card-wrapper bg-white rounded-[32px] p-8 border border-sand hover:border-sage shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div class="space-y-5 text-left">
            <!-- Icon Circle -->
            <div class="service-icon-container h-12 w-12 rounded-2xl bg-moss/40 flex items-center justify-center transition-transform duration-300">
                <?php if ($svc['icon'] === 'bar-chart'): ?>
                    <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/>
                    </svg>
                <?php elseif ($svc['icon'] === 'compass'): ?>
                    <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11M9 11V9c0-1.657 1.343-3 3-3h1m1 5c0 2.924-1.125 5.575-2.965 7.556m2.965-7.556h1a3 3 0 013 3v1m-3-10V3a1 1 0 00-1-1h-1a1 1 0 00-1 1v3M4 19h16"/>
                    </svg>
                <?php elseif ($svc['icon'] === 'sprout'): ?>
                    <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                <?php else: ?>
                    <svg class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                <?php endif; ?>
            </div>

            <div class="space-y-2">
              <h3 class="text-xl font-serif font-bold text-secondary">
                <?php echo $svc['title']; ?>
              </h3>
              <p class="text-sm text-secondary/80 leading-relaxed font-sans">
                <?php echo $svc['description']; ?>
              </p>
            </div>

            <!-- Bullets -->
            <ul class="space-y-2.5 pt-2">
              <?php foreach ($svc['details'] as $detail): ?>
                <li class="service-detail-item flex items-start gap-2.5 text-xs text-secondary/90 cursor-default">
                  <svg class="h-4 w-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span><?php echo $detail; ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>

          <!-- Contact indicator -->
          <div class="pt-6 mt-6 border-t border-sand flex justify-between items-center text-xs">
            <span class="text-secondary/60 font-medium">Service Available Nationwide</span>
            <span class="text-primary font-bold uppercase tracking-wider font-mono">
              100% Certified
            </span>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- Corporate Consulting Highlight -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-primary text-cream rounded-[40px] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
      <div class="absolute right-0 bottom-0 opacity-10 pointer-events-none">
        <svg class="h-[300px] w-[300px] text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,3C6.48,3 2,7.48 2,13C2,18.52 6.48,23 12,23C17.52,23 22,18.52 22,13C22,7.48 17.52,3 12,3M12,21C7.58,21 4,17.42 4,13C4,8.58 7.58,5 12,5C16.42,5 20,8.58 20,13C20,17.42 16.42,21 12,21M16.5,12H13V8.5C13,7.67 12.33,7 11.5,7C10.67,7 10,7.67 10,8.5V12H6.5C5.67,12 5,12.67 5,13.5C5,14.33 5.67,15 6.5,15H10V18.5C10,19.33 10.67,20 11.5,20C12.33,20 13,19.33 13,18.5V15H16.5C17.33,15 18,14.33 18,13.5C18,12.67 17.33,12 16.5,12Z" />
        </svg>
      </div>
      
      <div class="relative z-10 max-w-3xl space-y-6 text-left">
        <span class="bg-forest text-cream text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-sage/20">
          Commercial Estates &amp; Cooperatives
        </span>
        <h2 class="text-3xl sm:text-4xl font-serif font-light text-white tracking-tight">
          Large Scale Farm Cooperatives <span class="italic">Support</span>
        </h2>
        <p class="text-sm sm:text-base text-cream/80 leading-relaxed font-sans">
          Are you a cooperative manager or commercial estate supervisor? We provide on-site agronomic assessments, coordinated product trials, customized safety briefings for application crews, and bulk pricing systems.
        </p>
        <div class="flex flex-wrap gap-4 pt-2">
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-accent-tan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-xs font-semibold text-cream/90">Direct Delivery Scheduling</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-accent-tan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-xs font-semibold text-cream/90">Guaranteed Potency Checks</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-accent-tan shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-xs font-semibold text-cream/90">Soil Restoration Oversight</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Safety Banner -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
    <div class="inline-flex h-10 w-10 bg-moss text-primary rounded-full items-center justify-center">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
    </div>
    <h3 class="text-xl font-serif font-bold text-secondary">100% Certified Safe &amp; Sustainable</h3>
    <p class="text-secondary/70 max-w-xl mx-auto text-xs leading-relaxed font-sans">
      Our products are tested extensively. They contain absolutely no synthetic chemical residues, ensuring complete safety for livestock, local pollinators, and agricultural runoffs.
    </p>
  </section>

</div>

<?php
include('../footer.php');
?>
