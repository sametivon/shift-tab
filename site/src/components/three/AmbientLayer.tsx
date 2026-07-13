import { lazy, Suspense, useState } from "react";
import { ClientOnly } from "vite-react-ssg";
import { useReducedMotionSafe } from "@/lib/motion";
import { useIdleMounted } from "@/lib/useIdleMounted";

/* ─────────────────────────────────────────────────────────────────────
   The ambient light layer. The CSS mesh gradient (.mesh-bg) is the
   PERMANENT underlay — SSR paints it instantly, and it remains the
   whole story for reduced motion, pre-idle, and any WebGL failure.
   Once the page is idle, the lazy R3F canvas fades in on top: drifting
   blooms tinted by the active scene's accent, bent around the cursor.
   The three/R3F chunk never enters the SSG bundle (ClientOnly + lazy),
   and a lost WebGL context unmounts the canvas invisibly.
   ───────────────────────────────────────────────────────────────────── */
const AmbientCanvas = lazy(() => import("@/components/three/AmbientCanvas"));

export default function AmbientLayer() {
  const reduced = useReducedMotionSafe();
  const idle = useIdleMounted();
  const [dead, setDead] = useState(false);
  const live = idle && !reduced && !dead;

  return (
    <div aria-hidden className={`mesh-bg ${live ? "canvas-live" : ""}`}>
      <ClientOnly>
        {() =>
          live ? (
            <Suspense fallback={null}>
              <AmbientCanvas onDead={() => setDead(true)} />
            </Suspense>
          ) : null
        }
      </ClientOnly>
    </div>
  );
}
