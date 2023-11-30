import { getBooks } from 'lib/books'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ books: getBooks() })
}
