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

const MDHeading: React.FC<Props> = (props) => {
  return (
    <Box sx={MDHeadingStyle}>
      <Heading as={`h${props.level}` as any} id={props.node.data.id}>
        {props.children}
      </Heading>
    </Box>
  )
}

export default MDHeading
