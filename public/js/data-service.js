import { initFirebase, getActiveFirebaseConfig } from '/firebase-config.js';

// Fallback seed products
const DEFAULT_PRODUCTS = [
  {
    id: "bio-fertilizer",
    name: "Bio-Fertilizer (Nourish Soil)",
    brand: "SOIL STIMULANT",
    tagline: "Nourishes Soil, Boosts Growth",
    category: "Bio-Fertilizers",
    description: "Active organic carbon + mycorrhizae to boost root depth, nitrogen fixation, and overall crop vigor across depleted fields.",
    badge: "10x Faster Growth",
    price: 150,
    image: "/assets/images/bio_fertilizer_1783345223620.jpg",
    features: ["100% Organic & Safe", "Nitrogen & Carbon Fixation", "Accelerates Root Vigor"],
    benefits: [
      "Increases structural protein synthesis",
      "Protects beneficial soil micro-organisms",
      "Reconditions hard, depleted soil naturally",
      "Optimizes moisture retention in dry spells"
    ],
    specs: [
      "Volume: 5 Liters",
      "Formula: Active Bio-Nutrient",
      "Target: Root Systems & Soil",
      "Dilution: 1:100 with clean water"
    ],
    usage: "Mix 50ml per 10L knapsack sprayer. Drench root zones or apply via drip irrigation every 14 days during vegetative growth.",
    inStock: true
  },
  {
    id: "bio-sulphur",
    name: "Bio-Sulphur 4",
    brand: "CROP IMMUNITY",
    tagline: "Protects Maize, Prevents Yellowing",
    category: "Crop Defense",
    description: "4-in-1 multi-action formulation: Fungicide, Fertilizer, Pesticide, and Germicide built for maize, wheat, and horticultural crops.",
    badge: "4-in-1 Protection",
    price: 180,
    image: "/assets/images/bio_sulphur_1783345245681.jpg",
    features: ["Prevents Yellowing", "Chlorophyll Formation", "4-in-1 Defense Engine"],
    benefits: [
      "Rapidly stops leaf blight and fungal spots",
      "Restores deep emerald green color to pale crops",
      "Repels chewing insects and foliar pests",
      "Provides elemental bio-sulphur for protein synthesis"
    ],
    specs: [
      "Volume: 5 Liters",
      "Formula: Micronized Bio-Sulphur",
      "Target: Maize, Vegetables, Wheat",
      "Shelf Life: 24 Months sealed"
    ],
    usage: "Apply 60ml per 15L knapsack at first signs of yellowing or fungal spots. Spray during early mornings or late afternoons.",
    inStock: true
  },
  {
    id: "bio-soapcide",
    name: "Bio-Soapcide",
    brand: "YEILD BOOSTER",
    tagline: "Insecticidal Soap, Spreader, Sticker",
    category: "Organic Pest Control",
    description: "Multi-action insecticidal soap that softens aphid coatings, protects pollinator balance, and acts as an organic surfactant spreader.",
    badge: "100% Sustainable",
    price: 165,
    image: "/assets/images/bio_soapcide_1783345266462.jpg",
    features: ["Insecticidal Soap", "Spreader & Sticker", "Fights Aphids & Mites"],
    benefits: [
      "Softens and breaks down insect waxy coatings",
      "Enhances droplet spread across waxy leaf surfaces",
      "Leaves zero chemical residues on harvest day",
      "Safe for beneficial pollinators when used as directed"
    ],
    specs: [
      "Volume: 5 Liters",
      "Formula: Potassium Salts of Fatty Acids",
      "Target: Aphids, Whiteflies, Spider Mites",
      "Application: Foliar coverage"
    ],
    usage: "Dilute 40ml in 10L water. Ensure complete coverage on undersides of leaves where pest colonies nest. Repeat weekly if needed.",
    inStock: true
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: "test-1",
    author: "Mr. Stanford Mutale",
    role: "Commercial Maize Grower",
    farmOrCompany: "Mutale Agri Farms (120 Hectares)",
    location: "Mkushi Farming Block, Central Province",
    crop: "Maize & Soya",
    rating: 5,
    quote: "We faced stubborn leaf yellowing and phosphorus lockup early in the season. Within 10 days of applying Lifecycle Bio-Fertilizer and Bio-Sulphur, the crop turned deep emerald green. Our grain test weight at harvest was up by 24% with zero chemical burn.",
    featured: true,
    approved: true
  },
  {
    id: "test-2",
    author: "Mrs. Beatrice Mwansa Tembo",
    role: "Horticultural Cooperative Leader",
    farmOrCompany: "Chisamba Greens Cooperative",
    location: "Chisamba District",
    crop: "Tomatoes, Cabbage & Green Peppers",
    rating: 5,
    quote: "Aphids and spider mites used to wipe out our nursery beds every rainy season. Bio-Soapcide broke down the infestation completely without sickening our workers or tainting market tomatoes. It's safe, affordable, and delivers clean organic produce.",
    featured: true,
    approved: true
  },
  {
    id: "test-3",
    author: "Dr. Peter Phiri",
    role: "Lead Agronomist & Farm Manager",
    farmOrCompany: "Kafue River Agro Estates",
    location: "Lusaka Province",
    crop: "Wheat & Irrigated Vegetables",
    rating: 5,
    quote: "Bio-Fertilizer dramatically reconditions depleted soils. The roots expand deeper into the soil profile which gave our wheat remarkable drought resilience during dry spells. We recommend Lifecycle Organics across our entire outgrower scheme.",
    featured: true,
    approved: true
  },
  {
    id: "test-4",
    author: "Francis Chileshe",
    role: "Smallholder Farmer",
    farmOrCompany: "Chileshe Family Orchard",
    location: "Copperbelt Province",
    crop: "Citrus & Vegetables",
    rating: 5,
    quote: "The regional agent Ricky delivered directly to our depot. The knapsack dilution instructions were easy to follow. Our orange trees produced larger, sweeter fruits with no pesticide smells.",
    featured: true,
    approved: true
  }
];

