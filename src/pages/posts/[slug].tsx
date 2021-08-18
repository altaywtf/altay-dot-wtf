import type { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { Heading, Text, Box } from 'theme-ui'
import { getPost, getPosts, Post } from 'api/posts'
import { Backlink, getBacklinks } from 'api/backlinks'
import { getOpenGraphImage } from 'utils/openGraph'
import { formatDate } from 'utils/date'
import ArtificialBackButton from 'components/ArtificialBackButton'
import Markdown from 'components/Markdown'
import Backlinks from 'components/Backlinks'

export const getStaticPaths: GetStaticPaths = () => ({
  paths: getPosts().map((post) => ({ params: { slug: post.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{
  post: Post
  markdown: string
  backlinks: Backlink[]
}> = ({ params }) => {
  const { post, markdown } = getPost(params?.slug as string)
  const backlinks = getBacklinks(post.url)

  return {
    props: {
      post,
      markdown,
      backlinks,
    },
  }
}

const PostPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  markdown,
  backlinks,
}) => (
  <>
    <NextSeo
      title={post.title}
      description={post.oneliner}
      openGraph={{
        title: post.title,
        description: post.oneliner,
        type: 'article',
        article: {
          authors: ['Altay Aydemir'],
          modifiedTime: post.date,
        },
        images: [
          getOpenGraphImage({
            type: 'post',
            title: post.title,
            oneliner: post.oneliner,
          }),
        ],
      }}
    />

    <ArtificialBackButton href="/posts" label="Writing" />

    <Box m={[3, 4]} />

    <Heading sx={{ fontSize: [3, 4] }}>{post.title}</Heading>

    <Box m={2} />

    <Text color="textTertiary">
      {formatDate(post.date)}
      <Box sx={{ display: 'inline' }} mx={1}>
        ·
      </Box>
      {post.readingTime}
    </Text>

    <Box m={3} />

    <Markdown>{markdown}</Markdown>

    <Box m={5} />

    <Backlinks sourceType="post" sourceURL={post.url} backlinks={backlinks} />
  </>
)

export default PostPage
