import { useEffect, useState } from "react";

/* True only after window load + an idle callback — the gate for the
   WebGL chunk so it never competes with LCP/TBT. */
export function useIdleMounted() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    const go = () => {
      if (!cancelled) setReady(true);
    };
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = (window as any).requestIdleCallback(go, { timeout: 3000 });
      } else {
        setTimeout(go, 1200);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      if (idleId !== undefined) (window as any).cancelIdleCallback?.(idleId);
    };
  }, []);
  return ready;
}
