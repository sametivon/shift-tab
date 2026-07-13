import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePhaseEngine } from "@/lib/usePhaseEngine";

/* ─────────────────────────────────────────────────────────────────────
   The hero's living centerpiece: a command palette that searches the
   studio. It types a need, the right product lights up, Enter flashes —
   three acts, then it loops. Sets up the real ⌘K palette (the site's
   actual nav) before the visitor ever presses it.
   ───────────────────────────────────────────────────────────────────── */

const ACTS = [
  { query: "monday devtools", hit: 0 },
  { query: "virtual office", hit: 1 },
  { query: "what's next", hit: 2 },
];

const RESULTS = [
  { name: "Monday.com Inspector", hint: "The DevTools for monday.com", dot: "#6D5EF7", kbd: "↵" },
  { name: "MondayVirtual", hint: "Your office, inside monday.com", dot: "#10B981", kbd: "↵" },
  { name: "Something new", hint: "in the lab · building…", dot: "#94A3B8", kbd: "…" },
];

export default function BootPalette() {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { amount: 0.3 });
  const { step, reduced } = usePhaseEngine({ steps: 6, tickMs: 1500, running: onScreen });

  const act = reduced ? 0 : Math.floor(step / 2);
  const settled = reduced || step % 2 === 1; // second beat of each act: hit locked in
  const { query, hit } = ACTS[act];

  /* pointer tilt (inherits BrowserMock's window feel) */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 18 });
  const spy = useSpring(py, { stiffness: 60, damping: 18 });
  const rotX = useTransform(spy, (v) => v * -1.4);
  const rotY = useTransform(spx, (v) => v * 1.8);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-2xl">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -inset-12 -z-10 rounded-[56px]"
        style={{ background: "radial-gradient(52% 52% at 50% 46%, rgba(109,94,247,.16), transparent 70%)" }}
      />

      <motion.div
        aria-hidden
        initial={reduced ? false : { opacity: 0, y: 42, scale: 0.97 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: [0, -6, 0], scale: 1 }}
        transition={
          reduced
            ? undefined
            : {
                opacity: { duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.9, delay: 0.55 },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
              }
        }
        style={reduced ? undefined : { rotateX: rotX, rotateY: rotY, transformPerspective: 1400 }}
        className="glass overflow-hidden rounded-card"
      >
        {/* input row */}
        <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-muted">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.4" />
            <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <div className="flex-1 font-mono text-[14.5px] text-ink">
            <AnimatePresence mode="wait">
              <motion.span
                key={act}
                className="inline-block whitespace-nowrap"
                initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.65, ease: "linear" }}
              >
                {query}
              </motion.span>
            </AnimatePresence>
            <span className="ml-0.5 inline-block h-4 w-[7px] animate-pulse bg-brand align-middle" />
          </div>
          <kbd className="key !px-2 !py-1 !text-[11px]">⌘K</kbd>
        </div>

        {/* results */}
        <div className="p-2.5">
          {RESULTS.map((r, i) => {
            const isHit = settled && i === hit;
            return (
              <motion.div
                key={r.name}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                animate={{
                  backgroundColor: isHit ? "rgba(239,237,254,.9)" : "rgba(255,255,255,0)",
                  x: isHit ? 3 : 0,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              >
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: r.dot }} />
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-[13.5px] font-semibold ${isHit ? "text-ink" : "text-muted"}`}>
                    {r.name}
                  </span>
                  <span className="block truncate text-[11.5px] text-muted/80">{r.hint}</span>
                </span>
                <motion.kbd
                  className="key !px-2 !py-0.5 !text-[10.5px]"
                  animate={isHit && !reduced ? { scale: [1, 0.86, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.35 }}
                >
                  {r.kbd}
                </motion.kbd>
              </motion.div>
            );
          })}
        </div>

        {/* footer hints */}
        <div className="flex items-center gap-4 border-t border-hairline bg-mist/60 px-5 py-2.5 font-mono text-[10.5px] text-muted">
          <span>↵ open</span>
          <span>⇥ next</span>
          <span className="ml-auto">⌘K works everywhere here</span>
        </div>
      </motion.div>
    </div>
  );
}
