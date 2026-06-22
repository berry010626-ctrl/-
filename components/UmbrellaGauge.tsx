interface UmbrellaGaugeProps {
  step: number;
  total: number;
}

export default function UmbrellaGauge({ step, total }: UmbrellaGaugeProps) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="gauge-wrap">
      <svg className="umbrella-svg" viewBox="0 0 48 48">
        <path
          d="M24 4C13 4 5 13 5 24h6c0-7.2 5.8-13 13-13s13 5.8 13 13h6C43 13 35 4 24 4z"
          fill="#FFCF3F"
        />
        <rect x="22.5" y="22" width="3" height="18" rx="1.5" fill="#A9B7D1" />
        <path
          d="M22.5 38c0 2 1 3.5 3 3.5s3-1.5 3-3.5"
          stroke="#A9B7D1"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="gauge-track">
        <div className="gauge-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="gauge-label">
        {step}/{total}
      </div>
    </div>
  );
}
