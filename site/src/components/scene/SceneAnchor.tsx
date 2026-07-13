import { sceneStore } from "@/lib/sceneStore";

/* The travel stop for a scene. A real link, first in the scene's tab
   order — invisible to pointer users, but when keyboard focus lands on
   it the experience travels here and a keycap-styled chip appears.
   This is what makes Tab / Shift+Tab the site's brand gesture without
   breaking native focus semantics. */
export default function SceneAnchor({
  id,
  label,
  accent,
}: {
  id: string;
  label: string;
  accent: string;
}) {
  return (
    <a
      href={`#${id}`}
      data-scene-anchor
      onClick={(e) => {
        e.preventDefault();
        sceneStore.travelTo(id);
      }}
      className="scene-anchor absolute left-5 top-24 z-30 -translate-y-2 rounded-xl border border-hairline bg-white/90 px-3 py-1.5 font-mono text-[11.5px] font-semibold text-ink opacity-0 shadow-soft backdrop-blur transition-[opacity,transform] duration-250 ease-smooth focus-visible:translate-y-0 focus-visible:opacity-100"
      style={{ outlineColor: accent }}
    >
      <span className="mr-1.5" style={{ color: accent }}>
        ⇥
      </span>
      {label}
    </a>
  );
}
