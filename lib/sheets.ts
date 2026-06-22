export interface SheetProduct {
  resultType: string;
  name: string;
  imageUrl: string;
  price: string;
  copy: string;
  tags: string[];
  link: string;
}

interface SheetValuesResponse {
  values?: string[][];
}

const SHEET_RANGE = "제품관리!A:G"; // 헤더: 결과유형, 옷이름, 이미지URL, 가격, 카피문구, 특징, 구매링크

let cache: { data: SheetProduct[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60 * 1000; // 1분 캐시 (시트 수정 후 최대 1분 내 반영)

function parseRow(row: string[]): SheetProduct | null {
  const [resultType, name, imageUrl, price, copy, tagsRaw, link] = row;
  if (!resultType || !name) return null;
  const tags = (tagsRaw || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => (t.startsWith("#") ? t : `#${t}`));
  return {
    resultType: resultType.trim().toUpperCase(),
    name: name.trim(),
    imageUrl: (imageUrl || "").trim(),
    price: (price || "").trim(),
    copy: (copy || "").trim(),
    tags,
    link: (link || "#").trim() || "#",
  };
}

export async function fetchAllProducts(forceRefresh = false): Promise<SheetProduct[]> {
  if (!forceRefresh && cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const sheetId = process.env.GOOGLE_SHEET_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!sheetId || !apiKey) {
    return [];
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
    SHEET_RANGE
  )}?key=${apiKey}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`구글 시트 API 오류: ${res.status}`);
  }

  const json: SheetValuesResponse = await res.json();
  const rows = json.values || [];
  if (rows.length <= 1) {
    cache = { data: [], fetchedAt: Date.now() };
    return [];
  }

  // 첫 행은 헤더이므로 제외
  const products = rows
    .slice(1)
    .map(parseRow)
    .filter((p): p is SheetProduct => p !== null);

  cache = { data: products, fetchedAt: Date.now() };
  return products;
}

export async function fetchProductsByType(typeId: string, forceRefresh = false): Promise<SheetProduct[]> {
  const all = await fetchAllProducts(forceRefresh);
  return all.filter((p) => p.resultType === typeId.toUpperCase());
}

export function clearProductsCache() {
  cache = null;
}
