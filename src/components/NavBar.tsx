"use client";

import styled from "styled-components";
import Link from "next/link";
import { Search, Moon, User2, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useUI } from "@/store/ui";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: ${({ theme }) => theme.colors.card};
  border-bottom: 1px solid ${({ theme }) => theme.colors.ring};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 20px;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 20px;

  span.logo {
    background: linear-gradient(45deg, #a855f7, #f43f5e, #f59e0b);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 18px;
  margin-left: 20px;
  a {
    opacity: 0.9;
  }
  a.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

const SearchBox = styled.form`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #0b1220;
  border: 1px solid ${({ theme }) => theme.colors.ring};
  padding: 8px 10px;
  border-radius: 999px;
  width: 360px;
  max-width: 42vw;

  input {
    background: transparent;
    color: #e5e7eb;
    width: 100%;
  }
`;

const IconBtns = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 6px;

  a,
  button {
    background: #0b1220;
    border: 1px solid ${({ theme }) => theme.colors.ring};
    width: 38px;
    height: 38px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: #cbd5e1;
  }

  .cart {
    position: relative;
  }

  .badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    font-size: 11px;
    width: 18px;
    height: 18px;
    display: grid;
    place-items: center;
    border-radius: 999px;
  }
`;

export default function NavBar() {
  const { items } = useCart();
  const { openCart } = useUI();
  const params = useSearchParams();
  const q = useMemo(() => params?.get("q") ?? "", [params]);

  return (
    <Bar>
      <Row>
        <Brand href="/">
          <span className="logo">AS</span>
          <span>TechBazer</span>
        </Brand>

        <Nav>
          <Link href="/" className="active">Home</Link>
          {/* add more links if you want */}
        </Nav>

        <SearchBox action="/products" method="get">
          <Search size={18} />
          <input name="q" placeholder="Search.." defaultValue={q} />
        </SearchBox>

        <IconBtns>
          <button aria-label="theme">
            <Moon size={18} />
          </button>
          <Link href="/login" aria-label="account">
            <User2 size={18} />
          </Link>

          {/* open drawer, no navigation */}
          <button onClick={openCart} className="cart" aria-label="cart">
            <ShoppingBag size={18} />
            {items.length > 0 && <span className="badge">{items.length}</span>}
          </button>
        </IconBtns>
      </Row>
    </Bar>
  );
}
