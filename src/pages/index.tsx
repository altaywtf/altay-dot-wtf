import type { InferGetStaticPropsType } from 'next'
import { homeCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import { readMarkdownFile } from 'utils/md'
import { getContactLinks, ContactLink } from 'api/contact'
import NextLink from 'next/link'
import { Box, Flex, Text, Link } from 'rebass'
import { VscMail, VscTwitter, VscGithubInverted } from 'react-icons/vsc'
import { getFeaturedNotes } from 'api/notes'

export const getStaticProps = async () => ({
  props: {
    description: readMarkdownFile('home.md'),
    notes: getFeaturedNotes(),
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

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  description,
  notes,
  contactLinks,
}) => (
  <>
    <PageHeader
      title={homeCopy.title}
      description={description}
      descriptionStyle={{ color: 'textSecondary' }}
    />

    <Box m={4} />

    <Box>
      <Text color="textTertiary">Featured writing</Text>

      <Box m={2} />

      <Box>
        {notes.map((note) => (
          <Box key={note.slug} my={1}>
            <NextLink href={note.url} passHref>
              <Link>{note.title}</Link>
            </NextLink>
          </Box>
        ))}
      </Box>
    </Box>

    <Box m={4} />

    <Box>
      <Text color="textTertiary">Me on the internets</Text>

      <Box m={2} />

      <Flex mx={-1}>
        {contactLinks.map(({ title, url }) => (
          <Box key={title} mx={1}>
            <Link
              href={url}
              target="_blank"
              variant="linkButton"
              color={getContactLinkColor(title)}
            >
              <Flex alignItems="center">
                <Text fontSize={2} display="inline-flex">
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
  </>
)

export default Home
