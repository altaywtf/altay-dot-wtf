import type { Item } from 'feed'
import type { Book } from 'api/books'
import type { Note } from 'api/notes'
import { SITE_URL } from 'config'
import { convertMarkdownToHTML } from 'utils/md'
import { getOpenGraphImage } from 'utils/openGraph'
import { sanitizeHtml } from 'utils/sanitize'
import { author } from './constants'

export const mapNoteToRssFeedItem = (note: Note, markdown: string): Item => ({
  date: new Date(note.date),
  title: note.title,
  description: note.oneliner,
  author: [author],
  link: `${SITE_URL}/notes/${note.slug}`,
  content: convertMarkdownToHTML(markdown),
  image: sanitizeHtml(
    getOpenGraphImage({
      type: 'note',
      title: note.title,
      oneliner: note.oneliner,
    }).url,
  ),
})

export const mapBookToRssFeedItem = (book: Book, markdown: string): Item => ({
  date: new Date(book.dateRead),
  title: `${book.title} by ${book.authors.join(',')}`,
  description: book.quote,
  author: [author],
  link: SITE_URL + book.notes.url,
  content: convertMarkdownToHTML(markdown),
  image: sanitizeHtml(
    getOpenGraphImage({
      type: 'book',
      title: book.title,
      author: book.authors.join(', '),
      coverImageURL: SITE_URL + book.coverImage.url,
    }).url,
  ),
})
