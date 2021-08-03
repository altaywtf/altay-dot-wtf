import { hasLink } from 'utils/md'
import { getNotesWithMarkdown } from './notes'
import { getBooksWithMarkdown } from './books'

export type Backlink = {
  type: 'note' | 'book'
  title: string
  url: string
}

export const getBacklinks = (url: string): Backlink[] => {
  const notes: Backlink[] = getNotesWithMarkdown()
    .filter(({ markdown }) => hasLink(markdown, url))
    .map(({ note }) => ({
      type: 'note',
      title: note.title,
      url: note.url,
    }))

  const books: Backlink[] = getBooksWithMarkdown()
    .filter(({ markdown }) => hasLink(markdown, url))
    .map(({ book }) => ({
      type: 'book',
      title: `${book.title} by ${book.authors.join(', ')}`,
      url: book.notes.url,
    }))

  return [...notes, ...books]
}
