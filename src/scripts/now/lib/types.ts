export type NowJSONMusic = {
  title: string
  creator: string
  url: string
  imageURL: string
}

export type NowJSONBook = {
  title: string
  subtitle: string
  author: string
  url: string
  imageURL: string
}

export type NowJSONShow = {
  title: string
  url: string
  imageURL: string
}

export type NowJSON = {
  updatedAt: string
  sections: [
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
    {
      _id: 'shows'
      data: NowJSONShow[]
      title: string
    },
  ]
}

export const createNowJSON = ({
  books,
  music,
  shows,
}: {
  books: NowJSONBook[]
  music: NowJSONMusic[]
  shows: NowJSONShow[]
}): NowJSON => ({
  updatedAt: new Date().toISOString(),
  sections: [
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
    {
      _id: 'shows',
      title: '📺 Watching',
      data: shows,
    },
  ],
})
