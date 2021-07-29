import type { Content, ContentType } from 'types'
import matter from 'gray-matter'
import { getMarkdownFileNames, readMarkdownFile } from './fs'
import { getMeta } from './meta'
import { sortContent } from './utils'

const getMarkdownContentDetails = async <T extends Content>(
  contentType: ContentType,
  fileName: string,
) => {
  const md = readMarkdownFile(contentType, fileName)
  const { content, data } = matter(md)
  const meta = await getMeta<T>({ type: contentType, slug: fileName, meta: data, content })

  return {
    type: contentType,
    slug: fileName,
    markdown: content,
    meta,
  } as T
}

export const getContentDetails = <T extends Content>(contentType: ContentType, fileName: string) =>
  getMarkdownContentDetails<T>(contentType, fileName)

const minifyContentListItem = <T extends Content>(data: T) => ({ ...data, markdown: '' } as T)

export const getContentList = async <T extends Content>(
  contentType: ContentType,
  { minify = false } = {},
) => {
  const fileNames = getMarkdownFileNames(contentType)

  let contentList = (await Promise.all(
    fileNames.map((slug) => getContentDetails<T>(contentType, slug)),
  )) as T[]

  if (minify) {
    contentList = contentList.map(minifyContentListItem)
  }

  return sortContent(contentList)
}
