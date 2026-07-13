import { motion } from "framer-motion";
import Counter from "@/components/Counter";
import { revealUp, stagger, inView, useEntrance } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   THE STUDIO — the manifesto beat. One serif statement, the numbers
   that back it, and the receipts in a single mono line. No cards.
   ───────────────────────────────────────────────────────────────────── */

const STATS = [
  { to: 500, suffix: "+", note: "monday.com implementations behind the team" },
  { to: 2, suffix: "", note: "products live — Chrome Web Store & SaaS" },
  { to: 100, suffix: "%", note: "open-source extension — audit every line" },
];

export default function StudioScene() {
  const entrance = useEntrance();
  return (
    <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-28">
      <motion.div variants={stagger(0.1)} initial={entrance("hidden")} whileInView="show" viewport={inView}>
        <motion.span variants={revealUp} className="eyebrow">
          The studio
        </motion.span>
        <motion.h2
          variants={revealUp}
          className="mt-6 max-w-3xl font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-extrabold leading-[1.12] tracking-tightest text-ink"
        >
          Software people remember is built by people who{" "}
          <span className="font-serif font-medium italic tracking-normal text-brand">obsess over the last 2%</span>
          {" "}— the empty states, the error copy, the way a window settles.
        </motion.h2>

        <motion.div variants={revealUp} className="mt-14 grid gap-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.note}>
              <div className="font-display text-[3rem] font-extrabold leading-none tracking-tightest text-ink">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-2 max-w-[220px] text-[13.5px] leading-snug text-muted">{s.note}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={revealUp}
          className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-hairline pt-6 font-mono text-[11.5px] text-muted"
        >
          {["Chrome Web Store · published", "MIT open source", "EU-based", "independent · made in the lab"].map(
            (c, i) => (
              <span key={c} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-hairline">/</span>}
                {c}
              </span>
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
