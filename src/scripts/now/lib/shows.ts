import RssParser from 'rss-parser'
import uniqBy from 'lodash.uniqby'
import axios from 'axios'
import { NowJSONShow } from './types'

type ShowRssFeed = {
  title: string
}

type ShowRssFeedItem = {
  title: string
  isoDate: string
  'tv:external_id': string
  'tv:show_name': string
}

type TvMazeShow = {
  name: string
  url: string
  image: {
    original: string
  }
}

export const fetchShows = async (): Promise<NowJSONShow[]> => {
  const SHOW_RSS_FEED_URL =
    'http://showrss.info/user/256918.rss?namespaces=true&name=null&quality=null&re=null'

  const rssParser = new RssParser<ShowRssFeed, ShowRssFeedItem>({
    customFields: {
      item: ['tv:external_id', 'tv:show_name'],
    },
  })

  const { items } = await rssParser.parseURL(SHOW_RSS_FEED_URL)
  const uniqueItems = uniqBy(items, (i) => i['tv:external_id'])

  const series = await Promise.all(
    uniqueItems.map(async (item) => {
      const { data } = await axios.get<TvMazeShow>(
        `https://api.tvmaze.com/shows/${item['tv:external_id']}`,
      )

      return {
        title: data.name,
        url: data.url,
        imageURL: data.image.original,
      }
    }),
  )

  return series.sort((a, b) => a.title.localeCompare(b.title))
}
