/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-gt-america)'],
        mono: ['var(--font-gt-america-mono)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
