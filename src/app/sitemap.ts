// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { adminDb } from "@/lib/firebaseAdmin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.SITE_URL || "http://localhost:3000";

  // Base routes
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/products`, lastModified: new Date() },
  ];

  // Product detail pages (from Firestore)
  const snap = await adminDb.collection("products").get();
  for (const doc of snap.docs) {
    const slug = doc.data().slug as string;
    if (slug) {
      urls.push({ url: `${base}/product/${slug}`, lastModified: new Date() });
    }
  }

  return urls;
}
