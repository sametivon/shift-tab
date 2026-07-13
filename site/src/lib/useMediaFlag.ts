import { useEffect, useState } from "react";

/* Hydration-safe media query flag: first client render always matches
   the server (false); the real answer lands in a post-mount re-render.
   Use for render-time branching on (pointer: coarse), viewport, etc. */
export function useMediaFlag(query: string) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setOn(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setOn(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return on;
}
