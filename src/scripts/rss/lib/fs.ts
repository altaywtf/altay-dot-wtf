import fs from 'fs'
import { PUBLIC_FOLDER_PATH } from 'utils/fs'
import { Feed } from 'feed'

export const createFeedFiles = (name: string, feed: Feed) => {
  fs.mkdirSync(`${PUBLIC_FOLDER_PATH}/rss/${name}`, { recursive: true })
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/rss/${name}/feed.xml`, feed.rss2())
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/rss/${name}/feed.json`, feed.json1())
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/rss/${name}/atom.xml`, feed.atom1())
}
