import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import { revealUp, scaleIn, stagger, inView, useEntrance } from "@/lib/motion";

const features = [
  ["🚶", "Walk over. Talk.", "Move your avatar next to someone and you're already talking — voice fades up as you get close."],
  ["🎤", "Auditorium all-hands", "Present to the whole company with stage, hands-up, and screen share."],
  ["📊", "Live boards on the walls", "Your monday.com boards render inside the office — always current."],
  ["🖥️", "Screen share & whiteboards", "Present a deck, sketch an idea, review work — spatially, together."],
  ["🔑", "No new app, no new login", "Launches from monday.com with your monday identity. Nothing to install."],
  ["🏢", "White-label spaces", "The same platform reskins into offices, training centers, venues and community spaces."],
];

export default function ProductVirtual() {
  const entrance = useEntrance();
  return (
    <>
      <Head>
        <title>MondayVirtual — your office, inside monday.com | shift-tab</title>
        <meta name="description" content="MondayVirtual by shift-tab: a 3D team office embedded in monday.com — proximity voice & video, auditorium all-hands, screen sharing and live boards on the walls." />
        <link rel="canonical" href="https://shift-tab.eu/products/mondayvirtual" />
      </Head>

      <div className="px-6 pb-10 pt-32 sm:pt-36">
        <motion.header
          variants={stagger(0.08)}
          initial={entrance("hidden")}
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={revealUp} className="mb-5 flex items-center justify-center gap-2 text-[13px] text-muted">
            <a href="/" className="font-medium text-brand hover:underline">shift-tab</a>
            <span>›</span><span>Products</span><span>›</span><span className="text-ink">MondayVirtual</span>
          </motion.div>
          <motion.span variants={revealUp} className="mb-4 inline-block rounded-full bg-softlavender px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-brand-indigo">
            3D workspace · runs inside monday.com
          </motion.span>
          <motion.h1 variants={revealUp} className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.08] tracking-tightest text-ink">
            Everyone&apos;s online.
            <br />
            <span className="text-gradient">Nobody&apos;s together.</span>
          </motion.h1>
          <motion.p variants={revealUp} className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            MondayVirtual turns monday.com into a 3D office — walk over and talk, present to a
            full auditorium, and keep your boards live on the walls. No new app, no new login.
          </motion.p>
          <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="https://mondayvirtual.eu/home">
              Open your office <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="https://mondayvirtual.eu/home">
              Watch it work
            </MagneticButton>
          </motion.div>
        </motion.header>

        <motion.div
          variants={stagger(0.07)}
          initial={entrance("hidden")}
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(([icon, t, d]) => (
            <motion.div key={t} variants={scaleIn}>
              <TiltCard>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-softlavender text-xl">{icon}</div>
                <h3 className="font-display text-[1.02rem] font-bold text-ink">{t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{d}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
