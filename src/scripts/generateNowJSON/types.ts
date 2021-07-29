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
