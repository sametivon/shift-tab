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

const services = [
  {
    icon: "◧",
    title: "monday.com consulting",
    body: "Workspace architecture, implementations, automations, dashboards and migrations — Platinum-partner-grade delivery.",
  },
  {
    icon: "⌘",
    title: "Custom apps & extensions",
    body: "monday.com board apps, API integrations and browser extensions built to order — the same craft behind Inspector.",
  },
  {
    icon: "◈",
    title: "Web & product development",
    body: "Premium marketing sites and full products — from landing pages that convert to embedded 3D SaaS.",
  },
  {
    icon: "✦",
    title: "AI-assisted delivery",
    body: "AI agents, workflow automation and AI-accelerated builds — it's how we ship this fast, and we set it up for you too.",
  },
];

const work = [
  {
    tag: "Product",
    title: "Monday.com Inspector",
    body: "Free Chrome extension — the DevTools for monday.com. Published on the Chrome Web Store.",
    href: "/products/extension",
    accent: "#4a63e7",
  },
  {
    tag: "Product · SaaS",
    title: "MondayVirtual",
    body: "A 3D virtual office embedded in monday.com — proximity voice & video, auditorium, live boards.",
    href: "/products/mondayvirtual",
    accent: "#6c5ce7",
  },
  {
    tag: "Web",
    title: "mondayinspector.eu",
    body: "DevTools-positioned marketing site — React, R3F, prerendered for SEO, 10 pages, guides that rank.",
    href: "https://mondayinspector.eu",
    accent: "#0a9a6e",
  },
];

export default function Home() {
  const entrance = useEntrance();
  return (
    <>
      <Head>
        <title>shift-tab — tools for people who know their shortcuts</title>
        <meta
          name="description"
          content="shift-tab is an independent IT studio: our own products for the monday.com ecosystem (Monday.com Inspector, MondayVirtual) plus client services — monday.com consulting, custom apps & extensions, web & product development, AI-assisted delivery."
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
            shift-tab is an independent IT studio: we ship our own products for the monday.com
            ecosystem — and design, build and automate for clients who want the same craft.
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

      {/* ── Services ── */}
      <section id="services" className="relative mx-auto max-w-6xl px-6 py-10">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <motion.span variants={revealUp} className="eyebrow">Services</motion.span>
          <motion.h2 variants={revealUp} className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tightest text-ink">
            What we build for clients
          </motion.h2>
          <motion.p variants={revealUp} className="mt-4 text-[1.05rem] leading-relaxed text-muted">
            The same hands that ship our products are for hire — end to end, design to deploy.
          </motion.p>
        </motion.div>
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="grid gap-4 sm:grid-cols-2"
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={scaleIn}>
              <TiltCard>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface font-mono text-[18px] text-brand-indigo">
                    {s.icon}
                  </span>
                  <span>
                    <h3 className="font-display text-[1.15rem] text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{s.body}</p>
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Selected work ── */}
      <section id="work" className="relative mx-auto max-w-6xl px-6 py-10">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <motion.span variants={revealUp} className="eyebrow">Selected work</motion.span>
          <motion.h2 variants={revealUp} className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tightest text-ink">
            Proof, not promises
          </motion.h2>
        </motion.div>
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="grid gap-4 sm:grid-cols-3"
        >
          {work.map((w) => (
            <motion.div key={w.title} variants={scaleIn}>
              <a href={w.href} className="block" {...(w.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <TiltCard>
                  <span className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: w.accent }}>
                    {w.tag}
                  </span>
                  <h3 className="mt-3 font-display text-[1.2rem] text-ink">{w.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{w.body}</p>
                  <span className="mt-4 inline-block text-[13px] font-bold" style={{ color: w.accent }}>
                    View →
                  </span>
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

      {/* ── Contact ── */}
      <section id="contact" className="relative mx-auto max-w-3xl px-6 py-10 text-center">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
        >
          <motion.span variants={revealUp} className="eyebrow">Contact</motion.span>
          <motion.h2 variants={revealUp} className="mt-4 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-tight tracking-tightest text-ink">
            Have a project in mind?
          </motion.h2>
          <motion.p variants={revealUp} className="mx-auto mt-4 max-w-md text-[1.02rem] leading-relaxed text-muted">
            Tell us what you're building — a board, an app, a site or something nobody's
            built yet. We reply like we ship: fast.
          </motion.p>
          <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="mailto:sam@fruitionservices.io">
              Start a conversation <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="https://github.com/sametivon">
              See the code
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
