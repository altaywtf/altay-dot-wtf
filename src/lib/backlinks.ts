import { hasLink } from 'lib/utils/md'
import { getPostsWithMarkdown } from 'lib/posts'
import { getBooksWithMarkdown } from 'lib/books'

export type Backlink = {
  type: 'post' | 'book'
  title: string
  url: string
}

export const getBacklinks = (url: string): Backlink[] => {
  const posts: Backlink[] = getPostsWithMarkdown()
    .filter(({ markdown }) => hasLink(markdown, url))
    .map(({ post }) => ({
      type: 'post',
      title: post.title,
      url: post.url,
    }))

  const books: Backlink[] = getBooksWithMarkdown()
    .filter(({ markdown }) => hasLink(markdown, url))
    .map(({ book }) => ({
      type: 'book',
      title: `${book.title} by ${book.authors.join(', ')}`,
      url: book.notes.url,
    }))

  return [...posts, ...books]
}