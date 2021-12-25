import { NextSeoProps } from 'next-seo'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from './meta'

export const SEO: NextSeoProps = {
  title: SITE_TITLE,
  titleTemplate: `${SITE_TITLE} | %s`,
  description: SITE_DESCRIPTION,
  twitter: {
    handle: '@altaywtf',
    cardType: 'summary_large_image',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
} as const
