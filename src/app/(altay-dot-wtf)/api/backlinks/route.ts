import { NextRequest, NextResponse } from 'next/server'
import { getBacklinks } from 'lib/backlinks'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const slug = searchParams.get('slug')

  return NextResponse.json({ backlinks: getBacklinks(`/${type}/${slug}`) })
}
