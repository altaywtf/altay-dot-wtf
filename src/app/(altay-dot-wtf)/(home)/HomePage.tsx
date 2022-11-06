'use client'

import { homeCopy } from 'config'
import Page from 'components/Page'
import { Flex, Link } from 'theme-ui'
import { GrMail } from '@react-icons/all-files/gr/GrMail'
import { VscTwitter } from '@react-icons/all-files/vsc/VscTwitter'
import { VscGithubInverted } from '@react-icons/all-files/vsc/VscGithubInverted'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { ContactLink } from '../../../pages/api/contact/links'

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
  <Page header={{ title: homeCopy.title, description: data.description }}>
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
