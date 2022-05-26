import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { homeCopy } from 'config/copy'
import Page from 'components/Page'
import { readMarkdownFile } from 'utils/md'
import { getContactLinks, ContactLink } from 'api/contact'
import { Flex, Link } from 'theme-ui'
import { VscMail } from '@react-icons/all-files/vsc/VscMail'
import { VscTwitter } from '@react-icons/all-files/vsc/VscTwitter'
import { VscGithubInverted } from '@react-icons/all-files/vsc/VscGithubInverted'

export const getStaticProps: GetStaticProps<{
  description: string
  contactLinks: ContactLink[]
}> = async () => ({
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

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  description,
  contactLinks,
}) => (
  <Page header={{ title: homeCopy.title, description }}>
    <Flex sx={{ mt: -2, gap: 2 }}>
      {contactLinks.map(({ title, url }) => (
        <Link
          key={title}
          href={url}
          rel="noreferrer noopener"
          target="_blank"
          variant="links.button"
        >
          <Flex sx={{ alignItems: 'center', gap: 1 }}>
            {getContactLinkIcon(title)}
            {title}
          </Flex>
        </Link>
      ))}
    </Flex>
  </Page>
)

export default Home
