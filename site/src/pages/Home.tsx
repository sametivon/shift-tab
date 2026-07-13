import { useRef } from "react";
import { Head } from "vite-react-ssg";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import BrowserMock from "@/components/BrowserMock";
import StickyStory from "@/components/StickyStory";
import Counter from "@/components/Counter";
import { maskLine, revealUp, scaleIn, stagger, spring, inView, useEntrance } from "@/lib/motion";

/* ── shift-tab v4 — the homepage of a premium software company:
   studio hero → product ecosystem → what we build → services →
   process → trust → business CTA. Every section answers the last. ── */

const products = [
  {
    name: "Monday.com Inspector",
    tag: "Live · Chrome Web Store",
    tagline: "The DevTools for monday.com",
    body: "Schema X-ray, GraphQL workspace, subitem import, bulk updates — free and open source.",
    href: "/products/extension",
    accent: "#6D5EF7",
    visual: (
      <div className="pointer-events-none select-none rounded-xl border border-hairline bg-white p-3 font-mono text-[10px] shadow-soft">
        <div className="mb-1.5 flex items-center gap-1.5 text-[9px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6D5EF7]" /> board 5098431200
          <span className="ml-auto rounded-full bg-softmint px-1.5 py-px text-[8px] font-bold text-emerald-600">✓ copied</span>
        </div>
        {[["status", "color"], ["person", "people"], ["date4", "date"]].map(([a, b]) => (
          <div key={a} className="flex justify-between border-t border-hairline py-1">
            <span className="text-brand">{a}</span>
            <span className="text-muted">{b}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "MondayVirtual",
    tag: "Live · SaaS",
    tagline: "Your office, inside monday.com",
    body: "A 3D team office — proximity voice & video, auditorium all-hands, live boards on the walls.",
    href: "/products/mondayvirtual",
    accent: "#10B981",
    visual: (
      <div className="pointer-events-none relative h-[104px] select-none overflow-hidden rounded-xl border border-hairline shadow-soft" style={{ background: "linear-gradient(180deg,#131a2c,#1c2740)" }}>
        <div className="absolute inset-x-0 bottom-0 h-2/3 opacity-40" style={{ background: "repeating-linear-gradient(90deg, rgba(255,255,255,.09) 0 1px, transparent 1px 26px)", transform: "perspective(220px) rotateX(50deg)", transformOrigin: "bottom" }} />
        {[["M", "#6D5EF7", "20%"], ["J", "#10B981", "45%"], ["A", "#F59E0B", "68%"]].map(([ch, c, x]) => (
          <span key={ch} className="absolute top-[52%] flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: c, left: x }}>
            {ch}
          </span>
        ))}
        <span className="absolute right-2 top-2 rounded-full bg-white/[.12] px-2 py-0.5 text-[8.5px] font-semibold text-white/85">🎤 12 unmuted</span>
      </div>
    ),
  },
  {
    name: "Next product",
    tag: "In the lab",
    tagline: "Something new is brewing",
    body: "The next tool in the ecosystem is under construction. Built with the same obsession — follow along.",
    href: "https://github.com/sametivon",
    accent: "#111827",
    visual: (
      <div className="pointer-events-none flex h-[104px] select-none items-center justify-center rounded-xl border border-dashed border-hairline bg-mist/60 font-mono text-[11px] text-muted">
        <span className="animate-pulse">▍</span>&nbsp;building…
      </div>
    ),
  },
];

const builds = [
  ["◧", "Premium SaaS", "Full products from zero to production"],
  ["⌘", "AI tools & agents", "Copilots, automations, agentic workflows"],
  ["⧉", "Browser extensions", "Store-published, minimal-permission"],
  ["✦", "Productivity software", "Tools that respect attention"],
  ["◈", "Custom automation", "Systems that remove busywork"],
  ["▣", "Product websites", "Fast, prerendered, conversion-focused"],
];

const process = [
  { n: "01", t: "Discover", d: "A working session, not a discovery phase. We map the highest-leverage build in days." },
  { n: "02", t: "Design", d: "A prototype you can click — motion, states and edge cases included." },
  { n: "03", t: "Build", d: "AI-accelerated, human-finished. Short cycles, visible progress, no black box." },
  { n: "04", t: "Run", d: "Ship, measure, iterate. We stay accountable after launch." },
];

export default function Home() {
  const entrance = useEntrance();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mockY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const mockScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const mockOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  return (
    <>
      <Head>
        <title>shift-tab — AI software studio · products & custom development</title>
        <meta
          name="description"
          content="shift-tab is an AI software studio. We build premium SaaS, browser extensions and productivity tools (Monday.com Inspector, MondayVirtual) — and partner with businesses on AI consulting, custom software and enterprise monday.com solutions."
        />
        <link rel="canonical" href="https://shift-tab.eu/" />
        <meta property="og:title" content="shift-tab — AI software studio" />
        <meta property="og:description" content="Products people love + AI-powered custom development. Monday.com Inspector, MondayVirtual, and software built for your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shift-tab.eu/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "shift-tab",
            url: "https://shift-tab.eu",
            description: "AI software studio: premium SaaS products, browser extensions and custom AI-powered development.",
            parentOrganization: { "@type": "Organization", name: "Fruition Services", url: "https://www.fruitionservices.io" },
          })}
        </script>
      </Head>

      {/* ── Hero: the studio, alive ── */}
      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col overflow-hidden px-6 pt-32 sm:pt-36">
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

        <motion.div style={{ y: mockY, scale: mockScale, opacity: mockOpacity }} className="relative z-10 mx-auto mt-16 w-full pb-20">
          <BrowserMock />
        </motion.div>
      </section>

      {/* ── Product ecosystem ── */}
      <section id="products" className="relative mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <motion.span variants={revealUp} className="eyebrow">The ecosystem</motion.span>
          <motion.h2 variants={revealUp} className="mt-4 font-display text-[clamp(2.1rem,4.8vw,3.4rem)] font-extrabold leading-[1.04] tracking-tightest text-ink">
            Products, not projects
          </motion.h2>
          <motion.p variants={revealUp} className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            Published, maintained, iterated — one standard across everything we ship.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.1)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="grid gap-6 lg:grid-cols-3"
        >
          {products.map((p) => (
            <motion.div key={p.name} variants={scaleIn}>
              <a href={p.href} className="block h-full" {...(p.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <TiltCard className="!rounded-card flex h-full flex-col">
                  {p.visual}
                  <span className="mt-5 inline-flex w-fit rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white" style={{ background: p.accent }}>
                    {p.tag}
                  </span>
                  <h3 className="mt-3 font-display text-[1.35rem] font-extrabold tracking-tightest text-ink">{p.name}</h3>
                  <div className="mt-0.5 text-[14px] font-semibold" style={{ color: p.accent === "#111827" ? "#6D5EF7" : p.accent }}>{p.tagline}</div>
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">{p.body}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-ink">
                    {p.accent === "#111827" ? "Watch the lab" : "Explore"} <span aria-hidden>→</span>
                  </span>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── What we build ── */}
      <section id="build" className="relative mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <motion.span variants={revealUp} className="eyebrow">What we build</motion.span>
          <motion.h2 variants={revealUp} className="mt-4 font-display text-[clamp(2.1rem,4.8vw,3.4rem)] font-extrabold leading-[1.04] tracking-tightest text-ink">
            One studio, every layer
          </motion.h2>
        </motion.div>
        <motion.div
          variants={stagger(0.06)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {builds.map(([icon, t, d]) => (
            <motion.div
              key={t}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group flex items-start gap-4 rounded-card border border-hairline bg-white p-6 shadow-soft transition-shadow duration-250 hover:shadow-glowv"
            >
              <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface font-mono text-[17px] text-brand transition-transform duration-200 group-hover:rotate-3 group-hover:scale-110">
                {icon}
              </span>
              <span>
                <h3 className="font-display text-[1.05rem] font-bold text-ink">{t}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{d}</p>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Services (sticky storytelling) ── */}
      <StickyStory />

      {/* ── Process ── */}
      <section id="process" className="relative mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <motion.span variants={revealUp} className="eyebrow">How we work</motion.span>
          <motion.h2 variants={revealUp} className="mt-4 font-display text-[clamp(2.1rem,4.8vw,3.4rem)] font-extrabold leading-[1.04] tracking-tightest text-ink">
            Weeks, not quarters
          </motion.h2>
        </motion.div>
        <motion.div
          variants={stagger(0.09)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {process.map((s, i) => (
            <motion.div
              key={s.n}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative rounded-card border border-hairline bg-white p-6 shadow-soft"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12px] font-bold text-brand">{s.n}</span>
                {i < process.length - 1 && (
                  <span className="ml-auto text-muted/40" aria-hidden>→</span>
                )}
              </div>
              <h3 className="mt-3 font-display text-[1.15rem] font-bold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{s.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Trust ── */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={entrance({ opacity: 0, y: 24 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-card border border-hairline bg-white p-10 shadow-soft sm:p-12"
        >
          <div className="grid gap-8 text-center sm:grid-cols-3">
            <div>
              <div className="font-display text-[2.6rem] font-extrabold tracking-tightest text-ink">
                <Counter to={500} suffix="+" />
              </div>
              <div className="mt-1 text-[13.5px] text-muted">monday.com implementations behind the team</div>
            </div>
            <div>
              <div className="font-display text-[2.6rem] font-extrabold tracking-tightest text-ink">
                <Counter to={2} />
              </div>
              <div className="mt-1 text-[13.5px] text-muted">products live — Chrome Web Store & SaaS</div>
            </div>
            <div>
              <div className="font-display text-[2.6rem] font-extrabold tracking-tightest text-ink">
                <Counter to={100} suffix="%" />
              </div>
              <div className="mt-1 text-[13.5px] text-muted">open-source extension — audit every line</div>
            </div>
          </div>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
            {["Chrome Web Store · published", "Platinum-partner-grade delivery", "Open source (MIT)", "EU-based"].map((c) => (
              <span key={c} className="rounded-full border border-hairline bg-mist/70 px-3.5 py-1.5 text-[12px] font-semibold text-muted">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Business CTA — midnight stage ── */}
      <section id="contact" className="relative mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={entrance({ opacity: 0, y: 44, scale: 0.955 })}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={inView}
          transition={{ type: "spring", stiffness: 110, damping: 15, mass: 0.9 }}
          className="stage relative overflow-hidden rounded-card p-12 text-center sm:p-16"
        >
          <span className="eyebrow !text-[#a99cff]">Work with shift-tab</span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(2rem,4.6vw,3.3rem)] font-extrabold leading-[1.06] tracking-tightest text-white">
            Let&apos;s build what your team actually needs.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[1.05rem] leading-relaxed text-white/60">
            An AI pilot, a custom product, a monday.com platform — scoped in days,
            shipped in weeks.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton variant="accent" href="mailto:sam@fruitionservices.io">
              Start a conversation <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="/#products">
              See the products first
            </MagneticButton>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/45">
            {["Simple", "Soft", "Fast"].map((w, i) => (
              <span key={w} className="inline-flex items-center gap-2">
                <span className="font-mono text-[11px]" style={{ color: ["#8b7bff", "#34d399", "#7dd3fc"][i] }}>0{i + 1}</span>
                {w} by default
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
