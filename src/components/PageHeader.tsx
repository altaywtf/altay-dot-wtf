import { Heading, Text } from 'rebass'
import { NextSeo } from 'next-seo'
import Markdown from './Markdown'

type Props = {
  title: string
  description?: string
  metaTitle?: string
  metaDescription?: string
}

const PageHeader: React.FC<Props> = ({ title, metaTitle, description, metaDescription }) => {
  const seoTitle = metaTitle || title
  const seoDescription = metaDescription || description

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{ title: seoTitle, description: seoDescription }}
      />

      <Heading fontSize={3}>{title}</Heading>

      {description ? (
        <Text color="textSecondary">
          <Markdown>{description}</Markdown>
        </Text>
      ) : null}
    </>
  )
}

export default PageHeader