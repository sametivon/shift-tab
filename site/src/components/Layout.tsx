import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import SkipLink from "@/components/SkipLink";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/sections/Footer";
import CommandPalette from "@/components/palette/CommandPalette";
import GhostKeys from "@/components/scene/GhostKeys";
import AmbientLayer from "@/components/three/AmbientLayer";

export default function Layout() {
  return (
    /* reducedMotion="user": transforms snap, opacity still fades. This is
       the single reduced-motion switch for all framer animation — render
       code must stay deterministic (see lib/motion.ts) so SSG hydration
       is byte-identical for every visitor. */
    <MotionConfig reducedMotion="user">
      <SkipLink />
      {/* ambient light: CSS mesh underlay always; WebGL blooms once idle */}
      <AmbientLayer />
      <SmoothScroll />
      <Nav />
      <main id="main" className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette />
      <GhostKeys />
    </MotionConfig>
  );
}
