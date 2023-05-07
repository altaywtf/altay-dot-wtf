import { Metadata } from 'next'
import { API_URL, postsCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import type { Post } from 'lib/posts'
import Link from 'next/link'
import Page from 'ui/Page'
import { PostDateAndReadingTime } from './components/PostDateAndReadingTime'

const fetchData = (): Promise<{ posts: Post[] }> =>
  fetch(`${API_URL}/posts`).then((res) => res.json())

export const generateMetadata = async (): Promise<Metadata> => ({
  title: postsCopy.title,
  openGraph: {
    title: postsCopy.title,
    images: getOpenGraphImage({
      type: 'page',
      title: postsCopy.title,
    }),
  },
})

const PostsPage = async () => {
  const { posts } = await fetchData()

  return (
    <Page header={postsCopy}>
      {posts.map((post) => (
        <div key={post.slug} className="my-6 flex flex-col gap-1">
          <Link
            href={`/blog/${post.slug}`}
            className="font-medium text-amber-400 hover:text-amber-200"
          >
            {post.title}
          </Link>

          <p>{post.oneliner}</p>

          <div className="text-sm">
            <PostDateAndReadingTime post={post} />
          </div>
        </div>
      ))}
    </Page>
  )
}

export default PostsPage
