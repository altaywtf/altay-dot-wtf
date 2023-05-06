import { NextResponse } from 'next/server'
import { getPost } from 'lib/posts'

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: { slug: string }
  },
) {
  try {
    return NextResponse.json(getPost(params.slug))
  } catch (error) {
    return NextResponse.json(
      { message: 'Post not found.' },
      {
        status: 404,
      },
    )
  }
}
