import type { InferGetStaticPropsType } from 'next'
import type { Note } from 'types'
import { notesCopy } from 'config/copy'
import { getStaticPropsForContentList } from 'core/api/page'
import { Box } from 'rebass'
import PageHeader from 'components/PageHeader'
import NoteList from 'components/Notes/NoteList'

export const getStaticProps = getStaticPropsForContentList<Note>('note')

const NotesPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data }) => (
  <>
    <PageHeader {...notesCopy} />
    <Box m={4} />
    <NoteList data={data} />
  </>
)

export default NotesPage
