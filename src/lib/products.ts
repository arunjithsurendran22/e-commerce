/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/products.ts
import "server-only";
import { adminDb } from "./firebaseAdmin";

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  views?: number;
};

export async function getAllProducts(): Promise<Product[]> {
  const snap = await adminDb.collection("products").orderBy("title").get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const snap = await adminDb
    .collection("products")
    .where("slug", "==", slug)
    .limit(1)
    .get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...(doc.data() as any) };
}
