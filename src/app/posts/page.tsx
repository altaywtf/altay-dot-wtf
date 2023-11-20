import { Metadata } from 'next'
import { API_URL, postsCopy } from 'config'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import type { Post } from 'lib/posts'
import Link from 'next/link'
import Page from 'ui/Page'
import ArtificialBackButton from 'ui/ArtificialBackButton'
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
    <>
      <div className="mb-6">
        <ArtificialBackButton href="/" label="altay.wtf" />
      </div>

      <Page header={postsCopy}>
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div key={post.slug} className="flex flex-col gap-1">
              <div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium text-amber-400 hover:text-amber-200"
                >
                  {post.title}
                </Link>
              </div>

              <p>{post.oneliner}</p>

              <div className="text-sm">
                <PostDateAndReadingTime post={post} />
              </div>
            </div>
          ))}
        </div>
      </Page>
    </>
  )
}

export default PostsPage
