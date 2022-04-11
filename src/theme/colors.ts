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
  border: '#202020',

  text: 'rgba(255, 255, 255, 0.9)',
  textSecondary: 'rgba(255, 255, 255, 0.65)',

  link: BRAND_COLORS.putio,
  linkHover: lighten(0.15, BRAND_COLORS.putio),
  linkBackground: darken(0.55, BRAND_COLORS.putio),

  buttonBackground: '#202020',
  buttonBackgroundHover: lighten(0.05, '#202020'),

  ...BRAND_COLORS,
}
