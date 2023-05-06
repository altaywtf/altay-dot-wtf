import { NextResponse } from 'next/server'
import { getContactLinks } from 'lib/contact'

export async function GET() {
  return NextResponse.json({ links: getContactLinks() })
}
