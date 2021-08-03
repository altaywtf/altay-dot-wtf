import fs from 'fs'
import marked from 'marked'
import { SITE_URL } from 'config'
import { DATA_FOLDER_PATH } from './fs'

const REGEX_MD_LINKS = /\[([^[]+)?\](\(.[^)]*\))/gm
const REGEX_MD_LINK_URL = /(\(.*\))/gm

const getMarkdownLinks = (markdown: string) => markdown.match(REGEX_MD_LINKS) || []

export const getRelativeMarkdownLinks = (markdown: string) =>
  getMarkdownLinks(markdown).filter((mdLink) => {
    const url = mdLink.match(REGEX_MD_LINK_URL)
    return url?.length && url[0].startsWith('(.')
  })

export const getAbsoluteMarkdownLinks = (markdown: string) =>
  getMarkdownLinks(markdown).filter((mdLink) => {
    const url = mdLink.match(REGEX_MD_LINK_URL)
    return url?.length && url[0].startsWith('(/')
  })

export const extractUrlFromMarkdownLink = (markdownLink: string) => {
  const [matchedURL] = markdownLink.match(REGEX_MD_LINK_URL) as [string]
  return matchedURL.split('(')[1].split(')')[0]
}

export const hasLink = (markdown: string, to: string) =>
  getAbsoluteMarkdownLinks(markdown)
    .map(extractUrlFromMarkdownLink)
    .some((url) => url.startsWith(to))

export const transformRelativeMarkdownLinks = (pathInDataFolder: string, markdown: string) => {
  getRelativeMarkdownLinks(markdown).forEach((mdLink) => {
    const extractedURL = extractUrlFromMarkdownLink(mdLink)
    let transformedURL = extractedURL

    // in a different folder
    if (transformedURL.startsWith('..')) {
      transformedURL = transformedURL
        .split('..')
        .filter((i) => i !== '..')
        .join('')
    }

    // `./`, probably in the same folder
    if (transformedURL.startsWith('.')) {
      const path = pathInDataFolder.split('/')[1]
      transformedURL = transformedURL.replace('.', `/${path}`)
    }

    // just in case
    transformedURL = transformedURL.replace('.md', '')

    const newMdLink = mdLink.replace(extractedURL, transformedURL)
    markdown = markdown.replace(mdLink, newMdLink)
  })

  return markdown
}

export const readMarkdownFile = (pathInDataFolder: string) => {
  const normalizedPath = pathInDataFolder.startsWith('/')
    ? pathInDataFolder
    : `/${pathInDataFolder}`

  const file = fs.readFileSync(`${DATA_FOLDER_PATH}${normalizedPath}`, 'utf-8')
  return transformRelativeMarkdownLinks(pathInDataFolder, file)
}

export const convertMarkdownToHTML = (markdown: string) => {
  const html = marked(markdown, {
    baseUrl: SITE_URL,
    gfm: true,
    breaks: true,
  })

  return html
}
