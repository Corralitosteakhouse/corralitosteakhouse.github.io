"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RETO } from "@/config/reto";
import { LOCALES } from "@/lib/i18n";
import { useLang } from "@/lib/lang";
import { getWinToday } from "@/lib/premio";
import { Flan } from "./Flan";
import { Logo } from "./Logo";
import { T } from "./T";

export default function PrizeScreen() {
  const router = useRouter();
  const lang = useLang();
  const [wonAt] = useState(getWinToday);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!wonAt) router.replace("/reto");
  }, [wonAt, router]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!wonAt) return null;

  const locale = LOCALES[lang];
  const tz = RETO.timeZone;
  const date = new Intl.DateTimeFormat(locale, { timeZone: tz, weekday: "long", day: "numeric", month: "long" }).format(now);
  const clock = new Intl.DateTimeFormat(locale, { timeZone: tz, hour: "numeric", minute: "2-digit", second: "2-digit" }).format(now);
  const wonTime = new Intl.DateTimeFormat(locale, { timeZone: tz, hour: "numeric", minute: "2-digit" }).format(wonAt);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-7 py-6 text-center">
      <Logo className="fade-up w-40" />

      <div className="fade-up-2 flex flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.3em] text-gold">
          <T k="prize.eyebrow" />
        </span>
        <Flan className="w-40" />
        <h1 className="font-display text-[2.2rem] font-extrabold leading-tight text-balance">
          <T k="prize.title" />
        </h1>
      </div>

      {/* Tarjeta "en vivo": el borde gira y el reloj corre, así una captura de pantalla se nota. */}
      <div className="fade-up-3 live-border w-full max-w-xs rounded-3xl p-[2px]">
        <div className="flex flex-col items-center gap-1 rounded-[calc(1.5rem-2px)] bg-noir/95 px-6 py-5">
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            <span className="live-dot h-2 w-2 rounded-full bg-red-500" aria-hidden />
            <T k="prize.live" />
          </span>
          <span className="first-letter:uppercase text-lg text-ink/85">{date}</span>
          <span className="font-display text-5xl font-bold tabular-nums tracking-tight">{clock}</span>
          <span className="mt-1 text-sm text-ink/55">
            <T k="prize.wonAt" vars={{ time: wonTime }} />
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-xl font-semibold text-gold-soft">
          <T k="prize.show" />
        </p>
        <p className="max-w-xs text-xs uppercase leading-relaxed tracking-[0.16em] text-ink/45">
          <T k="prize.rules" />
        </p>
        {RETO.instagram && (
          <p className="mt-2 text-sm text-ink/60">
            <T k="prize.share" vars={{ handle: RETO.instagram }} />
          </p>
        )}
      </div>
    </div>
  );
}
