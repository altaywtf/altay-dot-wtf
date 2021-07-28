import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'config'
import { getContentList } from 'core/api/content'
import { convertMarkdownToHTML } from 'core/api/md'
import { Book, Note } from 'types'
import fs from 'fs'
import { Feed, Item, Author } from 'feed'

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

const getNotes = async () => (await getContentList('note')) as Note[]
const mapNoteToRssFeedItem = (note: Note): Item => mapContentToRssFeedItem(note)

const getBooks = async () => (await getContentList('book')) as Book[]
const mapBookToRssFeedItem = (book: Book): Item => mapContentToRssFeedItem(book)

const generateRssForNotes = async () => {
  const feed = new Feed({
    id: `${SITE_URL}/notes`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    copyright: SITE_URL,
    link: `${SITE_URL}/notes`,
    language: 'en',
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${SITE_URL}/rss/notes/feed.xml`,
      json: `${SITE_URL}/rss/notes/feed.json`,
      atom: `${SITE_URL}/rss/notes/atom.xml`,
    },
  })

  const notes = await getNotes()
  const feedItems = notes.map(mapNoteToRssFeedItem)
  feedItems.forEach(feed.addItem)

  fs.mkdirSync('./public/rss', { recursive: true })
  fs.mkdirSync('./public/rss/notes', { recursive: true })
  fs.writeFileSync('./public/rss/notes/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/notes/feed.json', feed.json1())
  fs.writeFileSync('./public/rss/notes/atom.xml', feed.atom1())
}

generateRssForNotes()
