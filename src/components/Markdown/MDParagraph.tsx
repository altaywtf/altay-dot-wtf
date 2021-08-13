import { Text } from 'theme-ui'

const Paragraph: React.FC = ({ children }) => (
  <Text as="p" marginY={3} marginX={0} color="textSecondary">
    {children}
  </Text>
)

export default Paragraph
