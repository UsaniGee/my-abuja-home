'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value)) : ''

const getImageUrl = (img: any) => {
  if (!img) return ''
  if (typeof img === 'string') return img
  
  // Prioritize Cloudinary secure URL if available
  if (img.cloudinary?.secure_url) return img.cloudinary.secure_url
  if (img.cloudinary?.url) return img.cloudinary.url
  
  // Fallback to standard URL
  if (img.url) {
    // If it's already an absolute URL, return it
    if (img.url.startsWith('http')) return img.url
    // Otherwise, if we're on the client, it might be a relative path
    // But on Vercel, relative paths for local media will 404
    return img.url
  }
  
  return ''
}

const BlogGridSection = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const res = await fetch('/api/blog?limit=6')
      if (!res.ok) throw new Error('Failed to fetch blog posts')
      return res.json()
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (isError) {
    return <p className="text-center text-red-500 py-10">Error loading blog posts.</p>
  }

  if (!posts?.length) return null

  return (
    <section className="px-5 py-10 lg:py-[60px] lg:px-14 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post: any) => {
          const imageUrl = getImageUrl(post.featuredImage)
          const tags = Array.isArray(post.tags) ? post.tags.map((t: any) => t?.tag).filter(Boolean) : []
          return (
            <Link key={post.id} href={`/media/${post.id}`}>
              <article
                className="group rounded-[7px] overflow-hidden flex flex-col"
              >
                <div className="relative h-52 w-full">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.title || 'Blog cover'}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100" />
                  )}
                </div>
                <div className="py-5 space-y-3 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs">{post.publisher?.name}</span>
                    <span>•</span>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatDate(post.publishDate)}</span>
                      {tags.length ? <span className="text-primary font-medium">{tags[0]}</span> : null}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default BlogGridSection
