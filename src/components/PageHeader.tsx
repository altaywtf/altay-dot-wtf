import { Heading, Box, Text } from 'rebass'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { getOpenGraphImage } from 'core/api/openGraph'
import Markdown from './Markdown'
import avatar from '../../public/images/avatar.png'

type Props = {
  title: string
  icon?: string
  description?: string
}

const PageHeader: React.FC<Props> = ({ icon, title, description }) => {
  return (
    <>
      <NextSeo
        title={title}
        openGraph={{
          title: title,
          images: [
            getOpenGraphImage({
              type: 'page',
              title: title,
            }),
          ],
        }}
      />

      {icon ? (
        <Box width={64} height={64}>
          <Text fontSize={48}>{icon}</Text>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: 'black',
          }}
        >
          <Image src={avatar} />
        </Box>
      )}

      <Box mb={4} />

      <Heading as="h1" fontSize={3}>
        {title}
      </Heading>

      {description ? (
        <Text fontSize={1} sx={{ div: { color: 'textTertiary' } }}>
          <Markdown>{description}</Markdown>
        </Text>
      ) : null}
    </>
  )
}

export default PageHeader
