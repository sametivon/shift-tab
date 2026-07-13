/** @type {import('tailwindcss').Config} */
// Warm-editorial identity shared with mondayvirtual.eu: paper, ink, violet,
// serif display. Token NAMES stay stable so components restyle automatically.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#faf7f2", // warm paper background
        mist: "#f3eee6", // paper-2
        card: "#ffffff",
        surface: "#efe9fb", // violet-tinted surface
        softblue: "#e4ecf7",
        softmint: "#e2f3ea",
        softlavender: "#ece5fb",
        softpeach: "#fbe7dd",
        ink: "#211c29",
        muted: "#6b6478",
        hairline: "rgba(33,28,41,.12)",
        brand: {
          DEFAULT: "#6c5ce7",
          500: "#6c5ce7",
          600: "#5a4bd4",
          indigo: "#4a3fbe",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
        display: ['"Iowan Old Style"', '"Palatino Linotype"', "Palatino", '"Book Antiqua"', "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.014em",
      },
      borderColor: {
        DEFAULT: "rgba(33,28,41,.12)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(33,28,41,.05), 0 10px 28px -12px rgba(33,28,41,.14)",
        lift: "0 26px 54px -22px rgba(33,28,41,.28)",
        glass: "0 22px 44px -26px rgba(33,28,41,.42), inset 0 1px 0 rgba(255,255,255,.7)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
