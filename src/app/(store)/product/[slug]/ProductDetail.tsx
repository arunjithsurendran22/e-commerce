"use client";

import styled from "styled-components";
import Image from "next/image";
import AddToCart from "./AddToCart";
import { useState } from "react";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  images?: string[];
  stock?: number;
  colors?: string[];
  discountPrice?: number;
};

export default function ProductDetail({ product }: { product: Product }) {
  const imgs = product.images?.length ? product.images : [product.image];
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  const priceNow = product.discountPrice ?? product.price;

  return (
    <Wrap>
      {/* LEFT: gallery */}
      <Left>
        <Main>
          <Image
            src={imgs[active]}
            alt={product.title}
            width={600}
            height={600}
            className="object-contain"

    
          />
        </Main>
        <Thumbs>
          {imgs.map((img, i) => (
            <Thumb key={i} $active={i === active} onClick={() => setActive(i)}>
              <Image src={img} alt="" width={80} height={80} />
            </Thumb>
          ))}
        </Thumbs>
      </Left>

      {/* RIGHT: content */}
      <Right>
        <Title>{product.title}</Title>

        <Muted>⭐ 4.1 &nbsp;•&nbsp; (1) Reviews</Muted>

        <Desc>{product.description}</Desc>

        <Muted>
          Only <b>{product.stock ?? 5}</b> items in stock
        </Muted>

        {!!product.colors?.length && (
          <Colors>
            {product.colors!.map((c, i) => (
              <Swatch key={i} style={{ background: c }} />
            ))}
          </Colors>
        )}

        <Prices>
          {product.discountPrice && <Old>AED{product.price}</Old>}
          <Now>AED{priceNow}</Now>
        </Prices>

        <QtyRow>
          <QtyBtn onClick={() => setQty(Math.max(1, qty - 1))}>−</QtyBtn>
          <Qty>{qty}</Qty>
          <QtyBtn onClick={() => setQty(qty + 1)}>+</QtyBtn>
        </QtyRow>

        <Actions>
          <AddToCart product={product} />
          <BuyNow onClick={() => alert("Hook up checkout later 🤝")}>
            Buy Now
          </BuyNow>
        </Actions>
      </Right>
    </Wrap>
  );
}

/* ————— styles ————— */

const Wrap = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  margin-top: 16px;
`;

const Left = styled.div`
  display: grid;
  gap: 12px;
`;

const Main = styled.div`
  background: #0b1220;
  border: 1px solid ${({ theme }) => theme.colors.ring};
  border-radius: 16px;
  height: 600px;
  width: 600px;
  display: grid;
  place-items: center;
  overflow: hidden;
`;

const Thumbs = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const Thumb = styled.button<{ $active: boolean }>`
  background: #0b1220;
  border: 1px solid ${({ theme }) => theme.colors.ring};
  border-radius: 8px;
  padding: 4px;
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};
  outline: ${({ $active, theme }) =>
    $active ? `2px solid ${theme.colors.primary}` : "none"};
  cursor: pointer;
`;

const Right = styled.div``;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const Muted = styled.div`
  color: ${({ theme }) => theme.colors.subtext};
  margin: 4px 0 10px;
`;

const Desc = styled.p`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.9;
  line-height: 1.5;
`;

const Colors = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px 0;
`;

const Swatch = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.ring};
`;

const Prices = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin: 10px 0 8px;
`;

const Old = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.subtext};
`;

const Now = styled.span`
  color: #22c55e;
  font-weight: bold;
  font-size: 22px;
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0 18px;
`;

const QtyBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #0b1220;
  color: #e5e7eb;
  border: 1px solid ${({ theme }) => theme.colors.ring};
  cursor: pointer;
`;

const Qty = styled.span`
  min-width: 24px;
  text-align: center;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const BuyNow = styled.button`
  border-radius: 999px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 800;
  cursor: pointer;
`;
