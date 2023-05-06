export type Post = {
  type: 'post'
  title: string
  oneliner: string
}

export type Book = {
  type: 'book'
  title: string
  author: string
  coverImageURL: string
}

export type Page = {
  type: 'page'
  title: string
}

export type ParsedQuery = Post | Book | Page
