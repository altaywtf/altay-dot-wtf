import { NextResponse } from 'next/server'
import { readNowJSON } from 'scripts/now/lib/nowJSON'

export async function GET() {
  return NextResponse.json({ now: readNowJSON() })
}
