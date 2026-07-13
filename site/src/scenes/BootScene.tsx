import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import BootPalette from "@/components/stages/BootPalette";
import { maskLine, revealUp, stagger, spring, useEntrance, useReducedMotionSafe } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   BOOT — the studio's desktop assembles itself.
   The headline speaks; around the living browser window, satellite
   panels (terminal, keycaps, board row, presence toast) fly in from
   scattered blur, dock with a spring, then drift and answer the
   pointer with layered parallax. Reduced motion: everything renders
   docked and still.
   ───────────────────────────────────────────────────────────────────── */

const SATELLITES = [
  {
    key: "terminal",
    dock: "left-[3%] top-[6%] xl:left-[7%]",
    from: { x: -90, y: -40, rotate: -10 },
    settle: -3,
    depth: 22,
    float: 6.5,
    node: (
      <div className="w-[172px] rounded-xl border border-white/10 bg-ink/95 p-3 font-mono text-[10px] shadow-lift">
        <div className="mb-2 flex gap-1">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="text-white/75">
          <span className="text-emerald-500">$</span> npm run ship
        </div>
        <div className="mt-1 text-emerald-500">✓ deployed in 34s</div>
      </div>
    ),
  },
  {
    key: "keys",
    dock: "right-[4%] top-[12%] xl:right-[9%]",
    from: { x: 80, y: -60, rotate: 8 },
    settle: 2,
    depth: 34,
    float: 5.4,
    node: (
      <div className="flex items-center gap-1.5">
        <kbd className="key !bg-white/95">⇧</kbd>
        <kbd className="key !bg-white/95">⇥</kbd>
      </div>
    ),
  },
  {
    key: "board",
    dock: "bottom-[24%] left-[2%] xl:left-[6%]",
    from: { x: -70, y: 70, rotate: 6 },
    settle: 2,
    depth: 30,
    float: 7.2,
    node: (
      <div className="w-[180px] rounded-xl border border-hairline bg-white/95 p-3 shadow-soft">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-ink">Launch checklist</span>
          <span className="rounded-md bg-softmint px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
            Done
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
          <div className="h-full w-full rounded-full bg-emerald-500" />
        </div>
      </div>
    ),
  },
  {
    key: "presence",
    dock: "bottom-[30%] right-[3%] xl:right-[7%]",
    from: { x: 90, y: 50, rotate: -7 },
    settle: -2,
    depth: 26,
    float: 6.1,
    node: (
      <div className="flex items-center gap-2 rounded-full border border-hairline bg-white/95 py-1.5 pl-2 pr-3.5 text-[11px] font-semibold text-ink shadow-soft">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
          M
        </span>
        Maya joined the office
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </div>
    ),
  },
];

type SatelliteDef = (typeof SATELLITES)[number];

function Satellite({
  s,
  i,
  smx,
  smy,
  reduced,
  entrance,
}: {
  s: SatelliteDef;
  i: number;
  smx: MotionValue<number>;
  smy: MotionValue<number>;
  reduced: boolean;
  entrance: ReturnType<typeof useEntrance>;
}) {
  const px = useTransform(smx, (v) => v * s.depth);
  const py = useTransform(smy, (v) => v * s.depth);
  return (
    <motion.div className={`absolute ${s.dock}`} style={{ x: px, y: py }}>
      <motion.div
        initial={entrance({ opacity: 0, filter: "blur(10px)", ...s.from }) as false | Record<string, unknown>}
        animate={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0, rotate: s.settle }}
        transition={{ ...spring, delay: 1.05 + i * 0.14 }}
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: s.float, repeat: Infinity, ease: "easeInOut", delay: 1.6 + i * 0.4 }}
        >
          {s.node}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function BootScene() {
  const entrance = useEntrance();
  const reduced = useReducedMotionSafe();
  const heroRef = useRef<HTMLDivElement>(null);

  // scroll parallax — the desktop recedes as the visitor moves on
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mockY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const mockScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const mockOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  // pointer parallax — satellites sit on different depth planes
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <div
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pt-32 sm:pt-36"
    >
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.span
          initial={entrance({ opacity: 0, y: 10, filter: "blur(4px)" })}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...spring, delay: 0.15 }}
          className="eyebrow mb-6 inline-block"
        >
          AI software studio
        </motion.span>

        <motion.h1
          variants={stagger(0.1, 0.25)}
          initial={entrance("hidden")}
          animate="show"
          className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold leading-[1.02] tracking-tightest text-ink"
        >
          {["Software with the", "quality switched on."].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={maskLine} className="block">
                {i === 1 ? <span className="text-gradient">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={revealUp}
          initial={entrance("hidden")}
          animate="show"
          transition={{ delay: 0.7 }}
          className="mx-auto mt-6 max-w-xl text-[1.1rem] leading-relaxed text-muted"
        >
          We ship our own products — and build AI-powered software for businesses
          that want the same craft.
        </motion.p>

        <motion.div
          initial={entrance({ opacity: 0, y: 14 })}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.85 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="/#products">
            Explore the products <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton variant="ghost" href="/#contact">
            Build with us
          </MagneticButton>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-16 w-full pb-20">
        {/* the desktop assembles: satellite windows dock around the browser */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden select-none lg:block" aria-hidden>
          {SATELLITES.map((s, i) => (
            <Satellite key={s.key} s={s} i={i} smx={smx} smy={smy} reduced={reduced} entrance={entrance} />
          ))}
        </div>

        <motion.div style={{ y: mockY, scale: mockScale, opacity: mockOpacity }}>
          <BootPalette />
        </motion.div>
      </div>
    </div>
  );
}
