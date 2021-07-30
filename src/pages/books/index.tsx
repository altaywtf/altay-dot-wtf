import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import type { BooksJSON } from 'types'
import { booksCopy } from 'config/copy'
import { Box } from 'rebass'
import PageHeader from 'components/PageHeader'
import BookList from 'components/Book/BookList'
import { readBooksJSON } from 'scripts/books/lib/booksJSON'

export const getStaticProps: GetStaticProps<{ data: BooksJSON }> = () => ({
  props: {
    data: readBooksJSON(),
  },
})

const BooksPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader {...booksCopy} />
    <Box m={4} />
    <BookList data={data.books} />
  </>
)

export default BooksPage
