const TYPEFACE = `please-dont-download-these-fonts-buy-a-license-instead`
const FOLDER = `${TYPEFACE}/${TYPEFACE}`

const loadFont = (family: string, fileName: string, weight: number) => `
  @font-face {
    src: url('/fonts/${fileName}.woff2') format('woff2'),
         url('/fonts/${fileName}.woff') format('woff');
    font-family: '${family}';
    font-display: swap;
    font-weight: ${weight};
    font-style: normal;
  }

  @font-face {
    src: url('/fonts/${fileName}-Italic.woff2') format('woff2'),
         url('/fonts/${fileName}-Italic.woff') format('woff');
    font-family: '${family}';
    font-display: swap;
    font-weight: ${weight};
    font-style: italic;
  }
`

export const createTypographyCSS = () => `
  ${loadFont(TYPEFACE, `${FOLDER}-Regular`, 400)}
  ${loadFont(TYPEFACE, `${FOLDER}-Bold`, 600)}

  body {
    font-family: ${TYPEFACE}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    letter-spacing: 0.015em;
    word-spacing: 0.001em;
  }
`
