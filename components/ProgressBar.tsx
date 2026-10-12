"use client";

import { usePathname } from "next/navigation";
import { RETO } from "@/config/reto";
import { T } from "./T";

const STEPS: Record<string, number> = { "/reto": 1, "/reto/juego": 2, "/reto/premio": 3 };

export function ProgressBar() {
  const step = STEPS[usePathname().replace(/\/$/, "")] ?? 1;
  const total = RETO.totalSteps;
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50">
        <T k="progress.label" vars={{ n: step, total }} />
      </span>
      <div className="flex gap-1.5" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-[3px] w-8 rounded-full transition-colors duration-500 ${i < step ? "bg-gold" : "bg-ink/15"}`}
          />
        ))}
      </div>
    </div>
  );
}
