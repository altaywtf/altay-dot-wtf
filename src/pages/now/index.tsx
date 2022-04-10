import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { useCallback } from 'react'
import { Flex, Box, Heading, Link, Text, Image } from 'theme-ui'
import { NowJSON, getNow } from 'api/now'
import { nowCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
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
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    border: '1px solid',
                    borderColor: 'border',
                    borderRadius: 'default',
                    transition: 'transform .2s',
                    '@media (hover: hover)': {
                      '&:hover': {
                        transform: 'scale(1.025)',
                        borderColor: 'border',
                      },
                    },
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

                    <Box m={[2, 3]} />

                    <Box p={2} sx={{ width: '100%' }}>
                      <Text sx={{ fontWeight: 'bold' }}>{item.title}</Text>

                      <Box m={2} />

                      <Text
                        sx={{
                          display: ['none', 'initial'],
                          color: 'textSecondary',
                          fontStyle: 'italic',
                        }}
                      >
                        {item.subtitle}
                      </Text>

                      <Box m={2} />

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
                  <Flex sx={{ flexDirection: 'column' }}>
                    <Box sx={{ width: '100%' }}>
                      <Image
                        alt={`Cover of music album ${item.title}`}
                        src={item.imageURL}
                        sx={{ display: 'block', margin: 'auto', borderRadius: 'default' }}
                      />
                    </Box>

                    <Box m={1} />

                    <Box sx={{ fontSize: 0 }}>
                      <Text as="p">{item.title}</Text>

                      <Text as="p" color="textSecondary">
                        {item.creator}
                      </Text>
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

      <Text color="textSecondary">Last updated on {formatDate(now.updatedAt)}</Text>
    </>
  )
}

export default NowPage
