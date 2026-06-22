import { NextRequest, NextResponse } from "next/server";
import { fetchProductsByType } from "@/lib/sheets";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type || !["A", "B", "C", "D", "E"].includes(type.toUpperCase())) {
    return NextResponse.json({ error: "잘못된 결과유형입니다." }, { status: 400 });
  }

  try {
    const products = await fetchProductsByType(type);
    return NextResponse.json({ products });
  } catch {
    // 시트 연동 실패 시에도 사이트는 정상 동작해야 하므로 빈 배열로 응답
    return NextResponse.json({ products: [] });
  }
}
