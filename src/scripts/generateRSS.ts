import type { Book, Note } from 'types'
import fs from 'fs'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'config'
import { getContentList } from 'core/api/content'
import { convertMarkdownToHTML } from 'core/api/md'
import { booksCopy } from 'config/copy'
import { Feed, Item, Author, FeedOptions } from 'feed'

const author: Author = {
  name: 'Altay',
  email: 'altay@aydemir.io',
  link: 'https://twitter.com/altaywtf',
}

const mapContentToRssFeedItem = (content: Book | Note): Item => ({
  title: content.meta.title,
  description: content.meta.oneliner,
  author: [author],
  contributor: [author],
  content: convertMarkdownToHTML(content.markdown),
  link: `${SITE_URL}/${content.type}s/${content.slug}`,
  date: new Date(content.meta.date),
})
const mapNoteToRssFeedItem = (note: Note): Item => mapContentToRssFeedItem(note)
const mapBookToRssFeedItem = (book: Book): Item => mapContentToRssFeedItem(book)

const generateFeedFiles = (name: string, feed: Feed) => {
  fs.mkdirSync(`./public/rss/${name}`, { recursive: true })
  fs.writeFileSync(`./public/rss/${name}/feed.xml`, feed.rss2())
  fs.writeFileSync(`./public/rss/${name}/feed.json`, feed.json1())
  fs.writeFileSync(`./public/rss/${name}/atom.xml`, feed.atom1())
}

const generateRssForContent = async ({
  path,
  items,
  options,
}: {
  path: string
  items: Item[]
  options: Omit<FeedOptions, 'id' | 'copyright'>
}) => {
  const feed = new Feed({
    id: `${SITE_URL}/${path}`,
    copyright: SITE_URL,
    link: `${SITE_URL}/${path}`,
    language: 'en',
    feedLinks: {
      rss2: `${SITE_URL}/rss/${path}/feed.xml`,
      json: `${SITE_URL}/rss/${path}/feed.json`,
      atom: `${SITE_URL}/rss/${path}/atom.xml`,
    },
    ...options,
  })

  items.forEach(feed.addItem)
  generateFeedFiles(path, feed)
}

const generateRSS = async () => {
  fs.mkdirSync('./public/rss', { recursive: true })

  const notes = (await getContentList('note')) as Note[]
  await generateRssForContent({
    path: 'notes',
    items: notes.map(mapNoteToRssFeedItem),
    options: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  })

  const books = (await getContentList('book')) as Book[]
  await generateRssForContent({
    path: 'books',
    items: books.map(mapBookToRssFeedItem),
    options: {
      title: `${SITE_TITLE} - book notes`,
      description: booksCopy.description,
    },
  })
}

generateRSS()
