import type { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from 'api/posts'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ posts: getPosts() })
}

export const config = {
  unstable_excludeFiles: ['public/**/*'],
}

export default handler
