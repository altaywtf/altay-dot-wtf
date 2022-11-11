import { hasLink } from 'utils/md'
import { getPostsWithMarkdown } from 'api/posts'
import { getBooksWithMarkdown } from 'api/books'

export type Backlink = {
  type: 'post' | 'book'
  title: string
  url: string
}

type Params = {
  type: Backlink['type']
  slug: string
}

export const getBacklinks = (params: Params): Backlink[] => {
  const url = params.type === 'post' ? `/posts/${params.slug}` : `/books/${params.slug}`

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
