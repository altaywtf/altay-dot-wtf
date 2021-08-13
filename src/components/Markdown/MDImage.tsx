import { Box } from 'theme-ui'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type Props = {
  alt: string
  src: string
}

const MDImage: React.FC<Props> = ({ src, alt }) => (
  <Box my={3}>
    <Zoom zoomMargin={96}>
      <Box
        sx={{
          position: 'relative',
          width: [320, 480, 640],
          height: [200, 300, 400],
        }}
      >
        <Image className="image-markdown" alt={alt} src={src} layout="fill" objectFit="contain" />
      </Box>
    </Zoom>
  </Box>
)

export default MDImage
