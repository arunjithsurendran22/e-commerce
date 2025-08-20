"use client";

import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FavoriteButton({ productId }: { productId: string }) {
  const [uid, setUid] = useState<string | null>(null);
  const [isFav, setIsFav] = useState<boolean | null>(null); // null = loading
  const router = useRouter();

  // track auth
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUid(u?.uid ?? null);
    });
  }, []);

  // fetch fav status when uid or product changes
  useEffect(() => {
    const fetchFav = async () => {
      if (!uid) {
        setIsFav(false);
        return;
      }
      const ref = doc(db, "users", uid, "favorites", productId);
      const snap = await getDoc(ref);
      setIsFav(snap.exists());
    };
    fetchFav().catch(() => setIsFav(false));
  }, [uid, productId]);

  const toggle = async () => {
    if (!uid) {
      // 🚀 redirect instead of alert
      router.push("/login");
      return;
    }

    const ref = doc(db, "users", uid, "favorites", productId);
    if (isFav) {
      await deleteDoc(ref);
      setIsFav(false);
    } else {
      await setDoc(ref, { createdAt: Date.now() });
      setIsFav(true);
    }
  };

  const label = isFav ? "♥ Favorited" : "♡ Favorite";

  return (
    <button
      onClick={toggle}
      disabled={isFav === null}
      style={{
        minWidth: 120,
        cursor: isFav === null ? "not-allowed" : "pointer",
      }}
    >
      {isFav === null ? "…" : label}
    </button>
  );
}
