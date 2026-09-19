import { 
  getProducts, 
  saveProduct, 
  deleteProduct, 
  getTestimonials, 
  saveTestimonial, 
  deleteTestimonial, 
  getInquiries 
} from '/js/data-service.js';

import { 
  initFirebase, 
  getActiveFirebaseConfig, 
  saveActiveFirebaseConfig, 
  testConnection 
} from '/firebase-config.js';

// Application State
let currentProducts = [];
let currentTestimonials = [];
let currentInquiries = [];

// Default Admin Credentials
const DEFAULT_ADMIN_PASSWORD = 'Lifecycle@2026';
const BACKUP_ADMIN_PASSWORD = 'admin123';

function getStoredAdminPassword() {
  return localStorage.getItem('lifecycle_admin_password') || DEFAULT_ADMIN_PASSWORD;
}

function isAuthenticated() {
  return (
    localStorage.getItem('lifecycle_admin_auth') === 'true' ||
    sessionStorage.getItem('lifecycle_admin_auth') === 'true'
  );
}

document.addEventListener('DOMContentLoaded', async () => {
  setupAuthentication();
  setupTabs();
  setupFilters();
  setupFirebaseConfigUI();
  setupPasswordManagerUI();
  setupProductModals();
  setupTestimonialModals();

  if (isAuthenticated()) {
    onLoginSuccess(false);
  }
});

// ==============================================================
// 1. ADMIN AUTHENTICATION
// ==============================================================
function setupAuthentication() {
  const loginScreen = document.getElementById('admin-login-screen');
  const loginForm = document.getElementById('admin-login-form');
  const pwdInput = document.getElementById('admin-password-input');
  const rememberCheckbox = document.getElementById('admin-remember-me');
  const errorMsg = document.getElementById('login-error-msg');
  const togglePwdBtn = document.getElementById('btn-toggle-pwd');
  const autoFillBtn = document.getElementById('btn-fill-default-pwd');
  const logoutBtn = document.getElementById('btn-admin-logout');

  // If already authenticated, hide login screen right away
  if (isAuthenticated()) {
    loginScreen.classList.add('hidden');
  }

  // Toggle show/hide password
  if (togglePwdBtn) {
    togglePwdBtn.addEventListener('click', () => {
      const type = pwdInput.getAttribute('type') === 'password' ? 'text' : 'password';
      pwdInput.setAttribute('type', type);
      togglePwdBtn.textContent = type === 'password' ? '👁️' : '🔒';
    });
  }

  // Auto-fill default password for quick convenience
  if (autoFillBtn) {
    autoFillBtn.addEventListener('click', () => {
      pwdInput.value = getStoredAdminPassword();
      pwdInput.focus();
      errorMsg.classList.add('hidden');
    });
  }

  // Handle Login submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = (pwdInput.value || '').trim();
      const validPwd = getStoredAdminPassword();

      if (entered === validPwd || entered === BACKUP_ADMIN_PASSWORD) {
        // Success
        errorMsg.classList.add('hidden');
        if (rememberCheckbox && rememberCheckbox.checked) {
          localStorage.setItem('lifecycle_admin_auth', 'true');
        } else {
          sessionStorage.setItem('lifecycle_admin_auth', 'true');
        }
        onLoginSuccess(true);
      } else {
        // Fail
        errorMsg.classList.remove('hidden');
        errorMsg.textContent = 'Incorrect admin password. Please try again or use the default: Lifecycle@2026';
        pwdInput.focus();
      }
    });
  }

  // Handle Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to sign out of the Admin Console?')) {
        localStorage.removeItem('lifecycle_admin_auth');
        sessionStorage.removeItem('lifecycle_admin_auth');
        loginScreen.classList.remove('hidden');
        if (pwdInput) {
          pwdInput.value = '';
          pwdInput.focus();
        }
      }
    });
  }
}

