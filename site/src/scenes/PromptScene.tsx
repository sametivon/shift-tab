import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { usePhaseEngine } from "@/lib/usePhaseEngine";
import { revealUp, stagger, inView, useEntrance } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   THE PROMPT — the contact scene is a terminal.
   The session types itself out line by line, then hands the visitor a
   REAL prompt: type anything, press ↵, and it opens a pre-addressed
   email to Sam carrying what they wrote. Buttons remain for everyone
   else. Dark act; the journey ends where the studio lives — a shell.
   ───────────────────────────────────────────────────────────────────── */

const HISTORY: Array<{ cmd: string; out: string[] }> = [
  { cmd: "whoami", out: ["an AI software studio — own products, custom builds"] },
  { cmd: "ls services/", out: ["ai-pilots/   custom-products/   monday-platform/"] },
  { cmd: "ship --for your-team", out: ["scoped in days. shipped in weeks. accountable after launch."] },
];

export default function PromptScene() {
  const entrance = useEntrance();
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { amount: 0.35 });
  const { step, reduced } = usePhaseEngine({ steps: 8, tickMs: 850, running: onScreen });
  const [draft, setDraft] = useState("");

  // each history entry needs two beats: command, then output
  const visible = (i: number, part: "cmd" | "out") =>
    reduced || step >= i * 2 + (part === "cmd" ? 0 : 1);

  const send = () => {
    const subject = encodeURIComponent("New project — via shift-tab.eu");
    const body = encodeURIComponent(draft.trim() ? draft.trim() : "Hi Sam — let's talk about a build.");
    window.location.href = `mailto:hello-shift-tab@proton.me?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-20">
      <motion.div
        ref={ref}
        initial={entrance({ opacity: 0, y: 44, scale: 0.955 })}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={inView}
        transition={{ type: "spring", stiffness: 110, damping: 15, mass: 0.9 }}
        className="stage relative overflow-hidden rounded-card p-8 sm:p-14"
      >
        <motion.div
          variants={stagger(0.09)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto max-w-2xl"
        >
          <motion.span variants={revealUp} className="eyebrow !text-[#a99cff]">
            Work with shift-tab
          </motion.span>
          <motion.h2
            variants={revealUp}
            className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-extrabold leading-[1.08] tracking-tightest text-white"
          >
            Let&apos;s build what your team{" "}
            <span className="font-serif font-medium italic tracking-normal text-[#a99cff]">actually needs.</span>
          </motion.h2>

          {/* the terminal */}
          <motion.div
            variants={revealUp}
            className="mt-8 overflow-hidden rounded-2xl border border-white/12 bg-[#0a0f1d]/95 text-left shadow-[0_32px_80px_-32px_rgba(0,0,0,.8)]"
          >
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
              ))}
              <span className="ml-2 font-mono text-[10.5px] text-white/40">hello@shift-tab — zsh</span>
            </div>
            <div className="px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:px-5">
              {HISTORY.map((h, i) => (
                <div key={h.cmd}>
                  <motion.div
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: visible(i, "cmd") ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/85"
                  >
                    <span className="text-[#8b7bff]">shift-tab %</span> {h.cmd}
                  </motion.div>
                  {h.out.map((o) => (
                    <motion.div
                      key={o}
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: visible(i, "out") ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="mb-1.5 text-white/50"
                    >
                      {o}
                    </motion.div>
                  ))}
                </div>
              ))}

              {/* the real prompt */}
              <div className="mt-1 flex items-center gap-2">
                <label htmlFor="prompt-input" className="shrink-0 text-[#8b7bff]">
                  shift-tab %
                </label>
                <input
                  id="prompt-input"
                  data-prompt-input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  placeholder="tell us what you're building — ↵ opens an email to Sam"
                  className="min-w-0 flex-1 bg-transparent font-mono text-[12.5px] text-white caret-[#8b7bff] outline-none placeholder:text-white/30"
                />
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton variant="accent" href="mailto:hello-shift-tab@proton.me">
              Start a conversation <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="/#products">
              See the products first
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={revealUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11.5px] text-white/40"
          >
            {["simple", "soft", "fast"].map((w, i) => (
              <span key={w} className="inline-flex items-center gap-2">
                <span style={{ color: ["#8b7bff", "#34d399", "#7dd3fc"][i] }}>0{i + 1}</span>
                {w} by default
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
