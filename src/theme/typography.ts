const TYPEFACE = `please-dont-download-these-fonts-buy-a-license-instead`
const FOLDER = `${TYPEFACE}/${TYPEFACE}`
export const fontFamily = `${TYPEFACE}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`

const loadFont = (family: string, fileName: string, weight: number) => `
  @font-face {
    src: url('/fonts/${fileName}.woff2') format('woff2');
    font-family: '${family}';
    font-display: optional;
    font-weight: ${weight};
    font-style: normal;
  }

  @font-face {
    src: url('/fonts/${fileName}-Italic.woff2') format('woff2');
    font-family: '${family}';
    font-display: optional;
    font-weight: ${weight};
    font-style: italic;
  }
`

export const typographyCSS = `
  ${loadFont(TYPEFACE, `${FOLDER}-Regular`, 400)}
  ${loadFont(TYPEFACE, `${FOLDER}-Bold`, 600)}
`
