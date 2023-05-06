import { NextSeo } from 'next-seo'
import { getOpenGraphImage } from 'lib/utils/openGraph'
import { SITE_URL } from 'config'
import { fetchData } from './fetchData'

const Head = async ({ params }: { params: { slug: string } }) => {
  const { book } = await fetchData(params.slug)
  const pageTitle = `${book.title} by ${book.authors.join(', ')}`

  const a = getOpenGraphImage({
    type: 'book',
    title: book.title,
    author: book.authors.join(', '),
    coverImageURL: SITE_URL + book.coverImage.url,
  })

  console.log(a)

  return (
    <NextSeo
      useAppDir
      title={pageTitle}
      description={book.quote}
      openGraph={{
        title: pageTitle,
        description: book.quote,
        images: [
          getOpenGraphImage({
            type: 'book',
            title: book.title,
            author: book.authors.join(', '),
            coverImageURL: SITE_URL + book.coverImage.url,
          }),
        ],
      }}
    />
  )
}

export default Head
