import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { usePhaseEngine } from "@/lib/usePhaseEngine";
import { revealUp, stagger, inView, useEntrance } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   THE LAB — the studio's workshop, mid-build.
   Not a product tease and not a "coming soon" card: the visitor
   watches software being MADE. Abstract UI blocks assemble into a
   card, code compiles, a pipeline runs green, the artifact ships off
   the bench — then the bench resets and builds a different shape.
   The thing being built is never readable. The message is the brand:
   we're already building what's next.
   ───────────────────────────────────────────────────────────────────── */

const PIPELINE = ["lint", "test", "build", "deploy"];

/* two skeleton layouts so consecutive loops build different artifacts */
const VARIANTS = [
  [
    { w: "52%", h: 10, r: 5 }, // title bar
    { w: "100%", h: 7, r: 4 },
    { w: "84%", h: 7, r: 4 },
    { w: "38%", h: 22, r: 11, accent: true }, // action pill
  ],
  [
    { w: "34%", h: 34, r: 17 }, // avatar blob
    { w: "72%", h: 8, r: 4 },
    { w: "100%", h: 7, r: 4 },
    { w: "46%", h: 22, r: 11, accent: true },
  ],
];

function Workbench({ running }: { running: boolean }) {
  const [loop, setLoop] = useState(0);
  const { step, reduced } = usePhaseEngine({
    steps: 8,
    tickMs: 900,
    running,
    onLoop: () => setLoop((n) => n + 1),
  });
  const blocks = VARIANTS[loop % 2];
  const compiled = reduced || step >= 4;
  const shipping = !reduced && step === 7;

  return (
    <div className="relative h-[380px] overflow-hidden rounded-card border border-white/10 bg-white/[.035] backdrop-blur-sm">
      {/* bench light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 42% 38%, rgba(139,123,255,.14), transparent 70%)" }}
      />

      {/* floating workshop chips — parked clear of the card, pipeline and strip */}
      {[
        ["prototype_0" + ((loop % 2) + 4), "left-[7%] top-[9%]", 7],
        ["agents.ts", "left-[58%] top-[64%]", 8.5],
        ["⌘⇧B", "left-[10%] bottom-[28%]", 6],
      ].map(([t, pos, dur]) => (
        <motion.span
          key={t as string}
          aria-hidden
          className={`absolute ${pos} font-mono text-[10.5px] text-white/35`}
          animate={reduced ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: dur as number, repeat: Infinity, ease: "easeInOut" }}
        >
          {t}
        </motion.span>
      ))}

      {/* the artifact being assembled — deliberately unreadable */}
      <div className="absolute left-[12%] top-[18%] w-[240px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={loop % 2}
            className="rounded-2xl border border-white/12 bg-white/[.07] p-4 shadow-[0_24px_60px_-24px_rgba(139,123,255,.35)]"
            animate={
              shipping
                ? { y: -46, opacity: 0, scale: 0.94, filter: "blur(6px)" }
                : { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }}
          >
            {blocks.map((b, i) => (
              <motion.div
                key={`${loop % 2}-${i}`}
                className="mb-2.5 last:mb-0"
                initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={
                  reduced || step >= i
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 12, filter: "blur(6px)" }
                }
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                style={{
                  width: b.w,
                  height: b.h,
                  borderRadius: b.r,
                  background: b.accent
                    ? "linear-gradient(110deg, rgba(109,94,247,.75), rgba(139,123,255,.55))"
                    : "rgba(255,255,255,.16)",
                  boxShadow: b.accent ? "0 8px 24px -8px rgba(109,94,247,.6)" : undefined,
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* the hand-off: while the artifact lifts off, its departure is
            announced in place — the bench never reads as broken-empty */}
        <AnimatePresence>
          {shipping && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="absolute inset-x-0 top-[38%] flex justify-center"
            >
              <span className="flex items-center gap-2 rounded-xl border border-[#8b7bff]/40 bg-[#6D5EF7]/20 px-3.5 py-2 font-mono text-[11px] font-semibold text-[#c7bfff] shadow-glowv backdrop-blur-sm">
                ▲ shipped · prototype_0{(loop % 2) + 4}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* pipeline rail */}
      <div className="absolute right-[8%] top-[20%] flex flex-col gap-0">
        {PIPELINE.map((p, i) => {
          const done = reduced || step >= i + 3;
          const isLast = i === PIPELINE.length - 1;
          return (
            <div key={p} className="flex flex-col items-start">
              <div className="flex items-center gap-2.5">
                <motion.span
                  className="flex h-5 w-5 items-center justify-center rounded-full border text-[9px] font-bold"
                  animate={{
                    borderColor: done ? "rgba(52,211,153,.9)" : "rgba(255,255,255,.25)",
                    backgroundColor: done ? "rgba(16,185,129,.18)" : "rgba(255,255,255,.04)",
                    color: done ? "#34d399" : "rgba(255,255,255,.4)",
                    scale: !reduced && step === i + 3 ? [1, 1.25, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {done ? "✓" : "·"}
                </motion.span>
                <span className={`font-mono text-[11px] ${done ? "text-white/85" : "text-white/40"}`}>{p}</span>
              </div>
              {!isLast && (
                <motion.span
                  className="ml-[9px] h-4 w-[2px] rounded"
                  animate={{ backgroundColor: done ? "rgba(52,211,153,.5)" : "rgba(255,255,255,.12)" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* compiler strip */}
      <div className="absolute inset-x-5 bottom-4 rounded-xl border border-white/10 bg-[#0a0f1d]/90 px-3.5 py-2.5 font-mono text-[10.5px]">
        <div className="text-white/55">
          <span className="text-[#8b7bff]">▸</span> assembling ui/Prototype_
          <span className="text-white/25">██</span>.tsx
          <span className="ml-1 inline-block h-3 w-[6px] animate-pulse bg-white/40 align-middle" />
        </div>
        <AnimatePresence>
          {compiled && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 text-emerald-400"
            >
              ✓ compiled in 4.2s · {shipping ? "shipping…" : "hot-reloaded"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function LabScene() {
  const entrance = useEntrance();
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { amount: 0.3 });

  return (
    <div className="dark-scene relative overflow-hidden" style={{ background: "radial-gradient(70% 90% at 76% 20%, rgba(109,94,247,.16), transparent 60%), radial-gradient(50% 60% at 12% 90%, rgba(16,185,129,.08), transparent 60%), #0B1120" }}>
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[5fr_6fr]">
        <motion.div variants={stagger(0.09)} initial={entrance("hidden")} whileInView="show" viewport={inView}>
          <motion.span
            variants={revealUp}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[.06] px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.14em] text-white/70"
          >
            <span className="pulse-dot-violet h-1.5 w-1.5 rounded-full bg-[#8b7bff]" /> IN THE LAB
          </motion.span>
          <motion.h2
            variants={revealUp}
            className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.3rem)] font-extrabold leading-[1.05] tracking-tightest text-white"
          >
            We&apos;re already building{" "}
            <span className="font-serif font-medium italic tracking-normal text-[#a99cff]">what&apos;s next.</span>
          </motion.h2>
          <motion.p variants={revealUp} className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-white/55">
            The studio is never idle. Components assemble, agents wire up, pipelines
            run — the next tool in the ecosystem is taking shape on this bench,
            built with the same obsession as the two you just met.
          </motion.p>
          <motion.a
            variants={revealUp}
            href="https://github.com/sametivon"
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white/80"
          >
            Watch the lab <span aria-hidden>→</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={entrance({ opacity: 0, y: 32, scale: 0.97 })}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={inView}
          transition={{ type: "spring", stiffness: 110, damping: 18 }}
        >
          <Workbench running={onScreen} />
        </motion.div>
      </div>
    </div>
  );
}
