import type { CodeProps } from 'react-markdown/lib/ast-to-react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import dark from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'

SyntaxHighlighter.registerLanguage('tsx', tsx)

export const MDCodeBlock: React.FC<CodeProps> = (props) => {
  const language = props.className?.replace(/language-/, '') || 'tsx'
  const children = String(props.children).replace(/\n$/, '')

  return (
    <SyntaxHighlighter style={dark} language={language}>
      {children}
    </SyntaxHighlighter>
  )
}
