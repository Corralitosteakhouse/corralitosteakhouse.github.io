"use client";

import { setLang, useLang } from "@/lib/lang";
import { tr, type Lang } from "@/lib/i18n";

export function LangToggle() {
  const lang = useLang();
  const option = (value: Lang) => (
    <button
      type="button"
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      className={`px-2 py-1 transition-colors ${lang === value ? "text-gold" : "text-ink/45 hover:text-ink/80"}`}
    >
      {value.toUpperCase()}
    </button>
  );
  return (
    <div role="group" aria-label={tr(lang, "common.langLabel")} className="flex items-center text-sm font-semibold tracking-widest">
      {option("es")}
      <span className="text-ink/25" aria-hidden>|</span>
      {option("en")}
    </div>
  );
}
