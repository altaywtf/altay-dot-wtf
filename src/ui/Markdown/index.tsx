'use client'

import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import slug from 'remark-slug'

type Props = { children: string }

const Markdown: React.FC<Props> = ({ children }) => (
  <article className="prose prose-neutral dark:prose-invert">
    <ReactMarkdown remarkPlugins={[slug, gfm]}>{children}</ReactMarkdown>
  </article>
)

export default Markdown
