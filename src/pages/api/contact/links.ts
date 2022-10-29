import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { DATA_FOLDER_PATH } from 'utils/fs'

export type ContactLink = {
  title: 'Email' | 'Twitter' | 'Github' | 'LinkedIn'
  url: string
}

const readContactLinks = () =>
  JSON.parse(fs.readFileSync(`${DATA_FOLDER_PATH}/contact-links.json`).toString()) as ContactLink[]

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ links: readContactLinks() })
}

export default handler
