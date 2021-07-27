import { Text } from 'rebass'

const Paragraph: React.FC = ({ children }) => (
  <Text marginY={3} marginX={0} color="textSecondary" fontSize={[0, 1]}>
    {children}
  </Text>
)

export default Paragraph
