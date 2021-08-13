import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useCallback } from 'react'
import { Flex, Box, Heading, Link, Text, Image } from 'theme-ui'
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
                <Link href={item.url} target="_blank">
                  <Flex
                    sx={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 'default',
                    }}
                  >
                    <Box sx={{ backgroundColor: 'borderPrimary', width: [0.5, 0.3] }} p={3}>
                      <Image
                        src={item.imageURL}
                        sx={{
                          borderRadius: 'default',
                          height: [96, 128],
                          display: 'block',
                          margin: 'auto',
                        }}
                      />
                    </Box>

                    <Box m={[2, 3]} />

                    <Box p={2} sx={{ width: 1 }}>
                      <Text sx={{ fontWeight: 'bold', color: 'text' }}>{item.title}</Text>

                      <Box m={1} />

                      <Box sx={{ lineHeight: 1.2 }}>
                        <Text
                          sx={{
                            display: ['none', 'initial'],
                            color: 'textTertiary',
                            fontStyle: 'italic',
                          }}
                        >
                          {item.subtitle}
                        </Text>
                      </Box>

                      <Box m={1} />

                      <Text sx={{ color: 'textTertiary' }}>by {item.author}</Text>
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
          <Flex m={-2} sx={{ flexWrap: 'wrap' }}>
            {section.data.map((item) => (
              <Box key={item.title} p={2} sx={{ width: [1 / 2, 1 / 3] }}>
                <Link href={item.url} variant="links.scale" target="_blank">
                  <Flex sx={{ alignItems: 'center', flexDirection: 'column' }}>
                    <Box sx={{ width: 1 }}>
                      <Image
                        src={item.imageURL}
                        sx={{ display: 'block', margin: 'auto', borderRadius: 'default' }}
                      />
                    </Box>

                    <Box m={1} />

                    <Box sx={{ width: 1, fontSize: 0, lineHeight: 1.4 }}>
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
          <Flex sx={{ flexWrap: 'wrap' }} m={-2}>
            {section.data.map((item) => (
              <Box key={item.title} p={2} sx={{ width: 'auto' }}>
                <Link href={item.url} variant="links.scale" target="_blank">
                  <Flex sx={{ flexDirection: 'column' }}>
                    <Box sx={{ width: 1 }}>
                      <Image
                        src={item.imageURL}
                        sx={{ height: [160, 240], borderRadius: 'default' }}
                      />
                    </Box>

                    <Text color="textSecondary">{item.title}</Text>
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
            <Heading as="h3" sx={{ fontSize: 2 }}>
              {section.title}
            </Heading>

            <Box m={3} />

            <Box>{renderSectionContent(section)}</Box>

            <Box m={5} />
          </Box>
        ))}

      <Box m={6} />

      <Text color="textTertiary">Last updated on {formatDate(now.updatedAt)}</Text>
    </>
  )
}

export default NowPage
