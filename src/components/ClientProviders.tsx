"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { CartProvider } from "@/store/cart";
import NavBar from "@/components/NavBar";
import Cart from "@/components/Cart";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <CartProvider>
        <NavBar />
        {children}
        <Cart />
      </CartProvider>
    </ThemeProvider>
  );
}
