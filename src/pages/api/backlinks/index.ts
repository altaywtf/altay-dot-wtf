import type { NextApiRequest, NextApiResponse } from 'next'
import { getBacklinks } from 'lib/backlinks'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const type = req.query.type as string
  const slug = req.query.slug as string
  res.status(200).json({ backlinks: getBacklinks(`/${type}/${slug}`) })
}

export default handler
