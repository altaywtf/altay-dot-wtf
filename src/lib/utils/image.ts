import sharp from 'sharp'
import { getPlaiceholder } from 'plaiceholder'

type ImageData = {
  buffer: Buffer
  ratio: number
  width: number
  height: number
  blurhash: string
}

export const getImageData = async (buffer: Buffer): Promise<ImageData> => {
  const { width, height } = await sharp(buffer).metadata()

  if (!width || !height) {
    throw new Error('Could not get image data')
  }

  const { base64 } = await getPlaiceholder(buffer)

  return {
    buffer,
    ratio: width / height,
    width,
    height,
    blurhash: base64,
  }
}
