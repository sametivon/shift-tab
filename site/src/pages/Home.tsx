import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import StickyStory from "@/components/StickyStory";
import Counter from "@/components/Counter";
import Scene from "@/components/scene/Scene";
import ScenesRoot from "@/components/scene/ScenesRoot";
import BootScene from "@/scenes/BootScene";
import WorkScene from "@/scenes/WorkScene";
import LabScene from "@/scenes/LabScene";
import { useMediaFlag } from "@/lib/useMediaFlag";
import { revealUp, scaleIn, stagger, inView, useEntrance } from "@/lib/motion";

/* ── shift-tab v6 — one continuous experience, not stacked sections.
   Every act is a <Scene>: registered in the scene store, focusable via
   its anchor (Tab/Shift+Tab travels the journey), spied by the nav.
   BOOT → THE WORK (pinned stages) → THE LAB → practice → services →
   process → proof → prompt. ── */

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
  // pinned scenes are hostile on touch: unpin on coarse pointers (post-mount flip)
  const coarse = useMediaFlag("(pointer: coarse)");
  return (
    <ScenesRoot>
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

      {/* ── 01 · BOOT — the desktop assembles itself ── */}
      <Scene id="boot" label="01 · boot" accent="#6D5EF7">
        <BootScene />
      </Scene>

      {/* ── 02 · THE WORK — the products perform themselves ── */}
      <Scene id="products" label="02 · the work" accent="#6D5EF7" pin={!coarse} length={3.2}>
        {(ctx) => <WorkScene ctx={ctx} />}
      </Scene>

      {/* ── 03 · THE LAB — the workshop, mid-build ── */}
      <Scene id="lab" label="03 · the lab" accent="#8b7bff">
        <LabScene />
      </Scene>

      {/* ── 04 · What we build ── */}
      <Scene id="build" label="04 · the practice" accent="#4F46C8" travelOffset={-80}>
      <div className="relative mx-auto max-w-6xl px-6 py-20">
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
      </div>
      </Scene>

      {/* ── 05 · Services (sticky storytelling) ── */}
      <Scene id="services" label="05 · services" accent="#6D5EF7" travelOffset={-80}>
        <StickyStory />
      </Scene>

      {/* ── 06 · Process ── */}
      <Scene id="process" label="06 · process" accent="#10B981" travelOffset={-80}>
      <div className="relative mx-auto max-w-6xl px-6 py-20">
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
      </div>
      </Scene>

      {/* ── 07 · Proof ── */}
      <Scene id="trust" label="07 · proof" accent="#10B981" travelOffset={-80}>
      <div className="relative mx-auto max-w-6xl px-6 py-20">
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
      </div>
      </Scene>

      {/* ── 08 · THE PROMPT — midnight stage ── */}
      <Scene id="contact" label="08 · the prompt" accent="#0F172A" travelOffset={-80}>
      <div className="relative mx-auto max-w-6xl px-6 py-20">
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
      </div>
      </Scene>
    </ScenesRoot>
  );
}
