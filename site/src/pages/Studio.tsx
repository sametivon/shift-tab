import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import Counter from "@/components/Counter";
import { revealUp, stagger, inView, useEntrance } from "@/lib/motion";

/* ─────────────────────────────────────────────────────────────────────
   /studio — the manifesto page. Who's behind the products, why the
   studio exists, how it works. Long-form, typographic, no cards where
   a sentence will do.
   ───────────────────────────────────────────────────────────────────── */

const PROCESS = [
  { n: "01", t: "Discover", d: "A working session, not a discovery phase. We map the highest-leverage build in days." },
  { n: "02", t: "Design", d: "A prototype you can click — motion, states and edge cases included." },
  { n: "03", t: "Build", d: "AI-accelerated, human-finished. Short cycles, visible progress, no black box." },
  { n: "04", t: "Run", d: "Ship, measure, iterate. We stay accountable after launch." },
];

const BELIEFS = [
  {
    t: "Products, not projects",
    d: "We ship and maintain our own software. Client work is held to the same bar — published-product quality, not deliverable quality.",
  },
  {
    t: "The last 2%",
    d: "Empty states, error copy, the way a window settles. The difference between software people use and software people remember lives there.",
  },
  {
    t: "Shortcuts respected",
    d: "Tools for people who know their shortcuts: keyboard-first, fast by default, nothing between intent and action.",
  },
];

export default function Studio() {
  const entrance = useEntrance();
  return (
    <>
      <Head>
        <title>The studio — shift-tab | AI software studio</title>
        <meta
          name="description"
          content="shift-tab lab is an independent AI software studio: two live products (Monday.com Inspector, MondayVirtual), the next one already in the lab, and custom AI-powered builds for businesses."
        />
        <link rel="canonical" href="https://shift-tab.eu/studio" />
      </Head>

      <div className="px-6 pb-24 pt-32 sm:pt-36">
        <motion.header
          variants={stagger(0.09)}
          initial={entrance("hidden")}
          animate="show"
          className="mx-auto max-w-3xl"
        >
          <motion.span variants={revealUp} className="eyebrow">
            The studio
          </motion.span>
          <motion.h1
            variants={revealUp}
            className="mt-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.06] tracking-tightest text-ink"
          >
            A small studio with a big allergy to{" "}
            <span className="font-serif font-medium italic tracking-normal text-brand">mediocre software.</span>
          </motion.h1>
          <motion.div variants={revealUp} className="mt-8 space-y-5 text-[1.08rem] leading-relaxed text-muted">
            <p>
              shift-tab started as a lab. Years of building on monday.com — 500+ implementations&apos;
              worth of experience behind the team — kept surfacing the same thought: the tools we
              wished existed didn&apos;t. So we built them, published them, and the lab became the
              company.
            </p>
            <p>
              Today that&apos;s two live products — Monday.com Inspector on the Chrome Web Store and
              MondayVirtual — with the next one already on the bench. Between releases, we take on
              a small number of client builds: AI pilots, custom products, monday.com platform work.
            </p>
          </motion.div>
        </motion.header>

        {/* beliefs */}
        <motion.section
          variants={stagger(0.09)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-20 max-w-3xl"
          aria-label="What we believe"
        >
          {BELIEFS.map((b, i) => (
            <motion.div key={b.t} variants={revealUp} className="border-t border-hairline py-7">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span className="font-mono text-[11.5px] font-bold text-brand">0{i + 1}</span>
                <h2 className="font-display text-[1.45rem] font-extrabold tracking-tightest text-ink">{b.t}</h2>
              </div>
              <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-muted">{b.d}</p>
            </motion.div>
          ))}
        </motion.section>

        {/* how we work */}
        <motion.section
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-16 max-w-3xl"
          aria-label="How we work"
        >
          <motion.h2
            variants={revealUp}
            className="font-display text-[1.7rem] font-extrabold tracking-tightest text-ink"
          >
            Weeks, <span className="font-serif font-medium italic tracking-normal text-emerald-600">not quarters.</span>
          </motion.h2>
          <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {PROCESS.map((s) => (
              <motion.div key={s.n} variants={revealUp}>
                <div className="font-mono text-[11.5px] font-bold text-brand">{s.n}</div>
                <h3 className="mt-1 font-display text-[1.08rem] font-bold text-ink">{s.t}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* numbers + CTA */}
        <motion.section
          initial={entrance({ opacity: 0, y: 24 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 max-w-3xl border-t border-hairline pt-10"
        >
          <div className="flex flex-wrap gap-x-14 gap-y-6">
            {[
              { to: 500, suffix: "+", note: "monday.com implementations" },
              { to: 2, suffix: "", note: "products live" },
              { to: 100, suffix: "%", note: "open-source extension" },
            ].map((s) => (
              <div key={s.note}>
                <div className="font-display text-[2.2rem] font-extrabold leading-none tracking-tightest text-ink">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-1.5 text-[13px] text-muted">{s.note}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton href="mailto:hello@shift-tab.eu">
              Start a conversation <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="/#products">
              See the work first
            </MagneticButton>
          </div>
        </motion.section>
      </div>
    </>
  );
}
