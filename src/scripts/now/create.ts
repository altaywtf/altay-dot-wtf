import '../env'
import fs from 'fs'
import { DATA_FOLDER_PATH } from 'utils/fs'
import { createNowJSON } from './lib/types'
import { fetchBooks } from './lib/books'
import { fetchMusic } from './lib/music'

const main = async () => {
  fs.writeFileSync(`${DATA_FOLDER_PATH}/now.json`, JSON.stringify({}, null, 2))

  const books = await fetchBooks({
    userToken: process.env.OKU_USER_TOKEN as string,
  })

  const music = await fetchMusic({
    devToken: process.env.APPLE_MUSIC_DEV_TOKEN as string,
    userToken: process.env.APPLE_MUSIC_USER_TOKEN as string,
  })

  const nowJSON = createNowJSON({ books, music })

  fs.writeFileSync(`${DATA_FOLDER_PATH}/now.json`, JSON.stringify(nowJSON, null, 2))
}

main()
