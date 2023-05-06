import type { Author, Item } from 'feed'
import { SITE_URL } from 'config'
import { convertMarkdownToHTML } from 'lib/utils/md'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { sanitizeHtml } from 'lib/utils/sanitize'
import type { Book } from 'lib/books'
import type { Post } from 'lib/posts'

const author: Author = {
  name: 'Altay',
  email: 'altay@zebrastik.com',
  link: 'https://twitter.com/altaywtf',
}

export const mapPostToRssFeedItem = (post: Post, markdown: string): Item => ({
  date: new Date(post.date),
  title: post.title,
  description: post.oneliner,
  author: [author],
  link: `${SITE_URL}/posts/${post.slug}`,
  content: convertMarkdownToHTML(markdown),
  image: {
    // length: 0, @TODO: this is required
    title: post.title,
    url: sanitizeHtml(
      getOpenGraphImage({
        type: 'post',
        title: post.title,
        oneliner: post.oneliner,
      }).url,
    ),
  },
})

export const mapBookToRssFeedItem = (book: Book, markdown: string): Item => ({
  date: new Date(book.dateRead),
  title: `${book.title} by ${book.authors.join(',')}`,
  description: book.quote,
  author: [author],
  link: SITE_URL + book.notes.url,
  content: convertMarkdownToHTML(markdown),
  image: {
    // length: 0, @TODO: this is required
    title: book.title,
    url: sanitizeHtml(
      getOpenGraphImage({
        type: 'book',
        title: book.title,
        author: book.authors.join(', '),
        coverImageURL: SITE_URL + book.coverImage.url,
      }).url,
    ),
  },
})
