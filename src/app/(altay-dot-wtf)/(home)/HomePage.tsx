'use client'

import { homeCopy } from 'config'
import Page from 'ui/Page'
import { Flex, Link } from 'theme-ui'
import { GrMail } from '@react-icons/all-files/gr/GrMail'
import { VscTwitter } from '@react-icons/all-files/vsc/VscTwitter'
import { VscGithubInverted } from '@react-icons/all-files/vsc/VscGithubInverted'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import type { ContactLink } from 'lib/contact'
import Markdown from 'ui/Markdown'

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

export type HomePageProps = {
  data: {
    description: string
    contactLinks: ContactLink[]
  }
}

const HomePage: React.FC<HomePageProps> = ({ data }) => (
  <Page header={{ title: homeCopy.title }}>
    <Markdown>{data.description}</Markdown>

    <Flex sx={{ mt: -2, gap: 2 }}>
      {data.contactLinks.map(({ title, url }) => (
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

export default HomePage
