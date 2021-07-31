import axios from 'axios'
import type { NowJSONMusic } from './types'

type AppleMusicResource = {
  type: string
  attributes: {
    artwork: {
      width: number
      height: number
      url: string
    }
    artistName: string
    name: string
    url: string
  }
}

type AppleMusicRecentlyPlayedResourcesResponse = {
  data: AppleMusicResource[]
}

export const fetchMusic = async ({
  devToken,
  userToken,
}: {
  devToken: string
  userToken: string
}): Promise<NowJSONMusic[]> => {
  const URL = 'https://api.music.apple.com/v1/me/library/recently-added'

  const response = await axios.get<AppleMusicRecentlyPlayedResourcesResponse>(URL, {
    headers: {
      Authorization: devToken,
      'Music-User-Token': userToken,
    },
  })

  return response.data.data
    .filter((resource) => resource.type == 'library-albums')
    .filter((resource) => !!resource.attributes?.artwork?.url)
    .map((resource) => ({
      title: resource.attributes.name,
      creator: resource.attributes.artistName,
      url: resource.attributes.url,
      imageURL: resource.attributes.artwork.url
        .replace('{w}', (resource.attributes.artwork.width || 600).toString())
        .replace('{h}', (resource.attributes.artwork.height || 600).toString()),
    }))
}
