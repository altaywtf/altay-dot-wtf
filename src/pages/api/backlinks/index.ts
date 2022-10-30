import type { NextApiRequest, NextApiResponse } from 'next'
import { getBacklinks } from 'api/backlinks'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const type = req.query.type as string
  const slug = req.query.slug as string
  res.status(200).json({ backlinks: getBacklinks(`/${type}/${slug}`) })
}

export const config = {
  unstable_excludeFiles: ['public/**/*'],
}

export default handler
