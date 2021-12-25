import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { homeCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import { readMarkdownFile } from 'utils/md'
import { getContactLinks, ContactLink } from 'api/contact'
import { getFeaturedPosts, Post } from 'api/posts'
import NextLink from 'next/link'
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

const getContactLinkColor = (title: ContactLink['title']): string => {
  switch (title) {
    case 'Email':
      return 'linkPrimary'

    case 'Twitter':
      return '#1DA1F2'

    case 'Github':
      return 'text'
  }
}

const getBrandLinkStyle = (brand: 'putio' | 'klarna' | 'lisk'): ThemeUIStyleObject => ({
  fontWeight: 'bold',
  borderColor: 'transparent',
  color: brand,
  '&:hover': {
    borderColor: brand,
  },
})

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  description,
  posts,
  contactLinks,
}) => (
  <Box
    sx={{
      'a[href="https://put.io"]': getBrandLinkStyle('putio'),
      'a[href="https://klarna.com"]': getBrandLinkStyle('klarna'),
      'a[href="https://lisk.io"]': getBrandLinkStyle('lisk'),
    }}
  >
    <PageHeader
      title={homeCopy.title}
      description={description}
      descriptionStyle={{ color: 'textSecondary' }}
    />

    <Box m={4} />

    <Box>
      <Text color="textTertiary">Featured writing</Text>
      <Box m={1} />
      <>
        {posts.map((post) => (
          <Box key={post.slug} my={1}>
            <NextLink href={post.url} passHref>
              <Link>{post.title}</Link>
            </NextLink>
          </Box>
        ))}
      </>
    </Box>

    <Box m={4} />

    <Box>
      <Text color="textTertiary">Me on the internets</Text>
      <Box m={1} />
      <Flex mx={-1}>
        {contactLinks.map(({ title, url }) => (
          <Box key={title} mx={1}>
            <Link
              href={url}
              rel="noreferrer noopener"
              target="_blank"
              variant="links.button"
              color={getContactLinkColor(title)}
            >
              <Flex sx={{ alignItems: 'center' }}>
                <Text sx={{ display: 'inline-flex', fontSize: 2 }}>
                  {getContactLinkIcon(title)}
                </Text>
                <Box m={1} />
                <Text>{title}</Text>
              </Flex>
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  </Box>
)

export default Home
