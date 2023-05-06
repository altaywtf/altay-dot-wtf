import { readMarkdownFile } from 'lib/utils/md'
import TimelinePage from './TimelinePage'

const Page = () => <TimelinePage data={readMarkdownFile('timeline.md')} />

export default Page
