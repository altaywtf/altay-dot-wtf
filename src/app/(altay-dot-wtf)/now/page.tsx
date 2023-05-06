import { Metadata } from 'next'
import { API_URL, nowCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import NowPage from './NowPage'

const fetchData = async () => {
  const res = await fetch(`${API_URL}/now`, {
    next: {
      revalidate: 60 * 60 * 1000 * 24, // 24 hours
    },
  })
  const { now } = await res.json()
  return now
}

export const generateMetadata = async (): Promise<Metadata> => ({
  title: nowCopy.title,
  openGraph: {
    title: nowCopy.title,
    images: getOpenGraphImage({
      type: 'page',
      title: nowCopy.title,
    }),
  },
})

const Page = async () => {
  const now = await fetchData()
  return <NowPage data={now} />
}

export default Page
