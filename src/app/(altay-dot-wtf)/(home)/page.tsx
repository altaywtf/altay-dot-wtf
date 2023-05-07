import { API_URL, homeCopy } from 'config'
import { readMarkdownFile } from 'lib/utils/md'
import type { ContactLink } from 'lib/contact'
import Page from 'ui/Page'
import Markdown from 'ui/Markdown'
import { GrMail } from '@react-icons/all-files/gr/GrMail'
import { VscTwitter } from '@react-icons/all-files/vsc/VscTwitter'
import { VscGithubInverted } from '@react-icons/all-files/vsc/VscGithubInverted'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'

const fetchData = async () => {
  const description = readMarkdownFile('home.md')
  const contactLinks = (await fetch(`${API_URL}/contact/links`).then((res) => res.json()))
    .links as ContactLink[]
  return { description, contactLinks }
}

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

const HomePage = async () => {
  const data = await fetchData()

  return (
    <Page header={{ title: homeCopy.title }}>
      <Markdown>{data.description}</Markdown>

      <div className="mt-3 flex flex-row gap-3">
        {data.contactLinks.map(({ title, url }) => (
          <a
            key={title}
            href={url}
            rel="noreferrer noopener"
            target="_blank"
            className="flex flex-row items-center gap-2 rounded bg-neutral-800 px-3 py-1 text-sm font-medium hover:bg-neutral-700"
          >
            {getContactLinkIcon(title)}
            {title}
          </a>
        ))}
      </div>
    </Page>
  )
}

export default HomePage
