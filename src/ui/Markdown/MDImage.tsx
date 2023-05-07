import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type Props = {
  alt: string
  src: string
}

const MDImage: React.FC<Props> = ({ src, alt }) => (
  <div>
    <Zoom wrapElement="span">
      <div>
        <Image alt={alt} src={src} fill style={{ objectFit: 'contain' }} />
      </div>
    </Zoom>
  </div>
)

export default MDImage
