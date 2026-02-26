import { getPayloadClient } from '@/lib/getPayloadClient'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const payload = await getPayloadClient()

  try {
    const existing = await payload.find({
      collection: 'properties',
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      return NextResponse.json({ message: 'Already seeded' })
    }

    // Create a dummy media
    // Note: In a real scenario, we'd upload a file. Here we might fail if we don't provide a file.
    // But let's try to create properties without images first or use a placeholder ID if we can.
    // Actually, images are required in my schema.
    // I'll make images optional in schema for now to make seeding easier, or I'll try to upload a buffer.
    
    // For now, let's just create properties and maybe skip images or use a fake ID (which will fail validation if it checks existence).
    // I'll update schema to make images optional for now? No, user wants "real".
    // I'll try to create a media item.
    
    /*
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: 'Placeholder',
      },
      filePath: path.resolve(__dirname, './placeholder.jpg'), // Need a real file
    })
    */

    // Let's just create properties with empty images array if validation allows, or update schema to optional.
    // I'll update schema to optional for now.
    
    await payload.create({
      collection: 'properties',
      data: {
        title: 'Modern Villa in Abuja',
        price: 450000000,
        location: 'Maitama, Abuja',
        status: 'for-sale',
        type: 'house',
        bedrooms: 5,
        bathrooms: 6,
        area: 6000,
        yearBuilt: 2023,
        images: [], 
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'A beautiful modern villa.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    })

    return NextResponse.json({ message: 'Seeded successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
