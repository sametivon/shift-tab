/** @type {import('tailwindcss').Config} */
// shift-tab premium system v3 — Midnight / Electric Violet / Emerald on warm
// off-white. Token NAMES stay stable so existing components restyle in place.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAFA", // page background
        mist: "#F1F1F3", // secondary surface
        card: "#FFFFFF",
        surface: "#EFEDFE", // violet-tinted chip surface
        softblue: "#E7EDFB",
        softmint: "#E4F7EF", // emerald tint
        softlavender: "#ECE9FE",
        softpeach: "#FdEEE4",
        ink: "#111827", // midnight
        muted: "#5B6472",
        hairline: "#E8E8E8",
        brand: {
          DEFAULT: "#6D5EF7", // electric violet
          500: "#6D5EF7",
          600: "#5B4CE6",
          indigo: "#4F46C8",
        },
        emerald: {
          DEFAULT: "#10B981",
          500: "#10B981",
          600: "#0DA271",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        display: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Fraunces"', "Georgia", "ui-serif", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      borderColor: {
        DEFAULT: "#E8E8E8",
      },
      borderRadius: {
        card: "24px", // the system radius for layered cards
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,.05), 0 12px 32px -16px rgba(15,23,42,.14)",
        lift: "0 32px 64px -24px rgba(15,23,42,.22)",
        glass: "0 24px 48px -24px rgba(15,23,42,.35), inset 0 1px 0 rgba(255,255,255,.7)",
        glowv: "0 12px 40px -10px rgba(109,94,247,.45)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
        150: "150ms",
        250: "250ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
