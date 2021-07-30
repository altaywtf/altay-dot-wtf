import type { Book, Note } from 'types'
import { SITE_URL } from 'config'
import { convertMarkdownToHTML } from 'core/api/md'
import { Item } from 'feed'
import { getOpenGraphImage } from 'core/api/openGraph'
import { sanitizeHtml } from 'utils/sanitize'
import { author } from './constants'

export const mapNoteToRssFeedItem = (note: Note): Item => ({
  date: new Date(note.meta.date),
  title: note.meta.title,
  description: note.meta.oneliner,
  author: [author],
  link: `${SITE_URL}/notes/${note.slug}`,
  content: convertMarkdownToHTML(note.markdown),
  image: sanitizeHtml(
    getOpenGraphImage({
      type: 'note',
      title: note.meta.title,
      oneliner: note.meta.oneliner,
    }).url,
  ),
})

export const mapBookToRssFeedItem = (book: Book): Item => ({
  date: new Date(book.dateRead),
  title: `${book.title} by ${book.authors.join(',')}`,
  description: book.quote,
  author: [author],
  link: SITE_URL + book.notes.url,
  // content: convertMarkdownToHTML(book.markdown), // @TODO: FIXME
  image: sanitizeHtml(
    getOpenGraphImage({
      type: 'book',
      title: book.title,
      author: book.authors.join(', '),
      coverImageURL: book.remoteCoverImage.url,
    }).url,
  ),
})
