import type { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'
import qs from 'query-string'
import { OpenGraphImage } from 'lib/og/OpenGraphImage'
import type { ParsedQuery, Post, Book, Page } from 'lib/og/types'

export const runtime = 'edge'
export const contentType = 'image/png'

const loadFont = async () => {
  const url = new URL('../../../../ui/theme/fonts/GT-America-Standard-Bold.ttf', import.meta.url)
  console.log(url)
  const res = await fetch(url)
  const fontData = await res.arrayBuffer()
  return fontData
}

const parseRequest = (req: NextRequest): ParsedQuery => {
  const { query } = qs.parseUrl(req.url)
  const { type } = query as unknown as ParsedQuery

  switch (type) {
    case 'post':
      return query as Post

    case 'book':
      return query as Book

    case 'page':
      return query as Page
  }
}

export const GET = async (req: NextRequest) => {
  const query = parseRequest(req)
  const fontData = await loadFont()

  return new ImageResponse(<OpenGraphImage query={query} />, {
    width: 1200,
    height: 686,
    fonts: [
      {
        name: 'GT-America-Standard-Bold',
        data: fontData,
        style: 'normal',
      },
    ],
  })
}
