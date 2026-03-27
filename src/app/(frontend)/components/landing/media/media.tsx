'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

const formatDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        .format(new Date(value))
        .toUpperCase()
    : ''

const MediaHome = () => {
  const router = useRouter()

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['landing-media-posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts?limit=3')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  return (
    <div className='bg-[#FAFAFA] px-5 py-10 lg:py-20 lg:px-14'>
      <div className='grid lg:grid-cols-3 items-center gap-10 mb-12'>
        <div className='flex items-center gap-2.5'>
          <div className='border-b border-primary w-8.5' />
          <h1 className='border rounded-full border-primary px-4 py-2'>Media &amp; Blogs</h1>
        </div>
        <div className='text-4xl font-bold text-center lg:text-left'>
          Explore Insights, news &amp; property trends
        </div>
        <div className='flex justify-end'>
          <Button
            onClick={() => router.push('/media')}
            className='rounded-[30px] w-full lg:w-[229px] lg:h-[48px] px-6 py-6 hover:lg:w-[250px]'
          >
            Explore all media
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className='flex justify-center py-24'>
          <Loader2 className='animate-spin text-primary' size={36} />
        </div>
      )}

      {isError && (
        <p className='text-center text-red-500 py-10'>Error loading media.</p>
      )}

      {!isLoading && !isError && posts?.length > 0 && (
        <>
          <div className='grid lg:grid-cols-2 gap-6 mb-8'>
            {/* Featured (first item) */}
            {posts[0] && (
              <div
                className='overflow-hidden duration-300 cursor-pointer group'
                onClick={() => router.push(`/media/${posts[0].id}`)}
              >
                <div className='relative h-[300px] lg:h-[450px] overflow-hidden'>
                  <Image
                    src={posts[0].image}
                    alt={posts[0].title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                    unoptimized
                  />
                </div>
                <div className='py-6 lg:py-8'>
                  <div className='flex items-center gap-3 mb-3'>
                    <span className='text-xs font-semibold text-gray-600'>{formatDate(posts[0].publishDate)}</span>
                    <span className='text-xs text-gray-400'>|</span>
                    <span className='text-xs font-semibold text-gray-600'>{posts[0].type}</span>
                  </div>
                  <h3 className='font-medium text-xl lg:text-2xl leading-tight tracking-wide text-gray-900'>
                    {posts[0].title}
                  </h3>
                </div>
              </div>
            )}

            {/* Two smaller items */}
            <div className='grid gap-6'>
              {posts.slice(1, 3).map((item: any) => (
                <div
                  key={item.id}
                  className='overflow-hidden duration-300 cursor-pointer group'
                  onClick={() => router.push(`/media/${item.id}`)}
                >
                  <div className='relative h-[300px] lg:h-[180px] overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-500'
                      unoptimized
                    />
                  </div>
                  <div className='py-5'>
                    <div className='flex items-center gap-3 mb-2'>
                      <span className='text-xs font-semibold text-gray-600'>{formatDate(item.publishDate)}</span>
                      <span className='text-xs text-gray-400'>|</span>
                      <span className='text-xs font-semibold text-gray-600'>{item.type}</span>
                    </div>
                    <h3 className='font-medium text-xl lg:text-2xl leading-tight tracking-wide text-gray-900 line-clamp-2'>
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <Button
              onClick={() => router.push('/media')}
              variant='outline'
              className='rounded-full border-2 border-gray-300 px-6 py-2 hover:border-primary hover:text-primary'
            >
              Explore all media
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default MediaHome