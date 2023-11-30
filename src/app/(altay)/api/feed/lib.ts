import type { Book } from 'lib/books'
import type { Post } from 'lib/posts'

import { SITE_URL } from 'config'
import { Author, Feed, FeedOptions, Item } from 'feed'
import { convertMarkdownToHTML } from 'lib/utils/md'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { sanitizeHtml } from 'lib/utils/sanitize'

const author: Author = {
  email: 'altay@zebrastik.com',
  link: 'https://twitter.com/altaywtf',
  name: 'Altay',
}

export const mapPostToRssFeedItem = (post: Post, markdown: string): Item => ({
  author: [author],
  content: convertMarkdownToHTML(markdown),
  date: new Date(post.date),
  description: post.oneliner,
  image: {
    // length: 0, @TODO: this is required
    title: post.title,
    url: sanitizeHtml(
      getOpenGraphImage({
        oneliner: post.oneliner,
        title: post.title,
        type: 'post',
      }).url,
    ),
  },
  link: `${SITE_URL}/posts/${post.slug}`,
  title: post.title,
})

export const mapBookToRssFeedItem = (book: Book, markdown: string): Item => ({
  author: [author],
  content: convertMarkdownToHTML(markdown),
  date: new Date(book.dateRead),
  description: book.quote,
  image: {
    // length: 0, @TODO: this is required
    title: book.title,
    url: sanitizeHtml(
      getOpenGraphImage({
        author: book.authors.join(', '),
        coverImageURL: SITE_URL + book.coverImage.url,
        title: book.title,
        type: 'book',
      }).url,
    ),
  },
  link: SITE_URL + book.notes.url,
  title: `${book.title} by ${book.authors.join(',')}`,
})

export const createFeed = ({
  items,
  options,
  path,
}: {
  items: Item[]
  options: Omit<FeedOptions, 'copyright' | 'id'>
  path: string
}) => {
  const feed = new Feed({
    copyright: SITE_URL,
    feedLinks: {
      atom: `${SITE_URL}/api/feed/${path}/atom`,
      json: `${SITE_URL}/api/feed/${path}/json`,
      rss2: `${SITE_URL}/api/feed/${path}/rss`,
    },
    id: `${SITE_URL}/${path}`,
    language: 'en',
    link: `${SITE_URL}/${path}`,
    ...options,
  })

  items.forEach(feed.addItem)

  return feed
}
