import Link from "next/link";
import { Logo } from "@/components/Logo";
import { T } from "@/components/T";
import { WonTodayLink } from "@/components/client-only";

export default function Bienvenida() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 py-8 text-center">
      <Logo priority className="fade-up w-[82%] max-w-[340px]" />

      <div className="fade-up-2 flex flex-col gap-4">
        <h1 className="font-display text-[2.1rem] font-bold leading-tight text-balance">
          <T k="welcome.title" />
        </h1>
        <p className="mx-auto max-w-[19rem] text-base leading-relaxed text-ink/70">
          <T k="welcome.subtitle" />
        </p>
      </div>

      <div className="fade-up-3 flex w-full flex-col items-center gap-5">
        <Link href="/reto/juego" className="btn-gold w-full px-6 text-[1.05rem]">
          <T k="welcome.cta" />
        </Link>
        <WonTodayLink />
      </div>
    </div>
  );
}
