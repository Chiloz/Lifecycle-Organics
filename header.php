<?php
// Global Header Template for Lifecycle Organics PHP Version
if (!isset($activePage)) {
    $activePage = 'home';
}
if (!isset($baseDir)) {
    $baseDir = './';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lifecycle Organics - Professional Ecological Agriculture</title>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <!-- Tailwind CSS Play CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#2d4a22',     // Forest Dark Olive
                        secondary: '#1b2a16',   // Rich Midnight Green
                        forest: '#142111',      // Extra deep green
                        leaf: '#4c7a34',        // Organic green
                        sage: '#8fa882',        // Muted soft green
                        moss: '#d0ddcb',        // Light sage moss
                        cream: '#f9f6f0',       // Main Warm backdrop cream
                        sand: '#e9e4d9',        // Light sand border cream
                        taupe: '#dfd9cc',       // Warm taupe gray accent
                        'accent-tan': '#c29a63',// Premium Gold/Tan Accent
                    },
                    fontFamily: {
                        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                        serif: ['Playfair Display', 'Georgia', 'serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                        display: ['Space Grotesk', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <link rel="stylesheet" href="<?php echo $baseDir; ?>style.css">
    <?php if (isset($pageStyleFile)): ?>
        <link rel="stylesheet" href="<?php echo $pageStyleFile; ?>">
    <?php endif; ?>
</head>
<body class="min-h-screen bg-cream font-sans flex flex-col justify-between text-secondary selection:bg-moss selection:text-primary">

    <!-- Header Navigation with Liquid Backdrop -->
    <header id="main-header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b bg-cream/20 backdrop-blur-md py-4 border-transparent">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                <!-- Logo -->
                <a href="<?php echo $baseDir; ?>index.php" class="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 transition">
                    <div class="flex items-center gap-3 h-11">
                        <!-- Custom SVG Logo -->
                        <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-auto">
                            <path d="M50 5C50 5 10 50 10 75C10 97.1 27.9 115 50 115C72.1 115 90 97.1 90 75C90 50 50 5 50 5Z" fill="#2d4a22" fill-opacity="0.08" stroke="#588157" stroke-width="6" stroke-linejoin="round"/>
                            <path d="M15 80C30 75 45 85 60 80C75 75 85 80 85 80C85 80 80 98 50 98C20 98 15 80 15 80Z" fill="#2d4a22"/>
                            <path d="M50 90V45M50 45L40 37M50 45L60 37M50 55L40 47M50 55L60 47M50 65L42 57M50 65L58 57M50 75L44 67M50 75L56 67" stroke="#a3b18a" stroke-width="4" stroke-linecap="round"/>
                            <path d="M50 35C45 25 50 15 50 15C50 15 55 25 50 35Z" fill="#588157"/>
                        </svg>
                        <div class="flex flex-col leading-none text-left">
                            <span class="text-xl font-bold tracking-tight text-primary font-serif">Lifecycle</span>
                            <span class="text-xs font-semibold tracking-widest text-leaf uppercase font-mono">Organics</span>
                        </div>
                    </div>
                </a>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center space-x-1">
                    <?php
                    $navItems = [
                        'home' => ['label' => 'Home', 'url' => 'index.php'],
                        'products' => ['label' => 'Products', 'url' => 'Products/products.php'],
                        'services' => ['label' => 'Services', 'url' => 'Services/services.php'],
                        'about' => ['label' => 'About Us', 'url' => 'About/about.php'],
                        'contact' => ['label' => 'Contact', 'url' => 'Contact/contact.php']
                    ];
                    foreach ($navItems as $key => $item):
                        $isActive = ($activePage === $key);
                    ?>
                        <a href="<?php echo $baseDir . $item['url']; ?>" class="px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 <?php echo $isActive ? 'bg-primary text-cream shadow-md' : 'text-secondary hover:text-primary hover:bg-taupe/60'; ?>">
                            <?php echo $item['label']; ?>
                        </a>
                    <?php endforeach; ?>
                </nav>

                <!-- Desktop CTA -->
                <div class="hidden lg:flex items-center">
                    <a href="<?php echo $baseDir; ?>Contact/contact.php" class="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-md bg-primary hover:bg-forest text-cream transition duration-200">
                        <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        Get in Touch
                    </a>
                </div>

                <!-- Mobile Menu Toggle Button -->
                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-toggle" class="p-2 rounded-lg focus:outline-none text-secondary hover:bg-taupe/50" aria-label="Toggle menu">
                        <svg id="menu-icon" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                        <svg id="close-icon" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Drawer Backdrop -->
        <div id="mobile-drawer-backdrop" class="md:hidden fixed inset-0 top-[60px] bg-secondary/40 backdrop-blur-sm z-40 hidden"></div>

        <!-- Mobile Navigation Panel -->
        <div id="mobile-nav-panel" class="md:hidden fixed top-[60px] right-0 w-4/5 max-w-sm h-screen bg-cream shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out">
            <div class="px-5 py-6 space-y-4 flex flex-col h-full bg-cream/95">
                <div class="pb-4 border-b border-sand">
                    <p class="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-2">
                        <svg class="h-3 w-3 text-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                        </svg>
                        Complete Nutrition
                    </p>
                    <p class="text-xs text-secondary/70 leading-relaxed">
                        Sustainable organic agriculture solutions for healthier soils and robust crop yields.
                    </p>
                </div>

                <div class="space-y-1.5 flex-grow">
                    <?php foreach ($navItems as $key => $item):
                        $isActive = ($activePage === $key);
                    ?>
                        <a href="<?php echo $baseDir . $item['url']; ?>" class="w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-colors <?php echo $isActive ? 'bg-primary text-cream shadow-md' : 'text-secondary hover:bg-taupe hover:text-primary'; ?>">
                            <span><?php echo $item['label']; ?></span>
                            <?php if ($isActive): ?>
                                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                            <?php endif; ?>
                        </a>
                    <?php endforeach; ?>
                </div>

                <!-- Mobile Contacts -->
                <div class="pt-4 border-t border-sand pb-20 space-y-3">
                    <p class="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                        <svg class="h-3.5 w-3.5 text-leaf" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                        100% Sustainable & Safe
                    </p>
                    <a href="mailto:lifecycleorganics@yahoo.com" class="block text-sm text-secondary/80 hover:text-primary font-mono">
                        lifecycleorganics@yahoo.com
                    </a>
                    <a href="<?php echo $baseDir; ?>Contact/contact.php" class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-forest text-white font-semibold text-sm shadow-md transition">
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        Contact Regional Agents
                    </a>
                </div>
            </div>
        </div>
    </header>
