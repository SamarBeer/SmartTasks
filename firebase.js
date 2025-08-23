import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFoiG6sYPJXQSrX1pNZz27LPILcZUQUqc",
  authDomain: "todo-react-6f998.firebaseapp.com",
  projectId: "todo-react-6f998",
  storageBucket: "todo-react-6f998.firebasestorage.app",
  messagingSenderId: "463978058029",
  appId: "1:463978058029:web:917d5b39c85e55e27143a4"
};

if (Object.values(firebaseConfig).some(v => !v)) {
  console.error("Missing Firebase env vars. Check your .env (VITE_*) and restart the dev server.");
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
