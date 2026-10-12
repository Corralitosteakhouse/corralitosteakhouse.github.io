"use client";

import dynamic from "next/dynamic";

// Estas piezas dependen del navegador (localStorage, hora local, azar),
// así que no se pre-renderizan en el servidor.
export const ShellGame = dynamic(() => import("./ShellGame"), { ssr: false });
export const PrizeScreen = dynamic(() => import("./PrizeScreen"), { ssr: false });
export const WonTodayLink = dynamic(() => import("./WonTodayLink"), { ssr: false });
export const ScreenQr = dynamic(() => import("./ScreenQr"), { ssr: false });
export const ScreenEffects = dynamic(() => import("./ScreenEffects"), { ssr: false });
