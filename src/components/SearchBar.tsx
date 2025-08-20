"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import styled from "styled-components";

type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
};

export default function SearchGrid({ items }: { items: Product[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((p) =>
      [p.title, p.description, p.category]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(s))
    );
  }, [items, q]);

  return (
    <Wrap>
      <Toolbar>
        <Search
          placeholder="Search products…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Count>{filtered.length} results</Count>
      </Toolbar>

      <Grid>
        {filtered.map((p) => (
          <Card key={p.id} href={`/product/${p.slug}`}>
            <ImgWrap>
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 100vw"
                style={{ objectFit: "cover" }}
                priority={false}
              />
              {p.category && <Badge>{p.category}</Badge>}
            </ImgWrap>

            <Content>
              <Title>{p.title}</Title>
              <Price>${p.price}</Price>
            </Content>
          </Card>
        ))}
      </Grid>
    </Wrap>
  );
}

/* ——— styles ——— */

const Wrap = styled.div`
  display: grid;
  gap: 14px;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Search = styled.input`
  flex: 1;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors?.ring ?? "rgba(148,163,184,.25)"};
  background: ${({ theme }) => theme.colors?.input ?? "#0b1220"};
  color: ${({ theme }) => theme.colors?.text ?? "#e5e7eb"};
  padding: 10px 12px;
  outline: none;
  transition: box-shadow .15s ease, border-color .15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors?.mutedText ?? "#94a3b888"};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary ?? "#7c3aed"};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors?.primaryFocus ?? "rgba(124,58,237,.32)"};
  }
`;

const Count = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.subtext ?? "#94a3b8"};
`;

const Grid = styled.div`
  /* pretty gaps + responsive columns */
  --min: 220px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--min), 1fr));
  gap: 16px;

  @media (min-width: 640px) {
    gap: 18px;
    --min: 240px;
  }
  @media (min-width: 1024px) {
    gap: 20px;
    --min: 260px;
  }
`;

const Card = styled(Link)`
  display: grid;
  grid-template-rows: auto 1fr;
  border: 1px solid ${({ theme }) => theme.colors?.ring ?? "rgba(148,163,184,.2)"};
  background: ${({ theme }) => theme.colors?.card ?? "#0f172a"};
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform .12s ease, box-shadow .2s ease, border-color .2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(0,0,0,.35);
    border-color: ${({ theme }) => theme.colors?.primary ?? "#7c3aed"};
  }
`;

const ImgWrap = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  background: ${({ theme }) => theme.colors?.muted ?? "#0b1220"};
`;

const Badge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  background: ${({ theme }) => theme.colors?.primary ?? "#7c3aed"};
  color: #fff;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
`;

const Content = styled.div`
  display: grid;
  gap: 6px;
  padding: 10px 12px 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors?.text ?? "#e5e7eb"};
`;

const Price = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors?.subtext ?? "#94a3b8"};
  font-weight: 700;
`;
