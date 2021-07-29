import axios from 'axios'
import type { NowJSONMusic } from './types'

type AppleMusicResource = {
  type: 'albums' | 'playlists' | 'stations'
  attributes: {
    artwork: {
      width: number
      height: number
      url: string
    }
    artistName?: string
    curatorName?: string
    playlistType?: 'user-shared' | 'editorial'
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
  const URL = 'https://api.music.apple.com/v1/me/recent/played'

  const response = await axios.get<AppleMusicRecentlyPlayedResourcesResponse>(URL, {
    headers: {
      Authorization: devToken,
      'Music-User-Token': userToken,
    },
  })

  return response.data.data
    .filter((resource) => resource.type !== 'stations')
    .filter((resource) => resource.attributes?.playlistType !== 'user-shared')
    .map((resource) => ({
      title: resource.attributes.name,
      creator: resource.attributes.artistName || resource.attributes.curatorName || '',
      url: resource.attributes.url,
      coverImageURL: resource.attributes.artwork.url
        .replace('{w}', resource.attributes.artwork.width.toString())
        .replace('{h}', resource.attributes.artwork.height.toString()),
    }))
}
