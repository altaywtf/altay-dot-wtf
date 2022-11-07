import { Text } from 'theme-ui'

const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text as="p" marginTop={1} marginBottom={3} marginX={0}>
    {children}
  </Text>
)

export default Paragraph
