// src/lib/firebaseAdmin.ts
import "server-only";
import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const runtime = "nodejs";

let adminApp: App;

if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // important!
    }),
  });
} else {
  adminApp = getApps()[0]!;
}

export const adminDb = getFirestore(adminApp);
