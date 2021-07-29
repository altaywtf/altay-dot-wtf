import NextLink from 'next/link'
import { Box, Text, Link } from 'rebass'
import { CgArrowRight } from 'react-icons/cg'

type Props = {
  href: string
  label: string
}

const HomeLink: React.FC<Props> = ({ href, label }) => (
  <Box key={href} marginBottom={1}>
    <NextLink href={href} passHref>
      <Link>
        <Box display="inline-flex" sx={{ alignItems: 'center', fontSize: [0, 1] }}>
          <Text mr={1}>{label}</Text>
          <CgArrowRight />
        </Box>
      </Link>
    </NextLink>
  </Box>
)

export default HomeLink
