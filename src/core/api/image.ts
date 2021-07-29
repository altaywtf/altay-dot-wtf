import fs from 'fs'
import sharp from 'sharp'
import { getPlaiceholder } from 'plaiceholder'
import { PUBLIC_FOLDER_PATH } from 'utils/fs'

type ImageData = {
  buffer: Buffer
  ratio: number
  width: number
  height: number
  blurhash: string
}

export const getImageData = async (url: string): Promise<ImageData> => {
  const buffer = fs.readFileSync(PUBLIC_FOLDER_PATH + url)
  const { width, height } = await sharp(buffer).metadata()

  if (!width || !height) {
    throw new Error('Could not get image data')
  }

  const { base64 } = await getPlaiceholder(url)
  return { buffer, ratio: width / height, width, height, blurhash: base64 }
}
