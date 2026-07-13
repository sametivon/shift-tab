import { useEffect } from "react";
import { lenisRef } from "@/lib/lenis";

/**
 * Buttery smooth scrolling via Lenis. Lenis is dynamically imported so it
 * stays out of the SSG/Node bundle. Disabled under reduced motion.
 * The instance is published to lib/lenis so scene travel (focus anchors,
 * palette, in-page links — handled by ScenesRoot) rides the same easing.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let destroy = () => {};

    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 0.85,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      destroy = () => {
        cancelAnimationFrame(raf);
        lenisRef.current = null;
        lenis.destroy();
      };
    });

    return () => destroy();
  }, []);

  return null;
}
