import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import StickyStory from "@/components/StickyStory";
import Scene from "@/components/scene/Scene";
import ScenesRoot from "@/components/scene/ScenesRoot";
import BootScene from "@/scenes/BootScene";
import WorkScene from "@/scenes/WorkScene";
import LabScene from "@/scenes/LabScene";
import PracticeScene from "@/scenes/PracticeScene";
import StudioScene from "@/scenes/StudioScene";
import PromptScene from "@/scenes/PromptScene";
import { useMediaFlag } from "@/lib/useMediaFlag";
import { revealUp, scaleIn, stagger, inView, useEntrance } from "@/lib/motion";

/* ── shift-tab v6 — one continuous experience, not stacked sections.
   Every act is a <Scene>: registered in the scene store, focusable via
   its anchor (Tab/Shift+Tab travels the journey), spied by the nav.
   BOOT → THE WORK (pinned stages) → THE LAB → THE PRACTICE →
   services → process → THE STUDIO → THE PROMPT. ── */

const process = [
  { n: "01", t: "Discover", d: "A working session, not a discovery phase. We map the highest-leverage build in days." },
  { n: "02", t: "Design", d: "A prototype you can click — motion, states and edge cases included." },
  { n: "03", t: "Build", d: "AI-accelerated, human-finished. Short cycles, visible progress, no black box." },
  { n: "04", t: "Run", d: "Ship, measure, iterate. We stay accountable after launch." },
];

export default function Home() {
  const entrance = useEntrance();
  // pinning is a wide-viewport, fine-pointer luxury: phones and touch get
  // the stacked flow (flags flip post-mount; SSR renders the flow layout)
  const coarse = useMediaFlag("(pointer: coarse)");
  const wide = useMediaFlag("(min-width: 1024px)");
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
            alternateName: "shift-tab lab",
            url: "https://shift-tab.eu",
            email: "hello-shift-tab@proton.me",
            description: "AI software studio: premium SaaS products, browser extensions and custom AI-powered development.",
          })}
        </script>
      </Head>

      {/* ── 01 · BOOT — the desktop assembles itself ── */}
      <Scene id="boot" label="01 · boot" accent="#6D5EF7">
        <BootScene />
      </Scene>

      {/* ── 02 · THE WORK — the products perform themselves ── */}
      <Scene id="products" label="02 · the work" accent="#6D5EF7" pin={wide && !coarse} length={3.2}>
        {(ctx) => <WorkScene ctx={ctx} />}
      </Scene>

      {/* ── 03 · THE LAB — the workshop, mid-build ── */}
      <Scene id="lab" label="03 · the lab" accent="#8b7bff">
        <LabScene />
      </Scene>

      {/* ── 04 · THE PRACTICE — capabilities as typography ── */}
      <Scene id="build" label="04 · the practice" accent="#4F46C8" travelOffset={-80}>
        <PracticeScene />
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

      {/* ── 07 · THE STUDIO — manifesto + the numbers ── */}
      <Scene id="trust" label="07 · the studio" accent="#10B981" travelOffset={-80}>
        <StudioScene />
      </Scene>

      {/* ── 08 · THE PROMPT — the terminal outro ── */}
      <Scene id="contact" label="08 · the prompt" accent="#0F172A" travelOffset={-80}>
        <PromptScene />
      </Scene>
    </ScenesRoot>
  );
}
