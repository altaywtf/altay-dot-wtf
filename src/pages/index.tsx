import type { Note, Book } from 'types'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useCallback } from 'react'
import { homeCopy } from 'config/copy'
import { getContentList } from 'core/api/content'
import { Box, Heading } from 'rebass'
import PageHeader from 'components/PageHeader'
import HomeLink from 'components/Home/HomeLink'
import NoteList from 'components/Notes/NoteList'
import BookList from 'components/Book/BookList'

type Sections = [
  {
    title: string
    type: 'notes'
    data: Note[]
  },
  {
    title: string
    type: 'books'
    data: Book[]
  },
]

export const getStaticProps: GetStaticProps<{ sections: Sections }> = async () => {
  const sections: Sections = [
    {
      title: homeCopy.notes.title,
      type: 'notes',
      data: (await getContentList<Note>('note')).filter((note) => !note.meta.draft).slice(0, 5),
    },
    {
      title: homeCopy.books.title,
      type: 'books',
      data: (await getContentList<Book>('book')).slice(0, 5),
    },
  ]

  return { props: { sections } }
}

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ sections }) => {
  const renderSection = useCallback((section: Sections[number]) => {
    switch (section.type) {
      case 'notes':
        return (
          <>
            <NoteList data={section.data} />
            <HomeLink label={homeCopy.notes.viewAll} href={homeCopy.notes.href} />
          </>
        )

      case 'books':
        return (
          <>
            <BookList data={section.data} />
            <HomeLink label={homeCopy.books.viewAll} href={homeCopy.books.href} />
          </>
        )
    }
  }, [])

  return (
    <>
      <PageHeader title={homeCopy.title} description={homeCopy.description} />

      <Box my={2}>
        {homeCopy.links.map((link) => (
          <HomeLink key={link.href} {...link} />
        ))}
      </Box>

      {sections.map((section) => (
        <Box key={section.title} my={6}>
          <Heading as="h2" fontSize={2}>
            {section.title}
          </Heading>

          <Box my={3}>{renderSection(section)}</Box>
        </Box>
      ))}
    </>
  )
}

export default Home
