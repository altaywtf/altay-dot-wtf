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
  life,
  books,
  music,
  shows,
}: {
  life: string
  books: NowJSONBook[]
  music: NowJSONMusic[]
  shows: NowJSONShow[]
}): NowJSON => ({
  updatedAt: new Date().toISOString(),
  sections: [
    {
      _id: 'life',
      title: '⏳ Life Updates',
      data: life,
    },
    {
      _id: 'books',
      title: '📚 Reading',
      data: [
        {
          author: 'Ryan Singer',
          imageURL: '/images/books/shape-up/cover.png',
          subtitle: 'Stop Running in Circles and Ship Work that Matters',
          title: 'Shape Up',
          url: 'https://basecamp.com/shapeup',
        },
        ...books,
      ],
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
