import type { Bookmark } from 'types'
import { SITE_URL } from 'config'
import axios from 'axios'

type RaindropBookmark = {
  title: string
  excerpt: string
  link: string
  domain: string
}

type RaindropResponse = {
  items: RaindropBookmark[]
}

const mapRaindropBookmarkToBookmark = (raindropBookmark: RaindropBookmark): Bookmark => ({
  type: 'bookmark',
  title: raindropBookmark.title,
  description: raindropBookmark.excerpt,
  host: raindropBookmark.domain,
  url: `${raindropBookmark.link}?ref=${SITE_URL}`,
})

export const fetchBookmarks = async () => {
  try {
    const response = await axios.get<RaindropResponse>(
      'https://api.raindrop.io/rest/v1/raindrops/0?search=[{"key": "tag", "val": "altay-dot-wtf"}]',
      {
        headers: {
          authorization: `Bearer ${process.env.RAINDROP_API_KEY}`,
        },
      },
    )

    return response.data.items.map(mapRaindropBookmarkToBookmark)
  } catch (error) {
    return []
  }
}
