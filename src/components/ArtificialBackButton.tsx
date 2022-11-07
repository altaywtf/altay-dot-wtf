import NextLink from 'next/link'
import { Box, Text, Link, Flex } from 'theme-ui'
import { CgArrowLeft } from '@react-icons/all-files/cg/CgArrowLeft'
import { useRouter } from 'next/navigation'
import { usePathHistory } from 'hooks/usePathHistory'

const ArtificialBackButton: React.FC<{ href: string; label: string }> = ({ href, label }) => {
  const router = useRouter()
  const prevPath = usePathHistory()
  const content = (
    <Flex sx={{ alignItems: 'center' }}>
      <CgArrowLeft />
      <Box mx={1} />
      <Text>{label}</Text>
    </Flex>
  )

  return (
    <Box sx={{ display: 'inline-block' }}>
      {prevPath === href ? (
        <Link variant="links.silent" onClick={() => router.back()}>
          {content}
        </Link>
      ) : (
        <Link as={NextLink} href={href} variant="links.silent">
          {content}
        </Link>
      )}
    </Box>
  )
}

export default ArtificialBackButton
