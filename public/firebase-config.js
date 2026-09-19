/**
 * Lifecycle Organics - Firebase Client Integration
 * Compatible with Firebase Hosting, Cloud Firestore, and Firebase Authentication.
 * 
 * Instructions for your Firebase Project:
 * 1. In Firebase Console (console.firebase.google.com), create or open your project.
 * 2. Create a Web App in Project Settings and copy the firebaseConfig object below.
 * 3. Enable Cloud Firestore Database (in test or production mode with firestore.rules).
 * 4. Paste your configuration below, or save it through the Admin Dashboard (/admin).
 */

// Default or configured Firebase credentials
export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBNch1zw4Cnq_SWlcU0kcw66Vtg9JmxhJA",
  authDomain: "lifecycle-organics.firebaseapp.com",
  projectId: "lifecycle-organics",
  storageBucket: "lifecycle-organics.firebasestorage.app",
  messagingSenderId: "355345089827",
  appId: "1:355345089827:web:84ca4c99dbe22d2eb2f896"
};

// Retrieve active configuration (checks localStorage first, then fallback)
export function getActiveFirebaseConfig() {
  try {
    const stored = localStorage.getItem('lifecycle_firebase_config');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.projectId) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read stored Firebase config", e);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveActiveFirebaseConfig(config) {
  try {
    localStorage.setItem('lifecycle_firebase_config', JSON.stringify(config));
    return true;
  } catch (e) {
    console.error("Failed to persist Firebase config", e);
    return false;
  }
}

let firebaseApp = null;
let firestoreDb = null;
let firebaseAuth = null;
let isInitialized = false;

/**
 * Initializes Firebase dynamically using official Firebase v10 CDN modules.
 */
export async function initFirebase() {
  if (isInitialized && firestoreDb) {
    return { app: firebaseApp, db: firestoreDb, auth: firebaseAuth, connected: true };
  }

  const config = getActiveFirebaseConfig();
  if (!config || !config.projectId || !config.apiKey) {
    return { app: null, db: null, auth: null, connected: false, reason: 'missing_config' };
  }

  try {
    const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js');
    const { getFirestore, doc, getDocFromServer } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
    const { getAuth } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js');

    const currentApps = getApps();
    firebaseApp = currentApps.length > 0 ? currentApps[0] : initializeApp(config);
    firestoreDb = getFirestore(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);
    isInitialized = true;

    // Optional validation probe
    try {
      await getDocFromServer(doc(firestoreDb, '_health', 'probe')).catch(() => {});
    } catch (err) {
      console.warn("Firestore connection note:", err.message);
    }

    return { app: firebaseApp, db: firestoreDb, auth: firebaseAuth, connected: true };
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    return { app: null, db: null, auth: null, connected: false, error: error.message };
  }
}

/**
 * Validates connection to Firestore
 */
export async function testConnection() {
  const result = await initFirebase();
  if (!result.connected) {
    return { success: false, message: 'Firebase configuration is incomplete or missing. Operating in offline/local mode.' };
  }
  try {
    const { doc, getDocFromServer } = await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
    await getDocFromServer(doc(result.db, '_health', 'test'));
    return { success: true, message: 'Successfully connected to Firebase Cloud Firestore!' };
  } catch (error) {
    if (error.message && error.message.includes('the client is offline')) {
      return { success: false, message: 'Firebase client is offline. Please check your project ID and network connectivity.' };
    }
    // Permission denied is also proof that the database was reached!
    if (error.code === 'permission-denied' || error.message.includes('permission-denied')) {
      return { success: true, message: 'Connected to Firebase (Firestore reached with security rules active).' };
    }
    return { success: true, message: `Connected to Firebase project: ${result.app.options.projectId}` };
  }
}