async function onLoginSuccess(isNewLogin = false) {
  const loginScreen = document.getElementById('admin-login-screen');
  if (loginScreen) {
    loginScreen.classList.add('hidden');
  }
  await checkFirebaseStatus();
  await loadAllData();
}

// ==============================================================
// 2. PASSWORD MANAGER (Settings Tab)
// ==============================================================
function setupPasswordManagerUI() {
  const form = document.getElementById('form-change-password');
  const feedback = document.getElementById('password-feedback');
  const resetBtn = document.getElementById('btn-reset-default-pwd');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = document.getElementById('input-current-pwd').value.trim();
      const newPwd = document.getElementById('input-new-pwd').value.trim();
      const confirmPwd = document.getElementById('input-confirm-pwd').value.trim();
      const activePwd = getStoredAdminPassword();

      if (current !== activePwd && current !== BACKUP_ADMIN_PASSWORD) {
        feedback.className = 'text-xs font-mono p-3 rounded-xl bg-red-100 text-red-800 block';
        feedback.textContent = 'Current password does not match. Please verify.';
        return;
      }

      if (newPwd.length < 6) {
        feedback.className = 'text-xs font-mono p-3 rounded-xl bg-red-100 text-red-800 block';
        feedback.textContent = 'New password must be at least 6 characters.';
        return;
      }

      if (newPwd !== confirmPwd) {
        feedback.className = 'text-xs font-mono p-3 rounded-xl bg-red-100 text-red-800 block';
        feedback.textContent = 'New password and confirmation do not match.';
        return;
      }

      localStorage.setItem('lifecycle_admin_password', newPwd);
      feedback.className = 'text-xs font-mono p-3 rounded-xl bg-emerald-100 text-emerald-800 block';
      feedback.textContent = 'Admin password updated successfully! Keep it secure.';
      form.reset();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset admin password to default "Lifecycle@2026"?')) {
        localStorage.removeItem('lifecycle_admin_password');
        if (feedback) {
          feedback.className = 'text-xs font-mono p-3 rounded-xl bg-emerald-100 text-emerald-800 block';
          feedback.textContent = 'Password reset to default (Lifecycle@2026).';
        }
      }
    });
  }
}

// ==============================================================
// 3. TAB SWITCHING
// ==============================================================
function setupTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active', 'border-primary', 'text-primary');
        t.classList.add('border-transparent', 'text-secondary/70');
      });
      tab.classList.add('active', 'border-primary', 'text-primary');
      tab.classList.remove('border-transparent', 'text-secondary/70');

      const targetId = tab.getAttribute('data-target');
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.add('hidden');
      });
      const activePane = document.getElementById(targetId);
      if (activePane) activePane.classList.remove('hidden');
    });
  });

  const quickConfigBtn = document.getElementById('btn-quick-config');
  if (quickConfigBtn) {
    quickConfigBtn.addEventListener('click', () => {
      const fbTab = document.querySelector('[data-target="tab-firebase"]');
      if (fbTab) fbTab.click();
    });
  }
}

// ==============================================================
// 4. SEARCH & FILTERING CONTROLLERS
// ==============================================================
function setupFilters() {
  const searchInput = document.getElementById('search-products');
  const catFilter = document.getElementById('filter-product-category');
  const testFilter = document.getElementById('filter-testimonial-visibility');

  if (searchInput) {
    searchInput.addEventListener('input', () => filterAndRenderProducts());
  }
  if (catFilter) {
    catFilter.addEventListener('change', () => filterAndRenderProducts());
  }
  if (testFilter) {
    testFilter.addEventListener('change', () => filterAndRenderTestimonials());
  }
}

