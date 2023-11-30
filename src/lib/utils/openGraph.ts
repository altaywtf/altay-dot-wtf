import { API_URL } from 'config'

const OG_IMAGE_SERVICE_BASE_URL = `${API_URL}/og`

type OGImageParamsPost = {
  oneliner: string
  title: string
  type: 'post'
}

type OGImageParamsBook = {
  author: string
  coverImageURL: string
  title: string
  type: 'book'
}

type OGImageParamsPage = {
  title: string
  type: 'page'
}

type OGImageParams = OGImageParamsBook | OGImageParamsPage | OGImageParamsPost

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
