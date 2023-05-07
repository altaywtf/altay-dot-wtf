import { Theme, merge } from 'theme-ui'

export const LAYOUT_WIDTH = 640

const makeTheme = <T extends Theme>(t: T) => t

const styles: Theme['styles'] = {
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
}

export const theme = makeTheme({
  styles,

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
