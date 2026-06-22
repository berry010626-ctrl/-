import { NextRequest, NextResponse } from "next/server";
import { fetchAllProducts, clearProductsCache } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const password = body?.password as string | undefined;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "서버에 ADMIN_PASSWORD 환경변수가 설정되어 있지 않습니다." },
      { status: 500 }
    );
  }

  if (!password || password !== adminPassword) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  // 새로고침: 캐시를 비우고 최신 데이터를 한 번 가져와본다 (시트 연결 확인용)
  clearProductsCache();
  try {
    const products = await fetchAllProducts(true);
    return NextResponse.json({ ok: true, count: products.length });
  } catch {
    return NextResponse.json(
      { ok: false, error: "구글 시트에서 데이터를 불러오지 못했습니다. 시트 ID / API 키 / 시트 공유 설정을 확인해주세요." },
      { status: 502 }
    );
  }
}
