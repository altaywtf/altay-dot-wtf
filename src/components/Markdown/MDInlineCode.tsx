import { Text } from 'theme-ui'

const MDInlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text sx={{ display: 'inline', fontFamily: 'monospace', color: 'text' }}>{children}</Text>
)

export default MDInlineCode
