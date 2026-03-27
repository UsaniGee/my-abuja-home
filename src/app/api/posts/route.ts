import { getPayloadClient } from '@/lib/getPayloadClient'
import { NextRequest, NextResponse } from 'next/server'

const getImageUrl = (image: any): string => {
  if (!image) return '/placeholder.jpg'
  if (typeof image === 'string') {
    return image.startsWith('http') || image.startsWith('/') ? image : '/placeholder.jpg'
  }
  return image?.url || '/placeholder.jpg'
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get('limit')) || 10
    const category = searchParams.get('category')

    const payload = await getPayloadClient()

    const [newsResult, blogResult] = await Promise.all([
      category === 'Blogs'
        ? Promise.resolve({ docs: [] })
        : payload.find({ collection: 'news-posts', limit, sort: '-publishDate', depth: 1 }),

      category === 'News'
        ? Promise.resolve({ docs: [] })
        : payload.find({ collection: 'blog-posts', limit, sort: '-publishDate', depth: 1 }),
    ])

    const newsDocs = newsResult.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      image: getImageUrl(doc.featuredImage),
      publishDate: doc.publishDate,
      tags: doc.tags,
      type: 'News',
      source: 'My Abuja Homes',
    }))

    const blogDocs = blogResult.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      image: getImageUrl(doc.featuredImage),
      publishDate: doc.publishDate,
      tags: doc.tags,
      type: 'Blog',
      source: 'My Abuja Homes',
    }))

    const allPosts = [...newsDocs, ...blogDocs].sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    return NextResponse.json(allPosts.slice(0, limit))
  } catch (error: any) {
    console.error('Unified Posts API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    )
  }
}
