import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCvi0jPdiU7-nfR813xzV3Zus3wkeuTLjQ",
  authDomain: "chocolateapp-007.firebaseapp.com",
  projectId: "chocolateapp-007",
  storageBucket: "chocolateapp-007.firebasestorage.app",
  messagingSenderId: "320383388252",
  appId: "1:320383388252:web:8fdeca0d99e553d615f499",
  measurementId: "G-Q81G27CHGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// --- DEBUGGING STEP 1 ---
// We are checking if the 'auth' object is created successfully here.
let auth;
try {
  auth = getAuth(app);
  console.log("Firebase Auth initialized successfully in firebaseConfig.js");
} catch (error) {
  console.error("Error initializing Firebase Auth in firebaseConfig.js:", error);
}

export const db = getFirestore(app);
export { auth }; // Export the potentially initialized auth object