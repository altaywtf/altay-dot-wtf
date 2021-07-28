import type { NextApiRequest, NextApiResponse } from 'next'
import { getContentList } from 'core/api/content'
import { convertMarkdownToHTML } from 'core/api/md'
import { Note } from 'types'

const mapNoteToNoteJSON = (note: Note) => ({
  type: note.type,
  title: note.meta.title,
  description: note.meta.oneliner,
  published_at: note.meta.date,
  image: {},
  html: convertMarkdownToHTML(note.markdown),
  meta: {
    readingTime: note.meta.readingTime,
  },
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = (await getContentList('note')) as Note[]
  res.status(200).json({ data: data.map(mapNoteToNoteJSON) })
}
