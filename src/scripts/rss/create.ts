import '../env'
import { SITE_DESCRIPTION, SITE_TITLE } from 'config'
import { booksCopy } from 'config/copy'
import { getPosts, getPost } from 'api/posts'
import { getBooks, getBook } from 'api/books'
import { mapBookToRssFeedItem, mapPostToRssFeedItem } from './lib/mappers'
import { createAndSaveFeed } from './lib/feed'

const main = async () => {
  await createAndSaveFeed({
    path: 'posts',
    items: getPosts().map((note) => mapPostToRssFeedItem(note, getPost(note.slug).markdown)),
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
