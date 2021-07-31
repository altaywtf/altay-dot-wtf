import type { InferGetStaticPropsType } from 'next'
import { Box, SxStyleProp } from 'rebass'
import Markdown from 'components/Markdown'
import PageHeader from 'components/PageHeader'
import { aboutCopy } from 'config/copy'
import { readMarkdownFile } from 'utils/md'

export const getStaticProps = async () => ({
  props: {
    markdown: readMarkdownFile('about.md'),
  },
})

const sx: SxStyleProp = {
  '& > ul': {
    marginY: 3,
  },
  '& > ul > li': {
    marginY: 3,
  },
  '& > ul:nth-of-type(1)': {
    listStyleType: 'none',
    marginX: 0,
  },
  '& > ul:nth-of-type(1) > li': {
    marginY: 2,
  },
  '& > ul:nth-of-type(1) > li > a': {
    color: 'textTertiary',
  },
  '& > ul:nth-of-type(1) > li > a:hover': {
    color: 'background',
  },
}

const AboutPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ markdown }) => (
  <>
    <PageHeader {...aboutCopy} />

    <Box>
      <Box m={6} />
      <Box sx={sx}>
        <Markdown>{markdown}</Markdown>
      </Box>
    </Box>
  </>
)

export default AboutPage
