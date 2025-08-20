"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  addItem: (p: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // (optional) persist in localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem: CartCtx["addItem"] = (p) =>
    setItems((prev) => {
      const i = prev.findIndex((it) => it.id === p.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
        return copy;
      }
      return [...prev, { ...p, qty: 1 }];
    });

  const removeItem: CartCtx["removeItem"] = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const clear: CartCtx["clear"] = () => setItems([]);

  const total = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, clear, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
