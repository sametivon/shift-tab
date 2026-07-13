import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { spring } from "@/lib/motion";

const links = [
  { label: "Products", href: "/#products" },
  { label: "Principles", href: "/#principles" },
  { label: "Inspector", href: "/products/extension" },
  { label: "MondayVirtual", href: "/products/mondayvirtual" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 16));

  return (
    <motion.header
      initial={reduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...spring, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4"
    >
      <motion.nav
        animate={{
          marginTop: scrolled ? 10 : 18,
          paddingTop: scrolled ? 8 : 11,
          paddingBottom: scrolled ? 8 : 11,
          width: scrolled ? "min(840px, 96%)" : "min(1020px, 98%)",
        }}
        transition={spring}
        className="glass flex items-center justify-between gap-6 rounded-full px-4 sm:px-5"
      >
        <a href="/" className="group flex items-center gap-2.5 pl-1">
          <motion.img
            src="/logo.svg"
            alt=""
            className="h-7 w-7 rounded-lg"
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={spring}
          />
          <span className="whitespace-nowrap font-display text-[16px] font-extrabold tracking-tight text-ink">
            shift<span className="text-brand-indigo">-tab</span>
          </span>
        </a>

        <div
          className="relative hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHover(null)}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHover(l.href)}
              className="relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-muted transition-colors hover:text-ink"
            >
              {hover === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-white/70"
                  transition={spring}
                />
              )}
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="/#products"
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-[13.5px] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(33,28,41,.5)] transition-shadow hover:shadow-[0_10px_26px_-8px_rgba(33,28,41,.55)]"

        >
          Explore products
        </a>
      </motion.nav>
    </motion.header>
  );
}
