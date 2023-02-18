import axios from 'axios'
import type { NowJSONMusic } from './types'

type AppleMusicResource = {
  id: string
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

export const fetchMusic = async (): Promise<NowJSONMusic[]> => {
  const URL = 'https://api.music.apple.com/v1/me/recent/played'

  const response = await axios.get<AppleMusicRecentlyPlayedResourcesResponse>(URL, {
    headers: {
      Authorization: process.env.APPLE_MUSIC_DEV_TOKEN as string,
      'Music-User-Token': process.env.APPLE_MUSIC_USER_TOKEN as string,
    },
  })

  const albums = response.data.data
    .filter((resource) => resource.type == 'albums' || resource.type == 'stations')
    .filter((resource) => !resource.attributes.name.includes('Altay'))
    .filter((resource) => !!resource.attributes?.artwork?.url)
    .slice(0, 6)

  return await Promise.all(
    albums.map(async (album) => ({
      title: album.attributes.name,
      creator: album.attributes.artistName || album.attributes.name,
      url: album.attributes.url,
      imageURL: album.attributes.artwork.url
        .replace('{w}', (album.attributes.artwork.width || 600).toString())
        .replace('{h}', (album.attributes.artwork.height || 600).toString()),
    })),
  )
}
