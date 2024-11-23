export type Post = {
  oneliner: string;
  title: string;
  type: "post";
};

export type Book = {
  author: string;
  coverImagePath: string;
  title: string;
  type: "book";
};

export type Page = {
  title: string;
  type: "page";
};

export type ParsedQuery = Book | Page | Post;
