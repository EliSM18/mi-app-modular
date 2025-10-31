import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración personal de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCzBrmrAURmEKtpU-nJES2vuJoZFVMNE7Q",
  authDomain: "mi-app-modular-668ba.firebaseapp.com",
  projectId: "mi-app-modular-668ba",
  storageBucket: "mi-app-modular-668ba.firebasestorage.app",
  messagingSenderId: "112221273293",
  appId: "1:112221273293:web:acf64d6b3eebc6db84fd84",
  measurementId: "G-VVBQGXBLPK"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore y exportarlo para usarlo en la app
export const db = getFirestore(app);
export default app;