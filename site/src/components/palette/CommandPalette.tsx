import { useEffect, useMemo, useRef, useState } from "react";
import { useScenes } from "@/lib/sceneStore";
import { fuzzyScore } from "@/lib/fuzzy";
import { buildCommands, type Command } from "@/components/palette/commands";

/* ─────────────────────────────────────────────────────────────────────
   ⌘K — the palette IS the navigation.
   Native <dialog> + showModal(): free backdrop, free Escape, the rest
   of the page goes inert, and focus restores on close. Combobox/listbox
   ARIA: focus stays in the input, arrows move aria-activedescendant.
   Opens via ⌘K / Ctrl+K anywhere, or the "st:palette" event (nav pill).
   No cmdk — ~200 lines, zero deps.
   ───────────────────────────────────────────────────────────────────── */

export function openPalette() {
  window.dispatchEvent(new CustomEvent("st:palette"));
}

export default function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [hi, setHi] = useState(0);
  const { scenes } = useScenes();

  const commands = useMemo(() => buildCommands(scenes), [scenes]);

  const results = useMemo(() => {
    if (!query.trim()) return commands;
    return commands
      .map((c) => ({ c, s: fuzzyScore(query, `${c.title} ${c.keywords ?? ""} ${c.hint ?? ""}`) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((r) => r.c);
  }, [commands, query]);

  const open = () => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setQuery("");
    setHi(0);
    d.showModal();
    inputRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dialogRef.current?.open ? close() : open();
      }
    };
    const onOpenEvent = () => open();
    window.addEventListener("keydown", onKey);
    window.addEventListener("st:palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("st:palette", onOpenEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const run = (c: Command) => c.run({ close });

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = results[hi];
      if (c) run(c);
    }
  };

  /* group headers in display order */
  let lastGroup: string | null = null;

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        // click on the backdrop (the dialog element itself) closes
        if (e.target === dialogRef.current) close();
      }}
      className="st-palette m-0 mx-auto mt-[12vh] w-[min(560px,92vw)] rounded-card border border-hairline bg-transparent p-0 shadow-lift backdrop:bg-ink/30 backdrop:backdrop-blur-[3px]"
      aria-label="Command palette"
    >
      <div className="glass overflow-hidden rounded-card">
        <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-muted" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.4" />
            <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls="st-palette-list"
            aria-activedescendant={results[hi] ? `cmd-${results[hi].id}` : undefined}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHi(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Where to? Try “work”, “lab”, “start a project”…"
            className="min-w-0 flex-1 bg-transparent font-mono text-[14.5px] text-ink outline-none placeholder:text-muted/70"
          />
          <kbd className="key !px-2 !py-1 !text-[11px]">esc</kbd>
        </div>

        <ul id="st-palette-list" role="listbox" aria-label="Commands" className="max-h-[46vh] overflow-y-auto p-2.5">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center font-mono text-[12.5px] text-muted">
              nothing found — try “products” or “contact”
            </li>
          )}
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <li key={c.id} role="presentation">
                {header && (
                  <div className="px-3 pb-1 pt-2.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-muted/70">
                    {header}
                  </div>
                )}
                <div
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === hi}
                  onPointerMove={() => setHi(i)}
                  onClick={() => run(c)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ${
                    i === hi ? "bg-surface" : ""
                  }`}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: c.dot ?? "#CBD5E1" }}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-[13.5px] font-semibold ${i === hi ? "text-ink" : "text-muted"}`}>
                      {c.title}
                    </span>
                    {c.hint && <span className="block truncate text-[11.5px] text-muted/80">{c.hint}</span>}
                  </span>
                  {i === hi && <kbd className="key !px-2 !py-0.5 !text-[10.5px]">↵</kbd>}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 border-t border-hairline bg-mist/60 px-5 py-2.5 font-mono text-[10.5px] text-muted">
          <span>↑↓ move</span>
          <span>↵ go</span>
          <span className="ml-auto">⇥ travels the scenes too</span>
        </div>
      </div>
    </dialog>
  );
}
