const base = require('@vercel/style-guide/prettier')

/** @type {import('prettier').Options} */
module.exports = {
  ...base,
  bracketSpacing: true,
  plugins: [...base.plugins, 'prettier-plugin-tailwindcss'],
  printWidth: 80,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
}
