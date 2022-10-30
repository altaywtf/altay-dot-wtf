import type { NextApiRequest, NextApiResponse } from 'next'
import { getPost } from 'api/posts'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug as string

  try {
    res.status(200).json(getPost(slug))
  } catch {
    res.status(404).json({ message: 'Post not found.' })
  }
}

export default handler
