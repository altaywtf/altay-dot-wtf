import { getNow } from 'api/now'
import NowPage from './NowPage'

const Page = () => {
  const now = getNow()
  return <NowPage data={now} />
}

export default Page
