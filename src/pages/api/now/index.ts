import type { NextApiRequest, NextApiResponse } from 'next'
import { readNowJSON } from 'scripts/now/lib/nowJSON'

export type { NowJSON } from 'scripts/now/lib/types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ now: readNowJSON() })
}

export const config = {
  unstable_excludeFiles: ['public/**/*'],
}

export default handler
