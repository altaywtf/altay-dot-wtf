import type { NextApiRequest, NextApiResponse } from 'next'
import { getContentList } from 'core/api/content'
import { transformSelfAbsoluteMarkdownLinks } from 'core/api/md'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getContentList('note')

  res.status(200).json({
    data: data.map((item) => ({
      ...item,
      markdown: transformSelfAbsoluteMarkdownLinks(item.markdown),
    })),
  })
}
