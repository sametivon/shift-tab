import { useEffect } from "react";
import type { ReactNode } from "react";
import { sceneStore } from "@/lib/sceneStore";
import { getInputModality, installModalityTracker } from "@/lib/useInputModality";
import { scrollToEl } from "@/lib/lenis";

/* ─────────────────────────────────────────────────────────────────────
   ScenesRoot — global wiring for the scene system:
   • keyboard focus landing on a scene anchor travels the experience
     there (pointer clicks never trigger travel)
   • in-page anchor links (#id and /#id) resolve through the scene
     registry so every entry point shares the same eased travel
   ───────────────────────────────────────────────────────────────────── */

export default function ScenesRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    installModalityTracker();

    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.hasAttribute?.("data-scene-anchor")) return;
      if (getInputModality() !== "keyboard") return;
      const sceneEl = target.closest("[data-scene]");
      const id = sceneEl?.getAttribute("data-scene");
      if (id) sceneStore.travelTo(id);
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a[href^='#'], a[href^='/#']") as
        | HTMLAnchorElement
        | null;
      if (!a || e.defaultPrevented) return;
      const id = (a.getAttribute("href") ?? "").replace(/^\/?#/, "");
      if (!id) return;
      if (sceneStore.travelTo(id)) {
        e.preventDefault();
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        scrollToEl(el, { offset: -90 });
      }
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return <>{children}</>;
}
