import { SITE_URL } from 'config'
import marked from 'marked'
import type { ContentType } from 'types'
import { getContentDirectoryForType } from './fs'

const REGEX_MD_LINKS = /\[([^[]+)?\](\(.[^)]*\))/gm
const REGEX_MD_LINK_URL = /(\(.*\))/gm

const getRelativeMarkdownLinks = (mdLinks: string[]) =>
  mdLinks.filter((mdLink) => {
    const url = mdLink.match(REGEX_MD_LINK_URL)
    return url?.length && url[0].startsWith('(.')
  })

export const transformRelativeMarkdownLinks = (contentType: ContentType, markdown: string) => {
  const mdLinks = markdown.match(REGEX_MD_LINKS)

  if (mdLinks?.length) {
    const relativeMdLinks = getRelativeMarkdownLinks(mdLinks)

    relativeMdLinks.forEach((mdLink) => {
      const [matchedURL] = mdLink.match(REGEX_MD_LINK_URL) as [string]
      let url = matchedURL.split('(')[1].split(')')[0]

      if (url.startsWith('..')) {
        url = url
          .split('..')
          .filter((i) => i !== '..')
          .join('')
      } else if (url.startsWith('.')) {
        url = url.replace('.', `/${getContentDirectoryForType(contentType)}`)
      }

      url = url.replace('.md', '')
      const newMdLink = mdLink.replace(matchedURL, `(${url})`)
      markdown = markdown.replace(mdLink, newMdLink)
    })
  }

  return markdown
}

export const convertMarkdownToHTML = (markdown: string) => {
  const html = marked(markdown, {
    baseUrl: SITE_URL,
    gfm: true,
    breaks: true,
  })

  return html
}
