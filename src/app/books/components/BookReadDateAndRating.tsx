'use client'

import StarRating from 'react-star-rating-component'
import { format } from 'date-fns'
import type { Book } from 'lib/books'

type Props = {
  book: Book
}

export const BookReadDateAndRating: React.FC<Props> = ({ book }) => {
  const info = [
    {
      key: 'date',
      component: (
        <p className="text-neutral-400">Read in {format(new Date(book.dateRead), 'MMMM yyyy')}</p>
      ),
    },
    {
      key: 'rating',
      component: (
        <StarRating
          name={`rating-${book.slug}`}
          value={book.rating}
          starCount={5}
          editing={false}
          starColor="#F7C744"
        />
      ),
    },
  ]

  return (
    <>
      {info.map((i) => (
        <div key={i.key}>{i.component}</div>
      ))}
    </>
  )
}
