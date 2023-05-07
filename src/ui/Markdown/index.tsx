'use client'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import slug from 'remark-slug'
import MDLink from './MDLink'
import MDCodeBlock from './MDCodeBlock'
import MDImage from './MDImage'

type Props = { children: string }

const Markdown: React.FC<Props> = ({ children }) => (
  <ReactMarkdown
    remarkPlugins={[slug, gfm]}
    className="text-zinc-300"
    components={{
      h1: (props) => <h1 className="my-3 text-3xl font-bold" {...props} />,
      h2: (props) => <h2 className="my-3 text-2xl font-bold" {...props} />,
      h3: (props) => <h3 className="my-3 text-xl font-bold" {...props} />,
      h4: (props) => <h4 className="my-3 text-lg font-bold" {...props} />,
      h5: (props) => <h5 className="my-3 text-base font-bold" {...props} />,
      h6: (props) => <h6 className="my-3 text-sm font-bold" {...props} />,
      a: (props) => <MDLink {...props} href={props.href || ''} />,
      code: (props) =>
        props.inline ? <span className="font-mono" {...props} /> : <MDCodeBlock {...props} />,
      img: (props) => <MDImage src={props.src || ''} alt={props.alt || ''} />,
      video: (props) => (
        <div className="my-3 rounded">
          <video src={props.src || ''} />
        </div>
      ),
      blockquote: (props) => <blockquote className="border-l-2 bg-zinc-900 px-6 py-2" {...props} />,
      p: (props) => <p className="my-3" {...props} />,
      hr: () => <hr className="my-4" />,
      li: (props) => <li className="my-2 ml-4 list-disc" {...props} />,
    }}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
