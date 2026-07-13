import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * A soft violet light that follows the cursor across the whole page —
 * one of the depth layers. Pointer-fine devices only; skipped entirely
 * under reduced motion. Transform-only (cheap).
 */
export default function CursorGlow() {
  const [on, setOn] = useState(false);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 45, damping: 16, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 45, damping: 16, mass: 0.7 });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!on) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-[6] h-[600px] w-[600px] rounded-full"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(109,94,247,.07) 0%, rgba(109,94,247,.03) 40%, transparent 70%)",
      }}
    />
  );
}
