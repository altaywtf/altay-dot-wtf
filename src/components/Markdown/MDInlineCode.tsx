import { Text } from 'rebass'

const MDInlineCode: React.FC = ({ children }) => (
  <Text display="inline" fontFamily="monospace" color="textInlineCode">
    {children}
  </Text>
)

export default MDInlineCode
