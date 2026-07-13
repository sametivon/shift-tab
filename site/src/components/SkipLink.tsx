/* First tabbable element on every page. Invisible until focused —
   then a solid ink pill in the top-left, above the fixed nav. */
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:items-center focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white"
    >
      Skip to content
    </a>
  );
}
