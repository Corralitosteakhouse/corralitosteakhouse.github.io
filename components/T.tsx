import { tr, type MsgKey, type Vars } from "@/lib/i18n";

// Pinta el texto en ambos idiomas; el CSS muestra solo el activo.
export function T({ k, vars }: { k: MsgKey; vars?: Vars }) {
  return (
    <>
      <span data-l="es">{tr("es", k, vars)}</span>
      <span data-l="en">{tr("en", k, vars)}</span>
    </>
  );
}
