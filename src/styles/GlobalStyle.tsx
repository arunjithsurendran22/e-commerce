"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body { padding: 0; margin: 0; }
  body {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans";
  }
  a { color: inherit; text-decoration: none; }
  input, button { font: inherit; border: 0; outline: 0; }
  ::selection { background: ${({ theme }) =>
    theme.colors.primary}; color: #fff; }
`;
