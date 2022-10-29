import type { NextApiRequest, NextApiResponse } from 'next'
import { getBook } from './_lib'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug as string

  try {
    res.status(200).json(getBook(slug))
  } catch {
    res.status(404).json({ message: 'Book not found.' })
  }
}

export default handler
