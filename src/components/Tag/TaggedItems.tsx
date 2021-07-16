import { TaggedItem } from 'types'
import { Box, Text, Link, SxStyleProp } from 'rebass'
import NextLink from 'next/link'
import { formatDate } from 'utils/date'

type TaggedItemProps = {
  tag: string
  data: TaggedItem
}

const getTitle = (item: TaggedItem) => {
  switch (item.type) {
    case 'book':
    case 'note':
      return item.meta.title

    default:
      return '__NEVER__'
  }
}

const getType = (item: TaggedItem) => item.type.split('-').join(' ')

const getURLForContent = (content: TaggedItem, tag: string) => {
  switch (content.type) {
    case 'note':
      return `/notes/${content.slug}?source=${tag}`

    case 'book':
      return `/books/${content.slug}?source=${tag}`
  }
}

const TaggedItemHeading: React.FC<TaggedItemProps> = ({ tag, data }) => {
  const linkStyle: SxStyleProp = {
    display: 'inline-block',
    fontSize: 2,
    fontWeight: 'bold',
  }

  return (
    <Box>
      <NextLink href={getURLForContent(data, tag)} passHref scroll={false}>
        <Link sx={linkStyle}>{getTitle(data)}</Link>
      </NextLink>
    </Box>
  )
}

const Item: React.FC<TaggedItemProps> = ({ data, tag }) => (
  <Box my={3}>
    <TaggedItemHeading tag={tag} data={data} />

    <Text color="textSecondary" display="inline" fontSize={0}>
      {getType(data)}
    </Text>

    <Text color="textSecondary" display="inline-block" mx={1}>
      ·
    </Text>

    <Text color="textTertiary" display="inline" fontSize={0}>
      {formatDate(data.meta.date)}
    </Text>
  </Box>
)

const TaggedItems: React.FC<{ tag: string; data: TaggedItem[] }> = ({ tag, data }) => (
  <>
    {data.map((taggedItem, index) => (
      <Item key={index} data={taggedItem} tag={tag} />
    ))}
  </>
)

export default TaggedItems
