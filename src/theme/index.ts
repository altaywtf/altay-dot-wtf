import { Theme, merge, ThemeUIStyleObject } from 'theme-ui'
import { COLORS } from './colors'

export const LAYOUT_WIDTH = 640

const fontFamily = `please-dont-download-these-fonts-buy-a-license-instead, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`

const makeTheme = <T extends Theme>(t: T) => t

const getBrandLinkStyle = (brand: 'putio' | 'klarna' | 'lisk'): ThemeUIStyleObject => ({
  fontWeight: 'bold',
  color: brand,
})

const styles: Theme['styles'] = {
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
    cursor: 'default',
    'a[href="https://put.io"]': getBrandLinkStyle('putio'),
    'a[href="https://klarna.com"]': getBrandLinkStyle('klarna'),
    'a[href="https://lisk.io"]': getBrandLinkStyle('lisk'),
  },

  a: {
    color: 'link',
    textDecoration: 'none',
    '@media (hover: hover)': {
      '&:hover': {
        color: 'linkHover',
        cursor: 'default',
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
  p: {
    color: 'textSecondary',
  },
}

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

  styles,

  text: {
    heading: {
      margin: 0,
      padding: 0,
      color: 'text',
    },
  },

  links: {
    silent: merge.all(styles.a, {
      color: 'textSecondary',
    }),

    title: merge.all(styles.a, {
      display: 'block',
      fontWeight: 'bold',
    }),

    scale: merge.all(styles.a, {
      color: 'text',
      display: 'block',
      transition: 'transform .2s',
      '@media (hover: hover)': {
        '&:hover': {
          color: 'text',
          transform: 'scale(1.025)',
        },
      },
    }),

    button: merge.all(styles.a, {
      display: 'inline-block',
      paddingY: 2,
      paddingX: 3,
      backgroundColor: 'buttonBackground',
      color: 'text',
      fontWeight: 'bold',
      fontSize: 0,
      lineHeight: 1,
      borderRadius: 'default',
      '@media (hover: hover)': {
        '&:hover': {
          color: 'text',
          backgroundColor: 'buttonBackgroundHover',
        },
      },
    }),
  },
})
