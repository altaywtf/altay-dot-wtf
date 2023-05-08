import { homeCopy } from 'config'
import { readMarkdownFile } from 'lib/utils/md'
import Page from 'ui/Page'
import Markdown from 'ui/Markdown'

const HomePage = async () => (
  <Page header={{ title: homeCopy.title }}>
    <Markdown>{readMarkdownFile('home.md')}</Markdown>
  </Page>
)

export default HomePage
