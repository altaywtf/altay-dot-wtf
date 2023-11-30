import { SITE_TITLE } from 'config'
import { getBook, getBooks } from 'lib/books'
import { NextRequest } from 'next/server'

import { createFeed, mapBookToRssFeedItem } from '../../lib'

export const GET = async (request: NextRequest, { params }: { params: { type: string } }) => {
  const feed = createFeed({
    items: getBooks().map((book) => mapBookToRssFeedItem(book, getBook(book.slug).markdown)),
    options: {
      title: `${SITE_TITLE} - book notes`,
    },
    path: 'books',
  })

  switch (params.type) {
    case 'rss':
    default:
      return new Response(feed.rss2(), {
        headers: {
          'content-type': 'application/rss+xml; charset=utf-8',
        },
      })

    case 'atom':
      return new Response(feed.atom1(), {
        headers: {
          'content-type': 'application/atom+xml; charset=utf-8',
        },
      })

    case 'json':
      return new Response(feed.json1(), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      })
  }
}