function filterAndRenderProducts() {
  const searchInput = document.getElementById('search-products');
  const catFilter = document.getElementById('filter-product-category');
  const badge = document.getElementById('products-counter-badge');
  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const category = catFilter ? catFilter.value : 'ALL';

  let filtered = currentProducts.filter(p => {
    const matchesCategory = (category === 'ALL') || (p.category === category);
    const searchTarget = `${p.name || ''} ${p.brand || ''} ${p.description || ''} ${(p.features || []).join(' ')}`.toLowerCase();
    const matchesQuery = !query || searchTarget.includes(query);
    return matchesCategory && matchesQuery;
  });

  if (badge) {
    badge.textContent = `Showing ${filtered.length} of ${currentProducts.length} products`;
  }
  renderProductsList(filtered);
}

function filterAndRenderTestimonials() {
  const testFilter = document.getElementById('filter-testimonial-visibility');
  const visibility = testFilter ? testFilter.value : 'ALL';

  let filtered = currentTestimonials.filter(t => {
    if (visibility === 'FEATURED') return Boolean(t.featured);
    return true;
  });

  renderTestimonialsList(filtered);
}

// ==============================================================
// 5. FIREBASE STATUS & CONFIGURATION
// ==============================================================
async function checkFirebaseStatus() {
  const pill = document.getElementById('firebase-status-pill');
  const dot = document.getElementById('firebase-status-dot');
  const text = document.getElementById('firebase-status-text');
  const metricStatus = document.getElementById('metric-firebase-status');

  const config = getActiveFirebaseConfig();
  if (!config.projectId || !config.apiKey) {
    if (dot) dot.className = 'h-2 w-2 rounded-full bg-amber-400';
    if (text) text.textContent = 'Local / Ready for Firebase';
    if (metricStatus) {
      metricStatus.textContent = 'Local Sync';
      metricStatus.className = 'text-base font-bold font-mono text-amber-600';
    }
    return;
  }

  if (text) text.textContent = `Verifying ${config.projectId}...`;
  const result = await testConnection();

  if (result.success) {
    if (dot) dot.className = 'h-2 w-2 rounded-full bg-emerald-500';
    if (text) text.textContent = `Firebase: ${config.projectId}`;
    if (metricStatus) {
      metricStatus.textContent = config.projectId;
      metricStatus.className = 'text-base font-bold font-mono text-emerald-600';
    }
  } else {
    if (dot) dot.className = 'h-2 w-2 rounded-full bg-amber-400';
    if (text) text.textContent = `Local (Sync Ready)`;
    if (metricStatus) {
      metricStatus.textContent = config.projectId;
      metricStatus.className = 'text-base font-bold font-mono text-amber-600';
    }
  }
}

function setupFirebaseConfigUI() {
  const config = getActiveFirebaseConfig();
  document.getElementById('fb-projectId').value = config.projectId || '';
  document.getElementById('fb-apiKey').value = config.apiKey || '';
  document.getElementById('fb-authDomain').value = config.authDomain || '';
  document.getElementById('fb-storageBucket').value = config.storageBucket || '';
  document.getElementById('fb-messagingSenderId').value = config.messagingSenderId || '';
  document.getElementById('fb-appId').value = config.appId || '';

  const form = document.getElementById('firebase-config-form');
  const feedback = document.getElementById('firebase-test-feedback');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const updated = {
        projectId: document.getElementById('fb-projectId').value.trim(),
        apiKey: document.getElementById('fb-apiKey').value.trim(),
        authDomain: document.getElementById('fb-authDomain').value.trim(),
        storageBucket: document.getElementById('fb-storageBucket').value.trim(),
        messagingSenderId: document.getElementById('fb-messagingSenderId').value.trim(),
        appId: document.getElementById('fb-appId').value.trim()
      };

      saveActiveFirebaseConfig(updated);
      feedback.className = 'text-xs font-mono p-3 rounded-xl bg-moss text-primary block';
      feedback.textContent = 'Configuration saved to browser session. Verifying connection...';

      await checkFirebaseStatus();
      const test = await testConnection();
      feedback.className = test.success 
        ? 'text-xs font-mono p-3 rounded-xl bg-emerald-100 text-emerald-800 block'
        : 'text-xs font-mono p-3 rounded-xl bg-amber-100 text-amber-800 block';
      feedback.textContent = test.message;
    });
  }

  const testBtn = document.getElementById('btn-test-firebase');
  if (testBtn) {
    testBtn.addEventListener('click', async () => {
      feedback.className = 'text-xs font-mono p-3 rounded-xl bg-sand text-secondary block';
      feedback.textContent = 'Testing Firestore connection...';
      const test = await testConnection();
      feedback.className = test.success 
        ? 'text-xs font-mono p-3 rounded-xl bg-emerald-100 text-emerald-800 block'
        : 'text-xs font-mono p-3 rounded-xl bg-amber-100 text-amber-800 block';
      feedback.textContent = test.message;
      await checkFirebaseStatus();
    });
  }
}

