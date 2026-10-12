"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RETO } from "@/config/reto";
import type { MsgKey } from "@/lib/i18n";
import { saveWin } from "@/lib/premio";
import { Flan } from "./Flan";
import { T } from "./T";
import { Vaso } from "./Vaso";

type Phase = "ready" | "lowering" | "shuffling" | "choose" | "reveal" | "won";
type Particle = { dx: number; dy: number; rot: number; color: string };

const CUPS = [0, 1, 2];
const FLAN_CUP = 0; // el vaso 0 siempre lleva el flan; lo que cambia es dónde termina
const COLORS = ["#c8a165", "#e3c48f", "#f5f1ea", "#a8763a"];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function makeParticles(): Particle[] {
  return Array.from({ length: 26 }, (_, i) => {
    const angle = (i / 26) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 70 + Math.random() * 110;
    return { dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist - 40, rot: Math.random() * 540 - 270, color: COLORS[i % COLORS.length] };
  });
}

export default function ShellGame() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("ready");
  const [attempt, setAttempt] = useState(1);
  // slots[cup] = posición 0, 1 o 2. El flan empieza al centro.
  const [slots, setSlots] = useState([1, 0, 2]);
  const [lifted, setLifted] = useState<boolean[]>([true, true, true]);
  // Desplazamiento vertical durante un cruce: uno pasa por delante y otro por detrás.
  const [depth, setDepth] = useState<number[]>([0, 0, 0]);
  const [moveMs, setMoveMs] = useState(400);
  const [picked, setPicked] = useState<number | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  useEffect(() => {
    if (phase !== "won") return;
    const t = setTimeout(() => router.push("/reto/premio"), 2200);
    return () => clearTimeout(t);
  }, [phase, router]);

  // Cada intento revuelve más lento, hasta el último nivel, que se repite.
  async function play(n: number) {
    const level = RETO.shuffle[Math.min(n, RETO.shuffle.length) - 1];
    setPicked(null);
    setPhase("lowering");
    setLifted([false, false, false]);
    await sleep(700);

    setPhase("shuffling");
    setMoveMs(level.ms);
    let current = slots;
    for (let i = 0; i < level.swaps; i++) {
      if (!alive.current) return;
      const a = Math.floor(Math.random() * 3);
      const b = (a + 1 + Math.floor(Math.random() * 2)) % 3;
      const cupA = current.indexOf(a);
      const cupB = current.indexOf(b);
      const next = [...current];
      next[cupA] = b;
      next[cupB] = a;
      const d = [0, 0, 0];
      d[cupA] = -1;
      d[cupB] = 1;
      current = next;
      setSlots(next);
      setDepth(d);
      await sleep(level.ms / 2);
      setDepth([0, 0, 0]);
      await sleep(level.ms / 2 + 40);
    }
    if (alive.current) setPhase("choose");
  }

  async function choose(cup: number) {
    if (phase !== "choose") return;
    setPicked(cup);
    setPhase("reveal");
    setLifted((l) => l.map((v, i) => v || i === cup));
    if (cup === FLAN_CUP) {
      await sleep(450);
      saveWin();
      setParticles(makeParticles());
      navigator.vibrate?.([40, 60, 40]);
      setPhase("won");
    } else {
      navigator.vibrate?.(90);
      await sleep(800);
      setLifted((l) => l.map((v, i) => v || i === FLAN_CUP));
    }
  }

  function retry() {
    const n = attempt + 1;
    setAttempt(n);
    play(n);
  }

  const missed = phase === "reveal" && picked !== FLAN_CUP;
  const message: MsgKey | null =
    phase === "ready" ? "game.watch" : phase === "shuffling" || phase === "lowering" ? "game.follow" : phase === "choose" ? "game.choose" : missed ? "game.miss" : phase === "won" ? "game.found" : null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 pb-10">
      <div className="flex min-h-20 flex-col items-center gap-2 text-center">
        {attempt > 1 && (
          <span className="text-xs uppercase tracking-[0.25em] text-ink/45">
            <T k="game.attempt" vars={{ n: attempt }} />
          </span>
        )}
        {message && (
          <p key={message} className={`fade-up font-display text-2xl font-bold ${phase === "won" ? "text-gold" : ""} ${missed ? "shake" : ""}`}>
            <T k={message} />
          </p>
        )}
      </div>

      {/* Mesa */}
      <div className="relative w-full" style={{ height: "min(70vw, 300px)" }}>
        <div className="absolute inset-x-[-6%] bottom-[-4%] h-[38%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(200,161,101,0.18),transparent)]" />
        {CUPS.map((cup) => {
          const isFlan = cup === FLAN_CUP;
          return (
            <div
              key={cup}
              className="absolute bottom-0 left-0 w-[38%]"
              style={{
                // Vasos de 38 % de ancho separados 31 %: se enciman un poco y se ven más grandes.
                transform: `translateX(${slots[cup] * (31 / 38) * 100}%)`,
                transition: `transform ${moveMs}ms cubic-bezier(.45,.05,.35,1)`,
                zIndex: depth[cup] === 1 ? 3 : depth[cup] === -1 ? 1 : 2,
              }}
            >
              <div
                style={{
                  transform: `translateY(${depth[cup] * 14}px) scale(${1 + depth[cup] * 0.06})`,
                  transition: `transform ${moveMs / 2}ms ease-in-out`,
                }}
              >
                <button
                  type="button"
                  onClick={() => choose(cup)}
                  disabled={phase !== "choose"}
                  aria-label={`Vaso ${slots[cup] + 1}`}
                  className={`relative block w-full ${phase === "choose" ? "cursor-pointer" : "cursor-default"}`}
                >
                  <Flan empty={!isFlan} className="relative z-0 block w-full" />
                  <span
                    className="absolute bottom-[6%] left-[7%] z-10 w-[86%]"
                    style={{
                      transform: lifted[cup] ? "translateY(-78%) rotate(-6deg)" : "none",
                      transition: "transform 450ms cubic-bezier(.3,1.3,.5,1)",
                    }}
                  >
                    <Vaso className={`block w-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.55)] ${phase === "choose" ? "animate-pulse-soft" : ""}`} />
                  </span>
                  {phase === "won" && isFlan &&
                    particles.map((p, i) => (
                      <span
                        key={i}
                        className="particle z-20"
                        style={
                          {
                            left: "50%",
                            top: "55%",
                            background: p.color,
                            "--dx": `${p.dx}px`,
                            "--dy": `${p.dy}px`,
                            "--rot": `${p.rot}deg`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex min-h-14 items-center">
        {phase === "ready" && (
          <button type="button" onClick={() => play(attempt)} className="btn-gold fade-up px-10">
            <T k="game.start" />
          </button>
        )}
        {missed && lifted[FLAN_CUP] && (
          <button type="button" onClick={retry} className="btn-gold fade-up px-10">
            <T k="game.retry" />
          </button>
        )}
      </div>
    </div>
  );
}
