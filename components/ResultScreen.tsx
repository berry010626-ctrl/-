"use client";

import { useEffect, useState } from "react";
import { ResultType } from "@/data/quiz";
import { Product } from "@/lib/types";

interface ResultScreenProps {
  type: ResultType;
  onRestart: () => void;
}

const FALLBACK_IMG = "https://placehold.co/160x160/1C3052/A9B7D1?text=MAYBLUE";

export default function ResultScreen({ type, onRestart }: ResultScreenProps) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setProducts(null);
    fetch(`/api/products?type=${type.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProducts(data.products || []);
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, [type.id]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  async function handleShare() {
    const shareText = `나는 '${type.title}'! 장마 무드 테스트 해보기 👉`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: "MAYBLUE 장마 무드 테스트", text: shareText, url });
        return;
      } catch {
        // 사용자가 취소한 경우 등 — 아래로 폴백
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareText} ${url}`);
      showToast("결과 링크가 복사됐어요 📋");
    } catch {
      showToast(`공유 링크: ${url}`);
    }
  }

  return (
    <section className="screen-enter">
      <div className="result-card">
        <div className="result-eyebrow">당신의 장마 무드는</div>
        <div className="result-emoji">{type.emoji}</div>
        <h2 className="result-title">{type.title}</h2>
        <p className="result-desc">{type.desc}</p>
        <div className="result-tags">
          {type.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <hr className="divider" />

        <div className="products-title">🛍️ 이 무드에 딱 맞는 MAYBLUE 코디</div>
        <div className="product-grid">
          {products === null && <div className="product-loading">코디 불러오는 중...</div>}
          {products !== null && products.length === 0 && (
            <div className="product-empty">아직 등록된 코디가 없어요. 구글 시트에 제품을 추가해보세요.</div>
          )}
          {products?.map((p, i) => (
            
              key={i}
              className="product-card"
              href={p.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="product-img"
                src={p.imageUrl || FALLBACK_IMG}
                alt={p.name}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_IMG;
                }}
              />
              <div className="product-info">
                <div className="product-copy">{p.copy}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-price">{p.price ? `${p.price}원` : ""}</div>
                <div className="product-hashtags">{p.tags.join(" ")}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="action-row">
          <button className="share-btn" onClick={handleShare}>
            결과 공유하기
          </button>
          <button className="restart-btn" onClick={onRestart}>
            다시 하기
          </button>
        </div>
      </div>

      {toast && <div className="toast show">{toast}</div>}
    </section>
  );
}
