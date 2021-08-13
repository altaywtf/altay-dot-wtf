import type { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Heading, Text, Box } from 'theme-ui'
import { getNote, getNotes, Note } from 'api/notes'
import { Backlink, getBacklinks } from 'api/backlinks'
import { getOpenGraphImage } from 'utils/openGraph'
import { formatDate } from 'utils/date'
import ArtificialBackButton from 'components/ArtificialBackButton'
import Markdown from 'components/Markdown'
import Backlinks from 'components/Backlinks'

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getNotes().map((note) => ({ params: { slug: note.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{
  note: Note
  markdown: string
  backlinks: Backlink[]
}> = ({ params }) => {
  const { note, markdown } = getNote(params?.slug as string)
  const backlinks = getBacklinks(note.url)

  return {
    props: {
      note,
      markdown,
      backlinks,
    },
  }
}

const NotePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  note,
  markdown,
  backlinks,
}) => (
  <>
    <NextSeo
      title={note.title}
      description={note.oneliner}
      openGraph={{
        title: note.title,
        description: note.oneliner,
        type: 'article',
        article: {
          authors: ['Altay Aydemir'],
          modifiedTime: note.date,
        },
        images: [
          getOpenGraphImage({
            type: 'note',
            title: note.title,
            oneliner: note.oneliner,
          }),
        ],
      }}
    />

    <ArtificialBackButton href="/notes" label="Notes" />

    <Box m={[3, 4]} />

    <Heading sx={{ fontSize: [3, 4] }}>{note.title}</Heading>

    <Box m={2} />

    <Text color="textTertiary">
      {formatDate(note.date)}
      <Box sx={{ display: 'inline' }} mx={1}>
        ·
      </Box>
      {note.readingTime}
    </Text>

    <Box m={3} />

    <Markdown>{markdown}</Markdown>

    <Box m={5} />

    <Backlinks sourceType="note" sourceURL={note.url} backlinks={backlinks} />
  </>
)

export default NotePage
