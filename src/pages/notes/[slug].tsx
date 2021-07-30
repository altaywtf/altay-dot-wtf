import type { InferGetStaticPropsType } from 'next'
import type { Note } from 'types'
import { NextSeo } from 'next-seo'
import { Heading, Text, Box } from 'rebass'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import { getOpenGraphImage } from 'utils/openGraph'
import { useScrollToSource } from 'hooks/useScrollToSource'
import Markdown from 'components/Markdown'
import BackLinks from 'components/BackLinks'
import ArtificialBackButton from 'components/ArtificialBackButton'
import { formatDate } from 'utils/date'

export const getStaticPaths = getStaticPathsForContent('note')
export const getStaticProps = getStaticPropsForContentDetails<Note>('note')

const NotePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, links }) => {
  useScrollToSource()

  const title = data.meta.title
  const description = data.meta.oneliner

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          type: 'article',
          article: {
            authors: ['Altay Aydemir'],
            modifiedTime: data.meta.date,
          },
          images: [getOpenGraphImage({ type: 'note', title, oneliner: description })],
        }}
      />

      <ArtificialBackButton href="/notes" label="Notes" />

      <Box m={[3, 4]} />

      <Heading fontSize={[3, 4]}>{data.meta.title}</Heading>

      <Box m={2} />

      <Text fontSize={0} color="textTertiary">
        {formatDate(data.meta.date)}
        <Box display="inline" mx={1}>
          ·
        </Box>
        {data.meta.readingTime}
      </Text>

      <Box m={3} />

      <Markdown>{data.markdown}</Markdown>

      <Box m={4} />

      {links.length > 0 ? <BackLinks slug={data.slug} type={data.type} data={links} /> : null}
    </>
  )
}

export default NotePage
