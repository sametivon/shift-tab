import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   BrowserMock v2 — a living miniature application.
   The window floats, tilts toward the pointer and glows. Tabs open one
   by one, then ⇧⇥ cycles products. Inside each pane a scripted cursor
   PERFORMS the product: Inspector copies a schema id → success toast;
   Virtual gets a teammate joining → presenting; GraphQL runs a query →
   rows stream in. Sub-phase engine: 1.1s ticks, 4 per tab.
   Reduced motion: everything rendered at its final, populated state.
   ───────────────────────────────────────────────────────────────────── */

const TABS = [
  { id: "inspector", label: "Inspector", host: "monday.com/boards/5098431200", dot: "#6D5EF7" },
  { id: "virtual", label: "MondayVirtual", host: "office.mondayvirtual.eu", dot: "#10B981" },
  { id: "graphql", label: "GraphQL", host: "inspector › query", dot: "#111827" },
] as const;

const TICK_MS = 1100;

/* cursor waypoints per [tab][sub] in % of the pane box */
const CURSOR: Record<number, { x: number; y: number; click?: boolean }[]> = {
  0: [
    { x: 62, y: 52 },
    { x: 88, y: 20, click: true }, // copy chip
    { x: 74, y: 78 },
  ],
  1: [
    { x: 30, y: 62 },
    { x: 48, y: 66, click: true }, // walk to Jonas
    { x: 78, y: 30 },
  ],
  2: [
    { x: 14, y: 16, click: true }, // Run
    { x: 70, y: 40 },
    { x: 82, y: 82 },
  ],
};

