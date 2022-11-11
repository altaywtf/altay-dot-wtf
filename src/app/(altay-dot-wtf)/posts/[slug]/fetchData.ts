import { getBacklinks } from 'api/backlinks'
import { getPost } from 'api/posts'
import type { PostPageProps } from './PostPage'

export const fetchData = async (slug: string): Promise<PostPageProps['data']> => {
  const { post, markdown } = getPost(slug)
  const backlinks = getBacklinks({ type: 'post', slug })

  return {
    post,
    markdown,
    backlinks,
  }
}
