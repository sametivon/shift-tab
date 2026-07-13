import { Outlet } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/sections/Footer";

export default function Layout() {
  return (
    <>
      {/* Drifting pastel mesh — pure CSS, robust everywhere, zero JS cost */}
      <div className="mesh-bg" aria-hidden />
      <SmoothScroll />
      <Nav />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
