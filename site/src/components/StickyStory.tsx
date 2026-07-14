import { motion } from "framer-motion";
import { inView, useEntrance } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   Services as sticky storytelling: three chapters stack as you scroll —
   AI consulting → custom software → enterprise. Each answers the last.
   ───────────────────────────────────────────────────────────────────── */

const chapters = [
  {
    n: "01",
    eyebrow: "AI consulting",
    title: "Make AI real inside your business",
    body: "Strategy that ends in shipped software, not slide decks. We scope the highest-leverage automation, prototype agents against your real workflows, and prove value in weeks.",
    tint: "bg-white",
    chips: ["AI agents & copilots", "Workflow automation", "Pilot in weeks, not quarters"],
    dark: false,
  },
  {
    n: "02",
    eyebrow: "Custom software",
    title: "Product-grade builds, end to end",
    body: "SaaS platforms, browser extensions, integrations and premium web experiences — designed, built and launched by the same team that ships our own products.",
    tint: "bg-surface",
    chips: ["SaaS & web apps", "Browser extensions", "Design → deploy, one team"],
    dark: false,
  },
  {
    n: "03",
    eyebrow: "Enterprise & platform",
    title: "monday.com work, done properly",
    body: "Implementations, workspace architecture, custom apps and automations for teams that run on monday.com — delivered with the same discipline as our own products.",
    tint: "stage",
    chips: ["Implementations", "Custom platform apps", "Ongoing partnership"],
    dark: true,
  },
];

export default function StickyStory() {
  const entrance = useEntrance();
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20">
      <motion.div
        initial={entrance({ opacity: 0, y: 24 })}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="eyebrow">Services</span>
        <h2 className="mt-4 font-display text-[clamp(2.1rem,4.8vw,3.4rem)] font-extrabold leading-[1.04] tracking-tightest text-ink">
          We also build for you
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[1.05rem] leading-relaxed text-muted">
          The team behind the products, on your problem.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {chapters.map((c, i) => (
          <div key={c.n} className="sticky" style={{ top: `${96 + i * 20}px` }}>
            <div className={`${c.tint} overflow-hidden rounded-card border border-hairline p-8 shadow-lift sm:p-12`}>
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-[13px] font-bold ${c.dark ? "text-white/40" : "text-muted/60"}`}>{c.n}</span>
                    <span className={`eyebrow ${c.dark ? "!text-[#a99cff]" : ""}`}>{c.eyebrow}</span>
                  </div>
                  <h3 className={`mt-3 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold leading-tight tracking-tightest ${c.dark ? "text-white" : "text-ink"}`}>
                    {c.title}
                  </h3>
                  <p className={`mt-3 text-[15.5px] leading-relaxed ${c.dark ? "text-white/65" : "text-muted"}`}>{c.body}</p>
                </div>
                <div className="flex max-w-[250px] flex-col gap-2">
                  {c.chips.map((chip) => (
                    <span
                      key={chip}
                      className={`rounded-full px-3.5 py-2 text-[12.5px] font-semibold transition-all duration-150 hover:-translate-y-0.5 ${
                        c.dark
                          ? "border border-white/15 bg-white/10 text-white/85 hover:bg-white/15"
                          : "border border-hairline bg-white text-ink shadow-soft hover:shadow-glowv"
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
