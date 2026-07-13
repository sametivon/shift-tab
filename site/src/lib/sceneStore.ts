import { useSyncExternalStore } from "react";
import { scrollToEl } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   Scene registry — the spine of the continuous experience.
   Scenes register themselves on mount (effects only, so the SSG render
   stays a plain semantic document). The registry powers:
   • the nav scroll-spy and command palette targets
   • focus-driven travel (Tab/Shift+Tab through scene anchors)
   • the ambient layer's accent color
   Plain module store + useSyncExternalStore — deliberately not zustand,
   which is only a transitive dep of the lazy 3D chunk.
   ───────────────────────────────────────────────────────────────────── */

export type SceneMeta = {
  id: string;
  label: string;
  accent: string;
  el: HTMLElement;
  order: number;
  /** ids of legacy anchors (/#products …) that resolve to this scene */
  legacyIds: string[];
  /** px offset applied when travelling here (legacy padded sections want ~-80) */
  travelOffset: number;
};

let scenes: SceneMeta[] = [];
let activeId = "";
let snapshot = { scenes, activeId };
let orderSeq = 0;
const listeners = new Set<() => void>();

function emit() {
  snapshot = { scenes, activeId };
  listeners.forEach((l) => l());
}

export function nextSceneOrder() {
  return orderSeq++;
}

export const sceneStore = {
  register(meta: SceneMeta) {
    scenes = [...scenes.filter((s) => s.id !== meta.id), meta].sort((a, b) => a.order - b.order);
    emit();
    return () => {
      scenes = scenes.filter((s) => s !== meta);
      emit();
    };
  },

  setActive(id: string) {
    if (activeId !== id) {
      activeId = id;
      emit();
    }
  },

  /** Resolve a scene by its id or one of its legacy anchor ids. */
  resolve(id: string): SceneMeta | undefined {
    return scenes.find((s) => s.id === id || s.legacyIds.includes(id));
  },

  travelTo(id: string, opts: { focus?: boolean } = {}) {
    const scene = sceneStore.resolve(id);
    if (!scene) return false;
    scrollToEl(scene.el, {
      offset: scene.travelOffset,
      immediate: prefersReducedMotion(),
    });
    if (opts.focus) {
      const anchor = scene.el.querySelector<HTMLElement>("[data-scene-anchor]");
      anchor?.focus({ preventScroll: true });
    }
    return true;
  },

  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },

  getSnapshot() {
    return snapshot;
  },
};

const serverSnapshot: { scenes: SceneMeta[]; activeId: string } = { scenes: [], activeId: "" };

export function useScenes() {
  return useSyncExternalStore(sceneStore.subscribe, sceneStore.getSnapshot, () => serverSnapshot);
}

export function useSceneActive(id: string) {
  return useScenes().activeId === id;
}
