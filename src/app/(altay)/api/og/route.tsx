import type { Book, Page, ParsedQuery, Post } from 'lib/og/types'
import type { NextRequest } from 'next/server'

import { OpenGraphImage } from 'lib/og/OpenGraphImage'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const loadFont = async () => {
  const url = new URL(
    '../../../../ui/theme/fonts/GT-America-Standard-Bold.ttf',
    import.meta.url,
  )
  return (await fetch(url)).arrayBuffer()
}

const loadAvatarImage = async () => {
  const url = new URL(
    '../../../../../public/images/avatar.png',
    import.meta.url,
  )
  return (await fetch(url)).arrayBuffer()
}

const loadBackgroundImage = async () => {
  const url = new URL(
    '../../../../../public/images/meta-bg.png',
    import.meta.url,
  )
  return (await fetch(url)).arrayBuffer()
}

const parseRequest = (request: NextRequest): ParsedQuery => {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') as ParsedQuery['type']

  switch (type) {
    case 'post':
      return {
        oneliner: searchParams.get('oneliner') as Post['oneliner'],
        title: searchParams.get('title') as Post['title'],
        type,
      }

    case 'book':
      return {
        author: searchParams.get('author') as Book['author'],
        coverImagePath: searchParams.get(
          'coverImagePath',
        ) as Book['coverImagePath'],
        title: searchParams.get('title') as Book['title'],
        type,
      }

    case 'page':
      return {
        title: searchParams.get('title') as Page['title'],
        type,
      }
  }
}

export const GET = async (req: NextRequest) => {
  const query = parseRequest(req)
  const fontData = await loadFont()
  const avatarImage = await loadAvatarImage()
  const backgroundImage = await loadBackgroundImage()

  return new ImageResponse(
    (
      <OpenGraphImage
        avatarImage={avatarImage}
        backgroundImage={backgroundImage}
        query={query}
      />
    ),
    {
      fonts: [
        {
          data: fontData,
          name: 'GT-America-Standard-Bold',
          style: 'normal',
        },
      ],
      height: 686,
      width: 1200,
    },
  )
}
