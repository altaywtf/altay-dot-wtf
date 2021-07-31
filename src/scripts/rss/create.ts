import '../env'
import { Feed, Item, FeedOptions } from 'feed'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'config'
import { booksCopy } from 'config/copy'
import { getNotes, getNote } from 'api/notes'
import { getBooks, getBook } from 'api/books'
import { mapBookToRssFeedItem, mapNoteToRssFeedItem } from './lib/mappers'
import { createFeedFiles } from './lib/fs'

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

const main = async () => {
  const notesRSS = await generateRSS({
    path: 'notes',
    items: getNotes().map((note) => mapNoteToRssFeedItem(note, getNote(note.slug).markdown)),
    options: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  })

  createFeedFiles('notes', notesRSS)

  const booksRSS = await generateRSS({
    path: 'books',
    items: getBooks().map((book) => mapBookToRssFeedItem(book, getBook(book.slug).markdown)),
    options: {
      title: `${SITE_TITLE} - book notes`,
      description: booksCopy.description,
    },
  })

  createFeedFiles('books', booksRSS)
}

main()
