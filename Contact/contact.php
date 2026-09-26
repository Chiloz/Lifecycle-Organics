<?php
$activePage = 'contact';
$baseDir = '../';
$pageStyleFile = 'contact.css';
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

<div class="space-y-16 pb-16 pt-24">
  
  <!-- Title Header -->
  <section class="bg-secondary text-white py-16 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-forest/45"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 z-10">
      <p class="text-accent-tan font-bold uppercase tracking-widest text-xs font-mono">
        Get Quick Answers
      </p>
      <h1 class="text-4xl sm:text-5xl font-serif font-light tracking-tight text-white">
        Contact <span class="italic font-normal">Lifecycle Organics</span>
      </h1>
      <p class="text-cream/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
        Connect directly with our corporate team or dial your nearest regional agent for immediate supply fulfillment and crop protection assistance.
      </p>
    </div>
  </section>

  <!-- Main Layout: Left Representative list / Right Contact Form -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      <!-- Left Column: Instant Agents list -->
      <div class="lg:col-span-5 space-y-8">
        <div class="space-y-2 text-left">
          <span class="text-xs font-bold text-sage uppercase tracking-widest font-mono">
            Direct Agents
          </span>
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-secondary tracking-tight">
            Skip The Form &amp; Call Now
          </h2>
          <p class="text-sm text-secondary/80 leading-relaxed">
            Our representatives are authorized to process immediate deliveries, answer pricing requests, and recommend products.
          </p>
        </div>

        <div class="space-y-4 text-left">
          <?php foreach ($representatives as $rep): 
              $waUrl = "https://wa.me/260" . substr($rep['phone'], 1);
          ?>
              <div class="contact-agent-row bg-white p-5 rounded-[24px] border border-sand shadow-sm flex items-start gap-4 hover:shadow-md transition duration-200">
                <div class="h-10 w-10 rounded-full <?php echo $rep['color']; ?> text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  <?php echo $rep['name'][0]; ?>
                </div>
                <div class="flex-grow space-y-1">
                  <div class="flex justify-between items-start">
                    <h4 class="font-serif font-bold text-secondary text-sm sm:text-base"><?php echo $rep['name']; ?></h4>
                    <span class="bg-moss/40 text-primary text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border border-sage/20">
                      <?php echo $rep['region']; ?>
                    </span>
                  </div>
                  <p class="text-xs text-secondary/60 font-medium">Authorized Agent</p>
                  
                  <div class="flex gap-3 pt-3">
                    <a href="tel:<?php echo $rep['phone']; ?>" class="flex items-center gap-1.5 bg-primary hover:bg-forest text-white font-bold text-[10px] sm:text-xs uppercase tracking-wide px-4 py-2 rounded-lg shadow-sm">
                        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        Call Rep
                    </a>
                    <a href="<?php echo $waUrl; ?>" target="_blank" class="flex items-center gap-1.5 bg-taupe/40 hover:bg-moss/20 text-secondary font-bold text-[10px] sm:text-xs uppercase tracking-wide px-4 py-2 rounded-lg border border-sand">
                        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        WhatsApp
                    </a>
                  </div>
                </div>
              </div>
          <?php endforeach; ?>
        </div>

        <!-- Corporate email info box -->
        <div class="p-6 bg-moss/40 rounded-2xl border border-sage/20 space-y-3 text-left">
          <h3 class="font-serif font-bold text-primary text-sm flex items-center gap-1.5">
              <svg class="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Corporate Enquiries
          </h3>
          <p class="text-xs text-secondary/80 leading-relaxed font-sans">
            For corporate partnerships, official distributor licenses, export opportunities, or cooperative supply agreements, please email our executive team.
          </p>
          <a href="mailto:lifecycleorganics@yahoo.com" class="block text-sm font-bold text-primary hover:text-forest font-mono">
            lifecycleorganics@yahoo.com
          </a>
        </div>
      </div>

      <!-- Right Column: Direct Contact form -->
      <div class="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[32px] border border-sand shadow-sm relative overflow-hidden">
        <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-accent-tan"></div>
        
        <div class="space-y-6">
          <div class="space-y-1 text-left">
            <h3 class="text-2xl font-serif font-bold text-secondary tracking-tight">
              Send A Direct Message
            </h3>
            <p class="text-xs text-secondary/60">
              Fill out your requirements below and we will route your inquiry to the appropriate regional representative.
            </p>
          </div>

          <!-- Success box (Hidden initially) -->
          <div id="contact-success-box" class="p-8 text-center space-y-4 bg-moss/30 border border-sage/20 rounded-2xl animate-fade-in hidden">
              <div class="inline-flex h-14 w-14 bg-moss/50 text-primary rounded-full items-center justify-center">
                  <svg class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
              </div>
              <div class="space-y-1">
                <h4 class="text-lg font-serif font-bold text-secondary">Message Transmitted Successfully!</h4>
                <p class="text-xs text-secondary/80 max-w-md mx-auto">
                  Thank you for contacting Lifecycle Organics. We have routed your inquiry. Our regional agent will respond shortly via phone or email.
                </p>
              </div>
              <button id="reset-contact-form-btn" class="px-6 py-2 rounded-full bg-primary hover:bg-forest text-white font-bold text-xs uppercase tracking-wider shadow-sm transition">
                Send Another Message
              </button>
          </div>

          <!-- Form Element -->
          <form id="direct-contact-form" class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Name input -->
              <div class="space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                  Your Name / Farm Name *
                </label>
                <input
                  type="text"
                  id="form-name"
                  placeholder="e.g. John Banda"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary placeholder-secondary/40"
                />
              </div>

              <!-- Email/Phone input -->
              <div class="space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                  Phone Number or Email *
                </label>
                <input
                  type="text"
                  id="form-contact"
                  placeholder="e.g. 097XXXXXXXX or email"
                  required
                  class="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary placeholder-secondary/40"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Region Selector -->
              <div class="space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                  Your Region hub
                </label>
                <select
                  id="form-region"
                  class="w-full px-4 py-3 rounded-xl border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary"
                >
                  <option value="Lusaka">Lusaka Province</option>
                  <option value="Mkushi">Mkushi Area</option>
                  <option value="Copperbelt">Copperbelt / NW</option>
                  <option value="Central">Central Province</option>
                  <option value="Other">Other Provinces / Nationwide</option>
                </select>
              </div>

              <!-- Product interest selector -->
              <div class="space-y-1.5 text-left">
                <label class="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                  Product of Interest
                </label>
                <select
                  id="form-product"
                  class="w-full px-4 py-3 rounded-xl border border-sand bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary"
                >
                  <option value="Bio-Fertilizer">Bio-Fertilizer (Nourish Soil)</option>
                  <option value="Bio-Sulphur">Bio-Sulphur (Defend Maize)</option>
                  <option value="Bio-Soapcide">Bio-Soapcide (Insecticide Soap)</option>
                  <option value="Consultancy">General Agronomic Services</option>
                </select>
              </div>
            </div>

            <!-- Message box -->
            <div class="space-y-1.5 text-left">
              <label class="text-[11px] font-bold text-secondary/60 uppercase tracking-wider block">
                Message / Order Details
              </label>
              <textarea
                id="form-message"
                rows="5"
                placeholder="Specify estimated canister count (5L) or outline your plant symptoms..."
                class="w-full px-4 py-3 rounded-xl border border-sand focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary resize-none placeholder-secondary/40"
              ></textarea>
            </div>

            <!-- Submission buttons -->
            <div class="pt-2">
              <button
                type="submit"
                class="submit-pulse-effect w-full py-3.5 rounded-full bg-primary hover:bg-forest text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Send Direct Inquiry
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  </section>

</div>

<?php
include('../footer.php');
?>
