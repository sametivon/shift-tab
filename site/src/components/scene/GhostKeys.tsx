import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/motion";
import { useMediaFlag } from "@/lib/useMediaFlag";

/* ─────────────────────────────────────────────────────────────────────
   The ghost keycaps — the brand gesture teaching itself.
   A ⇧⇥ pair floats in the corner and "presses itself" every ~14s.
   Retires forever (localStorage) the moment the visitor actually
   presses Tab. Never mounts for reduced motion or touch devices.
   ───────────────────────────────────────────────────────────────────── */

const DONE_KEY = "st-ghostkeys-done";

export default function GhostKeys() {
  const reduced = useReducedMotionSafe();
  const coarse = useMediaFlag("(pointer: coarse)");
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDismissed(localStorage.getItem(DONE_KEY) === "1");
  }, []);

  // the visitor knows the gesture — retire the teacher
  useEffect(() => {
    if (dismissed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        localStorage.setItem(DONE_KEY, "1");
        setDismissed(true);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [dismissed]);

  // self-pressing loop
  useEffect(() => {
    if (dismissed || reduced || coarse || !mounted) return;
    let press: ReturnType<typeof setTimeout>;
    const loop = setInterval(() => {
      if (document.hidden) return;
      setPressing(true);
      press = setTimeout(() => setPressing(false), 700);
    }, 14000);
    return () => {
      clearInterval(loop);
      clearTimeout(press);
    };
  }, [dismissed, reduced, coarse, mounted]);

  if (!mounted || dismissed || reduced || coarse) return null;

  return (
    <AnimatePresence>
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-center gap-1.5"
      >
        <div className="flex items-center gap-1">
          <kbd className={`key !text-[11px] transition-all duration-150 ${pressing ? "pressed" : ""}`}>⇧</kbd>
          <kbd className={`key !text-[11px] transition-all duration-150 ${pressing ? "pressed" : ""}`}>⇥</kbd>
        </div>
        <motion.span
          className="font-mono text-[9.5px] font-semibold text-muted/80"
          animate={{ opacity: pressing ? 1 : 0.55 }}
        >
          travels the scenes
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
}
