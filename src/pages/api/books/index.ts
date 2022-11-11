import type { NextApiRequest, NextApiResponse } from 'next'
import { getBooks } from 'api/books'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ books: getBooks() })
}

export default handler
