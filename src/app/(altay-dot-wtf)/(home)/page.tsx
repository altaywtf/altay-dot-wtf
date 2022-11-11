import { getContactLinks } from 'api/contact'
import { readMarkdownFile } from 'utils/md'
import HomePage from './HomePage'

const Page = async () => {
  const description = readMarkdownFile('home.md')
  const contactLinks = getContactLinks()
  return <HomePage data={{ description, contactLinks }} />
}

export default Page