// PRODUCTS DATA ACCESS
export async function getProducts() {
  const firebase = await initFirebase();
  if (firebase.connected && firebase.db) {
    try {
      const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
      const snap = await getDocs(collection(firebase.db, 'products'));
      if (!snap.empty) {
        const list = [];
        snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
        return list;
      }
    } catch (e) {
      console.warn("Firestore fetch error, falling back to local API", e);
    }
  }

  // Fallback to server API
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (err) {
    console.warn("API fetch failed, reading localStorage", err);
  }

  // Local storage fallback
  try {
    const stored = localStorage.getItem('lifecycle_products');
    if (stored) return JSON.parse(stored);
  } catch (e) {}

  return DEFAULT_PRODUCTS;
}

export async function saveProduct(product) {
  const firebase = await initFirebase();
  const id = product.id || ('prod-' + Date.now());
  const payload = {
    ...product,
    id,
    updatedAt: new Date().toISOString()
  };
  if (!payload.createdAt) {
    payload.createdAt = new Date().toISOString();
  }

  if (firebase.connected && firebase.db) {
    try {
      const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
      await setDoc(doc(firebase.db, 'products', id), payload, { merge: true });
    } catch (e) {
      console.warn("Firestore save failed, syncing to local API:", e);
    }
  }

  // Sync to local server API
  try {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn("Local API save error", err);
  }

  // Update localStorage
  try {
    const list = await getProducts();
    const idx = list.findIndex(p => p.id === id);
    if (idx >= 0) {
      list[idx] = payload;
    } else {
      list.push(payload);
    }
    localStorage.setItem('lifecycle_products', JSON.stringify(list));
  } catch (e) {}

  return payload;
}

export async function deleteProduct(id) {
  const firebase = await initFirebase();
  if (firebase.connected && firebase.db) {
    try {
      const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
      await deleteDoc(doc(firebase.db, 'products', id));
    } catch (e) {
      console.warn("Firestore delete failed:", e);
    }
  }

  try {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
  } catch (e) {}

  try {
    const list = (await getProducts()).filter(p => p.id !== id);
    localStorage.setItem('lifecycle_products', JSON.stringify(list));
  } catch (e) {}

  return true;
}

