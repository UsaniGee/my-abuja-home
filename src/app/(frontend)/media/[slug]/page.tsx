import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, Clock, Share2 } from 'lucide-react'
import CommentForm from '../components/CommentForm'
import CommentsList from '../components/CommentsList'
import { getBlogBySlug, getCommentsForPost } from '@/lib/media'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { notFound } from 'next/navigation'
import InnerPageHero from '../../components/inner-pages/inner-page-hero'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const dynamic = 'force-dynamic'

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
    if (img.url.startsWith('http')) return img.url
    return img.url
  }
  
  return ''
}

type PageProps = {
  params: Promise<{ slug: string }>
}

const BlogDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params
  const payload = await getPayloadClient()

  let blog
  try {
    // Try slug first, then fallback to ID
    let result = await payload.find({
      collection: 'blog-posts',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 2,
    })
    blog = result.docs[0]

    // Fallback: try by ID for backward compatibility
    if (!blog) {
      result = await payload.find({
        collection: 'blog-posts',
        where: {
          id: {
            equals: slug,
          },
        },
        limit: 1,
        depth: 2,
      })
      blog = result.docs[0]
    }
  } catch (error) {
    console.error('Error fetching blog:', error)
    return notFound()
  }
  if (!blog) {
    return notFound()
  }

  const comments = blog?.id ? await getCommentsForPost(blog.id as string) : []
  const tags = Array.isArray(blog.tags) ? blog.tags.map((t: any) => t?.tag).filter(Boolean) : []
  const imageUrl = getImageUrl(blog.featuredImage)

  return (
  <>
         <InnerPageHero
        backgroundImage={'https://res.cloudinary.com/dnu4lxiie/image/upload/v1769085310/f799ec229daf1f39f632654ecd47f5e812036b17_whvpfg.jpg'}
        title={'Media/Blogs'}
        subtitle={blog.subtitle}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Media/Blogs', href: '/media' },
        ]}
        overlayOpacity={0.5}
      />

 
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="px-14 py-10 lg:py-14">
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
          <Link href="/media" className="text-primary font-semibold">Media</Link>
          <span>•</span>
          <span>{formatDate(blog.publishDate)}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1"><CalendarIcon size={14} />Updated</span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">{blog.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <span className="inline-flex items-center gap-1"><Clock size={14} /> 6 min read</span>
          <div className="flex items-center gap-2 text-primary">
            <Share2 size={16} />
            <span className="text-sm font-semibold">Share</span>
          </div>
        </div>

        {imageUrl ? (
          <div className="relative w-full h-[320px] lg:h-[420px] rounded-2xl overflow-hidden mb-6">
            <Image src={imageUrl} alt={blog.title || 'Featured image'} fill className="object-cover" unoptimized />
          </div>
        ) : null}


          <article className="mt-6">
          {(blog as any).contents && (
                  <RichText data={(blog as any).contents} />
                 )}
              </article>

        <div className="flex gap-2 items-center mt-4">
            <span className="text-base font-bold">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <span key={tag} className="rounded-[8px] bg-[#F2F2F2] text-primary px-3 py-2 text-base font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        <CommentsList comments={comments as any} />
        {blog?.id ? <CommentForm postId={blog.id as string} /> : null}
      </div>
    </div>
    </>
  )
}

export default BlogDetailPage
