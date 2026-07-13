import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import StageFrame from "@/components/stages/StageFrame";
import InspectorStage from "@/components/stages/InspectorStage";
import VirtualStage from "@/components/stages/VirtualStage";
import { revealUp, stagger, inView, useEntrance } from "@/lib/motion";
import type { SceneCtx } from "@/components/scene/Scene";

/* ─────────────────────────────────────────────────────────────────────
   THE WORK — the products perform themselves on stage.
   Pinned: the viewport holds while scroll hands off between two
   depth-stacked stages (the waiting stage idles behind, dimmed and
   blurred; the front stage runs its phase engine). The copy rail
   crossfades in step. Unpinned (reduced motion / coarse pointers):
   the stages stack vertically and auto-perform via useInView.
   ───────────────────────────────────────────────────────────────────── */

const STAGES = [
  {
    key: "inspector",
    name: "Monday.com Inspector",
    tag: "Live · Chrome Web Store",
    tagline: "The DevTools for monday.com",
    body: "Schema X-ray, a GraphQL workspace, subitem import and bulk updates — the features monday.com never shipped. Free and open source.",
    href: "/products/extension",
    cta: "Explore Inspector",
    accent: "#6D5EF7",
    host: "monday.com/boards/5098431200",
    label: "monday.inspector",
    Stage: InspectorStage,
  },
  {
    key: "virtual",
    name: "MondayVirtual",
    tag: "Live · SaaS",
    tagline: "Your office, inside monday.com",
    body: "A 3D team office with proximity voice, auditorium all-hands and live boards on the walls. Walk over. Talk. Get back to work.",
    href: "/products/mondayvirtual",
    cta: "Explore MondayVirtual",
    accent: "#10B981",
    host: "office.mondayvirtual.eu",
    label: "monday.virtual",
    Stage: VirtualStage,
  },
];

function CopyRail({ idx, active }: { idx: number; active: boolean }) {
  const entrance = useEntrance();
  const s = STAGES[idx];
  return (
    <div className="relative z-10">
      <motion.div variants={stagger(0.08)} initial={entrance("hidden")} whileInView="show" viewport={inView}>
        <motion.span variants={revealUp} className="eyebrow">
          The work
        </motion.span>
        <motion.h2
          variants={revealUp}
          className="mt-4 font-display text-[clamp(2.1rem,4.6vw,3.2rem)] font-extrabold leading-[1.04] tracking-tightest text-ink"
        >
          Products,{" "}
          <span className="font-serif font-medium italic tracking-normal text-brand">not projects.</span>
        </motion.h2>
      </motion.div>

      <div className="mt-6 min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-flex rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white"
              style={{ background: s.accent }}
            >
              {s.tag}
            </span>
            <h3 className="mt-3 font-display text-[1.5rem] font-extrabold tracking-tightest text-ink">{s.name}</h3>
            <div className="mt-0.5 text-[15px] font-semibold" style={{ color: s.accent }}>
              {s.tagline}
            </div>
            <p className="mt-2.5 max-w-sm text-[14.5px] leading-relaxed text-muted">{s.body}</p>
            <div className="mt-5">
              <MagneticButton href={s.href}>
                {s.cta} <span aria-hidden>→</span>
              </MagneticButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* act indicator */}
      <div className="mt-6 flex items-center gap-2" aria-hidden>
        {STAGES.map((st, i) => (
          <motion.span
            key={st.key}
            className="h-1.5 rounded-full"
            animate={{
              width: i === idx ? 26 : 8,
              backgroundColor: i === idx ? st.accent : "#E8E8E8",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          />
        ))}
        <span className="ml-2 font-mono text-[10.5px] text-muted">
          {active ? "0" + (idx + 1) + " / 02 · performing" : "0" + (idx + 1) + " / 02"}
        </span>
      </div>
    </div>
  );
}

/** Unpinned fallback panel that performs when scrolled into view */
function FlowPanel({ s }: { s: (typeof STAGES)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { amount: 0.35 });
  const S = s.Stage;
  return (
    <div ref={ref} className="grid items-center gap-8 lg:grid-cols-[2fr_3fr]">
      <div>
        <span
          className="inline-flex rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white"
          style={{ background: s.accent }}
        >
          {s.tag}
        </span>
        <h3 className="mt-3 font-display text-[1.5rem] font-extrabold tracking-tightest text-ink">{s.name}</h3>
        <div className="mt-0.5 text-[15px] font-semibold" style={{ color: s.accent }}>
          {s.tagline}
        </div>
        <p className="mt-2.5 max-w-sm text-[14.5px] leading-relaxed text-muted">{s.body}</p>
        <div className="mt-5">
          <MagneticButton href={s.href}>
            {s.cta} <span aria-hidden>→</span>
          </MagneticButton>
        </div>
      </div>
      <StageFrame host={s.host} label={s.label} accent={s.accent}>
        <S running={onScreen} />
      </StageFrame>
    </div>
  );
}

export default function WorkScene({ ctx }: { ctx: SceneCtx }) {
  const [idx, setIdx] = useState(0);

  useMotionValueEvent(ctx.progress, "change", (v) => {
    const next = v < 0.52 ? 0 : 1;
    if (next !== idx) setIdx(next);
  });

  if (!ctx.pinned) {
    return (
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">The work</span>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4.6vw,3.2rem)] font-extrabold leading-[1.04] tracking-tightest text-ink">
            Products, <span className="font-serif font-medium italic tracking-normal text-brand">not projects.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-16">
          {STAGES.map((s) => (
            <FlowPanel key={s.key} s={s} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 lg:grid-cols-[minmax(300px,5fr)_7fr]">
        <CopyRail idx={idx} active={ctx.active} />

        {/* the depth stack — waiting stage idles behind the performer */}
        <div className="relative" style={{ perspective: 1400 }}>
          {STAGES.map((s, i) => {
            const front = i === idx;
            const S = s.Stage;
            return (
              <motion.div
                key={s.key}
                className={front ? "relative" : "absolute inset-0"}
                style={{ zIndex: front ? 2 : 1 }}
                animate={{
                  y: front ? 0 : -36,
                  scale: front ? 1 : 0.92,
                  opacity: front ? 1 : 0.45,
                  filter: front ? "blur(0px)" : "blur(2.5px)",
                  rotateX: front ? 0 : 5,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 22, mass: 0.9 }}
              >
                <StageFrame host={s.host} label={s.label} accent={s.accent}>
                  <S running={front && ctx.active} />
                </StageFrame>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
