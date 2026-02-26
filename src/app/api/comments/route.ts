import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/getPayloadClient'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const payload = await getPayloadClient()
    const body = await request.json()
    const { postId, name, email, body: commentBody } = body || {}

    if (!postId || !name || !email || !commentBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const created = await payload.create({
      collection: 'comments',
      data: {
        post: postId,
        name,
        email,
        body: commentBody,
        approved: false,
      },
    })

    return NextResponse.json({
      id: created.id,
      approved: created.approved,
    })
  } catch (error) {
    console.error('comments POST error', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
