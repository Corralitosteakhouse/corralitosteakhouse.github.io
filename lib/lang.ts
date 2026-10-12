"use client";

import { useSyncExternalStore } from "react";
import type { Lang } from "./i18n";
import { STORAGE_KEY } from "./lang-boot";

// El idioma vive en <html data-lang>. Un script en el layout lo fija antes de pintar
// (preferencia guardada o idioma del celular), así no hay parpadeo.
const EVENT = "langchange";

function read(): Lang {
  return document.documentElement.dataset.lang === "en" ? "en" : "es";
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, read, () => "es");
}

export function setLang(lang: Lang) {
  const html = document.documentElement;
  html.dataset.lang = lang;
  html.lang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

