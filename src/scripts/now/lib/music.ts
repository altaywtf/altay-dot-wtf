import axios from 'axios'
import type { NowJSONMusic } from './types'

type AppleMusicCatalogAlbum = {
  attributes: {
    url: string
  }
}

const fetchCatalogAlbum = async (albumId: string) => {
  const URL = `https://api.music.apple.com/v1/me/library/albums/${albumId}/catalog`

  const response = await axios.get<{ data: AppleMusicCatalogAlbum[] }>(URL, {
    headers: {
      Authorization: process.env.APPLE_MUSIC_DEV_TOKEN as string,
      'Music-User-Token': process.env.APPLE_MUSIC_USER_TOKEN as string,
    },
  })

  return response.data.data[0]
}

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
  const URL = 'https://api.music.apple.com/v1/me/library/recently-added'

  const response = await axios.get<AppleMusicRecentlyPlayedResourcesResponse>(URL, {
    headers: {
      Authorization: process.env.APPLE_MUSIC_DEV_TOKEN as string,
      'Music-User-Token': process.env.APPLE_MUSIC_USER_TOKEN as string,
    },
  })

  const albums = response.data.data
    .filter((resource) => resource.type == 'library-albums')
    .filter((resource) => !!resource.attributes?.artwork?.url)

  return await Promise.all(
    albums.map(async (album) => ({
      title: album.attributes.name,
      creator: album.attributes.artistName,
      url: (await fetchCatalogAlbum(album.id)).attributes.url,
      imageURL: album.attributes.artwork.url
        .replace('{w}', (album.attributes.artwork.width || 600).toString())
        .replace('{h}', (album.attributes.artwork.height || 600).toString()),
    })),
  )
}
