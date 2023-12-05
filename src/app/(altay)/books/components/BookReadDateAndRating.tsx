'use client'

import type { Book } from '@/lib/books'

import { format } from 'date-fns'
import StarRating from 'react-star-rating-component'

type Props = {
  book: Book
}

export const BookReadDateAndRating: React.FC<Props> = ({ book }) => {
  const info = [
    {
      component: (
        <p className="text-neutral-400">
          Read in {format(new Date(book.dateRead), 'MMMM yyyy')}
        </p>
      ),
      key: 'date',
    },
    {
      component: (
        <StarRating
          editing={false}
          name={`rating-${book.slug}`}
          starColor="#F7C744"
          starCount={5}
          value={book.rating}
        />
      ),
      key: 'rating',
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
