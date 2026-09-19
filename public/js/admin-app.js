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

document.addEventListener('DOMContentLoaded', async () => {
  setupTabs();
  setupFirebaseConfigUI();
  setupProductModals();
  setupTestimonialModals();
  await checkFirebaseStatus();
  await loadAllData();
});

// 1. Tab Switching
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

// 2. Firebase Status & Config
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

  if (text) text.textContent = 'Verifying Firestore...';
  const result = await testConnection();

  if (result.success) {
    if (dot) dot.className = 'h-2 w-2 rounded-full bg-emerald-500';
    if (text) text.textContent = `Firestore: ${config.projectId}`;
    if (metricStatus) {
      metricStatus.textContent = 'Connected';
      metricStatus.className = 'text-base font-bold font-mono text-emerald-600';
    }
  } else {
    if (dot) dot.className = 'h-2 w-2 rounded-full bg-amber-400';
    if (text) text.textContent = 'Local Fallback';
    if (metricStatus) {
      metricStatus.textContent = 'Local Sync';
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

// 3. Load All Data
async function loadAllData() {
  await Promise.all([
    renderProductsTab(),
    renderTestimonialsTab(),
    renderInquiriesTab()
  ]);
}

// 4. Products Tab
async function renderProductsTab() {
  const container = document.getElementById('products-list-container');
  const countMetric = document.getElementById('metric-products-count');
  currentProducts = await getProducts();

  if (countMetric) countMetric.textContent = currentProducts.length;

  if (!currentProducts || currentProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-secondary/60 bg-white rounded-2xl border border-sand">
        No products found in catalog. Click <strong>"Post Product"</strong> above to register your first bio-formula!
      </div>
    `;
    return;
  }

  container.innerHTML = currentProducts.map(p => `
    <div class="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden flex flex-col justify-between group">
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
          <p class="text-[10px] font-bold text-sage uppercase tracking-widest font-mono">${p.brand || 'ORGANIC FORMULA'}</p>
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
          View on Site ↗
        </a>
        <div class="flex items-center gap-1.5">
          <button class="btn-edit-product px-3 py-1.5 text-xs bg-white hover:bg-taupe/40 text-secondary border border-sand rounded-lg font-semibold" data-id="${p.id}">
            Edit
          </button>
          <button class="btn-delete-product px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-semibold" data-id="${p.id}">
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

  openBtn.addEventListener('click', () => openProductModal());
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

  // Preset image pickers
  document.querySelectorAll('.btn-preset-img').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.getAttribute('data-img');
      document.getElementById('prod-image').value = img;
    });
  });

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

// 5. Testimonials Tab
async function renderTestimonialsTab() {
  const container = document.getElementById('testimonials-list-container');
  const countMetric = document.getElementById('metric-testimonials-count');
  currentTestimonials = await getTestimonials(false);

  if (countMetric) countMetric.textContent = currentTestimonials.length;

  if (!currentTestimonials || currentTestimonials.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-secondary/60 bg-white rounded-2xl border border-sand">
        No testimonials recorded yet. Click <strong>"Post Testimonial"</strong> to add farmer quotes!
      </div>
    `;
    return;
  }

  container.innerHTML = currentTestimonials.map(t => {
    const stars = '★'.repeat(t.rating || 5) + '☆'.repeat(Math.max(0, 5 - (t.rating || 5)));
    return `
      <div class="bg-white rounded-2xl border border-sand shadow-sm p-6 space-y-4 flex flex-col justify-between">
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
            <button class="btn-edit-testimonial px-3 py-1.5 text-xs bg-white hover:bg-taupe/40 text-secondary border border-sand rounded-lg font-semibold" data-id="${t.id}">
              Edit
            </button>
            <button class="btn-delete-testimonial px-3 py-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-semibold" data-id="${t.id}">
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

  openBtn.addEventListener('click', () => openTestimonialModal());
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

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

// 6. Inquiries Tab
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

  tbody.innerHTML = currentInquiries.map(inq => `
    <tr class="hover:bg-sand/10 transition">
      <td class="p-4 font-bold text-secondary">${inq.name}</td>
      <td class="p-4 font-mono text-primary">${inq.contact}</td>
      <td class="p-4">
        <span class="block font-semibold">${inq.product || 'General Inquiry'}</span>
        <span class="text-secondary/60">${inq.region || 'Nationwide'}</span>
      </td>
      <td class="p-4 font-mono">${inq.quantity || '1 Canister'}</td>
      <td class="p-4 max-w-xs text-secondary/70 truncate" title="${inq.message || ''}">
        ${inq.message || '-'}
      </td>
      <td class="p-4 font-mono text-secondary/60">
        ${inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
      </td>
      <td class="p-4">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${inq.status === 'Contacted' ? 'bg-moss text-primary' : 'bg-sand text-secondary'}">
          ${inq.status || 'New'}
        </span>
      </td>
    </tr>
  `).join('');
}
