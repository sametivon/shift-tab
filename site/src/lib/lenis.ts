import type Lenis from "lenis";

/* The live Lenis instance, registered by <SmoothScroll/> after its dynamic
   import resolves. null during SSR, under reduced motion, and before load —
   every consumer must fall back to native scrolling. */
export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToEl(
  el: HTMLElement,
  opts: { offset?: number; duration?: number; immediate?: boolean } = {}
) {
  const lenis = lenisRef.current;
  if (lenis && !opts.immediate) {
    lenis.scrollTo(el, { offset: opts.offset ?? 0, duration: opts.duration ?? 1.15 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + (opts.offset ?? 0);
    window.scrollTo({ top, behavior: opts.immediate ? "auto" : "smooth" });
  }
}
