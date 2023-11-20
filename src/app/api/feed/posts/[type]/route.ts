import { SITE_DESCRIPTION, SITE_TITLE } from 'config'
import { NextRequest } from 'next/server'
import { getPosts, getPost } from 'lib/posts'
import { createFeed, mapPostToRssFeedItem } from '../../lib'

export const GET = async (request: NextRequest, { params }: { params: { type: string } }) => {
  const feed = createFeed({
    path: 'posts',
    items: getPosts().map((post) => mapPostToRssFeedItem(post, getPost(post.slug).markdown)),
    options: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
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
