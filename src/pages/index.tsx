import type { InferGetStaticPropsType } from 'next'
import { homeCopy } from 'config/copy'
import PageHeader from 'components/PageHeader'
import { readMarkdownFile } from 'utils/md'
import { getContactLinks, ContactLink } from 'api/contact'
import { Box, Heading, Flex, Text, Link } from 'rebass'
import { VscMail, VscTwitter, VscGithubInverted } from 'react-icons/vsc'

export const getStaticProps = async () => ({
  props: {
    description: readMarkdownFile('home.md'),
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
      <Heading as="h3" fontSize={14} fontWeight="normal" color="textTertiary">
        Me on the internets
      </Heading>

      <Flex mx={-1}>
        {contactLinks.map(({ title, url }) => (
          <Box key={title} my={2} mx={1}>
            <Link
              href={url}
              target="_blank"
              variant="linkButton"
              color={getContactLinkColor(title)}
            >
              <Flex alignItems="center">
                <Text fontSize={1} display="inline-flex">
                  {getContactLinkIcon(title)}
                </Text>

                <Box m={1} />

                <Text fontSize={0}>{title}</Text>
              </Flex>
            </Link>
          </Box>
        ))}
      </Flex>
    </Box>
  </>
)

export default Home
