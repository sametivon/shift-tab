import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import TiltCard from "@/components/TiltCard";
import { revealUp, scaleIn, stagger, inView, useEntrance } from "@/lib/motion";

const features = [
  ["🗂", "Schema X-ray", "Every column — type, id, settings — for parents and subitems. One click to copy."],
  ["🔍", "GraphQL workspace", "14 templates, saved queries, table + JSON results, complexity meter."],
  ["📥", "Subitem importer", "Parents + subitems from one CSV/Excel — groups preserved, no row limits."],
  ["⚡", "Bulk update", "Push a value to hundreds of items at once, parents and subitems alike."],
  ["🖼️", "Excel image upload", "Every image embedded in an .xlsx lands in the right item's File column."],
  ["📤", "Export & backup", "Any board to CSV or JSON — items, subitems, columns, groups."],
];

export default function ProductExtension() {
  const entrance = useEntrance();
  return (
    <>
      <Head>
        <title>Monday.com Inspector — the DevTools for monday.com | shift-tab</title>
        <meta name="description" content="Monday.com Inspector by shift-tab: a free, open-source Chrome extension to inspect board schemas, run GraphQL, import subitems, bulk-update items and export data — inside monday.com." />
        <link rel="canonical" href="https://shift-tab.eu/products/extension" />
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
            <span>›</span><span>Products</span><span>›</span><span className="text-ink">Inspector</span>
          </motion.div>
          <motion.span variants={revealUp} className="mb-4 inline-block rounded-full bg-surface px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-brand">
            Free Chrome extension · Open source
          </motion.span>
          <motion.h1 variants={revealUp} className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.08] tracking-tightest text-ink">
            The DevTools <span className="text-gradient">for monday.com</span>
          </motion.h1>
          <motion.p variants={revealUp} className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            Inspect schemas, run GraphQL, import subitems, bulk-update and export — a precise,
            local-first toolkit living right inside your boards. No account, no row limits.
          </motion.p>
          <motion.div variants={revealUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="https://chromewebstore.google.com/detail/kmmmfnkjdcmemcmjipidodnipidadaeg">
              Add to Chrome — free <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="https://mondayinspector.eu">
              Guides &amp; docs
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
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-xl">{icon}</div>
                <h3 className="font-display text-[1.02rem] font-bold text-ink">{t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{d}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={entrance({ opacity: 0 })}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          className="mx-auto mt-10 max-w-xl text-center text-[13.5px] leading-relaxed text-muted"
        >
          Privacy-first by design: your API token never leaves your browser, parsing happens
          locally, and the only host it touches is <span className="font-mono">api.monday.com</span>.
        </motion.p>
      </div>
    </>
  );
}
