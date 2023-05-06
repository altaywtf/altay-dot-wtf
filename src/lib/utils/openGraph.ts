import { API_URL } from 'config'

const OG_IMAGE_SERVICE_BASE_URL = `${API_URL}/og`

type OGImageParamsPost = {
  type: 'post'
  title: string
  oneliner: string
}

type OGImageParamsBook = {
  type: 'book'
  title: string
  author: string
  coverImageURL: string
}

type OGImageParamsPage = {
  type: 'page'
  title: string
}

type OGImageParams = OGImageParamsPost | OGImageParamsBook | OGImageParamsPage

export const getOpenGraphImage = (params: OGImageParams) => {
  const searchParams = Object.entries(params).reduce((acc, [key, value]) => {
    acc.append(key, value)
    return acc
  }, new URLSearchParams())

  const url = new URL(OG_IMAGE_SERVICE_BASE_URL) + `?${searchParams.toString()}`

  return {
    alt: params?.title || '',
    url,
  }
}
