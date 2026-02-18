import Image from 'next/image'
import Link from 'next/link'
import { getNewsPosts } from '@/lib/media'

const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat(undefined, { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value)) : ''

const getImageUrl = (img: any) => {
  if (!img) return ''
  if (typeof img === 'string') return img
  if (img.url) return img.url
  return ''
}

const NewsGridSection = async () => {
  const news = await getNewsPosts(6)

  if (!news.length) return null

  return (
    <section className="px-5 py-10 lg:py-[60px] lg:px-14 space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {news.map((item: any) => {
          const imageUrl = getImageUrl(item.featuredImage)
          return (
            <article
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-white flex flex-col"
            >
              <div className="relative h-48 w-full">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.title || 'News cover'}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    unoptimized
                  />
                ) : (
                  <div className="h-full w-full bg-gray-100" />
                )}
              </div>
              <div className="py-5 space-y-2 flex-1 flex flex-col">
                <span className="text-xs text-gray-500">{formatDate(item.publishDate)}</span>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{item.excerpt}</p>
                <div className="mt-auto pt-2">
                  <Link href={`/media/${item.slug}`} className="text-primary font-semibold text-sm inline-flex items-center gap-2">
                    Read more
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default NewsGridSection
