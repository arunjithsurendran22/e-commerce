"use client";
import { useCart } from "@/store/cart";

export default function AddToCart({ product }: { product: any }) {
  const { addItem } = useCart();
  return <button onClick={() => addItem(product)}>Add to cart</button>;
}
