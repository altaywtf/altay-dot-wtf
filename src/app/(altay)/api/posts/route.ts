import { getPosts } from 'lib/posts'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ posts: getPosts() })
}
