import { motion } from "framer-motion";
import { inView, useEntrance } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   Sticky storytelling: three chapters stack over each other as you
   scroll (CSS position:sticky — buttery with Lenis, zero JS cost).
   Each card is a full product reveal with its own tint.
   ───────────────────────────────────────────────────────────────────── */

const chapters = [
  {
    n: "01",
    eyebrow: "We ship products",
    title: "Software people install on purpose",
    body: "Monday.com Inspector and MondayVirtual aren't demos — they're live products with real users, published, maintained, iterated. We hold our own work to the standard clients feel.",
    tint: "bg-white",
    chips: ["Chrome Web Store · published", "3D SaaS · in production", "Open source · MIT"],
    dark: false,
  },
  {
    n: "02",
    eyebrow: "We build for clients",
    title: "The same hands, for hire",
    body: "monday.com consulting and implementations, custom apps & browser extensions, premium marketing sites and full products — design to deploy, one team, no hand-offs.",
    tint: "bg-surface",
    chips: ["monday.com consulting", "Apps & extensions", "Web & product dev", "Platinum-partner-grade"],
    dark: false,
  },
  {
    n: "03",
    eyebrow: "We deliver with AI",
    title: "AI-accelerated, human-finished",
    body: "Agents, automations and AI-assisted engineering are how we ship this fast without cutting corners — and we set the same systems up inside your team.",
    tint: "stage",
    chips: ["AI agents", "Workflow automation", "AI-assisted engineering"],
    dark: true,
  },
];

export default function StickyStory() {
  const entrance = useEntrance();
  return (
    <section id="services" className="relative mx-auto max-w-5xl px-6 py-14">
      <motion.div
        initial={entrance({ opacity: 0, y: 24 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-10 max-w-2xl text-center"
      >
        <span className="eyebrow">The studio</span>
        <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.05] tracking-tightest text-ink">
          One studio, three gears
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6">
        {chapters.map((c, i) => (
          <div key={c.n} className="sticky" style={{ top: `${96 + i * 20}px` }}>
            <div
              className={`${c.tint} overflow-hidden rounded-card border border-hairline p-8 shadow-lift sm:p-12`}
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-[13px] font-bold ${c.dark ? "text-white/40" : "text-muted/60"}`}
                    >
                      {c.n}
                    </span>
                    <span className={`eyebrow ${c.dark ? "!text-[#a99cff]" : ""}`}>{c.eyebrow}</span>
                  </div>
                  <h3
                    className={`mt-3 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold leading-tight tracking-tightest ${c.dark ? "text-white" : "text-ink"}`}
                  >
                    {c.title}
                  </h3>
                  <p className={`mt-3 text-[15.5px] leading-relaxed ${c.dark ? "text-white/65" : "text-muted"}`}>
                    {c.body}
                  </p>
                </div>
                <div className="flex max-w-[240px] flex-col gap-2">
                  {c.chips.map((chip) => (
                    <span
                      key={chip}
                      className={`rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition-transform duration-150 hover:-translate-y-0.5 ${
                        c.dark
                          ? "border border-white/15 bg-white/10 text-white/85"
                          : "border border-hairline bg-white text-ink shadow-soft"
                      }`}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
