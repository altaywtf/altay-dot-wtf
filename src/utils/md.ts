import fs from 'fs'
import marked from 'marked'
import { SITE_URL } from 'config'
import { DATA_FOLDER_PATH } from './fs'

const REGEX_MD_LINKS = /\[([^[]+)?\](\(.[^)]*\))/gm
const REGEX_MD_LINK_URL = /(\(.*\))/gm

const getRelativeMarkdownLinks = (mdLinks: string[]) =>
  mdLinks.filter((mdLink) => {
    const url = mdLink.match(REGEX_MD_LINK_URL)
    return url?.length && url[0].startsWith('(.')
  })

const transformRelativeMarkdownLinks = (pathInDataFolder: string, markdown: string) => {
  const mdLinks = markdown.match(REGEX_MD_LINKS)

  if (mdLinks?.length) {
    const relativeMdLinks = getRelativeMarkdownLinks(mdLinks)

    relativeMdLinks.forEach((mdLink) => {
      const [matchedURL] = mdLink.match(REGEX_MD_LINK_URL) as [string]
      let url = matchedURL.split('(')[1].split(')')[0]

      // in a different folder
      if (url.startsWith('..')) {
        url = url
          .split('..')
          .filter((i) => i !== '..')
          .join('')
      }

      // same kind, probably in the same folder
      if (url.startsWith('.')) {
        const path = pathInDataFolder.split('/')[1]
        url = url.replace('.', `/${path}`)
      }

      // just in case
      url = url.replace('.md', '')

      const newMdLink = mdLink.replace(matchedURL, `(${url})`)
      markdown = markdown.replace(mdLink, newMdLink)
    })
  }

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
