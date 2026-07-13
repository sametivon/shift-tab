import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useScroll } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/motion";
import { nextSceneOrder, sceneStore, useSceneActive } from "@/lib/sceneStore";
import SceneAnchor from "@/components/scene/SceneAnchor";

/* ─────────────────────────────────────────────────────────────────────
   Scene — one act of the continuous experience.
   • Registers itself with the scene store (effects only → SSG renders a
     plain semantic <section>).
   • pin: wraps children in a sticky 100svh viewport inside a tall track,
     handing children a scroll-scrub progress MotionValue.
   • Reduced motion (or coarse pointers via `pinQuery`): the pin
     collapses to natural flow and children render their populated state.
   ───────────────────────────────────────────────────────────────────── */

export type SceneCtx = {
  /** 0→1 through the scene's track ("start start" → "end end") */
  progress: MotionValue<number>;
  /** this scene currently owns the viewport */
  active: boolean;
  reduced: boolean;
  /** false when the pin collapsed (reduced motion) or pin was never requested */
  pinned: boolean;
};

type SceneProps = {
  id: string;
  label: string;
  accent: string;
  pin?: boolean;
  /** pinned track height in viewport multiples */
  length?: number;
  legacyIds?: string[];
  travelOffset?: number;
  className?: string;
  children: ReactNode | ((ctx: SceneCtx) => ReactNode);
};

export default function Scene({
  id,
  label,
  accent,
  pin = false,
  length = 3,
  legacyIds = [],
  travelOffset = 0,
  className = "",
  children,
}: SceneProps) {
  const ref = useRef<HTMLElement>(null);
  // hydration-safe: first client render matches the server (not reduced);
  // pinned scenes unpin in a post-mount re-render for reduced-motion users
  const reduced = useReducedMotionSafe();
  const active = useSceneActive(id);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unregister = sceneStore.register({
      id,
      label,
      accent,
      el,
      order: nextSceneOrder(),
      legacyIds,
      travelOffset,
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) sceneStore.setActive(id);
      },
      // a scene is "active" when it crosses the middle band of the viewport
      { rootMargin: "-45% 0px -45% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const pinned = pin && !reduced;
  const ctx: SceneCtx = { progress: scrollYProgress, active, reduced, pinned };
  const body = typeof children === "function" ? children(ctx) : children;

  return (
    <section
      id={id}
      ref={ref}
      data-scene={id}
      className={`relative ${className}`}
      style={pinned ? { height: `calc(${length} * 100svh)` } : undefined}
    >
      {/* legacy anchors (/#products …) keep inbound links working */}
      {legacyIds.map((lid) => (
        <span key={lid} id={lid} className="absolute top-0" aria-hidden />
      ))}
      <SceneAnchor id={id} label={label} accent={accent} />
      {pinned ? <div className="sticky top-0 h-[100svh] overflow-hidden">{body}</div> : body}
    </section>
  );
}
