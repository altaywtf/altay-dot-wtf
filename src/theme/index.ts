import { Theme, merge, ThemeUIStyleObject } from 'theme-ui'
import { lighten } from '@theme-ui/color'
import { COLORS } from './colors'

export const LAYOUT_WIDTH = 640

const fontFamily = `please-dont-download-these-fonts-buy-a-license-instead, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`

const makeTheme = <T extends Theme>(t: T) => t

const getBrandLinkStyle = (brand: 'putio' | 'klarna' | 'lisk'): ThemeUIStyleObject => ({
  fontWeight: 'heading',
  color: brand,
  '@media (hover: hover)': {
    '&:hover': {
      color: lighten(brand, 0.15),
    },
  },
})

const styles: Theme['styles'] = {
  root: {
    bg: 'background',
    fontFamily: 'body',
    fontWeight: 'body',
    lineHeight: 'body',
    fontSize: ['14px', '16px'],
    letterSpacing: '0.015em',
    wordSpacing: '0.001em',
    WebkitFontSmoothing: 'antialiased',
    WebkitTextSizeAdjust: 'none',
    MozOsxFontSmoothing: 'grayscale',
    padding: 0,
    margin: 0,
    overflowY: 'scroll',
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
        cursor: 'pointer',
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
    subheading: 500,
    heading: 600,
  },

  lineHeights: {
    body: 1.5,
    heading: 1.5,
  },

  space: [0, '0.25rem', '0.5rem', '1rem', '2rem', '3rem', '4rem'],

  fontSizes: ['0.875rem', '1rem', '1.25rem'],

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
      display: 'inline-block',
      fontWeight: 'subheading',
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
      fontWeight: 'subheading',
      fontSize: 0,
      lineHeight: 1,
      borderRadius: 'default',
      '@media (hover: hover)': {
        '&:hover': {
          color: 'text',
          backgroundColor: 'buttonHoverBackground',
        },
      },
    }),
  },
})
