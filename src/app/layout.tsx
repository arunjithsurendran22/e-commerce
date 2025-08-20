// src/app/layout.tsx
import type { Metadata } from "next";
import ClientProviders from "@/components/ClientProviders";
import { theme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { CartProvider } from "@/store/cart";
import Cart from "@/components/Cart";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Mini Store",
  description: "Next.js + Firebase demo storefront",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
