import { useState } from "react";
import { motion } from "framer-motion";
import { maskLine, stagger, inView, useEntrance } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   THE PRACTICE — capabilities as typography, not cards.
   Oversized alternating Inter-display / Fraunces-italic lines; each
   line carries a mono annotation that brightens on hover while the
   line leans into its accent. The composition IS the content.
   ───────────────────────────────────────────────────────────────────── */

const LINES = [
  { t: "AI products", serif: false, accent: "#111827", note: "agents · copilots · pilots that ship" },
  { t: "browser extensions", serif: true, accent: "#6D5EF7", note: "store-published · minimal-permission" },
  { t: "SaaS platforms", serif: false, accent: "#111827", note: "zero → production, one team" },
  { t: "monday.com apps", serif: true, accent: "#10B981", note: "platform apps · 500+ implementations behind us" },
  { t: "internal tools", serif: false, accent: "#111827", note: "the busywork killers" },
  { t: "automation", serif: true, accent: "#4F46C8", note: "systems that run while you sleep" },
];

export default function PracticeScene() {
  const entrance = useEntrance();
  const [hot, setHot] = useState<number | null>(null);

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <motion.div variants={stagger(0.08)} initial={entrance("hidden")} whileInView="show" viewport={inView}>
        <motion.span variants={maskLineWrap} className="eyebrow block">
          The practice
        </motion.span>

        <div className="mt-8" onMouseLeave={() => setHot(null)}>
          {LINES.map((l, i) => {
            const isHot = hot === i;
            const dimmed = hot !== null && !isHot;
            return (
              <motion.div
                key={l.t}
                variants={maskLineWrap}
                className="group relative flex flex-wrap items-baseline gap-x-6 border-b border-hairline py-1.5 last:border-b-0"
                onMouseEnter={() => setHot(i)}
              >
                <span className="block overflow-hidden">
                  <motion.span variants={maskLine} className="block">
                    <motion.span
                      className={`block cursor-default text-[clamp(2.4rem,7vw,5.2rem)] leading-[1.06] ${
                        l.serif
                          ? "font-serif font-medium italic"
                          : "font-display font-extrabold tracking-tightest"
                      }`}
                      animate={{
                        x: isHot ? 18 : 0,
                        color: isHot ? l.accent : dimmed ? "rgba(17,24,39,.28)" : l.serif ? l.accent : "#111827",
                        opacity: dimmed ? 0.55 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    >
                      {l.t}
                    </motion.span>
                  </motion.span>
                </span>
                <motion.span
                  className="hidden font-mono text-[11.5px] sm:inline"
                  animate={{ opacity: isHot ? 1 : 0.4, x: isHot ? 6 : 0, color: isHot ? l.accent : "#5B6472" }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  aria-hidden={!isHot}
                >
                  {l.note}
                </motion.span>
                <span className="sr-only">{l.note}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.p variants={maskLineWrap} className="mt-10 max-w-lg text-[1.05rem] leading-relaxed text-muted">
          One studio, every layer — and consulting for businesses that want
          AI-powered software with the same craft.
        </motion.p>
      </motion.div>
    </div>
  );
}

/* wrapper variant: fade container while maskLine handles the rise */
const maskLineWrap = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};
