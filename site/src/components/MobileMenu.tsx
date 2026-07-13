import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { spring, stagger, revealUp, useReducedMotionSafe } from "@/lib/motion";
import { navLinks } from "@/lib/navLinks";

/* Mobile navigation — the pill nav hides its links below md with no
   alternative, so this restores navigation on phones: a hamburger that
   morphs to ✕ and a full-screen sheet of oversized links. */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotionSafe();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll while the sheet is open; Escape closes and returns focus.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] flex h-9 w-9 items-center justify-center rounded-full"
      >
        <span className="relative block h-3" style={{ width: 18 }}>
          <motion.span
            className="absolute left-0 top-0 block h-[2px] w-full rounded-full bg-ink"
            animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={spring}
          />
          <motion.span
            className="absolute bottom-0 left-0 block h-[2px] w-full rounded-full bg-ink"
            animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={spring}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-paper/95 px-7 pb-10 pt-28 backdrop-blur-xl"
          >
            <motion.nav
              variants={stagger(0.06, 0.08)}
              initial={reduced ? false : "hidden"}
              animate="show"
              className="flex flex-col gap-1"
              aria-label="Site"
            >
              {navLinks.map((l) => (
                <motion.a
                  key={l.href}
                  variants={revealUp}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl py-3 font-display text-[32px] font-extrabold tracking-tightest text-ink"
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.nav>
            <motion.a
              variants={revealUp}
              initial={reduced ? false : "hidden"}
              animate="show"
              transition={{ delay: 0.3 }}
              href="/#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 text-[15px] font-semibold text-white"
            >
              Start a project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
