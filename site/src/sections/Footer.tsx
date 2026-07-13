export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 120% at 50% 0%, #ece5fb 0%, transparent 60%), #faf7f2",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="glass rounded-3xl px-8 py-10 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-2.5">
            <img src="/logo.svg" alt="" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-[19px] font-extrabold tracking-tight text-ink">
              shift<span className="text-brand-indigo">-tab</span>
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-tightest text-ink">
            Tools for people who know their shortcuts
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[1rem] text-muted">
            Fast, precise, beautifully-crafted software for the monday.com ecosystem.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 text-[13px] text-muted sm:flex-row">
          <span>© 2026 shift-tab · a Fruition Services studio</span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="/products/extension" className="hover:text-ink">Monday.com Inspector</a>
            <a href="/products/mondayvirtual" className="hover:text-ink">MondayVirtual</a>
            <a href="https://github.com/sametivon" target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
            <a href="mailto:sam@fruitionservices.io" className="hover:text-ink">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
