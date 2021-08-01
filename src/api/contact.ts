import fs from 'fs'
import { DATA_FOLDER_PATH } from 'utils/fs'

export type ContactLink = {
  title: 'Email' | 'Twitter' | 'Github'
  url: string
}

export const getContactLinks = () =>
  JSON.parse(fs.readFileSync(`${DATA_FOLDER_PATH}/contact-links.json`).toString()) as ContactLink[]
