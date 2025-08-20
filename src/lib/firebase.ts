// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrBghMPi32ksX1iY7zpTD9G74vQeRhpdo",
  authDomain: "my-next-shop-1a9bb.firebaseapp.com",
  projectId: "my-next-shop-1a9bb",
  storageBucket: "my-next-shop-1a9bb.appspot.com", // fixed: must be *.appspot.com
  messagingSenderId: "860829645335",
  appId: "1:860829645335:web:f8e7116034da6b8a11ba52",
  measurementId: "G-E48ZJW7938", // optional
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
