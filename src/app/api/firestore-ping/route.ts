// src/app/api/firestore-ping/route.ts
export const runtime = 'nodejs';

import { adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";


export async function GET() {
  const test = await adminDb.collection("healthcheck").limit(1).get();
  return NextResponse.json({ ok: true, collections: test.size >= 0 });
}
