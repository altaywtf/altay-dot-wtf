import { Content } from 'types'
import { Box, Text, Flex, SxStyleProp, Heading, Link } from 'rebass'
import NextLink from 'next/link'
import { formatDate } from 'utils/date'

type LinkedItemProps = {
  slug: string
  data: Content
}

const getTitle = (item: Content) => {
  switch (item.type) {
    case 'book':
    case 'note':
      return item.meta.title

    default:
      return '__NEVER__'
  }
}

const getType = (item: Content) => item.type.split('-').join(' ')

const getURLForContent = (content: Content, slug: string) => {
  switch (content.type) {
    case 'note':
      return `/notes/${content.slug}?source=${slug}`

    case 'book':
      return `/books/${content.slug}?source=${slug}`

    default:
      return '__NEVER__'
  }
}

const itemStyle: SxStyleProp = {
  borderRadius: 4,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'backgroundHeader',
  },
}

const Item: React.FC<LinkedItemProps> = ({ data, slug }) => (
  <NextLink href={getURLForContent(data, slug)} passHref>
    <Link href={getURLForContent(data, slug)}>
      <Box sx={itemStyle} p={2}>
        <Text color="linkPrimary" fontSize={0} fontWeight="bold">
          {getTitle(data)}
        </Text>

        <Box mt={-1}>
          <Text color="textSecondary" display="inline" fontSize={0}>
            {getType(data)}
          </Text>

          <Text color="textSecondary" display="inline-block" fontSize={0} mx={1}>
            ·
          </Text>

          <Text color="textTertiary" display="inline" fontSize={0}>
            {formatDate(data.meta.date)}
          </Text>
        </Box>
      </Box>
    </Link>
  </NextLink>
)

const LinkedItems: React.FC<{ slug: string; data: Content[] }> = ({ slug, data }) =>
  data.length ? (
    <Box backgroundColor="backgroundSecondary" p={3} sx={{ borderRadius: 4 }}>
      <Heading fontSize={2}>Mentioned in</Heading>

      <Flex mx={-3} alignItems="flex-start" flexWrap="wrap">
        {data.map((item, index) => (
          <Box width={[1, 1, 1 / 2]} key={index} mt={1} px={2}>
            <Item data={item} slug={slug} />
          </Box>
        ))}
      </Flex>
    </Box>
  ) : null

export default LinkedItems
