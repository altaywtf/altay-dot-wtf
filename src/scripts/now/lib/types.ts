export type NowJSONMusic = {
  title: string
  creator: string
  url: string
  coverImageURL: string
}

export type NowJSONBook = {
  title: string
  creator: string
  url: string
  coverImageURL: string
}

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

export const createNowJSON = ({
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
