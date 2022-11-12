import { Text } from 'theme-ui'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'

const Paragraph: React.FC<ReactMarkdownProps> = ({ children }) => (
  <Text as="p" marginTop={1} marginBottom={3} marginX={0}>
    {children}
  </Text>
)

export default Paragraph
