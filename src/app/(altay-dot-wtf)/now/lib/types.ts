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
