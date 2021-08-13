import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getNotes, Note } from 'api/notes'
import { notesCopy } from 'config/copy'
import NextLink from 'next/link'
import { Box, Text, Link } from 'theme-ui'
import PageHeader from 'components/PageHeader'
import { formatDate } from 'utils/date'

export const getStaticProps: GetStaticProps<{ notes: Note[] }> = () => ({
  props: {
    notes: getNotes(),
  },
})

const NotesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ notes }) => (
  <>
    <PageHeader {...notesCopy} />

    <Box m={4} />

    <Box>
      {notes.map((note) => (
        <Box key={note.slug} mb={4}>
          <NextLink href={note.url} passHref>
            <Link variant="links.title" title={note.title}>
              {note.title}
            </Link>
          </NextLink>

          <Box m={1} />

          <Text color="textSecondary">{note.oneliner}</Text>

          <Box m={1} />

          <Text color="textTertiary">
            {formatDate(note.date)}

            <Box sx={{ display: 'inline' }} mx={1}>
              ·
            </Box>
            {note.readingTime}
          </Text>
        </Box>
      ))}
    </Box>
  </>
)

export default NotesPage
