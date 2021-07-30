import fs from 'fs'
import { DATA_FOLDER_PATH } from 'utils/fs'
import type { BaseBookWithMeta, Book } from './types'

export const createBookNotes = (baseBookWithMeta: BaseBookWithMeta): Book['notes'] => {
  fs.writeFileSync(`${DATA_FOLDER_PATH}/books/${baseBookWithMeta.slug}.md`, '')

  return {
    url: `/books/${baseBookWithMeta.slug}`,
  }
}
