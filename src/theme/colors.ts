import { lighten, darken } from 'polished'

const BRAND_COLORS = {
  putio: '#fdce45',
  klarna: 'rgb(255, 179, 199)',
  lisk: '#4070F4',
  bilgi: '#f01223',
}

export const COLORS_LIGHT = {
  background: '#fbfbfb',
  backgroundSecondary: '#f6f6f9',
  backgroundHeader: '#fff',
  text: '#111111',
  textSecondary: '#2f3037',
  textTertiary: '#686B78',
  textInlineCode: '#2f3037',
  textWhite: '#FBFBFB',
  linkPrimary: '#007AFF',
  linkHover: darken(0.1, '#007AFF'),
  linkBackground: '#F1F5FC',
  buttonBackground: '#EEE',
  buttonBorderHover: darken(0.15, '#EEE'),
  borderMenu: '#F1F5FC',
  borderPrimary: 'rgba(241, 245, 252)',
  imageZoomBackground: 'rgba(255, 255, 255, 0.75)',
  yellow: '#fdce45',
  red: '#ff3b30',
  green: '#78B756',
  ...BRAND_COLORS,
}

type Colors = typeof COLORS_LIGHT

export const COLORS_DARK: Colors = {
  background: 'rgba(17, 17, 17, 1)',
  backgroundSecondary: 'rgba(255, 255, 255, 0.1)',
  backgroundHeader: 'rgba(10, 10, 10, 1)',
  text: '#FBFBFB',
  textSecondary: '#DEDFE5',
  textTertiary: '#98989D',
  textInlineCode: '#DEDFE5',
  textWhite: '#FBFBFB',
  linkPrimary: '#fdce45',
  linkHover: lighten(0.15, '#fdce45'),
  linkBackground: darken(0.54, '#fdce45'),
  buttonBackground: '#222',
  buttonBorderHover: lighten(0.15, '#222'),
  borderMenu: 'rgba(130, 130, 130, 0.01)',
  borderPrimary: 'rgba(130, 130, 130, 0.1)',
  imageZoomBackground: 'rgba(0, 0, 0, 0.75)',
  yellow: '#fdce45',
  red: '#ff3b30',
  green: '#78B756',
  ...BRAND_COLORS,
}
