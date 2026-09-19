import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Setup View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/About', express.static(path.join(__dirname, 'public/About')));
app.use('/Products', express.static(path.join(__dirname, 'public/Products')));
app.use('/Services', express.static(path.join(__dirname, 'public/Services')));
app.use('/Contact', express.static(path.join(__dirname, 'public/Contact')));

// File paths for persistence
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const TESTIMONIALS_FILE = path.join(DATA_DIR, 'testimonials.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Persistence Helpers
function readJsonSafe(filePath, fallback = []) {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn(`Error reading ${filePath}:`, err.message);
  }
  return fallback;
}

function writeJsonSafe(filePath, data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
}

function getProductsMap() {
  const list = readJsonSafe(PRODUCTS_FILE, []);
  const map = {};
  list.forEach(p => {
    map[p.id] = p;
  });
  return map;
}

const representatives = [
  {
    name: 'Stanford',
    region: 'Copperbelt / NW',
    phone: '0767421417',
    color: 'bg-teal-600'
  },
  {
    name: 'Ricky',
    region: 'Mkushi Area',
    phone: '0972304539',
    color: 'bg-lime-600'
  },
  {
    name: 'Peter',
    region: 'Lusaka Province',
    phone: '0973279761',
    color: 'bg-emerald-600'
  },
  {
    name: 'Francis',
    region: 'Central Province',
    phone: '0760072470',
    color: 'bg-green-700'
  }
];

const services = [
  {
    title: 'Soil Fertility & Health Analysis',
    icon: 'bar-chart',
    description: 'On-site pH monitoring, organic carbon testing, and tailored bio-amendment recommendations to revive depleted fields.',
    details: [
      'Macro and micronutrient deficiency diagnostics',
      'Microbiological soil health evaluations',
      'Customized organic replenishment schedule'
    ]
  },
  {
    title: 'Crop Disease & Pest Management',
    icon: 'compass',
    description: 'Field inspection diagnostics for yellowing leaves, mildew, fungal infestations, and pest colonies with non-chemical solutions.',
    details: [
      'Immediate field pest identification',
      'Integrated Pest Management (IPM) strategies',
      'Safe bio-soapcide & bio-sulphur application programs'
    ]
  },
  {
    title: 'Yield Optimization Advisories',
    icon: 'sprout',
    description: 'Guiding smallholders and commercial estates on foliar application timings to maximize vegetative vigor and grain fill.',
    details: [
      'Crop stage specific nutrition mapping',
      'Moisture retention & root strengthening guidance',
      'Post-harvest soil restoration consultations'
    ]
  },
  {
    title: 'Bulk Agro-Dealer Distribution',
    icon: 'users',
    description: 'Wholesale canister supply agreements and stockist partnerships for agricultural cooperatives and farm input shops.',
    details: [
      'Consistent pallet delivery nationwide',
      'Marketing collateral and farmer demonstration kits',
      'Dedicated wholesale account management'
    ]
  }
];

// Routes

// Home Route
app.get(['/', '/index.php'], (req, res) => {
  const products = getProductsMap();
  const allTestimonials = readJsonSafe(TESTIMONIALS_FILE, []);
  const testimonials = allTestimonials.filter(t => t.approved && (t.featured !== false));
  res.render('index', {
    title: 'Lifecycle Organics - Sustainable Bio-Fertilizers & Crop Defense',
    activePage: 'home',
    pageStyleFile: null,
    products,
    testimonials
  });
});

// Products Route
app.get(['/products', '/Products/products.php'], (req, res) => {
  const products = getProductsMap();
  const keys = Object.keys(products);
  const defaultId = keys.length > 0 ? keys[0] : 'bio-fertilizer';
  const selectedId = req.query.id && products[req.query.id] ? req.query.id : defaultId;
  res.render('products', {
    title: 'Organic Crop Products - Lifecycle Organics',
    activePage: 'products',
    pageStyleFile: '/Products/products.css',
    products,
    selectedId
  });
});

// Services Route
app.get(['/services', '/Services/services.php'], (req, res) => {
  res.render('services', {
    title: 'Agronomic Consultancy & Services - Lifecycle Organics',
    activePage: 'services',
    pageStyleFile: '/Services/services.css',
    services
  });
});

// About Route
app.get(['/about', '/About/about.php'], (req, res) => {
  const testimonials = readJsonSafe(TESTIMONIALS_FILE, []).filter(t => t.approved);
  res.render('about', {
    title: 'About Us - Lifecycle Organics Zambia',
    activePage: 'about',
    pageStyleFile: '/About/about.css',
    representatives,
    testimonials
  });
});

