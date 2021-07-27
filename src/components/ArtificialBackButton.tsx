import { Box, Text, Link, Flex } from 'rebass'
import { CgArrowLeft } from 'react-icons/cg'

const ArtificialBackButton: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <Box>
    <Link href={href} sx={{ color: 'textTertiary', fontSize: 0 }}>
      <Flex alignItems="center">
        <CgArrowLeft />
        <Box mx={1} />
        <Text>{label}</Text>
      </Flex>
    </Link>
  </Box>
)

export default ArtificialBackButton