// ==============================================================
// 6. LOAD ALL DATA
// ==============================================================
async function loadAllData() {
  await Promise.all([
    renderProductsTab(),
    renderTestimonialsTab(),
    renderInquiriesTab()
  ]);
}

// ==============================================================
// 7. PRODUCTS TAB & RENDERING
// ==============================================================
async function renderProductsTab() {
  const countMetric = document.getElementById('metric-products-count');
  currentProducts = await getProducts();

  if (countMetric) countMetric.textContent = currentProducts.length;
  filterAndRenderProducts();
}

function renderProductsList(products) {
  const container = document.getElementById('products-list-container');
  if (!container) return;

  if (!products || products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-secondary/60 bg-white rounded-2xl border border-sand">
        No matching organic products found. Click <strong>"+ Post Product"</strong> to register a new bio-formula!
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden flex flex-col justify-between group hover:border-primary/40 transition">
      <div>
        <div class="relative aspect-video bg-cream overflow-hidden">
          <img src="${p.image || '/assets/images/bio_fertilizer_1783345223620.jpg'}" alt="${p.name}" class="w-full h-full object-cover">
          <span class="absolute top-3 left-3 bg-accent-tan text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
            ${p.badge || 'Certified'}
          </span>
          <span class="absolute top-3 right-3 bg-primary text-cream text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm">
            ZMW ${p.price || 0}
          </span>
        </div>
        <div class="p-5 space-y-2">
          <div class="flex items-center justify-between">
            <p class="text-[10px] font-bold text-sage uppercase tracking-widest font-mono">${p.brand || 'ORGANIC FORMULA'}</p>
            <span class="text-[10px] bg-sand/60 px-2 py-0.5 rounded text-secondary font-mono">${p.category || 'Bio-Fertilizer'}</span>
          </div>
          <h3 class="text-base font-bold text-secondary font-serif">${p.name}</h3>
          <p class="text-xs text-accent-tan italic">"${p.tagline || ''}"</p>
          <p class="text-xs text-secondary/70 line-clamp-2">${p.description || ''}</p>
          <div class="pt-2 flex flex-wrap gap-1">
            ${(p.features || []).slice(0, 2).map(f => `<span class="bg-moss text-primary text-[10px] font-semibold px-2 py-0.5 rounded-md">${f}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="p-4 bg-sand/20 border-t border-sand flex items-center justify-between gap-2">
        <a href="/products?id=${p.id}" target="_blank" class="text-xs text-primary hover:text-forest font-semibold flex items-center gap-1">
          Public Page ↗
        </a>
        <div class="flex items-center gap-1.5">
          <button class="btn-edit-product px-3 py-1.5 text-xs bg-white hover:bg-taupe/40 text-secondary border border-sand rounded-lg font-semibold transition" data-id="${p.id}">
            Edit
          </button>
          <button class="btn-delete-product px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-semibold transition" data-id="${p.id}">
            Delete
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Bind edit & delete buttons
  container.querySelectorAll('.btn-edit-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const prod = currentProducts.find(p => p.id === id);
      if (prod) openProductModal(prod);
    });
  });

  container.querySelectorAll('.btn-delete-product').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm(`Are you sure you want to delete this product?`)) {
        btn.textContent = 'Deleting...';
        await deleteProduct(id);
        await renderProductsTab();
      }
    });
  });
}

function setupProductModals() {
  const modal = document.getElementById('modal-product');
  const openBtn = document.getElementById('btn-add-product');
  const closeBtn = document.getElementById('modal-product-close');
  const cancelBtn = document.getElementById('modal-product-cancel');
  const form = document.getElementById('product-form');

  if (openBtn) openBtn.addEventListener('click', () => openProductModal());
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  if (cancelBtn) cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

  // Preset image pickers
  document.querySelectorAll('.btn-preset-img').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.getAttribute('data-img');
      document.getElementById('prod-image').value = img;
    });
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('prod-id').value || ('prod-' + Date.now());
      const featuresRaw = document.getElementById('prod-features').value;
      const features = featuresRaw ? featuresRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

      const productData = {
        id,
        name: document.getElementById('prod-name').value.trim(),
        brand: document.getElementById('prod-brand').value.trim() || 'BIO-AGRICULTURE',
        category: document.getElementById('prod-category').value,
        price: Number(document.getElementById('prod-price').value) || 0,
        badge: document.getElementById('prod-badge').value.trim() || '100% Organic',
        tagline: document.getElementById('prod-tagline').value.trim(),
        image: document.getElementById('prod-image').value.trim() || '/assets/images/bio_fertilizer_1783345223620.jpg',
        description: document.getElementById('prod-description').value.trim(),
        features,
        usage: document.getElementById('prod-usage').value.trim(),
        inStock: true
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Saving...';
      await saveProduct(productData);
      submitBtn.textContent = 'Save Product';
      modal.classList.add('hidden');
      await renderProductsTab();
    });
  }
}

function openProductModal(prod = null) {
  const modal = document.getElementById('modal-product');
  const title = document.getElementById('modal-product-title');

  if (prod) {
    title.textContent = 'Edit Organic Product';
    document.getElementById('prod-id').value = prod.id;
    document.getElementById('prod-name').value = prod.name || '';
    document.getElementById('prod-brand').value = prod.brand || '';
    document.getElementById('prod-category').value = prod.category || 'Bio-Fertilizers';
    document.getElementById('prod-price').value = prod.price || 0;
    document.getElementById('prod-badge').value = prod.badge || '';
    document.getElementById('prod-tagline').value = prod.tagline || '';
    document.getElementById('prod-image').value = prod.image || '';
    document.getElementById('prod-description').value = prod.description || '';
    document.getElementById('prod-features').value = (prod.features || []).join(', ');
    document.getElementById('prod-usage').value = prod.usage || '';
  } else {
    title.textContent = 'Add New Organic Product';
    document.getElementById('prod-id').value = '';
    document.getElementById('prod-name').value = '';
    document.getElementById('prod-brand').value = 'SOIL STIMULANT';
    document.getElementById('prod-category').value = 'Bio-Fertilizers';
    document.getElementById('prod-price').value = '150';
    document.getElementById('prod-badge').value = '10x Faster Growth';
    document.getElementById('prod-tagline').value = 'Nourishes Soil, Boosts Growth';
    document.getElementById('prod-image').value = '/assets/images/bio_fertilizer_1783345223620.jpg';
    document.getElementById('prod-description').value = '';
    document.getElementById('prod-features').value = '100% Organic & Safe, Nitrogen Fixation';
    document.getElementById('prod-usage').value = 'Mix 50ml per 10L clean water in knapsack sprayer.';
  }

  modal.classList.remove('hidden');
}

// ==============================================================
// 8. TESTIMONIALS TAB & RENDERING
// ==============================================================
async function renderTestimonialsTab() {
  const countMetric = document.getElementById('metric-testimonials-count');
  currentTestimonials = await getTestimonials(false);

  if (countMetric) countMetric.textContent = currentTestimonials.length;
  filterAndRenderTestimonials();
}

function renderTestimonialsList(testimonials) {
  const container = document.getElementById('testimonials-list-container');
  if (!container) return;

  if (!testimonials || testimonials.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-secondary/60 bg-white rounded-2xl border border-sand">
        No testimonials match the filter. Click <strong>"+ Post Testimonial"</strong> to add farmer quotes!
      </div>
    `;
    return;
  }

  container.innerHTML = testimonials.map(t => {
    const stars = '★'.repeat(t.rating || 5) + '☆'.repeat(Math.max(0, 5 - (t.rating || 5)));
    return `
      <div class="bg-white rounded-2xl border border-sand shadow-sm p-6 space-y-4 flex flex-col justify-between hover:border-primary/40 transition">
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="text-base font-bold text-secondary font-serif">${t.author}</h3>
              <p class="text-xs text-sage font-medium">${t.role || 'Farmer'} • ${t.farmOrCompany || ''}</p>
              <p class="text-[11px] text-secondary/60 font-mono">${t.location || 'Zambia'} ${t.crop ? `• Crop: ${t.crop}` : ''}</p>
            </div>
            <div class="text-right">
              <span class="text-accent-tan text-sm tracking-wider font-bold">${stars}</span>
              <div class="mt-1">
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${t.featured ? 'bg-moss text-primary' : 'bg-sand text-secondary/60'}">
                  ${t.featured ? 'Homepage' : 'Archive'}
                </span>
              </div>
            </div>
          </div>

          <div class="bg-cream/70 p-4 rounded-xl border border-sand/60">
            <p class="text-xs sm:text-sm text-secondary/85 italic leading-relaxed">
              "${t.quote}"
            </p>
          </div>
        </div>

        <div class="pt-3 border-t border-sand flex items-center justify-between gap-2">
          <button class="btn-toggle-featured text-xs font-semibold text-primary hover:text-forest" data-id="${t.id}">
            ${t.featured ? 'Remove from Homepage' : 'Pin to Homepage'}
          </button>
          <div class="flex items-center gap-1.5">
            <button class="btn-edit-testimonial px-3 py-1.5 text-xs bg-white hover:bg-taupe/40 text-secondary border border-sand rounded-lg font-semibold transition" data-id="${t.id}">
              Edit
            </button>
            <button class="btn-delete-testimonial px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-semibold transition" data-id="${t.id}">
              Delete
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.btn-toggle-featured').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const test = currentTestimonials.find(t => t.id === id);
      if (test) {
        test.featured = !test.featured;
        btn.textContent = 'Updating...';
        await saveTestimonial(test);
        await renderTestimonialsTab();
      }
    });
  });

  container.querySelectorAll('.btn-edit-testimonial').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const test = currentTestimonials.find(t => t.id === id);
      if (test) openTestimonialModal(test);
    });
  });

  container.querySelectorAll('.btn-delete-testimonial').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Delete this testimonial?')) {
        btn.textContent = 'Deleting...';
        await deleteTestimonial(id);
        await renderTestimonialsTab();
      }
    });
  });
}

function setupTestimonialModals() {
  const modal = document.getElementById('modal-testimonial');
  const openBtn = document.getElementById('btn-add-testimonial');
  const closeBtn = document.getElementById('modal-testimonial-close');
  const cancelBtn = document.getElementById('modal-testimonial-cancel');
  const form = document.getElementById('testimonial-form');

  if (openBtn) openBtn.addEventListener('click', () => openTestimonialModal());
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  if (cancelBtn) cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('test-id').value || ('test-' + Date.now());
      const testimonialData = {
        id,
        author: document.getElementById('test-author').value.trim(),
        role: document.getElementById('test-role').value.trim(),
        farmOrCompany: document.getElementById('test-farm').value.trim(),
        location: document.getElementById('test-location').value.trim(),
        crop: document.getElementById('test-crop').value.trim(),
        rating: Number(document.getElementById('test-rating').value) || 5,
        quote: document.getElementById('test-quote').value.trim(),
        featured: document.getElementById('test-featured').checked,
        approved: true
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Publishing...';
      await saveTestimonial(testimonialData);
      submitBtn.textContent = 'Publish Testimonial';
      modal.classList.add('hidden');
      await renderTestimonialsTab();
    });
  }
}

function openTestimonialModal(test = null) {
  const modal = document.getElementById('modal-testimonial');
  const title = document.getElementById('modal-testimonial-title');

  if (test) {
    title.textContent = 'Edit Farmer Testimonial';
    document.getElementById('test-id').value = test.id;
    document.getElementById('test-author').value = test.author || '';
    document.getElementById('test-role').value = test.role || '';
    document.getElementById('test-farm').value = test.farmOrCompany || '';
    document.getElementById('test-location').value = test.location || '';
    document.getElementById('test-crop').value = test.crop || '';
    document.getElementById('test-rating').value = String(test.rating || 5);
    document.getElementById('test-quote').value = test.quote || '';
    document.getElementById('test-featured').checked = Boolean(test.featured);
  } else {
    title.textContent = 'Post Farmer Testimonial';
    document.getElementById('test-id').value = '';
    document.getElementById('test-author').value = '';
    document.getElementById('test-role').value = 'Commercial Maize Grower';
    document.getElementById('test-farm').value = '';
    document.getElementById('test-location').value = 'Mkushi Farming Block';
    document.getElementById('test-crop').value = 'Maize';
    document.getElementById('test-rating').value = '5';
    document.getElementById('test-quote').value = '';
    document.getElementById('test-featured').checked = true;
  }

  modal.classList.remove('hidden');
}

// ==============================================================
// 9. INQUIRIES TAB & RENDERING
// ==============================================================
async function renderInquiriesTab() {
  const tbody = document.getElementById('inquiries-table-body');
  const countMetric = document.getElementById('metric-inquiries-count');
  currentInquiries = await getInquiries();

  if (countMetric) countMetric.textContent = currentInquiries.length;

  if (!currentInquiries || currentInquiries.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="p-8 text-center text-secondary/60">
          No customer inquiries recorded yet. Inquiries from the website contact forms will appear here.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = currentInquiries.map(inq => {
    const cleanPhone = (inq.contact || '').replace(/[^0-9+]/g, '');
    const isPhone = cleanPhone.length >= 7;

    return `
      <tr class="hover:bg-sand/10 transition">
        <td class="p-4 font-bold text-secondary">${inq.name}</td>
        <td class="p-4">
          <span class="block font-mono text-primary font-semibold">${inq.contact}</span>
          ${isPhone ? `
            <div class="flex items-center gap-2 mt-1">
              <a href="tel:${cleanPhone}" class="text-[10px] text-secondary/60 hover:text-primary underline">Call</a>
              <span class="text-secondary/30">•</span>
              <a href="https://wa.me/${cleanPhone.replace('+', '')}" target="_blank" class="text-[10px] text-leaf hover:underline font-semibold">WhatsApp</a>
            </div>
          ` : ''}
        </td>
        <td class="p-4">
          <span class="block font-semibold">${inq.product || 'General Inquiry'}</span>
          <span class="text-secondary/60">${inq.region || 'Nationwide'}</span>
        </td>
        <td class="p-4 font-mono font-bold text-secondary">${inq.quantity || '1 Canister'}</td>
        <td class="p-4 max-w-xs text-secondary/70 truncate" title="${inq.message || ''}">
          ${inq.message || '-'}
        </td>
        <td class="p-4 font-mono text-secondary/60">
          ${inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
        </td>
        <td class="p-4">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${inq.status === 'Contacted' ? 'bg-moss text-primary' : 'bg-sand text-secondary'}">
            ${inq.status || 'New'}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}
