"use client";

import { useState } from "react";
import Link from "next/link";
import RainLayer from "@/components/RainLayer";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "비밀번호가 올바르지 않습니다.");
        setLoading(false);
        return;
      }
      setAuthed(true);
      setStatus(`연결 확인 완료 · 등록된 상품 ${data.count}개`);
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "시트를 다시 불러오지 못했습니다.");
        return;
      }
      setStatus(`다시 불러왔어요 · 등록된 상품 ${data.count}개`);
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }

  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const sheetUrl = sheetId ? `https://docs.google.com/spreadsheets/d/${sheetId}/edit` : null;

  return (
    <>
      <RainLayer />
      <div className="admin-wrap">
        <div className="admin-card">
          <h1 className="admin-title">관리자 페이지</h1>
          <p className="admin-desc">
            상품 정보는 구글 시트에서 직접 추가·수정해요.
            <br />
            여기서는 시트로 이동하거나, 수정한 내용을 사이트에 바로 반영시킬 수 있어요.
          </p>

          {!authed ? (
            <form onSubmit={handleLogin}>
              <input
                type="password"
                className="admin-input"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {error && <p className="admin-error">{error}</p>}
              <button type="submit" className="cta-btn" disabled={loading}>
                {loading ? "확인 중..." : "확인"}
              </button>
            </form>
          ) : (
            <>
              {status && <p className="admin-success">{status}</p>}
              {error && <p className="admin-error">{error}</p>}
              <div className="admin-btn-row">
                {sheetUrl ? (
                  <a className="admin-btn-secondary" href={sheetUrl} target="_blank" rel="noopener noreferrer">
                    구글 시트 열기
                  </a>
                ) : (
                  <span className="admin-btn-secondary" style={{ opacity: 0.5 }}>
                    시트 ID 미설정
                  </span>
                )}
                <button className="admin-btn-secondary" onClick={handleRefresh} disabled={loading}>
                  {loading ? "불러오는 중..." : "다시 불러오기"}
                </button>
              </div>
            </>
          )}

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link href="/" className="admin-link">
              ← 테스트 페이지로
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
