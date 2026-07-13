import { Outlet } from "react-router-dom";
import SkipLink from "@/components/SkipLink";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/sections/Footer";

export default function Layout() {
  return (
    <>
      <SkipLink />
      {/* Drifting pastel mesh — pure CSS, robust everywhere, zero JS cost */}
      <div className="mesh-bg" aria-hidden />
      <SmoothScroll />
      <Nav />
      <main id="main" className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
