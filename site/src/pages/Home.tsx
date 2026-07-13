import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import { maskLine, revealUp, scaleIn, stagger, spring, inView, useEntrance } from "@/lib/motion";

/* ── shift-tab studio home ─────────────────────────────────────────────
   Simple, soft, beautiful. The hero speaks the brand line; the products
   speak for themselves. */

const products = [
  {
    name: "Monday.com Inspector",
    tag: "Free Chrome extension",
    tagline: "The DevTools for monday.com",
    body: "X-ray board schemas, run GraphQL, import subitems from CSV, bulk-update hundreds of items and export anything — right inside your boards.",
    href: "/products/extension",
    accent: "#4a63e7",
    chip: "boards { id name columns { id type } }",
    stats: ["No row limits", "Open source", "Token stays local"],
  },
  {
    name: "MondayVirtual",
    tag: "3D workspace · SaaS",
    tagline: "Your office, inside monday.com",
    body: "A 3D team office embedded in monday.com — walk over and talk with proximity voice & video, present to a full auditorium, keep live boards on the walls.",
    href: "/products/mondayvirtual",
    accent: "#6c5ce7",
    chip: "12 unmuted · ✋ 3 hands · Maya is presenting",
    stats: ["Nothing to install", "Proximity audio", "Live boards in-world"],
  },
];

const principles = [
  { k: "Simple", d: "One clear job per screen. No manuals, no mazes — software you understand in the first five seconds." },
  { k: "Soft", d: "Warm light surfaces, calm motion, nothing shouting. Premium feel without the noise." },
  { k: "Fast", d: "Like the shortcut we're named after — everything responds now, works locally, respects your time." },
];

export default function Home() {
  const entrance = useEntrance();
  return (
    <>
      <Head>
        <title>shift-tab — tools for people who know their shortcuts</title>
        <meta
          name="description"
          content="shift-tab is a product studio crafting fast, precise, beautiful software for the monday.com ecosystem — from free developer tooling (Monday.com Inspector) to 3D virtual offices (MondayVirtual)."
        />
        <link rel="canonical" href="https://shift-tab.eu/" />
        <meta property="og:title" content="shift-tab — tools for people who know their shortcuts" />
        <meta property="og:description" content="A product studio for the monday.com ecosystem: Monday.com Inspector (the DevTools for monday.com) and MondayVirtual (your office, inside monday.com)." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shift-tab.eu/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "shift-tab",
            url: "https://shift-tab.eu",
            description:
              "Product studio crafting software for the monday.com ecosystem: Monday.com Inspector and MondayVirtual.",
            parentOrganization: { "@type": "Organization", name: "Fruition Services", url: "https://www.fruitionservices.io" },
          })}
        </script>
      </Head>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-10 pt-32 sm:pt-40">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={entrance({ opacity: 0, y: 12, filter: "blur(6px)" })}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ ...spring, delay: 0.25 }}
            className="mx-auto mb-8 inline-flex items-center gap-2"
          >
            <kbd className="rounded-lg border border-hairline bg-white/80 px-2.5 py-1.5 font-mono text-[13px] font-semibold text-muted shadow-soft">⇧ shift</kbd>
            <span className="text-muted">+</span>
            <kbd className="rounded-lg border border-hairline bg-white/80 px-2.5 py-1.5 font-mono text-[13px] font-semibold text-muted shadow-soft">⇥ tab</kbd>
          </motion.div>

          <motion.h1
            variants={stagger(0.12, 0.3)}
            initial={entrance("hidden")}
            animate="show"
            className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.06] tracking-tightest text-ink"
          >
            {["Tools for people who", "know their shortcuts."].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.06em]">
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
            transition={{ delay: 0.8 }}
            className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted"
          >
            shift-tab is a product studio crafting fast, precise, beautiful software for the
            monday.com ecosystem — from free developer tooling to full 3D workspaces.
          </motion.p>

          <motion.div
            initial={entrance({ opacity: 0, y: 16 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.95 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton href="/#products">
              Meet the products <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="/#principles">
              Our principles
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="relative mx-auto max-w-6xl px-6 py-10">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <motion.span variants={revealUp} className="mb-4 inline-block rounded-full bg-white/70 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-brand">
            Products
          </motion.span>
          <motion.h2 variants={revealUp} className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tightest text-ink">
            Two products. One obsession.
          </motion.h2>
          <motion.p variants={revealUp} className="mt-4 text-[1.05rem] leading-relaxed text-muted">
            Everything we ship lives inside monday.com and gets out of your way.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.12)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="grid gap-6 lg:grid-cols-2"
        >
          {products.map((p) => (
            <motion.div key={p.name} variants={scaleIn}>
              <a href={p.href} className="block">
                <TiltCard className="!p-8">
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="inline-flex rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white" style={{ background: p.accent }}>
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-[1.5rem] font-extrabold tracking-tight text-ink">{p.name}</h3>
                  <div className="mt-0.5 text-[15px] font-semibold" style={{ color: p.accent }}>{p.tagline}</div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                  <div className="mt-5 rounded-xl border border-hairline bg-mist/70 px-4 py-2.5 font-mono text-[12px] text-muted">
                    {p.chip}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                    {p.stats.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1.5 text-[12.5px] text-muted">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: p.accent }}>
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-bold" style={{ color: p.accent }}>
                    Explore {p.name.split(" ")[0] === "Monday.com" ? "Inspector" : p.name} <span aria-hidden>→</span>
                  </div>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Principles — the one dark, dramatic moment on the page ── */}
      <section id="principles" className="relative mx-auto max-w-6xl px-6 py-10">
        <motion.div
          initial={entrance({ opacity: 0, y: 30 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="stage relative overflow-hidden rounded-[28px] p-10 sm:p-14"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow !text-[#b9aef5]">Principles</span>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight tracking-tightest text-white">
              Simple. Soft. Fast.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-white/60">
              Three words we hold every screen against — in that order.
            </p>
          </div>
          <motion.div
            variants={stagger(0.1)}
            initial={entrance("hidden")}
            whileInView="show"
            viewport={inView}
            className="grid gap-4 sm:grid-cols-3"
          >
            {principles.map((p, i) => (
              <motion.div
                key={p.k}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="rounded-2xl border border-white/10 bg-white/[.06] p-6 backdrop-blur-sm"
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl font-mono text-[15px] font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${["#6c5ce7", "#0a9a6e", "#e8a33d"][i]}, ${["#4a3fbe", "#087a57", "#c9821c"][i]})` }}
                >
                  {["⌘", "✦", "⇥"][i]}
                </div>
                <h3 className="font-display text-[1.15rem] text-white">{p.k}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{p.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
