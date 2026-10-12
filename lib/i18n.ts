import es from "@/messages/es.json";
import en from "@/messages/en.json";

export type Lang = "es" | "en";

const DICTS: Record<Lang, unknown> = { es, en };

type Leaves<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends string ? `${P}${K}` : Leaves<T[K], `${P}${K}.`>;
}[keyof T & string];

export type MsgKey = Leaves<typeof es>;
export type Vars = Record<string, string | number>;

export function tr(lang: Lang, key: MsgKey, vars?: Vars): string {
  let value: unknown = DICTS[lang];
  for (const part of key.split(".")) {
    value = (value as Record<string, unknown> | undefined)?.[part];
  }
  let text = typeof value === "string" ? value : key;
  if (vars) {
    for (const [name, v] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, String(v));
  }
  return text;
}

export const LOCALES: Record<Lang, string> = { es: "es-MX", en: "en-US" };
