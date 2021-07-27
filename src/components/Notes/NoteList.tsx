import type { Note } from 'types'
import NextLink from 'next/link'
import { Box, Text, Link, Heading } from 'rebass'
import { formatDate } from 'utils/date'

type Props = {
  data: Note[]
}

const NoteList: React.FC<Props> = ({ data }) => (
  <Box>
    {data.map((b) => (
      <Box key={b.slug} mb={4}>
        <NextLink href={`/notes/${b.slug}`} passHref>
          <Link>
            <Heading as="h3" fontSize={[0, 1]}>
              {b.meta.title}
            </Heading>
          </Link>
        </NextLink>

        <Box m={1} />

        <Text fontSize={0} color="textSecondary">
          {b.meta.oneliner}
        </Text>

        <Box m={1} />

        <Text fontSize={0} color="textTertiary">
          {formatDate(b.meta.date)}

          <Box display="inline" mx={1}>
            ·
          </Box>
          {b.meta.readingTime}
        </Text>
      </Box>
    ))}
  </Box>
)

export default NoteList
