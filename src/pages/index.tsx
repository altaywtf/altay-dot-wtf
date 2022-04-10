import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { homeCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import { readMarkdownFile } from 'utils/md'
import { getContactLinks, ContactLink } from 'api/contact'
import { getFeaturedPosts, Post } from 'api/posts'
import { Box, Flex, Text, Link, ThemeUIStyleObject } from 'theme-ui'
import { VscMail } from '@react-icons/all-files/vsc/VscMail'
import { VscTwitter } from '@react-icons/all-files/vsc/VscTwitter'
import { VscGithubInverted } from '@react-icons/all-files/vsc/VscGithubInverted'

export const getStaticProps: GetStaticProps<{
  description: string
  posts: Post[]
  contactLinks: ContactLink[]
}> = async () => ({
  props: {
    description: readMarkdownFile('home.md'),
    posts: getFeaturedPosts(),
    contactLinks: getContactLinks(),
  },
})

const getContactLinkIcon = (title: ContactLink['title']) => {
  switch (title) {
    case 'Email':
      return <VscMail />

    case 'Twitter':
      return <VscTwitter />

    case 'Github':
      return <VscGithubInverted />
  }
}

const getBrandLinkStyle = (brand: 'putio' | 'klarna' | 'lisk' | 'bilgi'): ThemeUIStyleObject => ({
  fontWeight: 'bold',
  borderColor: 'transparent',
  color: brand,
  '@media (hover: hover)': {
    '&:hover': {
      borderColor: brand,
    },
  },
})

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  description,
  contactLinks,
}) => (
  <Box
    sx={{
      'a[href="https://put.io"]': getBrandLinkStyle('putio'),
      'a[href="https://klarna.com"]': getBrandLinkStyle('klarna'),
      'a[href="https://lisk.io"]': getBrandLinkStyle('lisk'),
    }}
  >
    <PageHeader title={homeCopy.title} description={description} />

    <Box m={5} />

    <Box>
      <Text color="textSecondary">Me on the internets</Text>

      <Box my={1} />

      <Flex sx={{ gap: 2 }}>
        {contactLinks.map(({ title, url }) => (
          <Link
            key={title}
            href={url}
            rel="noreferrer noopener"
            target="_blank"
            variant="links.button"
          >
            <Flex sx={{ alignItems: 'center', gap: 2 }}>
              <Text sx={{ display: 'inline-flex' }}>{getContactLinkIcon(title)}</Text>
              <Text>{title}</Text>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  </Box>
)

export default Home
