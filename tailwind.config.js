/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,html,sass}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--f)", "system-ui", "sans-serif"],
        display: ["var(--d)", "Orbitron", "monospace"],
      },
      colors: {
        background: "var(--bg)",
        foreground: "var(--tx)",
        card: "var(--card)",
        border: "var(--line)",
        muted: "var(--mut)",
        accent: "var(--acc)",
        accent2: "var(--acc2)",
        success: "var(--ok)",
        gold: "var(--gold)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lofi"],
  },
};