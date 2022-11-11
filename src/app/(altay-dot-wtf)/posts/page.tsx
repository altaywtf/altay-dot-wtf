import { getPosts } from 'api/posts'
import PostsPage from './PostsPage'

const Page = async () => {
  const posts = getPosts()
  return <PostsPage data={{ posts }} />
}

export default Page
