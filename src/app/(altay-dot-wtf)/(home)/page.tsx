import { API_URL } from 'config'
import { readMarkdownFile } from 'utils/md'
import HomePage, { HomePageProps } from './HomePage'

const fetchData = async (): Promise<HomePageProps['data']> => {
  const description = readMarkdownFile('home.md')
  const contactLinks = (await fetch(`${API_URL}/contact/links`).then((res) => res.json())).links
  return { description, contactLinks }
}

const Page = async () => {
  const data = await fetchData()
  return <HomePage data={data} />
}

export default Page
