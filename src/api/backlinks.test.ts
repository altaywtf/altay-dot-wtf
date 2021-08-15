import { getBacklinks } from './backlinks'
import { getPostsWithMarkdown } from './posts'
import { getBooksWithMarkdown } from './books'

jest.mock('./posts', () => ({
  getPostsWithMarkdown: jest.fn(),
}))

jest.mock('./books', () => ({
  getBooksWithMarkdown: jest.fn(() => []),
}))

describe('getBacklinks', () => {
  beforeAll(() => {
    const mockGetPostsWithMarkdown = getPostsWithMarkdown as jest.MockedFunction<
      typeof getPostsWithMarkdown
    >

    mockGetPostsWithMarkdown.mockImplementation(() => [
      {
        post: {
          title: 'yes',
          oneliner: 'yes',
          date: '2020-12-21T20:41:04Z',
          featured: true,
          slug: 'yes',
          url: '/posts/yes',
          readingTime: '1 min read',
        },
        markdown: 'hello and [hi](/posts/hi)',
      },
      {
        post: {
          title: 'no',
          oneliner: 'no',
          date: '2020-12-21T20:41:04Z',
          featured: false,
          slug: 'no',
          url: '/posts/no',
          readingTime: '1 min read',
        },
        markdown: 'hello and hi',
      },
    ])

    const mockGetBooksWithMarkdown = getBooksWithMarkdown as jest.MockedFunction<
      typeof getBooksWithMarkdown
    >

    mockGetBooksWithMarkdown.mockImplementation(() => [
      {
        book: {
          authors: ['Jess Henderson'],
          coverImage: {
            url: '/images/books/offline-matters/cover.png',
            blurhash:
              'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAMDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAeEAABAwQDAAAAAAAAAAAAAAADAAECBAUGEQdTY//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8As3jjpg1rDjlmVO0Qi1urH1x80RFB/9k=',
            aspectRatio: 0.8067226890756303,
          },
          dateRead: '2021-07-16',
          identifiers: [
            {
              identifier: '9063695780',
              type: 'ISBN_10',
            },
            {
              identifier: '9789063695781',
              type: 'ISBN_13',
            },
          ],
          notes: {
            url: '/books/offline-matters',
          },
          quote: 'We are all bored and everything is boring. Occupied 24/7, doing nothing at all.',
          rating: 4,
          remoteCoverImage: {
            url: 'https://cdn.webshopapp.com/shops/71491/files/331301478/jess-henderson-offline-matters.jpg',
          },
          slug: 'offline-matters',
          title: 'Offline Matters',
        },
        markdown: 'hello and [hi](/posts/hi)',
      },
    ])
  })

  it('works', () => {
    const input = `/posts/hi`
    expect(getBacklinks(input)).toMatchInlineSnapshot(`
      Array [
        Object {
          "title": "yes",
          "type": "post",
          "url": "/posts/yes",
        },
        Object {
          "title": "Offline Matters by Jess Henderson",
          "type": "book",
          "url": "/books/offline-matters",
        },
      ]
    `)
  })
})