// Contact Route
app.get(['/contact', '/Contact/contact.php'], (req, res) => {
  res.render('contact', {
    title: 'Contact Regional Representatives - Lifecycle Organics',
    activePage: 'contact',
    pageStyleFile: '/Contact/contact.css',
    representatives
  });
});

// Admin Dashboard Route
app.get(['/admin', '/admin.html'], (req, res) => {
  const productsList = readJsonSafe(PRODUCTS_FILE, []);
  const testimonialsList = readJsonSafe(TESTIMONIALS_FILE, []);
  const inquiriesList = readJsonSafe(INQUIRIES_FILE, []);
  res.render('admin', {
    title: 'Admin Dashboard - Lifecycle Organics Management Portal',
    activePage: 'admin',
    pageStyleFile: null,
    productsList,
    testimonialsList,
    inquiriesList
  });
});

// REST API ENDPOINTS

// 1. Products API
app.get('/api/products', (req, res) => {
  const products = readJsonSafe(PRODUCTS_FILE, []);
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const incoming = req.body;
  if (!incoming || !incoming.name) {
    return res.status(400).json({ error: 'Product name is required' });
  }
  const id = incoming.id || ('prod-' + Date.now());
  const list = readJsonSafe(PRODUCTS_FILE, []);
  const index = list.findIndex(p => p.id === id);
  const record = {
    ...incoming,
    id,
    updatedAt: new Date().toISOString()
  };
  if (!record.createdAt) {
    record.createdAt = new Date().toISOString();
  }

  if (index >= 0) {
    list[index] = record;
  } else {
    list.push(record);
  }
  writeJsonSafe(PRODUCTS_FILE, list);
  res.status(200).json({ success: true, product: record });
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const list = readJsonSafe(PRODUCTS_FILE, []);
  const filtered = list.filter(p => p.id !== id);
  writeJsonSafe(PRODUCTS_FILE, filtered);
  res.json({ success: true, message: 'Product deleted' });
});

// 2. Testimonials API
app.get('/api/testimonials', (req, res) => {
  const list = readJsonSafe(TESTIMONIALS_FILE, []);
  res.json(list);
});

app.post('/api/testimonials', (req, res) => {
  const incoming = req.body;
  if (!incoming || !incoming.author || !incoming.quote) {
    return res.status(400).json({ error: 'Author and quote are required' });
  }
  const id = incoming.id || ('test-' + Date.now());
  const list = readJsonSafe(TESTIMONIALS_FILE, []);
  const index = list.findIndex(t => t.id === id);
  const record = {
    ...incoming,
    id,
    rating: Number(incoming.rating) || 5,
    featured: incoming.featured !== undefined ? Boolean(incoming.featured) : true,
    approved: incoming.approved !== undefined ? Boolean(incoming.approved) : true,
    createdAt: incoming.createdAt || new Date().toISOString()
  };

  if (index >= 0) {
    list[index] = record;
  } else {
    list.unshift(record);
  }
  writeJsonSafe(TESTIMONIALS_FILE, list);
  res.status(200).json({ success: true, testimonial: record });
});

app.delete('/api/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const list = readJsonSafe(TESTIMONIALS_FILE, []);
  const filtered = list.filter(t => t.id !== id);
  writeJsonSafe(TESTIMONIALS_FILE, filtered);
  res.json({ success: true, message: 'Testimonial deleted' });
});

// 3. Inquiries API
app.get('/api/inquiries', (req, res) => {
  const list = readJsonSafe(INQUIRIES_FILE, []);
  res.json(list);
});

app.post(['/api/contact', '/api/inquiries'], (req, res) => {
  const { name, contact, region, product, message, quantity } = req.body;
  const list = readJsonSafe(INQUIRIES_FILE, []);
  const record = {
    id: 'inq-' + Date.now(),
    name: name || 'Anonymous Farmer',
    contact: contact || '-',
    region: region || 'Zambia',
    product: product || 'General Inquiry',
    quantity: quantity || '1 Canister',
    message: message || '',
    status: 'New',
    createdAt: new Date().toISOString()
  };
  list.unshift(record);
  writeJsonSafe(INQUIRIES_FILE, list);

  res.status(200).json({
    success: true,
    message: 'Inquiry received successfully. Our regional representative will reach out shortly.',
    inquiry: record
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Lifecycle Organics web app running on http://0.0.0.0:${PORT}`);
});
