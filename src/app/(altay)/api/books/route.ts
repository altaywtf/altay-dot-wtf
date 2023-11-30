import { NextResponse } from 'next/server'
import { getBooks } from 'lib/books'

export async function GET() {
  return NextResponse.json({ books: getBooks() })
}
