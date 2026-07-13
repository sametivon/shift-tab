import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import BrowserMock from "@/components/BrowserMock";
import StickyStory from "@/components/StickyStory";
import { maskLine, revealUp, scaleIn, stagger, spring, inView, useEntrance } from "@/lib/motion";

/* ── shift-tab premium v3 — full-screen hero with the ⇧⇥ browser demo,
   sticky storytelling, layered product reveals, midnight stage. ── */

const products = [
  {
    name: "Monday.com Inspector",
    tag: "Free Chrome extension",
    tagline: "The DevTools for monday.com",
    body: "X-ray board schemas, run GraphQL, import subitems from CSV, bulk-update hundreds of items and export anything — right inside your boards.",
    href: "/products/extension",
    accent: "#6D5EF7",
    chip: "boards { id name columns { id type } }",
    stats: ["No row limits", "Open source", "Token stays local"],
  },
  {
    name: "MondayVirtual",
    tag: "3D workspace · SaaS",
    tagline: "Your office, inside monday.com",
    body: "A 3D team office embedded in monday.com — walk over and talk with proximity voice & video, present to a full auditorium, keep live boards on the walls.",
    href: "/products/mondayvirtual",
    accent: "#10B981",
    chip: "12 unmuted · ✋ 3 hands · Maya is presenting",
    stats: ["Nothing to install", "Proximity audio", "Live boards in-world"],
  },
];

const work = [
  { tag: "Product", title: "Monday.com Inspector", body: "Free Chrome extension — published on the Chrome Web Store.", href: "/products/extension", accent: "#6D5EF7" },
  { tag: "Product · SaaS", title: "MondayVirtual", body: "3D virtual office embedded in monday.com — voice, video, live boards.", href: "/products/mondayvirtual", accent: "#10B981" },
  { tag: "Web", title: "mondayinspector.eu", body: "DevTools-positioned marketing site — React, R3F, prerendered, ranking guides.", href: "https://mondayinspector.eu", accent: "#0F172A" },
];

const principles = [
  { k: "Simple", d: "One clear job per screen. Software you understand in the first five seconds." },
  { k: "Soft", d: "Warm surfaces, calm motion, nothing shouting. Premium without the noise." },
  { k: "Fast", d: "Like the shortcut we're named after — instant, local-first, respectful of your time." },
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
            description: "Product studio crafting software for the monday.com ecosystem: Monday.com Inspector and MondayVirtual.",
            parentOrganization: { "@type": "Organization", name: "Fruition Services", url: "https://www.fruitionservices.io" },
          })}
        </script>
      </Head>

      {/* ── Hero: full-screen product reveal ── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pt-32 sm:pt-36">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.h1
            variants={stagger(0.1, 0.25)}
            initial={entrance("hidden")}
            animate="show"
            className="font-display text-[clamp(2.5rem,5.8vw,4.4rem)] font-extrabold leading-[1.02] tracking-tightest text-ink"
          >
            {["Tools for people who", "know their shortcuts."].map((line, i) => (
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
            className="mx-auto mt-5 max-w-xl text-[1.06rem] leading-relaxed text-muted"
          >
            An independent IT studio for the monday.com ecosystem — we ship our own products,
            and design, build and automate for clients who want the same craft.
          </motion.p>

          <motion.div
            initial={entrance({ opacity: 0, y: 14 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton href="/#products">
              Meet the products <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="/#contact">
              Start a project
            </MagneticButton>
          </motion.div>
        </div>

        {/* the ⇧⇥ browser demo — the brand shortcut, working */}
        <div className="relative z-10 mx-auto mt-14 w-full pb-16">
          <BrowserMock />
        </div>
      </section>

      {/* ── Sticky storytelling ── */}
      <StickyStory />

      {/* ── Products ── */}
      <section id="products" className="relative mx-auto max-w-6xl px-6 py-14">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <motion.span variants={revealUp} className="eyebrow">Products</motion.span>
          <motion.h2 variants={revealUp} className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.05] tracking-tightest text-ink">
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
                <TiltCard className="!rounded-card !p-8">
                  <span className="inline-flex rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white" style={{ background: p.accent }}>
                    {p.tag}
                  </span>
                  <h3 className="mt-4 font-display text-[1.6rem] font-extrabold tracking-tightest text-ink">{p.name}</h3>
                  <div className="mt-0.5 text-[15px] font-semibold" style={{ color: p.accent }}>{p.tagline}</div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.body}</p>
                  <div className="mt-5 rounded-xl border border-hairline bg-mist/80 px-4 py-2.5 font-mono text-[12px] text-muted">
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
                  <div className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-bold transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: p.accent }}>
                    Explore <span aria-hidden>→</span>
                  </div>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Selected work ── */}
      <section id="work" className="relative mx-auto max-w-6xl px-6 py-14">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <motion.span variants={revealUp} className="eyebrow">Selected work</motion.span>
          <motion.h2 variants={revealUp} className="mt-4 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.05] tracking-tightest text-ink">
            Proof, not promises
          </motion.h2>
        </motion.div>
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="grid gap-5 sm:grid-cols-3"
        >
          {work.map((w) => (
            <motion.div key={w.title} variants={scaleIn}>
              <a href={w.href} className="block" {...(w.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <TiltCard className="!rounded-card">
                  <span className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white" style={{ background: w.accent }}>
                    {w.tag}
                  </span>
                  <h3 className="mt-3 font-display text-[1.25rem] font-extrabold tracking-tightest text-ink">{w.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{w.body}</p>
                  <span className="mt-4 inline-block text-[13px] font-bold" style={{ color: w.accent === "#0F172A" ? "#6D5EF7" : w.accent }}>
                    View →
                  </span>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Principles — midnight stage ── */}
      <section id="principles" className="relative mx-auto max-w-6xl px-6 py-14">
        <motion.div
          initial={entrance({ opacity: 0, y: 30 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="stage relative overflow-hidden rounded-card p-10 sm:p-14"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow !text-[#a99cff]">Principles</span>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-tight tracking-tightest text-white">
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
                className="rounded-card border border-white/10 bg-white/[.06] p-6 backdrop-blur-sm"
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl font-mono text-[15px] font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${["#6D5EF7", "#10B981", "#38BDF8"][i]}, ${["#4F46C8", "#0DA271", "#0284C7"][i]})` }}
                >
                  {["⌘", "✦", "⇥"][i]}
                </div>
                <h3 className="font-display text-[1.15rem] font-bold text-white">{p.k}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{p.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="relative mx-auto max-w-3xl px-6 py-14 text-center">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
        >
          <motion.span variants={revealUp} className="eyebrow">Contact</motion.span>
          <motion.h2 variants={revealUp} className="mt-4 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold leading-tight tracking-tightest text-ink">
            Have a project in mind?
          </motion.h2>
          <motion.p variants={revealUp} className="mx-auto mt-4 max-w-md text-[1.02rem] leading-relaxed text-muted">
            Tell us what you're building — a board, an app, a site or something nobody's built
            yet. We reply like we ship: fast.
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
