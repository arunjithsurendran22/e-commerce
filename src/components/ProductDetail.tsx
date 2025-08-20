"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ShoppingCart, Sparkles, Minus, Plus } from "lucide-react";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];   // absolute or public/ path
  colors?: string[];
};

interface ProductDetailProps {
  product: Product;
  onAddToCart: (qty?: number, color?: string) => void;
  onBuyNow: (qty?: number, color?: string) => void;
}

export default function ProductDetail({
  product,
  onAddToCart,
  onBuyNow,
}: ProductDetailProps) {
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState<string | undefined>(product.colors?.[0]);

  const hasDiscount = typeof product.discountPrice === "number";
  const finalPrice = product.discountPrice ?? product.price;
  const discountPct = useMemo(() => {
    if (!hasDiscount) return null;
    return Math.round(((product.price - finalPrice) / product.price) * 100);
  }, [hasDiscount, product.price, finalPrice]);

  const isOut = product.stock <= 0;

  return (
    <section className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[420px_1fr]">
      {/* LEFT: Compact gallery using next/image */}
      <div className="mx-auto w-full max-w-[420px]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800 bg-[#0b1220]">
          {hasDiscount && discountPct !== null && (
            <div className="absolute left-2 top-2 z-10 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
              -{discountPct}%
            </div>
          )}
          <Image
            src={product.images[activeImg]}
            alt={product.title}
            fill
            priority
            width={300}
            height={300}
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* tiny thumbs (56×56) */}
        <div className="mt-2 flex items-center gap-2 overflow-x-auto">
          {product.images.map((src, i) => {
            const active = i === activeImg;
            return (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition ${
                  active
                    ? "border-violet-500 ring-2 ring-violet-500/40"
                    : "border-slate-800 hover:border-slate-600"
                }`}
                aria-label={`Show image ${i + 1}`}
              >
                {/* Use fixed width/height to keep file small; next/image auto-optimizes */}
                <Image
                  src={src}
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                  sizes="56px"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Details (no favorites) */}
      <div className="space-y-4">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-100">
          {product.title}
        </h1>

        <p className="text-sm text-slate-400">{product.description}</p>

        <div className="text-sm">
          {isOut ? (
            <span className="rounded-full bg-rose-500/15 px-3 py-1 font-semibold text-rose-400 ring-1 ring-rose-500/30">
              Out of stock
            </span>
          ) : (
            <span className="text-slate-300">
              Only{" "}
              <span className="font-semibold text-violet-400">
                {product.stock}
              </span>{" "}
              left in stock
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-slate-300">Color</div>
            <div className="flex flex-wrap items-center gap-2">
              {product.colors.map((c) => {
                const active = c === color;
                return (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`h-7 w-7 rounded-full ring-2 transition ${
                      active ? "ring-violet-500" : "ring-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                    aria-label={`Choose color ${c}`}
                    title={c}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Price (compact) */}
        <div className="flex items-end gap-3">
          {hasDiscount && (
            <span className="text-xs text-slate-400 line-through">
              AED {product.price.toFixed(2)}
            </span>
          )}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-2xl font-extrabold text-transparent">
            AED {finalPrice.toFixed(2)}
          </span>
        </div>

        {/* Qty stepper (small) */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300">Qty</span>
          <div className="inline-flex items-center rounded-lg border border-slate-800 bg-[#0b1220]">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-9 w-9 place-items-center hover:bg-slate-800/60"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-9 text-center font-semibold text-slate-100">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="grid h-9 w-9 place-items-center hover:bg-slate-800/60"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Actions (simple, no favorite) */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={() => onAddToCart(qty, color)}
            disabled={isOut}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition ${
              isOut
                ? "cursor-not-allowed bg-slate-700 text-slate-300"
                : "bg-slate-900 text-slate-100 ring-1 ring-slate-700 hover:bg-slate-800"
            }`}
          >
            <ShoppingCart size={18} />
            Add To Cart
          </button>

          <button
            onClick={() => onBuyNow(qty, color)}
            disabled={isOut}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-white transition ${
              isOut
                ? "cursor-not-allowed bg-slate-700"
                : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
            }`}
          >
            <Sparkles size={18} />
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}
