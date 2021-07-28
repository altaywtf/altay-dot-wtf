import type { NextApiRequest, NextApiResponse } from 'next'
import { SITE_URL } from 'config'
import { runMiddleware, cors } from 'core/middlewares'
import { getContentList } from 'core/api/content'
import { convertMarkdownToHTML } from 'core/api/md'
import { Book } from 'types'

const mapBookToBookJSON = (book: Book) => ({
  type: book.type,
  title: book.meta.title,
  description: book.meta.oneliner,
  published_at: book.meta.date,
  image: book.meta.metaImage,
  html: convertMarkdownToHTML(book.markdown),
  meta: {
    authors: book.meta.authors,
    isbn: book.meta.isbn,
    coverImage: {
      ...book.meta.coverImage,
      url: SITE_URL + book.meta.coverImage.url,
    },
    rating: book.meta.rating,
  },
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)
  const data = (await getContentList('book')) as Book[]
  res.status(200).json({ data: data.map(mapBookToBookJSON) })
}
