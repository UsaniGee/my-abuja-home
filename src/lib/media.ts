import { getPayloadClient } from './getPayloadClient'

const baseUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'http://localhost:3000'

export async function getInstagramFeed() {
  try {
    const res = await fetch(`${baseUrl}/instagram-feed`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('getInstagramFeed error', error)
    return []
  }
}

export async function getBlogPosts(limit = 6) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    limit,
    sort: '-publishDate',
    depth: 1,
  })
  return result.docs
}

export async function getNewsPosts(limit = 6) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news-posts',
    limit,
    sort: '-publishDate',
    depth: 1,
  })
  return result.docs
}

export async function getBlogBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}

export async function getNewsBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news-posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}

export async function getCommentsForPost(postId: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'comments',
    where: {
      post: {
        equals: postId,
      },
      approved: {
        equals: true,
      },
    },
    sort: '-createdAt',
    depth: 0,
  })
  return result.docs
}
