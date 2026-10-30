import { NextRequest, NextResponse } from "next/server";
import { medusa } from "@/lib/medusa";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const data = await medusa("/store/newsletter", { method: "POST", body });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Newsletter is unavailable." }, { status: 400 });
  }
}
