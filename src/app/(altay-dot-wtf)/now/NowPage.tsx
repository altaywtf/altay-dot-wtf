'use client'

import { useCallback } from 'react'
import { Flex, Box, Heading, Link, Image } from 'theme-ui'
import Page from 'components/Page'
import { formatDate } from 'utils/date'
import { nowCopy } from 'config'
import type { NowJSON } from 'api/now'

const NowPage: React.FC<{ data: NowJSON }> = ({ data }) => {
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
                      <Box variant="text.subheading">{item.title}</Box>
                      <Box sx={{ color: 'textTertiary' }}>by {item.author}</Box>
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
              <Box key={item.title} p={2} sx={{ width: '33%' }}>
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

                    <Box color="textTertiary">{item.creator}</Box>
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
                      sx={{ height: 240, borderRadius: 'default' }}
                    />

                    <Box color="textTertiary">{item.title}</Box>
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
        {data.sections
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

      <Box color="textTertiary" sx={{ fontSize: 0 }}>
        Last updated on {formatDate(data.updatedAt)}
      </Box>
    </Page>
  )
}

export default NowPage
