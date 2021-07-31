import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useCallback } from 'react'
import { Flex, Box, Heading, Link, Text } from 'rebass'
import { NowJSON, getNow } from 'api/now'
import { nowCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import Markdown from 'components/Markdown'
import { formatDate } from 'utils/date'
import { CgArrowTopRight } from 'react-icons/cg'

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
            {section.data.map((item) => (
              <li key={item.title}>
                <Link href={item.url} target="_blank">
                  {item.title}
                </Link>{' '}
                by {item.creator}
              </li>
            ))}
          </ul>
        )

      case 'shows':
        return (
          <ul>
            {section.data.map((show) => (
              <li key={show.title}>
                <Link href={show.url} target="_blank">
                  {show.title}
                </Link>
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
          <Box key={section._id}>
            <Flex alignItems="flex-start">
              <Heading as="h3" fontSize={2}>
                {section.title}
              </Heading>

              {section.source ? (
                <Box fontSize="12px" marginLeft="2px" marginTop="-4px">
                  <Link
                    href={section.source.url}
                    title={`Source: ${section.source.label}`}
                    variant="linkSilent"
                    target="_new"
                  >
                    <CgArrowTopRight />
                  </Link>
                </Box>
              ) : null}
            </Flex>

            <Box m={2} />

            <Box>{renderSectionContent(section)}</Box>

            <Box m={5} />
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
