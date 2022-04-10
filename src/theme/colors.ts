import { lighten, darken } from 'polished'

const BRAND_COLORS = {
  putio: '#fdce45',
  klarna: 'rgb(255, 179, 199)',
  lisk: '#4070F4',
}

export const COLORS = {
  background: '#101010',
  backgroundAlpha: '#10101099',
  backgroundSecondary: '#151515',
  border: '#151515',

  text: '#d4d4d4',
  textSecondary: '#a3a3a3',

  link: '#fdce45',
  linkHover: lighten(0.15, '#fdce45'),
  linkBackground: darken(0.55, '#fdce45'),

  buttonBackground: '#202020',
  buttonBackgroundHover: lighten(0.05, '#202020'),
  buttonBorder: lighten(0.05, '#202020'),

  ...BRAND_COLORS,
}
