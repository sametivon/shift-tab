import { AnimatePresence, motion } from "framer-motion";
import { usePhaseEngine } from "@/lib/usePhaseEngine";
import PerformedCursor, { type Waypoint } from "@/components/stages/PerformedCursor";

/* ─────────────────────────────────────────────────────────────────────
   Monday Inspector performs itself — 7 acts, one loop (~7.7s):
   0 schema loads (rows sweep)      4 result rows stream in
   1 column id copied               5 Import CSV clicked
   2 GraphQL writes itself          6 142 rows imported · toast
   3 ▶ Run → 200 · 88 ms
   All flows mirror the real extension (schema x-ray, query workspace,
   subitem importer with batch progress).
   ───────────────────────────────────────────────────────────────────── */

const CURSOR: (Waypoint | null)[] = [
  { x: 22, y: 30 },
  { x: 43, y: 22, click: true }, // copy id chip
  { x: 56, y: 30 },
  { x: 54, y: 16, click: true }, // ▶ Run
  { x: 80, y: 40 },
  { x: 24, y: 88, click: true }, // Import CSV chip
  { x: 62, y: 82 },
];

const QUERY_LINES = [
  [<span key="q"><span className="text-[#a5b4fc]">query</span> <span className="text-white/80">Boards</span> {"{"}</span>, 0],
  [<span key="b">&nbsp;&nbsp;<span className="text-[#7cc7ff]">boards</span>(limit: <span className="text-amber-300">50</span>) {"{"}</span>, 0],
  [<span key="f">&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#7cc7ff]">id name items_count</span></span>, 1],
  [<span key="c1">&nbsp;&nbsp;{"}"}</span>, 1],
  [<span key="c2">{"}"}</span>, 1],
] as const;

export default function InspectorStage({ running }: { running: boolean }) {
  const { step, reduced } = usePhaseEngine({ steps: 7, running });
  const copied = reduced || step >= 1;
  const typed = reduced ? 2 : step >= 3 ? 2 : step === 2 ? 1 : 0; // query reveal stage
  const ran = reduced || step >= 3;
  const rows = reduced || step >= 4;
  const importing = !reduced && step === 5;
  const imported = reduced || step >= 6;

  return (
    <div className="grid h-full grid-cols-[132px_1fr_1fr] max-md:grid-cols-[1fr_1fr] font-sans">
      {/* sidebar */}
      <div className="border-r border-hairline bg-mist/60 p-3 max-md:hidden">
        {["Schema", "Items", "Import", "Query"].map((t, i) => (
          <div
            key={t}
            className={`mb-1 rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${
              i === 0 ? "bg-surface font-semibold text-ink" : "text-muted"
            }`}
          >
            {t}
          </div>
        ))}
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-softmint px-2 py-1.5 text-[9px] font-semibold text-emerald-600">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" /> Connected
        </div>
      </div>

      {/* schema panel */}
      <div className="relative border-r border-hairline p-3.5">
        <div className="mb-2 flex items-center gap-2 text-[11px]">
          <span className="font-semibold text-ink">Board schema</span>
          <motion.span
            className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold"
            animate={
              copied
                ? { backgroundColor: "#E4F7EF", color: "#0DA271", scale: [1, 1.12, 1] }
                : { backgroundColor: "#F1F1F3", color: "#5B6472" }
            }
            transition={{ duration: 0.3 }}
          >
            {copied ? "✓ id copied" : "copy id"}
          </motion.span>
        </div>
        <div className="overflow-hidden rounded-xl border border-hairline bg-white font-mono text-[10.5px]">
          <div className="grid grid-cols-[1fr_74px] bg-mist px-2.5 py-1.5 text-[8.5px] font-bold uppercase tracking-wider text-muted">
            <span>Column</span>
            <span>id</span>
          </div>
          {[
            ["Status", "status"],
            ["Owner", "person"],
            ["Due date", "date4"],
            ["Timeline", "timeline"],
            ["Budget", "numbers"],
          ].map(([a, b], i) => (
            <motion.div
              key={a}
              className="grid grid-cols-[1fr_74px] border-t border-hairline px-2.5 py-1.5"
              animate={{
                backgroundColor: (reduced ? i === 1 : i === step % 5) ? "rgba(239,237,254,.8)" : "rgba(255,255,255,0)",
              }}
              transition={{ duration: 0.35 }}
            >
              <span className="font-sans font-semibold text-ink">{a}</span>
              <span className="text-brand">{b}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {["⇪ Import CSV", "⬇ Export"].map((a) => (
            <span
              key={a}
              className="rounded-lg border border-hairline bg-mist/70 px-2.5 py-1.5 text-[9.5px] font-semibold text-muted"
            >
              {a}
            </span>
          ))}
        </div>

        {/* import progress — the feature monday never shipped */}
        <AnimatePresence>
          {(importing || imported) && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="absolute inset-x-3.5 bottom-3 rounded-xl border border-hairline bg-white p-2.5 shadow-soft"
            >
              <div className="flex items-center justify-between text-[9.5px] font-semibold">
                <span className="text-ink">subitems.xlsx</span>
                <span className={imported ? "text-emerald-600" : "text-muted"}>
                  {imported ? "✓ 142 rows · 0 failed" : "batch 3/5 · parents first"}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist">
                <motion.div
                  className="h-full rounded-full bg-emerald-500"
                  initial={reduced ? { width: "100%" } : { width: "12%" }}
                  animate={{ width: imported ? "100%" : "62%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* GraphQL workspace */}
      <div className="grid grid-rows-[auto_1fr]">
        <div className="border-b border-hairline bg-[#111827] p-3 font-mono text-[10.5px] leading-relaxed">
          <div className="mb-1.5 flex items-center gap-2">
            <motion.span
              className="rounded-md bg-brand px-2 py-0.5 text-[9px] font-bold text-white"
              animate={!reduced && step === 3 ? { scale: [1, 0.92, 1.06, 1] } : { scale: 1 }}
              transition={{ duration: 0.5 }}
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
            {QUERY_LINES.map(([node, stage], i) => (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: typed >= (stage as number) + 1 || (typed === 1 && stage === 0) ? 1 : 0.08 }}
                transition={{ duration: 0.25, delay: i * 0.07 }}
              >
                {node}
              </motion.div>
            ))}
            <span className="inline-block h-3 w-[6px] animate-pulse bg-white/50 align-middle" />
          </div>
        </div>
        <div className="relative p-3">
          <div className="mb-1.5 text-[9.5px] font-bold uppercase tracking-wider text-muted">
            Table {rows ? "· 42 rows" : ""}
          </div>
          <div className="overflow-hidden rounded-xl border border-hairline bg-white font-mono text-[10px]">
            <div className="grid grid-cols-[44px_1fr_38px] bg-mist px-2.5 py-1.5 text-[8.5px] font-bold uppercase tracking-wider text-muted">
              <span>id</span>
              <span>name</span>
              <span>items</span>
            </div>
            {[
              ["1234", "Marketing Plan", "183"],
              ["1235", "Sales Pipeline", "421"],
              ["1236", "Q1 Roadmap", "67"],
            ].map(([a, b, c], i) => (
              <motion.div
                key={a}
                className="grid grid-cols-[44px_1fr_38px] border-t border-hairline px-2.5 py-1.5"
                initial={reduced ? false : { opacity: 0, x: -10 }}
                animate={rows ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 26, delay: reduced ? 0 : 0.12 + i * 0.12 }}
              >
                <span>{a}</span>
                <span className="font-sans text-ink">{b}</span>
                <span>{c}</span>
              </motion.div>
            ))}
          </div>
          <AnimatePresence>
            {imported && (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl border border-hairline bg-white px-3 py-2 shadow-lift"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-softmint text-[10px] text-emerald-600">✓</span>
                <span className="text-[10px] font-semibold text-ink">142 rows imported</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!reduced && running && <PerformedCursor waypoint={CURSOR[step]} />}
    </div>
  );
}
