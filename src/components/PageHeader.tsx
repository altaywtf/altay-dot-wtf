import { Heading, Box, Text, ThemeUIStyleObject } from 'theme-ui'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { getOpenGraphImage } from 'utils/openGraph'
import Markdown from './Markdown'
import avatar from '../../public/images/avatar.png'

type Props = {
  title: string
  icon?: string
  description?: string
  descriptionStyle?: ThemeUIStyleObject
}

const PageHeader: React.FC<Props> = ({ icon, title, description, descriptionStyle = {} }) => (
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
      <Box sx={{ width: 64, height: 64 }}>
        <Text sx={{ fontSize: 48 }}>{icon}</Text>
      </Box>
    ) : (
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          width: 64,
          height: 64,
          borderRadius: 'circle',
          backgroundColor: 'black',
        }}
      >
        <Image src={avatar} alt="Avatar" />
      </Box>
    )}

    <Box m={4} />

    <Heading as="h1" sx={{ fontSize: 3 }}>
      {title}
    </Heading>

    {description ? (
      <Text sx={{ div: { color: 'textTertiary', ...descriptionStyle } }}>
        <Markdown>{description}</Markdown>
      </Text>
    ) : null}
  </>
)

export default PageHeader
