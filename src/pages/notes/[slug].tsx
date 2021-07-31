import type { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Heading, Text, Box } from 'rebass'
import { getNote, getNotes, Note } from 'api/notes'
import { getOpenGraphImage } from 'utils/openGraph'
import { formatDate } from 'utils/date'
import { useScrollToSource } from 'hooks/useScrollToSource'
import Markdown from 'components/Markdown'
import ArtificialBackButton from 'components/ArtificialBackButton'

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getNotes().map((note) => ({ params: { slug: note.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{ note: Note; markdown: string }> = ({ params }) => ({
  props: getNote(params?.slug as string),
})

const NotePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ note, markdown }) => {
  useScrollToSource()

  return (
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

      <Heading fontSize={[3, 4]}>{note.title}</Heading>

      <Box m={2} />

      <Text fontSize={0} color="textTertiary">
        {formatDate(note.date)}
        <Box display="inline" mx={1}>
          ·
        </Box>
        {note.readingTime}
      </Text>

      <Box m={3} />

      <Markdown>{markdown}</Markdown>

      <Box m={4} />
    </>
  )
}

export default NotePage
