import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { API_URL } from 'config'
import { homeCopy } from 'config/copy'
import Page from 'components/Page'
import { readMarkdownFile } from 'utils/md'
import { Flex, Link } from 'theme-ui'
import { GrMail } from '@react-icons/all-files/gr/GrMail'
import { VscTwitter } from '@react-icons/all-files/vsc/VscTwitter'
import { VscGithubInverted } from '@react-icons/all-files/vsc/VscGithubInverted'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { ContactLink } from './api/contact/links'

export const getStaticProps: GetStaticProps<{
  description: string
  contactLinks: ContactLink[]
}> = async () => ({
  props: {
    description: readMarkdownFile('home.md'),
    contactLinks: (await fetch(`${API_URL}/contact/links`).then((res) => res.json())).links,
  },
})

const getContactLinkIcon = (title: ContactLink['title']) => {
  switch (title) {
    case 'Email':
      return <GrMail />

    case 'Twitter':
      return <VscTwitter />

    case 'Github':
      return <VscGithubInverted />

    case 'LinkedIn':
      return <FaLinkedin />
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
