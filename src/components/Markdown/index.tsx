import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Box } from 'theme-ui'
import slug from 'remark-slug'
import MDHeading from './MDHeading'
import MDParagraph from './MDParagraph'
import MDLink from './MDLink'
import MDCodeBlock from './MDCodeBlock'
import MDInlineCode from './MDInlineCode'
import MDImage from './MDImage'
import MDVideo from './MDVideo'
import MDQuote from './MDQuote'

type Props = { children: string }

const Markdown: React.FC<Props> = ({ children }) => (
  <Box sx={{ color: 'textSecondary' }}>
    <ReactMarkdown
      remarkPlugins={[slug, gfm]}
      components={{
        h1: (props) => <MDHeading {...props} />,
        h2: (props) => <MDHeading {...props} />,
        h3: (props) => <MDHeading {...props} />,
        h4: (props) => <MDHeading {...props} />,
        h5: (props) => <MDHeading {...props} />,
        h6: (props) => <MDHeading {...props} />,
        p: (props) => <MDParagraph {...props} />,
        a: (props) => <MDLink {...props} href={props.href || ''} />,
        code: (props) => (props.inline ? <MDInlineCode {...props} /> : <MDCodeBlock {...props} />),
        img: (props) => <MDImage src={props.src || ''} alt={props.alt || ''} />,
        video: (props) => <MDVideo src={props.src || ''} />,
        blockquote: (props) => <MDQuote {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  </Box>
)

export default Markdown
