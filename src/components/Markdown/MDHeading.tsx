import { Heading } from 'theme-ui'

type Props = {
  level: number
  node: {
    type: 'heading'
    depth: number
    data: {
      id: string
    }
  }
}

const MDHeading: React.FC<Props> = ({ node, level, children }) => (
  <Heading id={node.data.id} as={`h${level}` as React.ElementType}>
    {children}
  </Heading>
)

export default MDHeading
