import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxZFOwdesguJtq_fVbCRF5pSmhJtz84ak",
  authDomain: "bricolemoi-320ff.firebaseapp.com",
  projectId: "bricolemoi-320ff",
  storageBucket: "bricolemoi-320ff.firebasestorage.app",
  messagingSenderId: "793374413308",
  appId: "1:793374413308:web:3c034f9eca6f119248e279",
  measurementId: "G-CN14R0P9ML"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup };
