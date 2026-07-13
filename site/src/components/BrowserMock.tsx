import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { prefersReducedMotion } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   Hero product mockup: a browser window whose tabs are the studio's
   work. Every few seconds ⇧⇥ "presses" and the window instantly
   switches tab — the brand shortcut, demonstrated. Panes are stylized
   product visualizations (no static screenshots).
   Pauses off-screen; reduced motion = static populated state.
   ───────────────────────────────────────────────────────────────────── */

const TABS = [
  { id: "inspector", label: "Inspector", host: "monday.com/boards/5098431200" },
  { id: "virtual", label: "MondayVirtual", host: "office.mondayvirtual.eu" },
  { id: "graphql", label: "GraphQL", host: "inspector › query" },
] as const;

const STEP_MS = 3400;

function InspectorPane() {
  return (
    <div className="grid h-full grid-cols-[128px_1fr] max-sm:grid-cols-1">
      <div className="border-r border-hairline bg-mist/60 p-2.5 max-sm:hidden">
        {["Schema", "Items", "Import", "Query"].map((t, i) => (
          <div
            key={t}
            className={`mb-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${i === 0 ? "bg-surface font-semibold text-ink" : "text-muted"}`}
          >
            {t}
          </div>
        ))}
        <div className="mt-3 rounded-lg bg-softmint px-2 py-1.5 text-[9px] font-semibold text-emerald-600">
          ● Connected
        </div>
      </div>
      <div className="p-3.5">
        <div className="mb-2 flex items-center gap-2 text-[11px]">
          <span className="font-semibold text-ink">Board schema</span>
          <span className="ml-auto rounded-full bg-softmint px-2 py-0.5 text-[9px] font-bold text-emerald-600">✓ id copied</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-hairline bg-white font-mono text-[10.5px]">
          <div className="grid grid-cols-[1fr_86px_70px] bg-mist px-2.5 py-1.5 text-[8.5px] font-bold uppercase tracking-wider text-muted">
            <span>Column</span><span>id</span><span>type</span>
          </div>
          {[
            ["Status", "status", "color"],
            ["Owner", "person", "people"],
            ["Due date", "date4", "date"],
            ["Timeline", "timeline", "range"],
          ].map(([a, b, c], i) => (
            <div key={a} className={`grid grid-cols-[1fr_86px_70px] border-t border-hairline px-2.5 py-1.5 ${i === 1 ? "bg-surface/60" : ""}`}>
              <span className="font-sans font-semibold text-ink">{a}</span>
              <span className="text-brand">{b}</span>
              <span className="text-muted">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VirtualPane() {
  return (
    <div className="relative h-full overflow-hidden" style={{ background: "linear-gradient(180deg,#101726 0%,#1a2338 100%)" }}>
      {/* floor grid */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-40"
        style={{
          background:
            "linear-gradient(transparent 0, rgba(109,94,247,.25) 100%), repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0 1px, transparent 1px 22px)",
          transform: "perspective(300px) rotateX(48deg)",
          transformOrigin: "bottom",
        }}
      />
      {/* avatars */}
      {[
        ["M", "#6D5EF7", "22%", "58%"],
        ["J", "#10B981", "40%", "66%"],
        ["A", "#F59E0B", "58%", "56%"],
        ["T", "#38BDF8", "74%", "64%"],
      ].map(([ch, c, x, y]) => (
        <div key={ch as string} className="absolute flex flex-col items-center" style={{ left: x as string, top: y as string }}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-lg" style={{ background: c as string }}>
            {ch}
          </div>
          <div className="mt-1 h-1.5 w-4 rounded-full bg-black/40 blur-[2px]" />
        </div>
      ))}
      {/* board on the wall */}
      <div className="absolute left-[8%] top-[12%] w-[38%] rounded-lg border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
        <div className="mb-1 text-[8px] font-bold uppercase tracking-wider text-white/60">Sprint board · live</div>
        {["Launch page", "Beta invites", "Follow-ups"].map((t, i) => (
          <div key={t} className="mb-1 flex items-center gap-1.5 rounded bg-white/10 px-1.5 py-1 text-[9px] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ["#6D5EF7", "#10B981", "#F59E0B"][i] }} />
            {t}
          </div>
        ))}
      </div>
      <div className="absolute right-[6%] top-[14%] rounded-full bg-white/12 px-2.5 py-1 text-[9px] font-semibold text-white/85 backdrop-blur-sm">
        🎤 12 unmuted · ✋ 3 hands
      </div>
    </div>
  );
}

function GraphQLPane() {
  return (
    <div className="grid h-full grid-cols-2 max-sm:grid-cols-1">
      <div className="border-r border-hairline bg-[#0F172A] p-3.5 font-mono text-[10.5px] leading-relaxed">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-md bg-brand px-2 py-0.5 text-[9px] font-bold text-white">▶ Run</span>
          <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[8.5px] font-bold text-emerald-400">200 · 88 ms</span>
        </div>
        <div className="text-white/40">
          <span className="text-[#a5b4fc]">query</span> <span className="text-white/80">Boards</span> {"{"}<br />
          &nbsp;&nbsp;<span className="text-[#7cc7ff]">boards</span>(limit: <span className="text-amber-300">50</span>) {"{"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7cc7ff]">id name items_count</span><br />
          &nbsp;&nbsp;{"}"}<br />
          {"}"}
        </div>
      </div>
      <div className="p-3.5">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">Table · 42 rows</div>
        <div className="overflow-hidden rounded-xl border border-hairline bg-white font-mono text-[10.5px]">
          {[
            ["1234", "Marketing Plan", "183"],
            ["1235", "Sales Pipeline", "421"],
            ["1236", "Q1 Roadmap", "67"],
          ].map(([a, b, c], i) => (
            <div key={a} className={`grid grid-cols-[54px_1fr_44px] px-2.5 py-1.5 ${i ? "border-t border-hairline" : "bg-mist text-[9px] font-bold uppercase tracking-wider text-muted"}`}>
              <span>{i ? a : "id"}</span>
              <span className={i ? "font-sans text-ink" : ""}>{i ? b : "name"}</span>
              <span>{i ? c : "items"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PANES = { inspector: InspectorPane, virtual: VirtualPane, graphql: GraphQLPane };

export default function BrowserMock() {
  const reduced = prefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { amount: 0.25 });
  const [active, setActive] = useState(0);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (reduced || !onScreen) return;
    const t = setInterval(() => {
      setPressing(true);
      setTimeout(() => {
        setActive((a) => (a + 1) % TABS.length);
        setPressing(false);
      }, 220);
    }, STEP_MS);
    return () => clearInterval(t);
  }, [reduced, onScreen]);

  const Pane = PANES[TABS[active].id];

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      {/* the shortcut, physically pressed on every switch */}
      <div className="pointer-events-none absolute -top-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
        <kbd className={`key transition-all duration-150 ${pressing ? "pressed" : ""}`}>⇧ shift</kbd>
        <span className="text-[12px] font-semibold text-muted">+</span>
        <kbd className={`key transition-all duration-150 ${pressing ? "pressed" : ""}`}>⇥ tab</kbd>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 42, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-card border border-hairline bg-white shadow-lift"
      >
        {/* chrome */}
        <div className="flex items-end gap-1 border-b border-hairline bg-mist/80 px-3 pt-2.5">
          <div className="mb-2.5 mr-2 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF6159]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`relative rounded-t-xl px-4 py-2 text-[12px] font-semibold transition-colors duration-150 ${
                i === active ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {i === active && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-t-xl border border-b-0 border-hairline bg-white"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: ["#6D5EF7", "#10B981", "#0F172A"][i] }}
                />
                {t.label}
              </span>
            </button>
          ))}
        </div>
        {/* url bar */}
        <div className="flex items-center gap-2 border-b border-hairline bg-white px-3 py-2">
          <span className="text-[11px] text-muted">⟵ ⟶ ⟳</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={TABS[active].host}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="flex-1 rounded-lg bg-mist px-3 py-1 font-mono text-[10.5px] text-muted"
            >
              🔒 {TABS[active].host}
            </motion.span>
          </AnimatePresence>
        </div>
        {/* pane */}
        <div className="h-[300px] sm:h-[330px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={TABS[active].id}
              initial={reduced ? false : { opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -22 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <Pane />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
