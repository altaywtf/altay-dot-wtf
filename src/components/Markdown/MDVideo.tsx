import { Box } from 'rebass'

type Props = {
  src: string
}

const MDVideo: React.FC<Props> = ({ src }) => (
  <Box my={3} sx={{ borderRadius: 'default' }}>
    <video src={src} width="100%" controls />
  </Box>
)

export default MDVideo
