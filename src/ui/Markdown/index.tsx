'use client'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import slug from 'remark-slug'
import MDCodeBlock from './MDCodeBlock'

const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <article className="prose prose-neutral dark:prose-invert prose-pre:m-0 prose-pre:p-0 prose-img:rounded">
    <ReactMarkdown
      remarkPlugins={[slug, gfm]}
      components={{
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
