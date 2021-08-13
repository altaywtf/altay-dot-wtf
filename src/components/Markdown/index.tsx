import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Box } from 'theme-ui'
// eslint-disable-next-line
// @ts-ignore
import slug from 'remark-slug'
import MDHeading from './MDHeading'
import MDParagraph from './MDParagraph'
import MDLink from './MDLink'

const MDMedia = dynamic(() => import('./MDMedia'))
const MDQuote = dynamic(() => import('./MDQuote'))
const MDInlineCode = dynamic(() => import('./MDInlineCode'))
const MDCodeBlock = dynamic(() => import('./MDCodeBlock'))

type Props = { children: string }

const Markdown: React.FC<Props> = ({ children }) => (
  <Box sx={{ fontSize: [1, 2] }}>
    <ReactMarkdown
      plugins={[slug, gfm]}
      escapeHtml={true}
      renderers={{
        paragraph: MDParagraph,
        heading: MDHeading,
        link: MDLink,
        image: MDMedia,
        blockquote: MDQuote,
        inlineCode: MDInlineCode,
        code: MDCodeBlock,
      }}
    >
      {children}
    </ReactMarkdown>
  </Box>
)

export default Markdown
