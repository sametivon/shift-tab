import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   The tick engine behind every performed product stage (extracted from
   BrowserMock). One setInterval, `steps` sub-steps, loops forever while
   `running`. Callers gate `running` with useInView + scene-active so at
   most one stage performs at a time. Reduced motion: the engine never
   starts and the stage renders its populated final frame.
   ───────────────────────────────────────────────────────────────────── */

export function usePhaseEngine({
  steps,
  tickMs = 1100,
  running,
  onLoop,
}: {
  steps: number;
  tickMs?: number;
  running: boolean;
  onLoop?: () => void;
}): { step: number; final: boolean; reduced: boolean } {
  const reduced = useReducedMotionSafe();
  const [step, setStep] = useState(0);
  const onLoopRef = useRef(onLoop);
  onLoopRef.current = onLoop;

  useEffect(() => {
    if (reduced || !running) return;
    const t = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % steps;
        if (next === 0) onLoopRef.current?.();
        return next;
      });
    }, tickMs);
    return () => clearInterval(t);
  }, [running, reduced, steps, tickMs]);

  if (reduced) return { step: steps - 1, final: true, reduced };
  return { step, final: step === steps - 1, reduced };
}
