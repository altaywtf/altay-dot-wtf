import '../env'
import { createNowJSON } from './lib/types'
import { fetchBooks } from './lib/books'
import { fetchMusic } from './lib/music'
import { writeNowJSON } from './lib/nowJSON'
import { fetchShows } from './lib/shows'

const main = async () => {
  const books = await fetchBooks()
  console.log('✅ fetch books: done!')

  const music = await fetchMusic()
  console.log('✅ fetch music: done!')

  const shows = await fetchShows()
  console.log('✅ fetch shows: done!')

  writeNowJSON(createNowJSON({ books, music, shows }))
}

main()
