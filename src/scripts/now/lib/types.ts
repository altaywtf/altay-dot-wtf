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
      _id: 'life', // @TODO: get this from a markdown
      title: '⏳ Life Updates',
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
    {
      _id: 'shows',
      title: '📺 Watching',
      data: shows,
    },
  ],
})
