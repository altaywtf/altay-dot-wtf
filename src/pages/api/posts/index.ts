import type { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from 'lib/posts'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ posts: getPosts() })
}

export default handler
