import type { InferGetStaticPropsType } from 'next'
import type { Note } from 'types'
import { NextSeo } from 'next-seo'
import { Heading, Text, Box } from 'rebass'
import { getStaticPathsForContent, getStaticPropsForContentDetails } from 'core/api/page'
import Markdown from 'components/Markdown'
import { useScrollToSource } from 'core/hooks/useScrollToSource'
import LinkedItems from 'components/LinkedItems'
import { formatDate } from 'utils/date'

export const getStaticPaths = getStaticPathsForContent('note')
export const getStaticProps = getStaticPropsForContentDetails<Note>('note')

const NotePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ data, links }) => {
  useScrollToSource()

  if (!data || !links) return null

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
        }}
      />

      <Box mb={4} />

      <Heading>{data.meta.title}</Heading>

      <Box my={2} />

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

      <LinkedItems data={links} slug={data.slug} />
    </>
  )
}

export default NotePage
