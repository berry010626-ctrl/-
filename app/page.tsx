"use client";

import { useState } from "react";
import Link from "next/link";
import RainLayer from "@/components/RainLayer";
import UmbrellaGauge from "@/components/UmbrellaGauge";
import ResultScreen from "@/components/ResultScreen";
import { QUESTIONS, RESULT_TYPES, ResultTypeId } from "@/data/quiz";

type Stage = "intro" | "question" | "result";

const EMPTY_SCORES: Record<ResultTypeId, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
const OPTION_LABELS = ["A", "B", "C", "D", "E"];

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<ResultTypeId, number>>(EMPTY_SCORES);

  function start() {
    setCurrentQ(0);
    setScores(EMPTY_SCORES);
    setStage("question");
  }

  function answer(type: ResultTypeId) {
    const next = { ...scores, [type]: scores[type] + 1 };
    setScores(next);

    if (currentQ + 1 < QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setStage("result");
    }
  }

  function restart() {
    start();
  }

  const resultType = (() => {
    let best: ResultTypeId = "A";
    let bestScore = -1;
    (Object.keys(scores) as ResultTypeId[]).forEach((k) => {
      if (scores[k] > bestScore) {
        bestScore = scores[k];
        best = k;
      }
    });
    return RESULT_TYPES.find((t) => t.id === best) ?? RESULT_TYPES[0];
  })();

  return (
    <>
      <RainLayer />
      <div className="app">
        <div className="brand-row">
          <div className="brand">
            MAYBLUE<span>장마 무드 테스트</span>
          </div>
          <Link href="/admin" className="admin-link">
            관리자
          </Link>
        </div>

        <UmbrellaGauge step={stage === "intro" ? 0 : stage === "result" ? QUESTIONS.length : currentQ} total={QUESTIONS.length} />

        <div className="stage">
          {stage === "intro" && (
            <section className="screen-enter">
              <div className="intro-card">
                <span className="intro-eyebrow">☔ 2026 장마 특집</span>
                <h1 className="intro-title">
                  이 장마,
                  <br />
                  당신은 <em>어떤 무드</em>로
                  <br />
                  버티는 사람일까?
                </h1>
                <p className="intro-desc">
                  축축한 날씨에도 스타일은 포기 못 하는 당신.
                  <br />
                  질문 5개로 알아보는 장마철 패션 무드 테스트 —<br />
                  내 무드에 맞는 MAYBLUE 코디도 같이 받아가세요.
                </p>
                <button className="cta-btn" onClick={start}>
                  테스트 시작하기
                </button>
                <p className="intro-meta">약 40초 · 질문 5개 · 결과 5가지 무드</p>
              </div>
            </section>
          )}

          {stage === "question" && (
            <section className="screen-enter" key={currentQ}>
              <div className="q-card">
                <div className="q-step">
                  Q{currentQ + 1} / {QUESTIONS.length}
                </div>
                <h2 className="q-text">{QUESTIONS[currentQ].text}</h2>
                <div className="options">
                  {QUESTIONS[currentQ].options.map((opt, i) => (
                    <button key={i} className="opt-btn" onClick={() => answer(opt.type)}>
                      <span className="tag">{OPTION_LABELS[i]}</span>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {stage === "result" && <ResultScreen type={resultType} onRestart={restart} />}
        </div>

        <footer className="app-footer">MAYBLUE · 비 오는 날에도 무드는 챙기세요</footer>
      </div>
    </>
  );
}
