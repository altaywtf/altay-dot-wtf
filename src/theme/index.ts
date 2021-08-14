import { Theme } from 'theme-ui'
import { COLORS_DARK, COLORS_LIGHT } from './colors'

export const LAYOUT_WIDTH = 640
const fontFamily = `please-dont-download-these-fonts-buy-a-license-instead, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`
const makeTheme = <T extends Theme>(t: T) => t

export const theme = makeTheme({
  fonts: {
    body: fontFamily,
    heading: fontFamily,
  },
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 600,
  },
  lineHeights: {
    body: 1.6,
    heading: 1.6,
  },
  space: [0, 4, 8, 16, 32, 48, 64, 80, 128, 256, 512],
  fontSizes: [14, 16, 18, 24, 32],
  breakpoints: ['480px', '640px', '960px'],
  colors: {
    ...COLORS_LIGHT,
    modes: {
      dark: COLORS_DARK,
    },
  },
  radii: {
    default: 4,
    circle: '50%',
  },
  text: {
    heading: {
      margin: 0,
      padding: 0,
    },
  },
  links: {
    silent: {
      cursor: 'pointer',
      color: 'textTertiary',
      textDecoration: 'none',
      '&:hover': {
        color: 'linkHover',
      },
    },
    title: {
      textDecoration: 'none',
      color: 'linkPrimary',
      fontWeight: 'bold',
      fontSize: [1, 2],
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'transparent',
      '&:hover': {
        borderBottomColor: 'linkPrimary',
      },
    },
    scale: {
      display: 'block',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'transform .2s',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    button: {
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      paddingY: 2,
      paddingX: 3,
      backgroundColor: 'buttonBackground',
      color: 'text',
      fontWeight: 'bold',
      lineHeight: 1,
      border: '2px solid',
      borderColor: 'transparent',
      borderRadius: 'default',
      '&:hover': {
        borderColor: 'buttonBorderHover',
      },
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      fontSize: 1,
      letterSpacing: '0.015em',
      wordSpacing: '0.001em',
      WebkitFontSmoothing: 'antialiased',
      WebkitTextSizeAdjust: 'none',
      MozOsxFontSmoothing: 'greyscale',
      padding: 0,
      margin: 0,
      overflowY: 'scroll',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'buttonBorderHover',
      '&:hover': {
        borderBottomColor: 'textTertiary',
      },
    },
    h1: {
      variant: 'text.heading',
    },
    h2: {
      variant: 'text.heading',
    },
    h3: {
      variant: 'text.heading',
    },
    h4: {
      variant: 'text.heading',
    },
    h5: {
      variant: 'text.heading',
    },
    h6: {
      variant: 'text.heading',
    },
  },
})
