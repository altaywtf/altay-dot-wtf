import fs from 'fs'
import { DATA_FOLDER_PATH } from 'utils/fs'

export type Project = {
  title: string
  description: string
  url: string
}

export const getProjects = () =>
  JSON.parse(fs.readFileSync(`${DATA_FOLDER_PATH}/projects.json`).toString()) as Project[]
