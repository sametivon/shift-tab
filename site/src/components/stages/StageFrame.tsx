import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────
   Shared theater chrome for the performed product stages: a window
   frame (traffic lights + host bar), an accent glow bleeding out
   behind it, and a mono product label riding the top edge. The stage
   itself (children) is a fixed-height canvas the scripted cursor and
   phase engine perform inside.
   ───────────────────────────────────────────────────────────────────── */
export default function StageFrame({
  host,
  label,
  accent,
  dark = false,
  children,
}: {
  host: string;
  label: string;
  accent: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[44px]"
        style={{ background: `radial-gradient(56% 56% at 50% 46%, ${accent}24, transparent 70%)` }}
      />
      {/* mono product label riding the frame */}
      <span
        className={`absolute -top-3 left-5 z-10 rounded-lg border px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-wide ${
          dark ? "border-white/15 bg-ink text-white/80" : "border-hairline bg-white text-muted"
        }`}
        style={{ boxShadow: `0 6px 20px -8px ${accent}66` }}
      >
        <span style={{ color: accent }}>●</span> {label}
      </span>

      <div
        className={`overflow-hidden rounded-card border shadow-lift ${
          dark ? "border-white/10 bg-[#0d1322]" : "border-hairline bg-white"
        }`}
      >
        <div
          className={`flex items-center gap-2 border-b px-3.5 py-2.5 ${
            dark ? "border-white/10 bg-white/[.04]" : "border-hairline bg-mist/80"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF6159]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </span>
          <span
            className={`ml-2 flex-1 truncate rounded-lg px-3 py-1 font-mono text-[10.5px] ${
              dark ? "bg-white/[.06] text-white/50" : "bg-white text-muted"
            }`}
          >
            🔒 {host}
          </span>
        </div>
        <div className="relative h-[340px] overflow-hidden sm:h-[380px]">{children}</div>
      </div>
    </div>
  );
}
