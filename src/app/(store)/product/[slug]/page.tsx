import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import ProductDetail from "./ProductDetail";

type Props = { params: Promise<{ slug: string }> };

// SEO (keep your version if you already fixed it)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Product not found" };
  const url = `http://localhost:3000/product/${p.slug}`;

  return {
    title: `${p.title} — Mini Store`,
    description: p.description,
    openGraph: {
      title: p.title,
      description: p.description,
      url,
      images: [{ url: p.image }],
      type: "website", // keep "website" for Next types
    },
    alternates: { canonical: url },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);

  if (!p) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Not found</h1>
        <Link href="/products">← Back to products</Link>
      </main>
    );
  }

  // adapt to the new UI props (fallbacks so it doesn’t crash)
  const product = {
    ...p,
    images: [p.image, p.image], // duplicate until you have gallery images
  };

  // (keep your JSON-LD if you want rich snippets)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    image: [p.image],
    description: p.description,
    sku: p.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      price: p.price,
      availability: "https://schema.org/InStock",
      url: `http://localhost:3000/product/${p.slug}`,
    },
  };

  return (
    <main style={{ padding: 24 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/">← Back to products</Link>
      <ProductDetail product={product} />
    </main>
  );
}