// TESTIMONIALS DATA ACCESS
export async function getTestimonials(filterApproved = false) {
  const firebase = await initFirebase();
  if (firebase.connected && firebase.db) {
    try {
      const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
      const snap = await getDocs(collection(firebase.db, 'testimonials'));
      if (!snap.empty) {
        const list = [];
        snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
        return filterApproved ? list.filter(t => t.approved) : list;
      }
    } catch (e) {
      console.warn("Firestore testimonials error, falling back to local API", e);
    }
  }

  try {
    const res = await fetch('/api/testimonials');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return filterApproved ? data.filter(t => t.approved) : data;
      }
    }
  } catch (e) {}

  try {
    const stored = localStorage.getItem('lifecycle_testimonials');
    if (stored) {
      const parsed = JSON.parse(stored);
      return filterApproved ? parsed.filter(t => t.approved) : parsed;
    }
  } catch (e) {}

  return filterApproved ? DEFAULT_TESTIMONIALS.filter(t => t.approved) : DEFAULT_TESTIMONIALS;
}

export async function saveTestimonial(testimonial) {
  const firebase = await initFirebase();
  const id = testimonial.id || ('test-' + Date.now());
  const payload = {
    ...testimonial,
    id,
    rating: Number(testimonial.rating) || 5,
    approved: testimonial.approved !== undefined ? Boolean(testimonial.approved) : true,
    featured: testimonial.featured !== undefined ? Boolean(testimonial.featured) : true,
    createdAt: testimonial.createdAt || new Date().toISOString()
  };

  if (firebase.connected && firebase.db) {
    try {
      const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
      await setDoc(doc(firebase.db, 'testimonials', id), payload, { merge: true });
    } catch (e) {
      console.warn("Firestore testimonial save failed:", e);
    }
  }

  try {
    await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {}

  try {
    const list = await getTestimonials(false);
    const idx = list.findIndex(t => t.id === id);
    if (idx >= 0) {
      list[idx] = payload;
    } else {
      list.unshift(payload);
    }
    localStorage.setItem('lifecycle_testimonials', JSON.stringify(list));
  } catch (e) {}

  return payload;
}

export async function deleteTestimonial(id) {
  const firebase = await initFirebase();
  if (firebase.connected && firebase.db) {
    try {
      const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
      await deleteDoc(doc(firebase.db, 'testimonials', id));
    } catch (e) {
      console.warn("Firestore delete testimonial failed:", e);
    }
  }

  try {
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
  } catch (e) {}

  try {
    const list = (await getTestimonials(false)).filter(t => t.id !== id);
    localStorage.setItem('lifecycle_testimonials', JSON.stringify(list));
  } catch (e) {}

  return true;
}

// INQUIRIES DATA ACCESS
export async function getInquiries() {
  const firebase = await initFirebase();
  if (firebase.connected && firebase.db) {
    try {
      const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
      const snap = await getDocs(collection(firebase.db, 'inquiries'));
      if (!snap.empty) {
        const list = [];
        snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
        return list;
      }
    } catch (e) {
      console.warn("Firestore inquiries fetch error", e);
    }
  }

  try {
    const res = await fetch('/api/inquiries');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (e) {}

  try {
    const stored = localStorage.getItem('lifecycle_inquiries');
    if (stored) return JSON.parse(stored);
  } catch (e) {}

  return [];
}

export async function submitInquiry(inquiry) {
  const firebase = await initFirebase();
  const id = 'inq-' + Date.now();
  const payload = {
    ...inquiry,
    id,
    status: inquiry.status || 'New',
    createdAt: new Date().toISOString()
  };

  if (firebase.connected && firebase.db) {
    try {
      const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
      await setDoc(doc(firebase.db, 'inquiries', id), payload);
    } catch (e) {
      console.warn("Firestore inquiry submit failed:", e);
    }
  }

  try {
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {}

  try {
    const list = await getInquiries();
    list.unshift(payload);
    localStorage.setItem('lifecycle_inquiries', JSON.stringify(list));
  } catch (e) {}

  return payload;
}
