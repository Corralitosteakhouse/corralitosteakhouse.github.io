"use client";

import { useEffect } from "react";

const RELOAD_EVERY_MS = 6 * 60 * 60 * 1000;

// Mantiene la TV despierta, oculta el cursor, entra a pantalla completa con un toque
// y recarga cada 6 horas para tomar cambios publicados.
export default function ScreenEffects({ label }: { label: string }) {
  useEffect(() => {
    let lock: WakeLockSentinel | null = null;
    const requestLock = () => {
      navigator.wakeLock?.request("screen").then((l) => (lock = l)).catch(() => {});
    };
    const onVisible = () => document.visibilityState === "visible" && requestLock();
    requestLock();
    document.addEventListener("visibilitychange", onVisible);
    const reload = setTimeout(() => location.reload(), RELOAD_EVERY_MS);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      clearTimeout(reload);
      lock?.release().catch(() => {});
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => document.documentElement.requestFullscreen?.().catch(() => {})}
      className="fixed inset-0 z-10 cursor-none"
      aria-label={label}
    >
      <span className="fade-out-late absolute bottom-[3vh] left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-5 py-2 text-[1.1vw] text-ink/70">
        {label}
      </span>
    </button>
  );
}
