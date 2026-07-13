import { useEffect, useState } from "react";
import type { Variants, Transition } from "framer-motion";

/**
 * Synchronous reduced-motion check — for EFFECT/CALLBACK time only
 * (timers, scroll behavior, pointer listeners). NEVER call this during
 * render: the SSG server always answers false, so any render output
 * derived from it breaks hydration for reduced-motion users (React
 * then throws the whole prerender away — this was a real bug on the
 * live site). For render-time branching use useReducedMotionSafe().
 */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Hydration-safe reduced-motion hook for render-time branching.
 * First client render always matches the server (false); the true
 * preference lands in a post-mount re-render. Components that freeze
 * timers/engines re-render into their populated final frame one frame
 * after hydration — invisible to the user, and the prerender survives.
 */
export function useReducedMotionSafe() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Returns the `initial` prop for an entrance animation. This is now a
 * pure passthrough: reduced-motion handling lives in the root
 * <MotionConfig reducedMotion="user"> (transforms snap, opacity still
 * fades — elements always become visible, nothing strands hidden), and
 * keeping the render deterministic keeps hydration clean.
 */
export function useEntrance() {
  return (hidden: unknown) => hidden as never;
}

// Shared spring — organic, weighty, never abrupt.
export const spring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 18,
  mass: 1,
};

// Reveal: fade upward with a soft blur reduction. The signature entrance.
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// Stagger container for headline lines / lists.
export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

// A single masked line that rises into view.
export const maskLine: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

// Scale-in for cards / panels.
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 18 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Standard viewport config so sections animate once, a touch before entry.
export const inView = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -12% 0px",
} as const;
