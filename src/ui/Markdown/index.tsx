'use client'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import slug from 'remark-slug'
import { MDCodeBlock } from './MDCodeBlock'
import { MDLink } from './MDLink'

const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <article className="prose prose-neutral dark:prose-invert prose-headings:mb-1 prose-pre:m-0 prose-pre:p-0 prose-img:m-auto prose-img:rounded">
    <ReactMarkdown
      remarkPlugins={[slug, gfm]}
      components={{
        a: (props) => <MDLink href={props.href || ''}>{props.children}</MDLink>,

        code: (props) => {
          const { className, inline, children, ...rest } = props

          if (inline) {
            return (
              <code {...rest} className={className}>
                {children}
              </code>
            )
          }

          return <MDCodeBlock {...props} />
        },
      }}
    >
      {children}
    </ReactMarkdown>
  </article>
)

export default Markdown
