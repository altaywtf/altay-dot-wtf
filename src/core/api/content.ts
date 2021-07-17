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
  const meta = await getMeta<T>(contentType, fileName, data, content)

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
  { withDetails = false } = {},
) => {
  const fileNames = getMarkdownFileNames(contentType)

  const contentList = (await Promise.all(
    fileNames.map((slug) => getContentDetails<T>(contentType, slug)),
  )) as T[]

  if (withDetails) {
    return contentList
  }

  return sortContent(contentList.map(minifyContentListItem))
}
