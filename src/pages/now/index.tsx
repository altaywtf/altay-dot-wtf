import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useCallback } from 'react'
import { Flex, Box, Heading, Link, Text, Image } from 'rebass'
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
        return (
          <Box>
            {section.data.map((item) => (
              <Box key={item.title}>
                <Link variant="linkHighlight" href={item.url} target="_new">
                  <Flex flexDirection="row" className="border-radius" alignItems="center">
                    <Box backgroundColor="borderPrimary" width={[0.5, 0.3]} p={3}>
                      <Image
                        src={item.imageURL}
                        display="block"
                        height={[96, 128]}
                        className="border-radius"
                        margin="auto"
                      />
                    </Box>

                    <Box m={[2, 3]} />

                    <Box width={1} p={2}>
                      <Text fontSize={[0, 1]} color="text">
                        {item.title}
                      </Text>

                      <Box m={1} />

                      <Text
                        fontSize={0}
                        display={['none', 'initial']}
                        color="textTertiary"
                        fontStyle="italic"
                      >
                        {item.subtitle}
                      </Text>

                      <Box m={1} />

                      <Text fontSize={14} color="textTertiary">
                        by {item.author}
                      </Text>
                    </Box>
                  </Flex>
                </Link>

                <Box my={3} />
              </Box>
            ))}
          </Box>
        )

      case 'music':
        return (
          <Flex flexWrap="wrap" m={-2}>
            {section.data.map((item) => (
              <Box key={item.title} p={2} width={[1 / 2, 1 / 3]}>
                <Link href={item.url} variant="linkScale" target="_new">
                  <Flex alignItems="center" flexDirection="column">
                    <Box width={1}>
                      <Image
                        src={item.imageURL}
                        display="block"
                        margin="auto"
                        className="border-radius"
                      />
                    </Box>

                    <Box m={1} />

                    <Box width={1} fontSize={14} lineHeight={1.2}>
                      <Text color="textSecondary">{item.title}</Text>
                      <Text color="textTertiary">{item.creator}</Text>
                    </Box>
                  </Flex>
                </Link>
              </Box>
            ))}
          </Flex>
        )

      case 'shows':
        return (
          <Flex flexWrap="wrap" m={-2}>
            {section.data.map((item) => (
              <Box key={item.title} p={2} width={'auto'}>
                <Link href={item.url} variant="linkScale" target="_new">
                  <Flex flexDirection="column">
                    <Box width={1}>
                      <Image src={item.imageURL} height={[160, 240]} className="border-radius" />
                    </Box>

                    <Text fontSize={0} color="textSecondary">
                      {item.title}
                    </Text>
                  </Flex>
                </Link>

                <Box my={3} />
              </Box>
            ))}
          </Flex>
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
            <Heading as="h3" fontSize={2}>
              {section.title}
            </Heading>

            <Box m={3} />

            <Box>{renderSectionContent(section)}</Box>

            <Box m={5} />
          </Box>
        ))}

      <Box m={6} />

      <Text fontSize={0} color="textTertiary">
        Last updated on {formatDate(now.updatedAt)}
      </Text>
    </>
  )
}

export default NowPage
