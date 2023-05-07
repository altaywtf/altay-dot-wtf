import localFont from 'next/font/local'

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

export const gtAmerica = localFont({
  src: [
    {
      path: './GT-America-Standard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './GT-America-Standard-Regular-Italic.woff2',
      weight: '400',
      style: 'Italic',
    },
    {
      path: './GT-America-Standard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './GT-America-Standard-Medium-Italic.woff2',
      weight: '500',
      style: 'Italic',
    },
    {
      path: './GT-America-Standard-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './GT-America-Standard-Bold-Italic.woff2',
      weight: '600',
      style: 'Italic',
    },
  ],
  variable: '--font-gt-america',
})

export const fonts = {
  regular,
  medium,
  bold,
}
