import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "accent";
  className?: string;
  strength?: number;
};

/**
 * Magnetic pill button in the warm-editorial identity:
 * primary = ink, ghost = white glass, accent = violet.
 */
export default function MagneticButton({
  children,
  href = "#",
  variant = "primary",
  className = "",
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold select-none px-6 py-3 text-[15px] transition-shadow";
  const styles =
    variant === "primary"
      ? "bg-ink text-white shadow-[0_6px_22px_-8px_rgba(33,28,41,.5)] hover:shadow-[0_12px_30px_-10px_rgba(33,28,41,.55)]"
      : variant === "accent"
        ? "text-white shadow-[0_8px_26px_-8px_rgba(108,92,231,.6)]"
        : "glass text-ink hover:bg-white/85";

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${styles} ${className}`}
    >
      {variant === "accent" && (
        <span
          className="absolute inset-0 -z-10 rounded-full"
          style={{ background: "linear-gradient(120deg, #6c5ce7 0%, #4a3fbe 100%)" }}
        />
      )}
      {children}
    </motion.a>
  );
}
