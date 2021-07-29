// eslint-disable-next-line
// @ts-ignore
import preset from '@rebass/preset'
import type { SxStyleProp } from 'rebass'
import { Theme as BaseTheme } from 'styled-system'
import { Colors, COLORS_DARK, COLORS_LIGHT } from './colors'

export type ThemeOptions = {
  dark: boolean
}

export type Theme = BaseTheme & {
  dark: boolean
  colors: Colors
}

export const MOBILE_BREAKPOINT = 640

export const createTheme = (options: ThemeOptions) => ({
  ...preset,
  ...options,
  variants: {
    link: {
      display: 'inline-block',
      textDecoration: 'none',
      color: 'linkPrimary',
      paddingX: '0.15rem',
      marginX: '-0.15rem',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: ['transparent', 'linkPrimary'],
        color: ['linkHover', 'background'],
      },
    } as SxStyleProp,
    linkSilent: {
      color: 'textTertiary',
      fontSize: 0,
      textDecoration: 'none',
      '&:hover': { color: 'linkHover' },
    } as SxStyleProp,
  },
  space: [0, 4, 8, 16, 32, 48, 64, 80, 128, 256, 512],
  fontSizes: [16, 18, 20, 24, 32],
  breakpoints: ['480px', '640px', '960px'],
  colors: options.dark ? COLORS_DARK : COLORS_LIGHT,
})
