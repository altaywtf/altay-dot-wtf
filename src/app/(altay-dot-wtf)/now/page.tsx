import { API_URL } from 'config'
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

const Page = async () => {
  const now = await fetchData()
  return <NowPage data={now} />
}

export default Page
