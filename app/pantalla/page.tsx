import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { ScreenEffects, ScreenQr } from "@/components/client-only";
import { tr } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Reto Corralito · Pantalla",
  robots: { index: false, follow: false },
};

// Pantalla horizontal para TV: muestra ambos idiomas a la vez.
export default function Pantalla() {
  return (
    <div className="relative grid h-dvh w-full grid-cols-[1.15fr_1fr] items-center gap-[4vw] overflow-hidden px-[6vw]">
      <div className="flex flex-col items-start gap-[3.5vh]">
        <Logo priority className="w-[min(30vw,46vh)]" />

        <div className="flex flex-col gap-[1.2vh]">
          <h1 className="breathe-a font-display text-[4.3vw] font-extrabold uppercase leading-[1.02] tracking-tight">
            {tr("es", "screen.title")}
          </h1>
          <h2 className="breathe-b font-display text-[3vw] font-bold uppercase leading-tight text-gold">
            {tr("en", "screen.title")}
          </h2>
        </div>

        <div className="flex flex-col gap-[0.8vh] text-[1.7vw] leading-snug">
          <p className="text-ink/90">{tr("es", "screen.subtitle")}</p>
          <p className="text-ink/55">{tr("en", "screen.subtitle")}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <ScreenQr />
      </div>

      <ScreenEffects label={`${tr("es", "screen.fullscreen")} · ${tr("en", "screen.fullscreen")}`} />
    </div>
  );
}
