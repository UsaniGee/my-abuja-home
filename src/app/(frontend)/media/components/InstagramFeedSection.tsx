import Image from 'next/image'
import Link from 'next/link'
import { getInstagramFeed } from '@/lib/media'

const InstagramFeedSection = async () => {
  const feed = await getInstagramFeed()
  const items = feed.slice(0, 6)

  if (!items.length) return null

  return (
    <section className="px-5 py-10 lg:py-[60px] lg:px-14 space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Featured</span>
          <div className="h-px w-10 bg-primary/40" />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Instagram Highlights</h2>
        <p className="text-gray-600">Latest moments from our community and projects.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item: any) => (
          <Link
            key={item.id}
            href={item.permalink || '#'}
            target="_blank"
            className="group relative rounded-2xl overflow-hidden shadow-sm border border-gray-100"
          >
            <div className="relative h-56 w-full">
              <Image
                src={item.media_url || item.thumbnail_url || ''}
                alt={item.caption || 'Instagram post'}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />
            </div>
            <div className="p-4 space-y-2 bg-white">
              <p className="text-sm text-gray-700 line-clamp-2">
                {item.caption || 'View post on Instagram'}
              </p>
              <span className="text-xs text-primary font-medium">View on Instagram →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default InstagramFeedSection
