"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
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
  const params = useSearchParams();
  const q = (params.get("q") || "").trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return items;
    return items.filter((p) =>
      [p.title, p.description, p.category].filter(Boolean).some((v) => v!.toLowerCase().includes(q))
    );
  }, [items, q]);

  return (
    <Wrap>
      <Header>
        {q ? (
          <span>
            Results for <strong>“{q}”</strong> — {filtered.length}
          </span>
        ) : (
          <span>{filtered.length} items</span>
        )}
      </Header>

      {filtered.length === 0 ? (
        <Empty>
          <h3>No matches</h3>
          <p>Try a different keyword or browse all products.</p>
        </Empty>
      ) : (
        <Grid>
          {filtered.map((p) => (
            <Card key={p.id} href={`/product/${p.slug}`}>
              <ImgWrap>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 260px, (min-width:640px) 33vw, 100vw"
                  style={{ objectFit: "cover" }}
                  priority={false}
                />
                {p.category && <Badge>{p.category}</Badge>}
              </ImgWrap>

              <Body>
                <Title title={p.title}>{p.title}</Title>
                <Row>
                  <Price>${p.price.toFixed(2)}</Price>
                  <Cta>View</Cta>
                </Row>
              </Body>
            </Card>
          ))}
        </Grid>
      )}
    </Wrap>
  );
}

/* ================= styled ================= */

const Wrap = styled.div`
  display: grid;
  gap: 14px;
`;

const Header = styled.p`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors?.subtext ?? "#94a3b8"};
  font-size: 14px;
`;

const Grid = styled.div`
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
  background: ${({ theme }) => theme.colors?.card ?? "#0f172a"};
  border: 1px solid ${({ theme }) => theme.colors?.ring ?? "rgba(148,163,184,.22)"};
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform .12s ease, box-shadow .2s ease, border-color .2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 36px rgba(0,0,0,.35);
    border-color: ${({ theme }) => theme.colors?.primary ?? "#7c3aed"};
  }
`;

const ImgWrap = styled.div`
  position: relative;
  aspect-ratio: 1 / 1; /* square, no CLS */
  background: ${({ theme }) => theme.colors?.muted ?? "#0b1220"};
`;

const Badge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 8px;
  font-size: 11px;
  color: #fff;
  background: ${({ theme }) => theme.colors?.primary ?? "#7c3aed"};
  border-radius: 999px;
`;

const Body = styled.div`
  display: grid;
  gap: 8px;
  padding: 10px 12px 12px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 800;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors?.text ?? "#e5e7eb"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors?.subtext ?? "#94a3b8"};
  font-weight: 800;
`;

const Cta = styled.span`
  display: inline-block;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors?.primary ?? "#7c3aed"}, ${({ theme }) =>
  theme.colors?.accent ?? "#db2777"});
  border-radius: 999px;
`;

/* empty state */
const Empty = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors?.ring ?? "rgba(148,163,184,.28)"};
  border-radius: 14px;
  padding: 28px;
  text-align: center;
  color: ${({ theme }) => theme.colors?.subtext ?? "#94a3b8"};

  h3 {
    margin: 0 0 6px;
    color: ${({ theme }) => theme.colors?.text ?? "#e5e7eb"};
    font-size: 16px;
    font-weight: 800;
  }
  p {
    margin: 0;
    font-size: 13px;
  }
`;
