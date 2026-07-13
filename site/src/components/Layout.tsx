import { Outlet } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import SkipLink from "@/components/SkipLink";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/sections/Footer";

export default function Layout() {
  return (
    /* reducedMotion="user": transforms snap, opacity still fades. This is
       the single reduced-motion switch for all framer animation — render
       code must stay deterministic (see lib/motion.ts) so SSG hydration
       is byte-identical for every visitor. */
    <MotionConfig reducedMotion="user">
      <SkipLink />
      {/* Drifting pastel mesh — pure CSS, robust everywhere, zero JS cost */}
      <div className="mesh-bg" aria-hidden />
      <SmoothScroll />
      <Nav />
      <main id="main" className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </MotionConfig>
  );
}
