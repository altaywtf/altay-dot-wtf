import '../env'
import type { Note } from 'types'
import fs from 'fs'
import { Feed, Item, FeedOptions } from 'feed'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'config'
import { booksCopy } from 'config/copy'
import { getContentList } from 'core/api/content'
import { PUBLIC_FOLDER_PATH } from 'utils/fs'
import { mapBookToRssFeedItem, mapNoteToRssFeedItem } from './lib/mappers'
import { readBooksJSON } from 'scripts/books/lib/booksJSON'

const generateRSS = async ({
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

const createFiles = (name: string, feed: Feed) => {
  fs.mkdirSync(`${PUBLIC_FOLDER_PATH}/rss/${name}`, { recursive: true })
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/rss/${name}/feed.xml`, feed.rss2())
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/rss/${name}/feed.json`, feed.json1())
  fs.writeFileSync(`${PUBLIC_FOLDER_PATH}/rss/${name}/atom.xml`, feed.atom1())
}

const main = async () => {
  const notes = (await getContentList('note')) as Note[]
  const notesRSS = await generateRSS({
    path: 'notes',
    items: notes.map(mapNoteToRssFeedItem),
    options: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  })
  createFiles('notes', notesRSS)

  const { books } = readBooksJSON()
  const booksRSS = await generateRSS({
    path: 'books',
    items: books.map(mapBookToRssFeedItem),
    options: {
      title: `${SITE_TITLE} - book notes`,
      description: booksCopy.description,
    },
  })
  createFiles('books', booksRSS)
}

main()
