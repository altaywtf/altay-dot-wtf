import { Box } from 'theme-ui'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type Props = {
  alt: string
  src: string
}

const MDImage: React.FC<Props> = ({ src, alt }) => (
  <Box as="span" my={3} sx={{ display: 'block' }}>
    <Zoom wrapElement="span">
      <Box
        as="span"
        sx={{
          display: 'block',
          position: 'relative',
          width: [320, 480, 640],
          height: [200, 300, 400],
        }}
      >
        <Image alt={alt} src={src} fill style={{ objectFit: 'contain' }} />
      </Box>
    </Zoom>
  </Box>
)

export default MDImage
