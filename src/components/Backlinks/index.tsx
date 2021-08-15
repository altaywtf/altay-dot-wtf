import type { Backlink } from 'api/backlinks'
import { Box, Flex, Text, Link } from 'theme-ui'
import NextLink from 'next/link'
import { BACKLINK_SOURCE_QUERY_PARAM } from './constants'
import { useScrollToBacklinkSource } from './useScrollToBacklinkSource'

const BacklinkItem: React.FC<{ sourceURL: string; backlink: Backlink }> = ({
  sourceURL,
  backlink,
}) => (
  <NextLink href={`${backlink.url}?${BACKLINK_SOURCE_QUERY_PARAM}=${sourceURL}`} passHref>
    <Link sx={{ color: 'textSecondary' }}>{backlink.title}</Link>
  </NextLink>
)

const Backlinks: React.FC<{
  sourceType: 'book' | 'post'
  sourceURL: string
  backlinks: Backlink[]
}> = ({ sourceType, sourceURL, backlinks }) => {
  useScrollToBacklinkSource()

  if (backlinks.length === 0) {
    return null
  }

  return (
    <Box backgroundColor="backgroundSecondary" p={3} sx={{ borderRadius: 'default' }}>
      <Text sx={{ fontSize: 1, fontWeight: 'bold' }}>Links to this {sourceType}</Text>

      <Box m={2} />

      <Flex sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {backlinks.map((backlink) => (
          <Box key={backlink.url} my={1} sx={{ width: ['100%', '100%', '50%'] }}>
            <BacklinkItem sourceURL={sourceURL} backlink={backlink} />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default Backlinks
