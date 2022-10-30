import fs from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { DATA_FOLDER_PATH } from 'utils/fs'
import { readMarkdownFile } from 'utils/md'

type PostFrontMatter = {
  title: string
  oneliner: string
  date: string
  featured: boolean
}

export type Post = PostFrontMatter & {
  slug: string
  url: string
  readingTime: string
}

export const getPost = (slug: string) => {
  const file = readMarkdownFile(`/posts/${slug}.md`)
  const { content: markdown, data } = matter(file)
  const frontMatter = data as PostFrontMatter
  const readingTimeInMins = readingTime(markdown).minutes

  const post = {
    ...frontMatter,
    featured: frontMatter.featured || false,
    slug,
    url: `/posts/${slug}`,
    readingTime:
      readingTimeInMins <= 1 ? '1 min read' : `${Math.floor(readingTimeInMins)} mins read`,
  } as Post

  return { post, markdown }
}

export const getPosts = () => {
  const NOTES_FOLDER_PATH = `${DATA_FOLDER_PATH}/posts`

  const slugs = fs
    .readdirSync(NOTES_FOLDER_PATH, 'utf-8')
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.split('.md'))
    .map(([fileName]) => fileName)

  return slugs
    .map(getPost)
    .map((n) => n.post)
    .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? -1 : 1))
}

export const getFeaturedPosts = () => getPosts().filter((post) => post.featured)

export const getPostsWithMarkdown = () => getPosts().map((post) => getPost(post.slug))
