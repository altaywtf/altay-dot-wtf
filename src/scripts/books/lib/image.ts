import fs from 'fs'
import axios from 'axios'
import sharp from 'sharp'
import { getImageData } from 'utils/image'
import { PUBLIC_FOLDER_PATH } from 'utils/fs'
import type { BaseBookWithMeta, Book } from './types'

const fetchRemoteImage = async (url: string): Promise<Buffer> => {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  return Buffer.from(response.data, 'base64')
}

const saveBookCoverImage = (slug: string, buffer: Buffer): string => {
  const bookFolderPath = `/images/books/${slug}`
  if (!fs.existsSync(`${PUBLIC_FOLDER_PATH}/${bookFolderPath}`)) {
    fs.mkdirSync(`${PUBLIC_FOLDER_PATH}/${bookFolderPath}`)
  }

  const bookImagePath = `/images/books/${slug}/cover.png`
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/${bookImagePath}`, buffer)

  return bookImagePath
}

export const createBookCoverImage = async (
  baseBookWithMeta: BaseBookWithMeta,
): Promise<Book['coverImage']> => {
  const remoteImage = await fetchRemoteImage(baseBookWithMeta.remoteCoverImage.url)
  const resizedImage = await sharp(remoteImage).resize({ width: 480 }).toBuffer()
  const { blurhash, ratio } = await getImageData(resizedImage)
  const bookImagePath = saveBookCoverImage(baseBookWithMeta.slug, resizedImage)

  return {
    url: bookImagePath,
    blurhash,
    aspectRatio: ratio,
  }
}
