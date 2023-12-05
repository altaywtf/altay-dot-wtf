import { getBooksWithMarkdown } from '@/lib/books'
import { getPostsWithMarkdown } from '@/lib/posts'
import { hasLink } from '@/lib/utils/md'

export type Backlink = {
  title: string
  type: 'book' | 'post'
  url: string
}

export const getBacklinks = (url: string): Backlink[] => {
  const posts: Backlink[] = getPostsWithMarkdown()
    .filter(({ markdown }) => hasLink(markdown, url))
    .map(({ post }) => ({
      title: post.title,
      type: 'post',
      url: post.url,
    }))

  const books: Backlink[] = getBooksWithMarkdown()
    .filter(({ markdown }) => hasLink(markdown, url))
    .map(({ book }) => ({
      title: `${book.title} by ${book.authors.join(', ')}`,
      type: 'book',
      url: book.notes.url,
    }))

  return [...posts, ...books]
}
