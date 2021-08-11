import '../env'
import { SITE_DESCRIPTION, SITE_TITLE } from 'config'
import { booksCopy } from 'config/copy'
import { getNotes, getNote } from 'api/notes'
import { getBooks, getBook } from 'api/books'
import { mapBookToRssFeedItem, mapNoteToRssFeedItem } from './lib/mappers'
import { createAndSaveFeed } from './lib/feed'

const main = async () => {
  await createAndSaveFeed({
    path: 'notes',
    items: getNotes().map((note) => mapNoteToRssFeedItem(note, getNote(note.slug).markdown)),
    options: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  })

  await createAndSaveFeed({
    path: 'books',
    items: getBooks().map((book) => mapBookToRssFeedItem(book, getBook(book.slug).markdown)),
    options: {
      title: `${SITE_TITLE} - book notes`,
      description: booksCopy.description,
    },
  })
}

main()
