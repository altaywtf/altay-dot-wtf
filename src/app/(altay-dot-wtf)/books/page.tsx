import { getBooks } from 'api/books'
import BooksPage from './BooksPage'

const Page = async () => {
  const books = getBooks()
  return <BooksPage data={{ books }} />
}

export default Page
