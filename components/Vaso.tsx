import { useId } from "react";

// Vaso de barro boca abajo (la boca queda abajo, sobre el plato).
export function Vaso({ className = "" }: { className?: string }) {
  const p = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${p}clay`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5a2812" />
          <stop offset=".18" stopColor="#9c4a24" />
          <stop offset=".38" stopColor="#c8693a" />
          <stop offset=".55" stopColor="#b85a2e" />
          <stop offset=".85" stopColor="#7c3818" />
          <stop offset="1" stopColor="#4a200d" />
        </linearGradient>
        <linearGradient id={`${p}lip`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a200d" />
          <stop offset=".35" stopColor="#a8532a" />
          <stop offset=".6" stopColor="#8f4220" />
          <stop offset="1" stopColor="#3f1b0a" />
        </linearGradient>
        <radialGradient id={`${p}base`} cx=".45" cy=".4" r=".7">
          <stop offset="0" stopColor="#c9703f" />
          <stop offset="1" stopColor="#7a3618" />
        </radialGradient>
        <filter id={`${p}blur`} x="-50%" y="-20%" width="200%" height="140%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* cuerpo */}
      <path d="M24 152 L50 22 C50 16 150 16 150 22 L176 152 Z" fill={`url(#${p}clay)`} />

      {/* franjas pintadas */}
      <path d="M38 84 C70 90 130 90 162 84" fill="none" stroke="#efd9b0" strokeWidth="3" opacity=".85" />
      <path d="M36 96 C70 102 130 102 164 96" fill="none" stroke="#efd9b0" strokeWidth="1.6" opacity=".7" />
      <g fill="#efd9b0" opacity=".8">
        <circle cx="62" cy="64" r="2.2" />
        <circle cx="84" cy="66" r="2.2" />
        <circle cx="106" cy="66.5" r="2.2" />
        <circle cx="128" cy="66" r="2.2" />
        <circle cx="146" cy="64" r="2" />
      </g>
      <path d="M44 120 C74 127 126 127 156 120" fill="none" stroke="#efd9b0" strokeWidth="1.6" opacity=".55" />

      {/* brillo */}
      <path d="M72 30 L58 140" stroke="#ffd2a8" strokeWidth="9" strokeLinecap="round" opacity=".35" filter={`url(#${p}blur)`} />

      {/* fondo del vaso (arriba) */}
      <ellipse cx="100" cy="21" rx="50" ry="7" fill={`url(#${p}base)`} />
      <ellipse cx="100" cy="21" rx="50" ry="7" fill="none" stroke="#4a200d" strokeWidth="1" opacity=".5" />

      {/* boca (abajo) */}
      <path d="M20 150 C20 160 180 160 180 150 L178 158 C178 168 22 168 22 158 Z" fill={`url(#${p}lip)`} />
      <path d="M20 150 C20 158 180 158 180 150" fill="none" stroke="#d07a48" strokeWidth="1.5" opacity=".6" />
    </svg>
  );
}
