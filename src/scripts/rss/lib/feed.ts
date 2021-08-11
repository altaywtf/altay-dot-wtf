import fs from 'fs'
import { SITE_URL } from 'config'
import { Feed, Item, FeedOptions } from 'feed'
import { PUBLIC_FOLDER_PATH } from 'utils/fs'

const createFeed = async ({
  path,
  items,
  options,
}: {
  path: string
  items: Item[]
  options: Omit<FeedOptions, 'id' | 'copyright'>
}) => {
  const feed = new Feed({
    id: `${SITE_URL}/${path}`,
    copyright: SITE_URL,
    link: `${SITE_URL}/${path}`,
    language: 'en',
    feedLinks: {
      rss2: `${SITE_URL}/rss/${path}/feed.xml`,
      json: `${SITE_URL}/rss/${path}/feed.json`,
      atom: `${SITE_URL}/rss/${path}/atom.xml`,
    },
    ...options,
  })

  items.forEach(feed.addItem)

  return feed
}

const createFeedFiles = (name: string, feed: Feed) => {
  fs.mkdirSync(`${PUBLIC_FOLDER_PATH}/rss/${name}`, { recursive: true })
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/rss/${name}/feed.xml`, feed.rss2())
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/rss/${name}/feed.json`, feed.json1())
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/rss/${name}/atom.xml`, feed.atom1())
}

export const createAndSaveFeed = async (params: Parameters<typeof createFeed>[0]) => {
  createFeedFiles(params.path, await createFeed(params))
}
