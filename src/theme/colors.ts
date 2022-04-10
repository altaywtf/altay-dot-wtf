import { lighten, darken } from 'polished'

const BRAND_COLORS = {
  putio: '#fdce45',
  klarna: 'rgb(255, 179, 199)',
  lisk: '#4070F4',
}

export const COLORS = {
  background: 'rgba(17, 17, 17, 1)',
  backgroundSecondary: 'rgba(255, 255, 255, 0.1)',
  backgroundHeader: 'rgba(10, 10, 10, 1)',

  text: '#FBFBFB',
  textSecondary: '#DEDFE5',
  textTertiary: '#98989D',
  textInlineCode: '#DEDFE5',

  linkPrimary: '#fdce45',
  linkHover: lighten(0.15, '#fdce45'),
  linkBackground: darken(0.55, '#fdce45'),

  buttonBackground: '#222222',
  buttonBorderHover: lighten(0.15, '#222'),
  border: 'rgba(130, 130, 130, 0.1)',

  ...BRAND_COLORS,
}
