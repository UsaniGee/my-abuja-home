import { getPayloadClient } from '@/lib/getPayloadClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get('limit')) || 6

    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'blog-posts',
      limit,
      sort: '-publishDate',
      depth: 1,
    })

    return NextResponse.json(result.docs)
  } catch (error: any) {
    console.error('Blog API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
