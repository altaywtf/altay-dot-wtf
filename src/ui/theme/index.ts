import { Theme, merge } from 'theme-ui'
import { COLORS } from './colors'
import { fonts } from './fonts'

export const LAYOUT_WIDTH = 640

const makeTheme = <T extends Theme>(t: T) => t

const styles: Theme['styles'] = {
  root: {
    // bg: 'background',
    // // fontFamily: 'body',
    // fontWeight: 'body',
    // lineHeight: 'body',
    // fontSize: ['14px', '16px'],
    // letterSpacing: '0.0125em',
    // WebkitFontSmoothing: 'antialiased',
    // WebkitTextSizeAdjust: 'none',
    // MozOsxFontSmoothing: 'grayscale',
    // padding: 0,
    // margin: 0,
    // overflowY: 'scroll',
    // 'a[href="https://put.io"]': getBrandLinkStyle('putio'),
    // 'a[href="https://klarna.com"]': getBrandLinkStyle('klarna'),
    // 'a[href="https://lisk.io"]': getBrandLinkStyle('lisk'),
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
    body: fonts.regular.style.fontFamily,
    subheading: fonts.medium.style.fontFamily,
    heading: fonts.bold.style.fontFamily,
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
    subheading: {
      fontFamily: 'subheading',
      fontWeight: 'subheading',
    },
  },

  links: {
    underline: merge.all(styles.a, {
      color: 'textSecondary',
      textDecoration: 'underline',
      textDecorationThickness: 'from-font',
      textUnderlineOffset: '0.125rem',
    }),

    silent: merge.all(styles.a, {
      color: 'textSecondary',
    }),

    title: merge.all(styles.a, {
      display: 'inline-block',
      fontFamily: 'subheading',
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
      fontFamily: 'subheading',
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
