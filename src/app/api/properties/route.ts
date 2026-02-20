import { getPayloadClient } from '@/lib/getPayloadClient'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const payload = await getPayloadClient()
    const results = await payload.find({
      collection: 'properties',
      limit: 100,
      depth: 1,
    })

    return NextResponse.json(results)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
