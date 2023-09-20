import localFont from 'next/font/local'

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

export const gtAmericaMono = localFont({
  src: [
    {
      path: './GT-America-Mono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './GT-America-Mono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './GT-America-Mono-Bold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-gt-america-mono',
})
