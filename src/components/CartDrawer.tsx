// "use client";

// import { useEffect, useRef } from "react";
// import { createPortal } from "react-dom";
// import styled from "styled-components";
// import { useCart } from "@/store/cart";
// import { useUI } from "@/store/ui";

// export default function CartDrawer() {
//   const { cartOpen, closeCart } = useUI();
//   const { items, total, clear, removeItem } = useCart();
//   const rootRef = useRef<HTMLDivElement | null>(null);
//   const isEmpty = items.length === 0;

//   // mount/unmount portal root
//   useEffect(() => {
//     const div = document.createElement("div");
//     document.body.appendChild(div);
//     rootRef.current = div;
//     return () => {
//       document.body.removeChild(div);
//     };
//   }, []);

//   // lock scroll when open
//   useEffect(() => {
//     if (!cartOpen) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = prev;
//     };
//   }, [cartOpen]);

//   // close on ESC
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [closeCart]);

//   if (!rootRef.current) return null;

//   return createPortal(
//     <>
//       <Backdrop
//         aria-hidden
//         onClick={closeCart}
//         $open={cartOpen}
//       />
//       <Sheet role="dialog" aria-modal="true" aria-label="Shopping cart" $open={cartOpen}>
//         <Head>
//           <Title>Cart</Title>
//           <HeadRight>
//             <Count>({items.length})</Count>
//             <CloseBtn onClick={closeCart} aria-label="Close cart">✕</CloseBtn>
//           </HeadRight>
//         </Head>

//         <List>
//           {isEmpty && <Empty>No items yet</Empty>}
//           {items.map((i) => (
//             <Row key={i.id}>
//               <RowMeta>
//                 <RowTitle>{i.title}</RowTitle>
//                 <RowSub>
//                   ${i.price.toFixed(2)} × {i.qty}
//                 </RowSub>
//               </RowMeta>
//               <RemoveBtn onClick={() => removeItem(i.id)}>Remove</RemoveBtn>
//             </Row>
//           ))}
//         </List>

//         <Foot>
//           <TotalLine>
//             <span>Total</span>
//             <b>${total.toFixed(2)}</b>
//           </TotalLine>

//           {/* Proceed to Payment removed as requested */}
// {/* 
//           <DangerBtn onClick={clear} disabled={isEmpty}>
//             Clear Cart
//           </DangerBtn> */}
//         </Foot>
//       </Sheet>
//     </>,
//     rootRef.current
//   );
// }

// /* ================= styled ================= */

// const Backdrop = styled.div<{ $open: boolean }>`
//   position: fixed;
//   inset: 0;
//   background: rgba(0,0,0,0.5);
//   opacity: ${({ $open }) => ($open ? 1 : 0)};
//   transition: opacity 180ms ease;
//   pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
//   z-index: 49;
// `;

// const Sheet = styled.aside<{ $open: boolean }>`
//   position: fixed;
//   top: 20px;           /* space from top like before */
//   right: 0;
//   bottom: 0;
//   width: 340px;
//   background: #111;
//   color: #fff;
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   border-top-left-radius: 12px;
//   box-shadow: 0 10px 30px rgba(0,0,0,0.5);
//   transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
//   transition: transform 240ms ease;
//   z-index: 50;
// `;

// const Head = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Title = styled.b`
//   font-size: 18px;
// `;

// const HeadRight = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const Count = styled.span`
//   opacity: 0.8;
// `;

// const CloseBtn = styled.button`
//   background: transparent;
//   color: #cbd5e1;
//   border: 1px solid #26324a;
//   width: 32px;
//   height: 32px;
//   border-radius: 999px;
//   cursor: pointer;
// `;

// const List = styled.div`
//   flex: 1;
//   overflow-y: auto;
//   margin-top: 12px;
// `;

// const Empty = styled.div`
//   opacity: 0.7;
// `;

// const Row = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 8px;
//   padding: 8px 0;
//   border-bottom: 1px solid #1f2937;
// `;

// const RowMeta = styled.div`
//   display: grid;
// `;

// const RowTitle = styled.span`
//   font-weight: 600;
// `;

// const RowSub = styled.span`
//   opacity: 0.8;
//   font-size: 12px;
// `;

// const RemoveBtn = styled.button`
//   background: transparent;
//   color: #f55;
//   border: none;
//   cursor: pointer;
//   font-size: 14px;
// `;

// const Foot = styled.div`
//   margin-top: 12px;
//   display: grid;
//   gap: 8px;
// `;

// const TotalLine = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-weight: 700;
// `;

// const DangerBtn = styled.button`
//   width: 100%;
//   padding: 10px;
//   background: #f55;
//   color: #fff;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 700;
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//     filter: grayscale(0.3);
//   }
// `;
