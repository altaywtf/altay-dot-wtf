export type NowJSONMusic = {
  title: string
  creator: string
  url: string
  imageURL: string
}

export type NowJSONBook = {
  title: string
  creator: string
  url: string
  imageURL: string
}

export type NowJSONShow = {
  title: string
  url: string
  imageURL: string
}

type NowJSONSectionSource = {
  url: string
  label: string
}

export type NowJSON = {
  updatedAt: string
  sections: [
    {
      _id: 'life'
      data: string
      title: string
      source: null
    },
    {
      _id: 'books'
      data: NowJSONBook[]
      title: string
      source: NowJSONSectionSource
    },
    {
      _id: 'music'
      data: NowJSONMusic[]
      title: string
      source: NowJSONSectionSource
    },
    {
      _id: 'shows'
      data: NowJSONShow[]
      title: string
      source: NowJSONSectionSource
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
      source: null,
      data: "This is my final month in [Klarna](https://www.klarna.com/) and I'll be joining [Amie](https://amie.so) in August.",
    },
    {
      _id: 'books',
      title: '📚 Reading',
      data: books,
      source: {
        label: 'Oku',
        url: 'https://oku.club/user/altaywtf',
      },
    },
    {
      _id: 'music',
      title: '🎧 Listening',
      data: music,
      source: {
        label: 'Apple Music',
        url: 'https://music.apple.com/profile/altaywtf',
      },
    },
    {
      _id: 'shows',
      title: '📺 Watching',
      source: {
        label: 'ShowRSS',
        url: 'https://showRSS.info',
      },
      data: shows,
    },
  ],
})
