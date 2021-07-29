import dotenv from 'dotenv'
import fs from 'fs'
import { fetchBooks, NowJSONBook } from './books'
import { fetchMusic, NowJSONMusic } from './music'

export type NowJSON = {
  updatedAt: string
  sections: [
    {
      _id: 'life'
      data: string
      title: string
    },
    {
      _id: 'books'
      data: NowJSONBook[]
      title: string
    },
    {
      _id: 'music'
      data: NowJSONMusic[]
      title: string
    },
  ]
}

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
      data: "This is my final month in [Klarna](https://www.klarna.com/) and I'll be joining [Amie](https://amie.so) in August.",
      title: '⏳ Life updates',
    },
    {
      _id: 'books',
      data: books,
      title: '📚 Reading',
    },
    {
      _id: 'music',
      data: music,
      title: '🎧 Listening',
    },
    // {
    //   _id: 'tv',
    //   data: [],
    //   title: '📺 Watching',
    // },
    // {
    //   _id: 'games',
    //   data: [],
    //   title: '🎮 Playing',
    // },
  ],
})
// --- NowJSON

const generateNowJSON = async () => {
  dotenv.config({ path: './.env.local' })

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

generateNowJSON()
