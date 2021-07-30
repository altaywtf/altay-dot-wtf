import type { Book, Note } from 'types'
import { SITE_URL } from 'config'
import { convertMarkdownToHTML } from 'core/api/md'
import { Item } from 'feed'
import { getOpenGraphImage } from 'core/api/openGraph'
import { sanitizeHtml } from 'utils/sanitize'
import { author } from './constants'

const mapContentToRssFeedItem = (content: Book | Note): Item => ({
  title: content.meta.title,
  description: content.meta.oneliner,
  author: [author],
  contributor: [author],
  content: convertMarkdownToHTML(content.markdown),
  link: `${SITE_URL}/${content.type}s/${content.slug}`,
  date: new Date(content.meta.date),
})

export const mapNoteToRssFeedItem = (note: Note): Item => ({
  ...mapContentToRssFeedItem(note),
  image: sanitizeHtml(
    getOpenGraphImage({
      type: 'note',
      title: note.meta.title,
      oneliner: note.meta.oneliner,
    }).url,
  ),
})

export const mapBookToRssFeedItem = (book: Book): Item => ({
  ...mapContentToRssFeedItem(book),
  title: `${book.meta.title} by ${book.meta.author}`,
  image: sanitizeHtml(
    getOpenGraphImage({
      type: 'book',
      title: book.meta.title,
      author: book.meta.author,
      coverImageURL: book.meta.coverImage.remoteURL,
    }).url,
  ),
})
