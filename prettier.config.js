/** @type {import('prettier').Options} */
module.exports = {
  bracketSpacing: true,
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: [require('prettier-plugin-tailwindcss')],
}
