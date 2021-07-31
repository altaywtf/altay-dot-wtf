import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useCallback } from 'react'
import { Box, Heading, Link, Text } from 'rebass'
import { NowJSON, getNow } from 'api/now'
import { nowCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import Markdown from 'components/Markdown'
import { formatDate } from 'utils/date'

export const getStaticProps: GetStaticProps<{ now: NowJSON }> = () => ({
  props: { now: getNow() },
})

const NowPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ now }) => {
  const renderSectionContent = useCallback((section: NowJSON['sections'][number]) => {
    switch (section._id) {
      case 'life':
        return <Markdown>{section.data}</Markdown>

      case 'books':
      case 'music':
        return (
          <ul>
            {section.data.map((book) => (
              <li key={book.title}>
                <Link href={book.url} target="_blank">
                  {book.title}
                </Link>{' '}
                by {book.creator}
              </li>
            ))}
          </ul>
        )
    }
  }, [])

  return (
    <>
      <PageHeader {...nowCopy} />

      <Box m={5} />

      {now.sections
        .filter((section) => section.data && section.data.length > 0)
        .map((section) => (
          <Box key={section._id} my={5}>
            <Heading as="h3" fontSize={[2]}>
              {section.title}
            </Heading>
            <Box my={3} />
            <Box>{renderSectionContent(section)}</Box>
          </Box>
        ))}

      <Box m={5} />

      <Text fontSize={0} color="textTertiary">
        Updated on {formatDate(now.updatedAt)}
      </Text>
    </>
  )
}

export default NowPage
