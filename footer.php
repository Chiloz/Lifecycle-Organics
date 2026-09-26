<?php
// Global Footer Template for Lifecycle Organics PHP Version
if (!isset($baseDir)) {
    $baseDir = './';
}
?>
    <!-- Reusable Footer -->
    <footer class="bg-secondary text-cream pt-20 pb-10 border-t border-sand/15 relative overflow-hidden">
        <!-- Aesthetic background blur highlight -->
        <div class="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 border-b border-sand/10">
                
                <!-- Brand section -->
                <div class="md:col-span-4 space-y-6 text-left">
                    <div class="flex items-center gap-3 h-10">
                        <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-auto text-sage">
                            <path d="M50 5C50 5 10 50 10 75C10 97.1 27.9 115 50 115C72.1 115 90 97.1 90 75C90 50 50 5 50 5Z" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/>
                            <path d="M15 80C30 75 45 85 60 80C75 75 85 80 85 80C85 80 80 98 50 98C20 98 15 80 15 80Z" fill="currentColor"/>
                            <path d="M50 90V45M50 45L40 37M50 45L60 37M50 55L40 47M50 55L60 47M50 65L42 57M50 65L58 57M50 75L44 67M50 75L56 67" stroke="#dfd9cc" stroke-width="4" stroke-linecap="round"/>
                            <path d="M50 35C45 25 50 15 50 15C50 15 55 25 50 35Z" fill="#8fa882"/>
                        </svg>
                        <div class="flex flex-col leading-none">
                            <span class="text-lg font-bold font-serif text-cream">Lifecycle</span>
                            <span class="text-[10px] font-semibold tracking-widest text-sage uppercase font-mono">Organics</span>
                        </div>
                    </div>
                    <p class="text-xs text-cream/70 leading-relaxed font-sans max-w-sm">
                        Committed to high-yield sustainable agriculture across Zambia. We supply certified bio-fertilizers and pest solutions that protect your crops naturally.
                    </p>
                    <div class="flex items-center gap-3">
                        <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span class="text-[10px] font-bold uppercase tracking-wider font-mono text-cream/60">Zambian Organic Standard Certified</span>
                    </div>
                </div>

                <!-- Fast links -->
                <div class="md:col-span-3 space-y-4 text-left">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-accent-tan font-mono">Navigation Links</h4>
                    <ul class="space-y-2 text-sm text-cream/80 font-sans">
                        <li><a href="<?php echo $baseDir; ?>index.php" class="hover:text-accent-tan transition duration-150">Home Platform</a></li>
                        <li><a href="<?php echo $baseDir; ?>Products/products.php" class="hover:text-accent-tan transition duration-150">Botanical Formulas</a></li>
                        <li><a href="<?php echo $baseDir; ?>Services/services.php" class="hover:text-accent-tan transition duration-150">Agronomic Consultations</a></li>
                        <li><a href="<?php echo $baseDir; ?>About/about.php" class="hover:text-accent-tan transition duration-150">About Our Mission</a></li>
                        <li><a href="<?php echo $baseDir; ?>Contact/contact.php" class="hover:text-accent-tan transition duration-150">Connect with Agents</a></li>
                    </ul>
                </div>

                <!-- Products list fast links -->
                <div class="md:col-span-3 space-y-4 text-left">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-accent-tan font-mono">Organic Products</h4>
                    <ul class="space-y-2 text-sm text-cream/80 font-sans">
                        <li><a href="<?php echo $baseDir; ?>Products/products.php?id=bio-fertilizer" class="hover:text-accent-tan transition duration-150">Bio-Fertilizer (Nourish)</a></li>
                        <li><a href="<?php echo $baseDir; ?>Products/products.php?id=bio-sulphur" class="hover:text-accent-tan transition duration-150">Bio-Sulphur (Defend)</a></li>
                        <li><a href="<?php echo $baseDir; ?>Products/products.php?id=bio-soapcide" class="hover:text-accent-tan transition duration-150">Bio-Soapcide (Insecticide)</a></li>
                    </ul>
                </div>

                <!-- Contact info -->
                <div class="md:col-span-2 space-y-4 text-left">
                    <h4 class="text-xs font-bold uppercase tracking-widest text-accent-tan font-mono">Headquarters</h4>
                    <div class="text-xs text-cream/70 leading-relaxed font-sans space-y-2">
                        <p class="font-semibold text-cream">Lifecycle Organics Ltd.</p>
                        <p>Plot 481, Great East Road,</p>
                        <p>Lusaka, Zambia</p>
                        <a href="mailto:lifecycleorganics@yahoo.com" class="block font-bold font-mono text-accent-tan hover:underline pt-2">
                            lifecycleorganics@yahoo.com
                        </a>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom copyright -->
            <div class="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-cream/50 gap-4 font-mono">
                <p>© <?php echo date('Y'); ?> <button type="button" id="php-admin-login-btn" class="hover:text-accent-tan transition-colors duration-150 underline-offset-2 hover:underline font-semibold cursor-pointer text-cream/90 inline-block" title="Staff Portal">Lifecycle Organics Limited</button>. All Rights Reserved.</p>
                <div class="flex gap-6">
                    <span>100% Eco-Friendly</span>
                    <span>No Synthetic Chemicals</span>
                    <span>Proudly Zambian</span>
                </div>
            </div>
        </div>
    </footer>

    <!-- JS Scripts -->
    <script src="<?php echo $baseDir; ?>script.js"></script>
</body>
</html>
