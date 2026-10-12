"use client";

import { useState } from "react";
import Link from "next/link";
import { getWinToday } from "@/lib/premio";
import { T } from "./T";

// Si este celular ya ganó hoy, ofrece volver a su premio.
export default function WonTodayLink() {
  const [wonAt] = useState(getWinToday);
  if (!wonAt) return null;
  return (
    <p className="text-sm text-ink/70">
      <T k="welcome.wonToday" />{" "}
      <Link href="/reto/premio" className="font-semibold text-gold underline underline-offset-4">
        <T k="welcome.seePrize" />
      </Link>
    </p>
  );
}
