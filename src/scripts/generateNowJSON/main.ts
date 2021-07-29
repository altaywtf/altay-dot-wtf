import '../env'
import fs from 'fs'
import type { NowJSON, NowJSONBook, NowJSONMusic } from './types'
import { fetchBooks } from './books'
import { fetchMusic } from './music'

const createNowJSON = ({
  books,
  music,
}: {
  books: NowJSONBook[]
  music: NowJSONMusic[]
}): NowJSON => ({
  updatedAt: new Date().toISOString(),
  sections: [
    {
      _id: 'life',
      title: '⏳ Life updates',
      data: "This is my final month in [Klarna](https://www.klarna.com/) and I'll be joining [Amie](https://amie.so) in August.",
    },
    {
      _id: 'books',
      title: '📚 Reading',
      data: books,
    },
    {
      _id: 'music',
      title: '🎧 Listening',
      data: music,
    },
  ],
})

const main = async () => {
  fs.writeFileSync('./data/now.json', JSON.stringify({}, null, 2))

  const books = await fetchBooks({
    userToken: process.env.OKU_USER_TOKEN as string,
  })

  const music = await fetchMusic({
    devToken: process.env.APPLE_MUSIC_DEV_TOKEN as string,
    userToken: process.env.APPLE_MUSIC_USER_TOKEN as string,
  })

  const nowJSON = createNowJSON({ books, music })

  fs.writeFileSync('./data/now.json', JSON.stringify(nowJSON, null, 2))
}

main()
