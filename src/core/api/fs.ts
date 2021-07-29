import type { ContentType } from 'types'
import { join } from 'path'
import fs from 'fs'
import { transformRelativeMarkdownLinks } from './md'

export const getContentDirectoryForType = (type: ContentType) => {
  switch (type) {
    case 'note':
      return 'notes'
    case 'book':
      return 'books'
    default:
      return type
  }
}

const getContentDirectoryPath = (contentType: ContentType) =>
  join(process.cwd(), 'data', getContentDirectoryForType(contentType))

export const getMarkdownFileNames = (contentType: ContentType) => {
  const directory = getContentDirectoryPath(contentType)

  try {
    return fs
      .readdirSync(directory, 'utf-8')
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.split('.md'))
      .map(([fileName]) => fileName)
  } catch (e) {
    return []
  }
}

export const readMarkdownFile = (contentType: ContentType, fileName: string) => {
  const directory = getContentDirectoryPath(contentType)
  const filePath = `${directory}/${fileName}.md`

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return transformRelativeMarkdownLinks(contentType, content)
  } catch (e) {
    return ''
  }
}
