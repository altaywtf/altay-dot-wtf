import fs from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { DATA_FOLDER_PATH } from 'utils/fs'
import { readMarkdownFile } from 'utils/md'

type NoteFrontMatter = {
  title: string
  oneliner: string
  date: string
}

export type Note = NoteFrontMatter & {
  slug: string
  url: string
  readingTime: string
}

export const getNote = (slug: string) => {
  const file = readMarkdownFile(`/notes/${slug}.md`)
  const { content: markdown, data } = matter(file)

  const note = {
    ...(data as NoteFrontMatter),
    slug,
    url: `/notes/${slug}`,
    readingTime: readingTime(markdown).text,
  } as Note

  return { note, markdown }
}

export const getNotes = () => {
  const NOTES_FOLDER_PATH = `${DATA_FOLDER_PATH}/notes`

  const slugs = fs
    .readdirSync(NOTES_FOLDER_PATH, 'utf-8')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.split('.md'))
    .map(([fileName]) => fileName)

  return slugs
    .map(getNote)
    .map((n) => n.note)
    .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1))
}