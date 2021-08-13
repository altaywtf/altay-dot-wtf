// eslint-disable-next-line
// @ts-ignore
import preset from '@rebass/preset'
import { Theme as BaseTheme } from 'styled-system'
import { Colors, COLORS_DARK, COLORS_LIGHT } from './colors'
import * as variants from './styles/variants'

export type ThemeOptions = {
  dark: boolean
}

export type Theme = BaseTheme & {
  dark: boolean
  colors: Colors
}

export const LAYOUT_WIDTH = 640

export const createTheme = (options: ThemeOptions) => ({
  ...preset,
  ...options,
  variants,
  space: [0, 4, 8, 16, 32, 48, 64, 80, 128, 256, 512],
  fontSizes: [14, 16, 18, 24, 32],
  breakpoints: ['480px', '640px', '960px'],
  colors: options.dark ? COLORS_DARK : COLORS_LIGHT,
  radii: {
    default: 4,
    circle: '50%',
  },
})
