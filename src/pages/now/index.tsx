import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useCallback } from 'react'
import { Flex, Box, Heading, Link, Text, Image } from 'theme-ui'
import { NowJSON, getNow } from 'api/now'
import { nowCopy } from 'config/copy'
import Page from 'components/Page'
import { formatDate } from 'utils/date'

export const getStaticProps: GetStaticProps<{ now: NowJSON }> = () => ({
  props: { now: getNow() },
})

const NowPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ now }) => {
  const renderSectionContent = useCallback((section: NowJSON['sections'][number]) => {
    switch (section._id) {
      case 'books':
        return (
          <Box>
            {section.data.map((item) => (
              <Box key={item.title}>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="links.scale"
                  sx={{
                    display: 'block',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'border',
                    borderRadius: 'default',
                  }}
                >
                  <Flex
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 'default',
                    }}
                  >
                    <Box sx={{ backgroundColor: 'border', width: ['50%', '33%'] }} p={3}>
                      <Image
                        alt={`Cover of book ${item.title}`}
                        src={item.imageURL}
                        sx={{
                          borderRadius: 'default',
                          height: [96, 128],
                          display: 'block',
                          margin: 'auto',
                          width: 'auto',
                        }}
                      />
                    </Box>

                    <Box m={3} />

                    <Box p={2} sx={{ width: '100%' }}>
                      <Box sx={{ fontWeight: 600 }}>{item.title}</Box>

                      <Text
                        sx={{
                          display: ['none', 'initial'],
                          color: 'textSecondary',
                          fontStyle: 'italic',
                        }}
                      >
                        {item.subtitle}
                      </Text>

                      <Text sx={{ color: 'textSecondary' }}>by {item.author}</Text>
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
              <Box key={item.title} p={2} sx={{ width: ['50%', '33%'] }}>
                <Link
                  href={item.url}
                  rel="noreferrer noopener"
                  target="_blank"
                  variant="links.scale"
                >
                  <Flex sx={{ flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ width: '100%' }}>
                      <Image
                        alt={`Cover of music album ${item.title}`}
                        src={item.imageURL}
                        sx={{ display: 'block', margin: 'auto', borderRadius: 'default' }}
                      />
                    </Box>

                    <Box sx={{ fontSize: 0 }}>
                      <Box sx={{ lineHeight: 1.2 }}>{item.title}</Box>
                      <Box color="textSecondary">{item.creator}</Box>
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
              <Box key={item.title} p={2} sx={{ width: 'auto' }} mb={3}>
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="links.scale"
                >
                  <Flex sx={{ flexDirection: 'column' }}>
                    <Image
                      alt={`Poster of TV show ${item.title}`}
                      src={item.imageURL}
                      sx={{ height: [160, 240], borderRadius: 'default' }}
                    />

                    <Text color="text">{item.title}</Text>
                  </Flex>
                </Link>
              </Box>
            ))}
          </Flex>
        )
    }
  }, [])

  return (
    <Page header={nowCopy}>
      <>
        {now.sections
          .filter((section) => section.data && section.data.length > 0)
          .map((section) => (
            <Box key={section._id}>
              <Heading as="h4">{section.title}</Heading>

              <Box mt={2} mb={4}>
                {renderSectionContent(section)}
              </Box>
            </Box>
          ))}
      </>

      <Text color="textSecondary">Last updated on {formatDate(now.updatedAt)}</Text>
    </Page>
  )
}

export default NowPage
