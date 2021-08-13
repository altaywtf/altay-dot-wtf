import { Box, Heading, ThemeUIStyleObject } from 'theme-ui'

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

const MDHeadingStyle: ThemeUIStyleObject = {
  '& > h1, h2': {
    marginTop: 5,
  },
  '& > h3, h4': {
    marginTop: 4,
  },
  '& > h5, h6': {
    margintop: 3,
  },
}

const MDHeading: React.FC<Props> = ({ node, level, children }) => (
  <Box sx={MDHeadingStyle}>
    <Heading id={node.data.id} as={`h${level}` as React.ElementType}>
      {children}
    </Heading>
  </Box>
)

export default MDHeading
