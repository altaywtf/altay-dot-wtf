import { getBook } from '@/lib/books'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: { slug: string }
  },
) {
  try {
    return NextResponse.json(getBook(params.slug))
  } catch (error) {
    return NextResponse.json(
      { message: 'Book not found.' },
      {
        status: 404,
      },
    )
  }
}
