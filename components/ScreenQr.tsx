"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

// El QR apunta a /reto en el mismo dominio desde el que se abrió la pantalla.
export default function ScreenQr() {
  const [url] = useState(() => `${window.location.origin}/reto/?src=tv`);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0d0d0d", light: "#ffffff" } }).then(setSvg);
  }, [url]);

  return (
    <div className="qr-glow rounded-[2vw] bg-white p-[2.2vw]">
      <div className="aspect-square w-[min(28vw,58vh)] [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}
