import { lighten } from 'polished'

const BRAND_COLORS = {
  putio: '#FDCE45',
  klarna: 'rgb(255, 179, 199)',
  lisk: '#4070F4',
}

export const COLORS = {
  background: '#101010',
  backgroundAlpha: 'rgba(0, 0, 0, 0.75)',
  backgroundSecondary: '#151515',
  border: '#202020',

  text: 'rgba(255, 255, 255, 0.9)',
  textSecondary: 'rgba(255, 255, 255, 0.75)',
  textTertiary: 'rgba(255, 255, 255, 0.6)',

  link: BRAND_COLORS.putio,
  linkHover: lighten(0.15, BRAND_COLORS.putio),

  buttonBackground: '#202020',
  buttonHoverBackground: lighten(0.05, '#202020'),

  ...BRAND_COLORS,
}
