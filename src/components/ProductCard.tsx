"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

const Card = styled.article`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.ring};
  border-radius: ${({ theme }) => theme.radius};
  overflow: hidden;
  position: relative;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 8px;
  border-radius: 8px;
`;

const Body = styled.div`
  padding: 12px 14px 16px;
`;
const Category = styled.div`
  color: ${({ theme }) => theme.colors.subtext};
  font-size: 12px;
`;
const Title = styled.h3`
  margin: 6px 0;
  font-size: 16px;
  line-height: 1.3;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;
const Price = styled.div`
  font-weight: 800;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  button {
    background: #0b1220;
    border: 1px solid ${({ theme }) => theme.colors.ring};
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: #e5e7eb;
  }
`;

type P = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  category?: string;
  discount?: number;
};

export default function ProductCard({
  p,
  priority = false,
}: {
  p: P;
  priority?: boolean;
}) {
  const discount = p.discount ?? 10;

  return (
    <Link href={`/product/${p.slug}`}>
      <Card>
        <Badge>{discount}% off</Badge>
        <Image
          src={p.image}
          alt={p.title}
          width={640}
          height={480}
          priority={priority}
          style={{ width: "100%", height: 260, objectFit: "cover" }}
        />
        <Body>
          <Category>{p.category || "Watches"}</Category>
          <Title title={p.title}>
            {p.title.length > 40 ? p.title.slice(0, 40) + "…" : p.title}
          </Title>
          <Row>
            <Price>${p.price.toFixed(2)}</Price>
            <Actions>
              <button aria-label="favorite">
                <Heart size={16} />
              </button>
              <button aria-label="add to cart">
                <ShoppingCart size={16} />
              </button>
            </Actions>
          </Row>
        </Body>
      </Card>
    </Link>
  );
}
