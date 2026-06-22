"use client";

import { useEffect, useState } from "react";

interface Drop {
  left: number;
  duration: number;
  delay: number;
  height: number;
}

function generateDrops(): Drop[] {
  const count = window.innerWidth < 480 ? 24 : 40;
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    duration: 0.7 + Math.random() * 0.9,
    delay: Math.random() * 3,
    height: 60 + Math.random() * 60,
  }));
}

export default function RainLayer() {
  const [mounted, setMounted] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    setDrops(generateDrops());
    setMounted(true);
  }, []);

  if (!mounted) return <div className="rain-layer" aria-hidden="true" />;

  return (
    <div className="rain-layer" aria-hidden="true">
      {drops.map((d, i) => (
        <div
          key={i}
          className="drop"
          style={{
            left: `${d.left}%`,
            height: `${d.height}px`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
