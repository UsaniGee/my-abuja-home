import { getPayloadClient } from '@/lib/getPayloadClient'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const payload = await getPayloadClient()

    // 1. Extract and Sanitize Parameters
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 12
    
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    
    const minArea = searchParams.get('minArea')
    const maxArea = searchParams.get('maxArea')
    
    const bedrooms = searchParams.get('bedrooms')
    const bathrooms = searchParams.get('bathrooms')
    
    const minYear = searchParams.get('minYear')
    const maxYear = searchParams.get('maxYear')

    // 2. Build the Payload 'where' query
    const where: any = {}

    // Global Search (Title or Location)
    if (search) {
      where.or = [
        { title: { like: search } },
        { location: { like: search } },
      ]
    }

    // Status & Type
    if (status && status !== 'all') {
      where.status = { equals: status }
    }
    if (type && type !== 'all') {
      where.type = { equals: type }
    }

    // Price Range Logic
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.greater_than_equal = Number(minPrice)
      if (maxPrice) where.price.less_than_equal = Number(maxPrice)
    }

    // Area Range Logic
    if (minArea || maxArea) {
      where.area = {}
      if (minArea) where.area.greater_than_equal = Number(minArea)
      if (maxArea) where.area.less_than_equal = Number(maxArea)
    }

    // Year Built Range Logic
    if (minYear || maxYear) {
      where.yearBuilt = {}
      if (minYear) where.yearBuilt.greater_than_equal = Number(minYear)
      if (maxYear) where.yearBuilt.less_than_equal = Number(maxYear)
    }

    // Rooms (Greater than or equal to selection)
    if (bedrooms && bedrooms !== 'any') {
      where.bedrooms = { greater_than_equal: Number(bedrooms) }
    }
    if (bathrooms && bathrooms !== 'any') {
      where.bathrooms = { greater_than_equal: Number(bathrooms) }
    }

    // 3. Execute Fetch
    const result = await payload.find({
      collection: 'properties',
      where,
      page,
      limit,
      depth: 1,
      overrideAccess: true, 
      sort: '-createdAt',   
    })

    return NextResponse.json(result)

  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}