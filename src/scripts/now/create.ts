import '../env'
import { readMarkdownFile } from 'utils/md'
import { createNowJSON } from './lib/types'
import { fetchBooks } from './lib/books'
import { fetchMusic } from './lib/music'
import { writeNowJSON } from './lib/nowJSON'
import { fetchShows } from './lib/shows'

const main = async () => {
  const life = readMarkdownFile('now.md')
  const books = await fetchBooks()
  const music = await fetchMusic()
  const shows = await fetchShows()
  writeNowJSON(createNowJSON({ life, books, music, shows }))
}

main()
