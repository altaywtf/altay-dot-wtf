import { Text } from 'theme-ui'

const MDInlineCode: React.FC = ({ children }) => (
  <Text sx={{ display: 'inline', fontFamily: 'monospace', color: 'textInlineCode' }}>
    {children}
  </Text>
)

export default MDInlineCode
