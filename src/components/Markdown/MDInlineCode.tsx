import { Text } from 'theme-ui'
import { CodeProps } from 'react-markdown/lib/ast-to-react'

const MDInlineCode: React.FC<CodeProps> = ({ children }) => (
  <Text sx={{ display: 'inline', fontFamily: 'monospace', color: 'text' }}>{children}</Text>
)

export default MDInlineCode
