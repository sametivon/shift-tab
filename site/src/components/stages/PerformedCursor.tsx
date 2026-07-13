import { motion } from "framer-motion";

export type Waypoint = { x: number; y: number; click?: boolean };

/* The scripted cursor that performs a stage (extracted from BrowserMock).
   Springs between waypoints given in % of the stage canvas; `click`
   dips the cursor and emits a ripple. Render nothing when waypoint is
   null (idle) or under reduced motion. */
export default function PerformedCursor({ waypoint }: { waypoint: Waypoint | null }) {
  if (!waypoint) return null;
  return (
    <motion.div
      className="pointer-events-none absolute z-20"
      initial={{ left: "50%", top: "58%" }}
      animate={{
        left: `${waypoint.x}%`,
        top: `${waypoint.y}%`,
        scale: waypoint.click ? [1, 0.82, 1] : 1,
      }}
      transition={{
        left: { type: "spring", stiffness: 90, damping: 17 },
        top: { type: "spring", stiffness: 90, damping: 17 },
        scale: { duration: 0.35, delay: 0.5 },
      }}
    >
      <svg width="21" height="21" viewBox="0 0 24 24" style={{ filter: "drop-shadow(0 2px 4px rgba(15,23,42,.4))" }}>
        <path d="M5 3l14 8-6.5 1.5L9 19 5 3z" fill="#111827" stroke="#fff" strokeWidth="1.4" />
      </svg>
      {waypoint.click && (
        <motion.span
          className="absolute -left-2 -top-2 h-8 w-8 rounded-full border-2 border-brand/60"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1.25, opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.55, delay: 0.55 }}
        />
      )}
    </motion.div>
  );
}
