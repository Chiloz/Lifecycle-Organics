/**
 * Client-Side Interactivity for Lifecycle Organics
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Liquid Header Scroll Effect
    const mainHeader = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (!mainHeader) return;
        if (window.scrollY > 20) {
            // Scrolled: Apply liquid blur and border contrast
            mainHeader.classList.remove('bg-cream/20', 'border-transparent');
            mainHeader.classList.add('bg-cream/60', 'backdrop-blur-xl', 'shadow-sm', 'border-sand/40', 'py-3');
            mainHeader.classList.remove('py-4');
        } else {
            // At Top: Light transparent blend
            mainHeader.classList.add('bg-cream/20', 'border-transparent', 'py-4');
            mainHeader.classList.remove('bg-cream/60', 'backdrop-blur-xl', 'shadow-sm', 'border-sand/40', 'py-3');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load to ensure state consistency
    handleScroll();


    // 2. Mobile Navigation Drawer Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavPanel = document.getElementById('mobile-nav-panel');
    const mobileDrawerBackdrop = document.getElementById('mobile-drawer-backdrop');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuToggle && mobileNavPanel) {
        const toggleMenu = (show) => {
            const isVisible = show !== undefined ? show : mobileNavPanel.classList.contains('translate-x-full');
            
            if (isVisible) {
                // Open menu
                mobileNavPanel.classList.remove('translate-x-full');
                mobileNavPanel.classList.add('translate-x-0');
                if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('hidden');
                if (menuIcon) menuIcon.classList.add('hidden');
                if (closeIcon) closeIcon.classList.remove('hidden');
            } else {
                // Close menu
                mobileNavPanel.classList.remove('translate-x-0');
                mobileNavPanel.classList.add('translate-x-full');
                if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('hidden');
                if (menuIcon) menuIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
            }
        };

        mobileMenuToggle.addEventListener('click', () => toggleMenu());
        
        if (mobileDrawerBackdrop) {
            mobileDrawerBackdrop.addEventListener('click', () => toggleMenu(false));
        }
    }


    // 3. Products Category Filtering (Applicable on products page)
    const filterButtons = document.querySelectorAll('.product-filter-btn');
    const productCards = document.querySelectorAll('.product-card-item');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state class
                filterButtons.forEach(b => {
                    b.classList.remove('bg-primary', 'text-cream', 'shadow-md');
                    b.classList.add('bg-white', 'text-secondary', 'hover:bg-sand/40');
                });
                btn.classList.add('bg-primary', 'text-cream', 'shadow-md');
                btn.classList.remove('bg-white', 'text-secondary', 'hover:bg-sand/40');

                const selectedCategory = btn.getAttribute('data-filter');

                // Filter cards with subtle fade animations
                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                        card.style.opacity = '0';
                        card.classList.remove('hidden');
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }


    // 4. Products Canister Counters & Order Quotes Estimations
    const productContainers = document.querySelectorAll('.product-quote-container');
    
    if (productContainers.length > 0) {
        productContainers.forEach(container => {
            const btnMinus = container.querySelector('.btn-canister-minus');
            const btnPlus = container.querySelector('.btn-canister-plus');
            const countDisplay = container.querySelector('.canister-count-val');
            const priceVal = parseFloat(container.getAttribute('data-price'));
            const quoteText = container.querySelector('.price-quote-display');
            const whatsappBtn = container.querySelector('.btn-whatsapp-quote');
            const productName = container.getAttribute('data-name');
            
            let count = 1;

            const updateQuote = () => {
                countDisplay.textContent = count;
                const total = priceVal * count;
                quoteText.textContent = total.toLocaleString() + ' ZMW';
                
                if (whatsappBtn) {
                    const repText = `Hello! I would like to order ${count} canister(s) of "${productName}" (Total: ${total} ZMW). Please let me know how to arrange immediate delivery.`;
                    const encodedText = encodeURIComponent(repText);
                    whatsappBtn.href = `https://wa.me/260978123456?text=${encodedText}`;
                }
            };

            if (btnMinus && btnPlus && countDisplay) {
                btnMinus.addEventListener('click', () => {
                    if (count > 1) {
                        count--;
                        updateQuote();
                    }
                });

                btnPlus.addEventListener('click', () => {
                    count++;
                    updateQuote();
                });

                // Run once initial
                updateQuote();
            }
        });
    }


    // 5. Contact Form Validation and Submission Handling (Applicable on contact page)
    const contactForm = document.getElementById('direct-contact-form');
    const submitSuccessBox = document.getElementById('contact-success-box');
    
    if (contactForm && submitSuccessBox) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Fetch values
            const nameInput = document.getElementById('form-name').value.trim();
            const contactInput = document.getElementById('form-contact').value.trim();
            const regionInput = document.getElementById('form-region') ? document.getElementById('form-region').value : '';
            const productInput = document.getElementById('form-product') ? document.getElementById('form-product').value : '';
            const messageInput = document.getElementById('form-message') ? document.getElementById('form-message').value.trim() : '';
            
            if (!nameInput || !contactInput) {
                alert('Please fill in both your Name and Phone Number/Email contact.');
                return;
            }
            
            // Show sending state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Transmitting Message...
            `;
            
            try {
                await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: nameInput,
                        contact: contactInput,
                        region: regionInput,
                        product: productInput,
                        message: messageInput
                    })
                });
            } catch (err) {
                console.warn('Network submission notice:', err);
            }

            contactForm.classList.add('hidden');
            submitSuccessBox.classList.remove('hidden');
            
            // Clear state
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });

        // "Send another message" reset trigger
        const resetFormBtn = document.getElementById('reset-contact-form-btn');
        if (resetFormBtn) {
            resetFormBtn.addEventListener('click', () => {
                submitSuccessBox.classList.add('hidden');
                contactForm.classList.remove('hidden');
            });
        }
    }
});
