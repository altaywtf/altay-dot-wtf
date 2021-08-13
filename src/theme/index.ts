import { Theme } from 'theme-ui'
import { COLORS_DARK, COLORS_LIGHT } from './colors'
import * as variants from './styles/variants'

export const LAYOUT_WIDTH = 640

const makeTheme = <T extends Theme>(t: T) => t

export const theme = makeTheme({
  variants,
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
})
