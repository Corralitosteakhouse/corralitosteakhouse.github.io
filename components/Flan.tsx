import { useId } from "react";

// Flan napolitano con caramelo sobre plato, vista de 3/4.
// empty=true dibuja solo el plato (los vasos que no tienen flan).
export function Flan({ className = "", empty = false }: { className?: string; empty?: boolean }) {
  const p = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 200 130" className={className} aria-hidden>
      <defs>
        <radialGradient id={`${p}plate`} cx=".42" cy=".3" r=".75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".7" stopColor="#ece6dc" />
          <stop offset="1" stopColor="#c9c1b4" />
        </radialGradient>
        <radialGradient id={`${p}pool`} cx=".45" cy=".4" r=".6">
          <stop offset="0" stopColor="#b8621c" />
          <stop offset=".6" stopColor="#8a3f0f" />
          <stop offset="1" stopColor="#5c2606" />
        </radialGradient>
        <linearGradient id={`${p}body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c98a2c" />
          <stop offset=".22" stopColor="#f2cf7c" />
          <stop offset=".42" stopColor="#f7dc93" />
          <stop offset=".75" stopColor="#e3ad4e" />
          <stop offset="1" stopColor="#b97a22" />
        </linearGradient>
        <linearGradient id={`${p}shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a3a0e" stopOpacity=".35" />
          <stop offset=".25" stopColor="#7a3a0e" stopOpacity="0" />
          <stop offset=".8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#5c2606" stopOpacity=".35" />
        </linearGradient>
        <radialGradient id={`${p}top`} cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#c46a1e" />
          <stop offset=".55" stopColor="#8f4310" />
          <stop offset="1" stopColor="#5a2405" />
        </radialGradient>
        <linearGradient id={`${p}drip`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7d360b" stopOpacity=".95" />
          <stop offset="1" stopColor="#a8551a" stopOpacity=".55" />
        </linearGradient>
        <filter id={`${p}blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
        <filter id={`${p}soft`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <ellipse cx="100" cy="114" rx="94" ry="15" fill="#000" opacity=".35" filter={`url(#${p}soft)`} />
      <ellipse cx="100" cy="108" rx="94" ry="19" fill={`url(#${p}plate)`} />
      <ellipse cx="100" cy="107" rx="72" ry="13" fill="none" stroke="#d6cfc3" strokeWidth="1.5" />

      {!empty && (
        <>

      {/* charco de caramelo */}
      <path
        d="M30 106 C32 97 60 94 100 94 C142 94 170 97 171 105 C172 112 150 116 128 115 C120 119 104 118 96 116 C78 118 58 116 48 114 C36 113 29 110 30 106 Z"
        fill={`url(#${p}pool)`}
      />
      <ellipse cx="72" cy="104" rx="22" ry="3" fill="#f0a35a" opacity=".45" filter={`url(#${p}blur)`} />
      <ellipse cx="140" cy="108" rx="10" ry="1.8" fill="#f0a35a" opacity=".35" filter={`url(#${p}blur)`} />

      {/* sombra del flan sobre el caramelo */}
      <ellipse cx="102" cy="102" rx="58" ry="7" fill="#2a0f02" opacity=".5" filter={`url(#${p}blur)`} />

      {/* cuerpo */}
      <path d="M44 100 C44 103 70 107 100 107 C130 107 156 103 156 100 L146 47 C146 44 125 41 100 41 C75 41 54 44 54 47 Z" fill={`url(#${p}body)`} />
      <path d="M44 100 C44 103 70 107 100 107 C130 107 156 103 156 100 L146 47 C146 44 125 41 100 41 C75 41 54 44 54 47 Z" fill={`url(#${p}shade)`} />

      {/* poritos del flan */}
      <g fill="#b7782a" opacity=".35">
        <ellipse cx="70" cy="80" rx="1.6" ry="1.1" />
        <ellipse cx="84" cy="92" rx="1.2" ry=".9" />
        <ellipse cx="118" cy="85" rx="1.5" ry="1" />
        <ellipse cx="134" cy="74" rx="1.1" ry=".8" />
        <ellipse cx="96" cy="70" rx="1" ry=".7" />
        <ellipse cx="62" cy="95" rx="1.3" ry=".9" />
        <ellipse cx="141" cy="93" rx="1.2" ry=".8" />
      </g>

      {/* brillo lateral */}
      <path d="M66 52 C63 66 61 82 60 98" stroke="#fff6dc" strokeWidth="5" strokeLinecap="round" opacity=".55" filter={`url(#${p}blur)`} />

      {/* escurrimientos de caramelo */}
      <path
        d="M54 47 C54 52 55 60 57 63 C59 66 61 60 61 55 C63 61 64 71 67 72 C70 73 70 62 70 56 C74 59 75 52 78 54 C81 56 80 63 84 63 C87 63 86 55 88 53 L54 47 Z"
        fill={`url(#${p}drip)`}
      />
      <path
        d="M112 53 C114 55 114 64 118 65 C121 66 121 57 123 55 C126 58 125 76 130 77 C134 78 133 62 135 57 C138 60 139 66 142 64 C145 62 145 55 146 47 L112 53 Z"
        fill={`url(#${p}drip)`}
      />

      {/* tapa de caramelo */}
      <ellipse cx="100" cy="47" rx="46" ry="8.5" fill={`url(#${p}top)`} />
      <ellipse cx="100" cy="47" rx="46" ry="8.5" fill="none" stroke="#4a1d03" strokeWidth="1" opacity=".6" />
      <ellipse cx="86" cy="44.5" rx="17" ry="2.6" fill="#ffd9a6" opacity=".75" filter={`url(#${p}blur)`} />
      <ellipse cx="118" cy="49" rx="6" ry="1.2" fill="#ffd9a6" opacity=".45" filter={`url(#${p}blur)`} />
        </>
      )}
    </svg>
  );
}
