import type { NowJSON } from 'types'
import { Box, Heading, Link, Text } from 'rebass'
import { nowCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import Markdown from 'components/Markdown'
import { useCallback } from 'react'
import { formatDate } from 'utils/date'
import nowJSON from '../../../data/now.json'

const NowPage: React.FC = () => {
  const data = nowJSON as NowJSON

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

      {data.sections
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
        Updated on {formatDate(data.updatedAt)}
      </Text>
    </>
  )
}

export default NowPage
