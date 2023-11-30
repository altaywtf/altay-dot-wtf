import 'ui/theme/style.css'
import { Metadata } from 'next'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { PropsWithChildren } from 'react'
import { PathHistoryListener } from 'ui/PathHistoryListener'

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: getOpenGraphImage({
      type: 'page',
      title: SITE_DESCRIPTION,
    }),
  },
} as const

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <PathHistoryListener />
    </>
  )
}
