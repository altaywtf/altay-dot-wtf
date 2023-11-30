/** @type {import('prettier').Options} */
module.exports = {
  bracketSpacing: true,
  printWidth: 80,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: [require('prettier-plugin-tailwindcss')],
}
