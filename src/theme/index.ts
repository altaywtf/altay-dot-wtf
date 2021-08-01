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
      color: 'inherit',
      textDecoration: 'none',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: 'textTertiary',
      '&:hover': {
        color: 'linkPrimary',
        borderBottomColor: 'linkPrimary',
      },
    } as SxStyleProp,
    linkTitle: {
      display: 'inline-block',
      textDecoration: 'none',
      color: 'linkPrimary',
      paddingX: '0.15rem',
      marginX: '-0.15rem',
      fontSize: [1, 2],
      fontWeight: 'bold',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: ['transparent', 'linkPrimary'],
        color: ['linkHover', 'background'],
      },
    } as SxStyleProp,
    linkSilent: {
      cursor: 'pointer',
      color: 'textTertiary',
      textDecoration: 'none',
      '&:hover': {
        color: 'linkHover',
      },
    } as SxStyleProp,
    linkButton: {
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
      borderRadius: 4,
      '&:hover': {
        borderColor: 'buttonBorderHover',
      },
    } as SxStyleProp,
    linkScale: {
      display: 'block',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'transform .2s',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    } as SxStyleProp,
    linkHighlight: {
      cursor: 'pointer',
      display: 'block',
      textDecoration: 'none',
      border: '2px solid',
      borderColor: 'borderPrimary',
      borderRadius: 4,
      transition: 'transform .2s',
      '&:hover': {
        backgroundColor: 'linkHoverBackground',
        borderColor: 'backgroundSecondary',
        transform: 'scale(1.025)',
      },
    } as SxStyleProp,
  },
  space: [0, 4, 8, 16, 32, 48, 64, 80, 128, 256, 512],
  fontSizes: [14, 16, 18, 24, 32],
  breakpoints: ['480px', '640px', '960px'],
  colors: options.dark ? COLORS_DARK : COLORS_LIGHT,
})
