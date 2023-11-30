import { SITE_DESCRIPTION, SITE_TITLE } from 'config'
import { getPost, getPosts } from 'lib/posts'
import { NextRequest } from 'next/server'

import { createFeed, mapPostToRssFeedItem } from '../../lib'

export const GET = async (request: NextRequest, { params }: { params: { type: string } }) => {
  const feed = createFeed({
    items: getPosts().map((post) => mapPostToRssFeedItem(post, getPost(post.slug).markdown)),
    options: {
      description: SITE_DESCRIPTION,
      title: SITE_TITLE,
    },
    path: 'posts',
  })

  switch (params.type) {
    case 'rss':
    default:
      console.log('hirss')
      return new Response(feed.rss2(), {
        headers: {
          'content-type': 'application/rss+xml; charset=utf-8',
        },
      })

    case 'atom':
      return new Response(feed.atom1(), {
        headers: {
          'content-type': 'application/atom+xml; charset=utf-8',
        },
      })

    case 'json':
      console.log('hijson')
      return new Response(feed.json1(), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      })
  }
}
