import { META_IMAGE_HEIGHT, META_IMAGE_WIDTH } from 'config'
import { OpenGraphImages } from 'next-seo/lib/types'

const OG_IMAGE_SERVICE_BASE_URL = `https://og-image.altay.wtf/api`

type Note = {
  type: 'note'
  title: string
  oneliner: string
}

type Book = {
  type: 'book'
  title: string
  author: string
  coverImageURL: string
}

type Page = {
  type: 'page'
  title: string
  oneliner: string
}

type OpenGraphImageQueryParams = Note | Book | Page

export const getOpenGraphImage = (params: OpenGraphImageQueryParams): OpenGraphImages => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value)
  })

  const url = new URL(OG_IMAGE_SERVICE_BASE_URL) + `?${searchParams}`

  return {
    alt: params?.title || '',
    width: META_IMAGE_WIDTH,
    height: META_IMAGE_HEIGHT,
    url,
  }
}
