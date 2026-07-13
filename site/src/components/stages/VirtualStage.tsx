import { AnimatePresence, motion } from "framer-motion";
import { usePhaseEngine } from "@/lib/usePhaseEngine";
import PerformedCursor, { type Waypoint } from "@/components/stages/PerformedCursor";

/* ─────────────────────────────────────────────────────────────────────
   MondayVirtual performs itself — 6 acts, one loop (~6.6s):
   0 Maya walks into the office     3 slide advances (deck panel)
   1 proximity voice rings pulse    4 chat bubbles land
   2 Maya starts presenting         5 wave 👋 · settle
   Mirrors the real MVP: avatars, spatial voice falloff, live boards
   on the walls, meeting presentations.
   ───────────────────────────────────────────────────────────────────── */

const CURSOR: (Waypoint | null)[] = [
  { x: 20, y: 66 },
  { x: 42, y: 60, click: true }, // walk toward the group
  { x: 68, y: 26 },
  { x: 82, y: 30, click: true }, // next slide
  { x: 76, y: 74 },
  { x: 30, y: 58 },
];

const AVATARS = [
  ["J", "#10B981", "42%", "58%"],
  ["A", "#F59E0B", "58%", "50%"],
  ["T", "#38BDF8", "72%", "60%"],
] as const;

export default function VirtualStage({ running }: { running: boolean }) {
  const { step, reduced } = usePhaseEngine({ steps: 6, running });
  const joined = reduced || step >= 0;
  const proximity = reduced || step >= 1;
  const presenting = reduced || step >= 2;
  const slide = reduced || step >= 3 ? 2 : 1;
  const chat = reduced || step >= 4;
  const wave = !reduced && step === 5;

  return (
    <div
      className="relative h-full overflow-hidden"
      style={{ background: "linear-gradient(180deg,#0e1524 0%,#1a2338 100%)" }}
    >
      {/* office floor */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-40"
        style={{
          background:
            "linear-gradient(transparent 0, rgba(16,185,129,.22) 100%), repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0 1px, transparent 1px 22px)",
          transform: "perspective(300px) rotateX(48deg)",
          transformOrigin: "bottom",
        }}
      />

      {/* teammates */}
      {AVATARS.map(([ch, c, x, y]) => (
        <div key={ch} className="absolute flex flex-col items-center" style={{ left: x, top: y }}>
          <div className="relative">
            {proximity && ch === "J" && (
              <motion.span
                aria-hidden
                className="absolute -inset-2 rounded-full border-2 border-emerald-400/70"
                animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                transition={{ duration: 1.4, repeat: reduced ? 0 : Infinity, ease: "easeOut" }}
              />
            )}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-lg"
              style={{ background: c }}
            >
              {ch}
            </div>
            {wave && ch === "T" && (
              <motion.span
                className="absolute -right-3 -top-3 text-[13px]"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 24, -12, 24, 0] }}
                transition={{ duration: 0.9 }}
              >
                👋
              </motion.span>
            )}
          </div>
          <div className="mt-1 h-1.5 w-5 rounded-full bg-black/40 blur-[2px]" />
        </div>
      ))}

      {/* Maya walks in — proximity voice fades up as she approaches */}
      <motion.div
        className="absolute flex flex-col items-center"
        initial={reduced ? { left: "30%", top: "56%", opacity: 1 } : { left: "4%", top: "70%", opacity: 0 }}
        animate={joined ? { left: "30%", top: "56%", opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 50, damping: 16 }}
      >
        <div className="relative">
          {proximity && (
            <motion.span
              aria-hidden
              className="absolute -inset-2 rounded-full border-2 border-emerald-400/70"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 1.4, repeat: reduced ? 0 : Infinity, ease: "easeOut", delay: 0.4 }}
            />
          )}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white shadow-lg">
            M
          </div>
        </div>
        <div className="mt-1 h-1.5 w-5 rounded-full bg-black/40 blur-[2px]" />
      </motion.div>

      {/* live board on the wall */}
      <div className="absolute left-[6%] top-[8%] w-[30%] rounded-lg border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
        <div className="mb-1 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-wider text-white/60">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> Sprint board · live
        </div>
        {["Launch page", "Beta invites", "Follow-ups"].map((t, i) => (
          <div key={t} className="mb-1 flex items-center gap-1.5 rounded bg-white/10 px-1.5 py-1 text-[9px] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ["#6D5EF7", "#10B981", "#F59E0B"][i] }} />
            {t}
          </div>
        ))}
      </div>

      {/* presentation deck */}
      <div className="absolute right-[5%] top-[8%] w-[34%] rounded-lg border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
        <div className="mb-1.5 flex items-center justify-between text-[8px] font-bold uppercase tracking-wider text-white/60">
          <span>Q3 all-hands</span>
          <span className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-white/75">{slide} / 12</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={reduced ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="rounded bg-white/[.14] p-2"
          >
            <div className={`mb-1 h-1.5 w-2/3 rounded-full ${slide === 2 ? "bg-emerald-300/80" : "bg-white/50"}`} />
            <div className="mb-1 h-1 w-full rounded-full bg-white/25" />
            <div className="h-1 w-4/5 rounded-full bg-white/25" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* voice chip */}
      <div className="absolute left-[6%] bottom-[8%] rounded-full bg-white/[.12] px-2.5 py-1 text-[9px] font-semibold text-white/85 backdrop-blur-sm">
        🎤 4 unmuted · spatial audio
      </div>

      {/* chat bubbles */}
      <div className="absolute bottom-[8%] right-[5%] flex w-[32%] flex-col items-end gap-1.5">
        <AnimatePresence>
          {chat && (
            <>
              {[
                ["Maya", "deck looks great 🔥"],
                ["Jonas", "shipping friday?"],
              ].map(([who, msg], i) => (
                <motion.div
                  key={who}
                  initial={reduced ? false : { opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 340, damping: 24, delay: reduced ? 0 : i * 0.28 }}
                  className="rounded-xl border border-white/15 bg-white/12 px-2.5 py-1.5 text-[9.5px] text-white/90 backdrop-blur-sm"
                >
                  <span className="mr-1.5 font-bold text-emerald-300">{who}</span>
                  {msg}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* presenting toast */}
      <AnimatePresence>
        {presenting && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-xl bg-brand px-3 py-1.5 text-[9.5px] font-bold text-white shadow-glowv"
          >
            🖥️ Maya is presenting
          </motion.div>
        )}
      </AnimatePresence>

      {!reduced && running && <PerformedCursor waypoint={CURSOR[step]} />}
    </div>
  );
}
