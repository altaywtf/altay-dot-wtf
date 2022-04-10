import { Theme } from 'theme-ui'
import { COLORS } from './colors'

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
  fontSizes: [14, 16, 18],
  breakpoints: ['480px', '640px', '960px'],
  colors: COLORS,
  radii: {
    default: 4,
    circle: 999999,
  },
  text: {
    heading: {
      margin: 0,
      padding: 0,
    },
  },
  links: {
    silent: {
      color: 'textSecondary',
      textDecoration: 'none',
      '@media (hover: hover)': {
        '&:hover': {
          cursor: 'pointer',
          color: 'linkHover',
        },
      },
    },
    title: {
      textDecoration: 'none',
      color: 'link',
      fontWeight: 'bold',
      fontSize: 1,
      '@media (hover: hover)': {
        '&:hover': {
          cursor: 'pointer',
          color: 'linkHover',
        },
      },
    },
    scale: {
      color: 'text',
      display: 'block',
      textDecoration: 'none',
      transition: 'transform .2s',
      '@media (hover: hover)': {
        '&:hover': {
          cursor: 'pointer',
          transform: 'scale(1.025)',
        },
      },
    },
    button: {
      textDecoration: 'none',
      display: 'inline-block',
      paddingY: 2,
      paddingX: 3,
      backgroundColor: 'buttonBackground',
      color: 'text',
      fontWeight: 'bold',
      fontSize: 0,
      lineHeight: 1,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'buttonBorder',
      borderRadius: 'default',
      '@media (hover: hover)': {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: 'buttonBackgroundHover',
        },
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
      MozOsxFontSmoothing: 'grayscale',
      padding: 0,
      margin: 0,
      overflowY: 'scroll',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'text',
      '@media (hover: hover)': {
        '&:hover': {
          color: 'white',
          borderBottomColor: 'white',
        },
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
