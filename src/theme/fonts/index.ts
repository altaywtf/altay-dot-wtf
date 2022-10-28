import localFont from '@next/font/local'

const regular = localFont({
  src: './GT-America-Standard-Regular.woff2',
  weight: '400',
})

const medium = localFont({
  src: './GT-America-Standard-Medium.woff2',
  weight: '500',
})

const bold = localFont({
  src: './GT-America-Standard-Bold.woff2',
  weight: '600',
})

export const fonts = {
  regular,
  medium,
  bold,
}
