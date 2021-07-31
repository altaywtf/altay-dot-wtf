import '../env'
import { createNowJSON } from './lib/types'
import { fetchBooks } from './lib/books'
import { fetchMusic } from './lib/music'
import { writeNowJSON } from './lib/nowJSON'

const main = async () => {
  const books = await fetchBooks({
    userToken: process.env.OKU_USER_TOKEN as string,
  })

  const music = await fetchMusic({
    devToken: process.env.APPLE_MUSIC_DEV_TOKEN as string,
    userToken: process.env.APPLE_MUSIC_USER_TOKEN as string,
  })

  writeNowJSON(createNowJSON({ books, music }))
}

main()
