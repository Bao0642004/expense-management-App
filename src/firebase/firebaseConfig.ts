import { initializeApp } from "firebase/app";
import { getAuth }       from "firebase/auth";
import { getFirestore }  from "firebase/firestore";
import { getStorage }    from "firebase/storage";

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDJFQVE0U3k0kcPnIlkVlS0oZeOuWbJBiA",
  authDomain: "myexpenseapp-e63ca.firebaseapp.com",
  projectId: "myexpenseapp-e63ca",
  storageBucket: "myexpenseapp-e63ca.firebasestorage.app",
  messagingSenderId: "652645931811",
  appId: "1:652645931811:web:e05fac2715b2d82d998a96",
  measurementId: "G-6CBTX3MFDR"
};

// INITIALIZE FIREBASE
const app = initializeApp(
  firebaseConfig
);

// AUTH
export const auth = getAuth(app);
// FIRESTORE

export const db =  getFirestore(app);

// STORAGE
export const storage = getStorage(app);