function InspectorPane({ sub, reduced }: { sub: number; reduced: boolean }) {
  const copied = reduced || sub >= 1;
  const toast = reduced || sub >= 2;
  return (
    <div className="relative grid h-full grid-cols-[128px_1fr] max-sm:grid-cols-1">
      <div className="border-r border-hairline bg-mist/60 p-2.5 max-sm:hidden">
        {["Schema", "Items", "Import", "Query"].map((t, i) => (
          <div key={t} className={`mb-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${i === 0 ? "bg-surface font-semibold text-ink" : "text-muted"}`}>
            {t}
          </div>
        ))}
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-softmint px-2 py-1.5 text-[9px] font-semibold text-emerald-600">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" /> Connected
        </div>
      </div>
      <div className="p-3.5">
        <div className="mb-2 flex items-center gap-2 text-[11px]">
          <span className="font-semibold text-ink">Board schema</span>
          <motion.span
            className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold"
            animate={copied ? { backgroundColor: "#E4F7EF", color: "#0DA271", scale: [1, 1.12, 1] } : { backgroundColor: "#F1F1F3", color: "#5B6472" }}
            transition={{ duration: 0.3 }}
          >
            {copied ? "✓ id copied" : "copy id"}
          </motion.span>
        </div>
        <div className="overflow-hidden rounded-xl border border-hairline bg-white font-mono text-[10.5px]">
          <div className="grid grid-cols-[1fr_86px_70px] bg-mist px-2.5 py-1.5 text-[8.5px] font-bold uppercase tracking-wider text-muted">
            <span>Column</span><span>id</span><span>type</span>
          </div>
          {[["Status", "status", "color"], ["Owner", "person", "people"], ["Due date", "date4", "date"], ["Timeline", "timeline", "range"]].map(([a, b, c], i) => (
            <motion.div
              key={a}
              className="grid grid-cols-[1fr_86px_70px] border-t border-hairline px-2.5 py-1.5"
              animate={{ backgroundColor: (reduced ? i === 1 : i === sub) ? "rgba(239,237,254,.8)" : "rgba(255,255,255,0)" }}
              transition={{ duration: 0.35 }}
            >
              <span className="font-sans font-semibold text-ink">{a}</span>
              <span className="text-brand">{b}</span>
              <span className="text-muted">{c}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-2.5 flex gap-1.5">
          {["▶ Query this board", "⇪ Import CSV", "⬇ Export"].map((a) => (
            <span key={a} className="rounded-lg border border-hairline bg-mist/70 px-2.5 py-1.5 text-[9.5px] font-semibold text-muted">
              {a}
            </span>
          ))}
        </div>
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl border border-hairline bg-white px-3 py-2 shadow-lift"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-softmint text-[10px] text-emerald-600">✓</span>
              <span className="text-[10px] font-semibold text-ink">Copied to clipboard</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function VirtualPane({ sub, reduced }: { sub: number; reduced: boolean }) {
  const joined = reduced || sub >= 0;
  const presenting = reduced || sub >= 2;
  return (
    <div className="relative h-full overflow-hidden" style={{ background: "linear-gradient(180deg,#101726 0%,#1a2338 100%)" }}>
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-40"
        style={{
          background:
            "linear-gradient(transparent 0, rgba(109,94,247,.25) 100%), repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, transparent 1px 34px), repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0 1px, transparent 1px 22px)",
          transform: "perspective(300px) rotateX(48deg)",
          transformOrigin: "bottom",
        }}
      />
      {[["J", "#10B981", "44%", "62%"], ["A", "#F59E0B", "60%", "54%"], ["T", "#38BDF8", "74%", "64%"]].map(([ch, c, x, y]) => (
        <div key={ch as string} className="absolute flex flex-col items-center" style={{ left: x as string, top: y as string }}>
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-lg ${ch === "J" && (reduced || sub >= 1) ? "ring-2 ring-emerald-400/80" : ""}`}
            style={{ background: c as string }}
          >
            {ch}
          </div>
          <div className="mt-1 h-1.5 w-4 rounded-full bg-black/40 blur-[2px]" />
        </div>
      ))}
      {/* Maya walks in */}
      <motion.div
        className="absolute flex flex-col items-center"
        initial={reduced ? { left: "26%", top: "60%", opacity: 1 } : { left: "6%", top: "70%", opacity: 0 }}
        animate={joined ? { left: "26%", top: "60%", opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 60, damping: 16 }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6D5EF7] text-[10px] font-bold text-white shadow-lg">M</div>
        <div className="mt-1 h-1.5 w-4 rounded-full bg-black/40 blur-[2px]" />
      </motion.div>
      <div className="absolute left-[8%] top-[10%] w-[38%] rounded-lg border border-white/15 bg-white/10 p-2 backdrop-blur-sm">
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
      <div className="absolute right-[6%] top-[12%] rounded-full bg-white/[.12] px-2.5 py-1 text-[9px] font-semibold text-white/85 backdrop-blur-sm">
        🎤 12 unmuted · ✋ 3 hands
      </div>
      <AnimatePresence>
        {joined && !reduced && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="absolute bottom-3 right-3 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-[9.5px] font-semibold text-white/90 backdrop-blur-sm"
          >
            👋 Maya joined the office
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {presenting && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-3 left-3 rounded-xl bg-[#6D5EF7] px-3 py-1.5 text-[9.5px] font-bold text-white shadow-glowv"
          >
            🖥️ Maya is presenting
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GraphQLPane({ sub, reduced }: { sub: number; reduced: boolean }) {
  const ran = reduced || sub >= 1;
  return (
    <div className="grid h-full grid-cols-2 max-sm:grid-cols-1">
      <div className="border-r border-hairline bg-[#111827] p-3.5 font-mono text-[10.5px] leading-relaxed">
        <div className="mb-2 flex items-center gap-2">
          <motion.span
            className="rounded-md bg-brand px-2 py-0.5 text-[9px] font-bold text-white"
            animate={!reduced && sub === 0 ? { scale: [1, 0.92, 1.06, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            ▶ Run
          </motion.span>
          <AnimatePresence>
            {ran && (
              <motion.span
                initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[8.5px] font-bold text-emerald-400"
              >
                200 · 88 ms
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="text-white/40">
          <span className="text-[#a5b4fc]">query</span> <span className="text-white/80">Boards</span> {"{"}<br />
          &nbsp;&nbsp;<span className="text-[#7cc7ff]">boards</span>(limit: <span className="text-amber-300">50</span>) {"{"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7cc7ff]">id name items_count</span><br />
          &nbsp;&nbsp;{"}"}<br />
          {"}"}
        </div>
      </div>
      <div className="relative p-3.5">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">Table {ran ? "· 42 rows" : ""}</div>
        <div className="overflow-hidden rounded-xl border border-hairline bg-white font-mono text-[10.5px]">
          <div className="grid grid-cols-[54px_1fr_44px] bg-mist px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-muted">
            <span>id</span><span>name</span><span>items</span>
          </div>
          {[["1234", "Marketing Plan", "183"], ["1235", "Sales Pipeline", "421"], ["1236", "Q1 Roadmap", "67"]].map(([a, b, c], i) => (
            <motion.div
              key={a}
              className="grid grid-cols-[54px_1fr_44px] border-t border-hairline px-2.5 py-1.5"
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={ran ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 26, delay: reduced ? 0 : 0.15 + i * 0.12 }}
            >
              <span>{a}</span>
              <span className="font-sans text-ink">{b}</span>
              <span>{c}</span>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {(reduced || sub >= 2) && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
              className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl border border-hairline bg-white px-3 py-2 shadow-lift"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-softmint text-[10px] text-emerald-600">✓</span>
              <span className="text-[10px] font-semibold text-ink">Exported 42 rows → CSV</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* floating context chips around the window — independent depth layer */
function FloatingBits({ px, py }: { px: any; py: any }) {
  const lx = useTransform(px, (v: number) => v * -14);
  const ly = useTransform(py, (v: number) => v * -10);
  const rx = useTransform(px, (v: number) => v * 18);
  const ry = useTransform(py, (v: number) => v * 12);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 hidden xl:block">
      <motion.div
        style={{ x: lx, y: ly }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-14 rounded-xl border border-hairline bg-white px-3 py-2 font-mono text-[10.5px] text-muted shadow-soft"
      >
        200 · <span className="text-emerald-600">88 ms</span>
      </motion.div>
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-36 top-28 flex items-center gap-1.5 rounded-xl border border-hairline bg-white px-3 py-2 text-[10.5px] font-semibold text-ink shadow-soft"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-softmint text-[9px] text-emerald-600">✓</span>
        142 rows imported
      </motion.div>
      <motion.div
        style={{ x: lx, y: ry }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-28 bottom-8 flex items-center gap-1.5 rounded-xl border border-hairline bg-white px-3 py-2 text-[10.5px] font-semibold text-muted shadow-soft"
      >
        <span className="pulse-dot-violet h-1.5 w-1.5 rounded-full bg-brand" /> live inside monday.com
      </motion.div>
    </div>
  );
}

const PANES = { inspector: InspectorPane, virtual: VirtualPane, graphql: GraphQLPane };

export default function BrowserMock() {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { amount: 0.25 });
  const [active, setActive] = useState(0);
  const [sub, setSub] = useState(-1);
  const [pressing, setPressing] = useState(false);

  // reduced motion: freeze at the fully-populated frame
  useEffect(() => {
    if (reduced) setSub(2);
  }, [reduced]);

  /* pointer tilt for the whole window */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 18 });
  const spy = useSpring(py, { stiffness: 60, damping: 18 });
  const rotX = useTransform(spy, (v) => v * -1.6);
  const rotY = useTransform(spx, (v) => v * 2.2);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, px, py]);

  /* sub-phase engine: 3 sub-steps per tab, then ⇧⇥ press & switch */
  useEffect(() => {
    if (reduced || !onScreen) return;
    const t = setInterval(() => {
      setSub((s) => {
        if (s >= 2) {
          setPressing(true);
          setTimeout(() => {
            setActive((a) => (a + 1) % TABS.length);
            setPressing(false);
          }, 240);
          return -1; // brief settle tick before sub 0
        }
        return s + 1;
      });
    }, TICK_MS);
    return () => clearInterval(t);
  }, [reduced, onScreen]);

  const Pane = PANES[TABS[active].id];
  const cursor = sub >= 0 ? CURSOR[active][sub] : null;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-4xl">
      {/* ambient glow layer */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -inset-10 -z-10 rounded-[48px]"
        style={{ background: "radial-gradient(52% 52% at 50% 46%, rgba(109,94,247,.14), transparent 70%)" }}
      />

      <FloatingBits px={spx} py={spy} />

      <div className="pointer-events-none absolute -top-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
        <kbd className={`key transition-all duration-150 ${pressing ? "pressed" : ""}`}>⇧ shift</kbd>
        <span className="text-[12px] font-semibold text-muted">+</span>
        <kbd className={`key transition-all duration-150 ${pressing ? "pressed" : ""}`}>⇥ tab</kbd>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 42, scale: 0.97 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, y: [0, -6, 0], scale: 1 }}
        transition={
          reduced
            ? undefined
            : { opacity: { duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }, scale: { duration: 0.9, delay: 0.55 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.6 } }
        }
        style={reduced ? undefined : { rotateX: rotX, rotateY: rotY, transformPerspective: 1400 }}
        className="overflow-hidden rounded-card border border-hairline bg-white shadow-lift"
      >
        <div className="flex items-end gap-1 border-b border-hairline bg-mist/80 px-3 pt-2.5">
          <div className="mb-2.5 mr-2 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF6159]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          {TABS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => { setActive(i); setSub(reduced ? 2 : 0); }}
              initial={reduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24, delay: reduced ? 0 : 0.7 + i * 0.16 }}
              className={`relative rounded-t-xl px-4 py-2 text-[12px] font-semibold transition-colors duration-150 ${i === active ? "text-ink" : "text-muted hover:text-ink"}`}
            >
              {i === active && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-t-xl border border-b-0 border-hairline bg-white"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.dot }} />
                {t.label}
              </span>
            </motion.button>
          ))}
        </div>

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

        <div className="relative h-[290px] overflow-hidden sm:h-[310px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={TABS[active].id}
              initial={reduced ? false : { opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -26 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Pane sub={Math.max(sub, 0)} reduced={reduced} />
            </motion.div>
          </AnimatePresence>

          {/* the performing cursor */}
          {!reduced && cursor && (
            <motion.div
              className="pointer-events-none absolute z-20"
              initial={{ left: "50%", top: "58%" }}
              animate={{ left: `${cursor.x}%`, top: `${cursor.y}%`, scale: cursor.click ? [1, 0.82, 1] : 1 }}
              transition={{ left: { type: "spring", stiffness: 90, damping: 17 }, top: { type: "spring", stiffness: 90, damping: 17 }, scale: { duration: 0.35, delay: 0.5 } }}
            >
              <svg width="21" height="21" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 2px 4px rgba(15,23,42,.4))" }}>
                <path d="M5 3l14 8-6.5 1.5L9 19 5 3z" fill="#111827" stroke="#fff" strokeWidth="1.4" />
              </svg>
              {cursor.click && (
                <motion.span
                  className="absolute -left-2 -top-2 h-8 w-8 rounded-full border-2 border-brand/60"
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1.25, opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.55, delay: 0.55 }}
                />
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
