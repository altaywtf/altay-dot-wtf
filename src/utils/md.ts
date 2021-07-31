import fs from 'fs'
import marked from 'marked'
import { SITE_URL } from 'config'
import { DATA_FOLDER_PATH } from './fs'

export const readMarkdownFile = (pathInDataFolder: string) => {
  const normalizedPath = pathInDataFolder.startsWith('/')
    ? pathInDataFolder
    : `/${pathInDataFolder}`

  return fs.readFileSync(`${DATA_FOLDER_PATH}${normalizedPath}`, 'utf-8')
}

export const convertMarkdownToHTML = (markdown: string) => {
  const html = marked(markdown, {
    baseUrl: SITE_URL,
    gfm: true,
    breaks: true,
  })

  return html
}
