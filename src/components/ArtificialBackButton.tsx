import NextLink from 'next/link'
import { Box, Text, Link, Flex } from 'rebass'
import { CgArrowLeft } from 'react-icons/cg'
import { usePathHistory } from 'hooks/usePathHistory'
import { useRouter } from 'next/router'

const ArtificialBackButton: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  const router = useRouter()
  const prevPath = usePathHistory()
  const content = (
    <Flex alignItems="center">
      <CgArrowLeft />
      <Box mx={1} />
      <Text>{label}</Text>
    </Flex>
  )

  return (
    <Box>
      {prevPath === href ? (
        <Link variant="linkSilent" onClick={() => router.back()}>
          {content}
        </Link>
      ) : (
        <NextLink href={href} passHref>
          <Link variant="linkSilent">{content}</Link>
        </NextLink>
      )}
    </Box>
  )
}

export default ArtificialBackButton
