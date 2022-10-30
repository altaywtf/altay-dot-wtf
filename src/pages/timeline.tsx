import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Page from 'components/Page'
import { readMarkdownFile } from 'utils/md'
import Markdown from 'components/Markdown'
import { Box } from 'theme-ui'

export const getStaticProps: GetStaticProps<{
  content: string
}> = async () => ({
  props: {
    content: readMarkdownFile('timeline.md'),
  },
})

const TimelinePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ content }) => (
  <Page header={{ title: 'Timeline' }}>
    <Box
      sx={{
        ul: { marginLeft: 0 },
        li: {
          listStyleType: 'none',
          marginBottom: 3,
          '> strong:first-of-type': {
            color: 'text',
          },
        },
        hr: { marginY: 4 },
        a: { variant: 'links.underline' },
      }}
    >
      <Markdown>{content}</Markdown>
    </Box>
  </Page>
)

export const config = {
  unstable_excludeFiles: ['public/**/*'],
}

export default TimelinePage
