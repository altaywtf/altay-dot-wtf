/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-gt-america-mono)"],
        sans: ["var(--font-gt-america)"],
      },
    },
  },
};
