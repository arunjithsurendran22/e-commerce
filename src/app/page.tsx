import { getAllProducts } from "@/lib/products";
import SearchGrid from "@/components/SearchGrid"; // ← make sure the name matches this file

export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>Featured</h1>
      <SearchGrid items={products} />
    </main>
  );
}
