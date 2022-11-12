import { Heading } from 'theme-ui'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'

const MDHeading: React.FC<HeadingProps> = ({ level, children }) => (
  <Heading as={`h${level}` as React.ElementType}>{children}</Heading>
)

export default MDHeading
