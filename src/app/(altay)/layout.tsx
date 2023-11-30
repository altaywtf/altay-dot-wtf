import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { PathHistoryListener } from 'ui/PathHistoryListener'
import 'ui/theme/style.css'

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  openGraph: {
    description: SITE_DESCRIPTION,
    images: getOpenGraphImage({
      title: SITE_DESCRIPTION,
      type: 'page',
    }),
    title: SITE_TITLE,
    url: SITE_URL,
  },
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
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
