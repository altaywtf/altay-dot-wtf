import { API_URL } from 'config'
import NowPage from './NowPage'

const fetchData = async () => {
  const res = await fetch(`${API_URL}/now`)
  const { now } = await res.json()
  return now
}

const Page = async () => {
  const now = await fetchData()
  return <NowPage data={now} />
}

export default Page
