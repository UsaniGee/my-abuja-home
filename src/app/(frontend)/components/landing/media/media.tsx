'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MediaHome = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(0)

  const mediaItems = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764929770/IMG_8401_1_vfv6p0.svg',
      date: 'AUGUST 4, 2025',
      category: 'BUSINESSDAY',
      title: 'Developer sees growth in Abuja suburbs, launches luxury apartment',
      featured: true
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764929769/IMG_8401_1_1_uwnzd8.svg',
      date: 'AUGUST 4, 2025',
      category: 'LEADERSHIP',
      title: 'Developer Launches Housing Scheme in FCT',
      featured: false
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764929769/IMG_8401_1_2_opmtud.svg',
      date: 'SEPTEMBER 3, 2025',
      category: 'NIGERIANPILOT',
      title: 'Developer Sees growth in Abuja suburbs, Launches Mass Houses',
      featured: false
    }
  ]

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(Math.floor(mediaItems.length / 3), prev + 1))
  }

  return (
    <div className='bg-[#FAFAFA] px-5 py-10 lg:py-20 lg:px-14'>
      <div className='grid lg:grid-cols-3 items-center gap-10 mb-12'>
        <div className='flex items-center gap-2.5'>
          <div className='border-b border-primary w-8.5' />
          <h1 className='border rounded-full border-primary px-4 py-2'>Media & Blogs</h1>
        </div>
        <div className='text-4xl font-bold text-center lg:text-left'>
          Explore Insights, news & property trends
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

   
      <div className='grid lg:grid-cols-2 gap-6 mb-8'>
        
        {mediaItems[0] && (
          <div 
            className='overflow-hidden duration-300 cursor-pointer group'
            onClick={() => router.push(`/media/${mediaItems[0].id}`)}
          >
            <div className='relative h-[300px] lg:h-[450px] overflow-hidden'>
              <Image
                src={mediaItems[0].image}
                alt={mediaItems[0].title}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-500'
              />
            </div>
            
            <div className='py-6 lg:py-8'>
              <div className='flex items-center gap-3 mb-3'>
                <span className='text-xs font-semibold text-gray-600'>{mediaItems[0].date}</span>
                <span className='text-xs text-gray-400'>|</span>
                <span className='text-xs font-semibold text-gray-600'>{mediaItems[0].category}</span>
              </div>
              <h3 className='font-medium text-xl lg:text-2xl leading-tight tracking-wide text-gray-900'>
                {mediaItems[0].title}
              </h3>
            </div>
          </div>
        )}

        <div className='grid gap-6'>
          {mediaItems.slice(1, 3).map((item) => (
            <div 
              key={item.id}
              className='overflow-hidden  duration-300 cursor-pointer group'
              onClick={() => router.push(`/media/${item.id}`)}
            >
              <div className='relative h-[300px] lg:h-[180px] overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>
              
              <div className='py-5'>
                <div className='flex items-center gap-3 mb-2'>
                  <span className='text-xs font-semibold text-gray-600'>{item.date}</span>
                  <span className='text-xs text-gray-400'>|</span>
                  <span className='text-xs font-semibold text-gray-600'>{item.category}</span>
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

        {/* <div className='flex items-center gap-3'>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className='w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
          <button
            onClick={handleNext}
            className='w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:text-primary transition-colors'
          >
            <ChevronRight className='w-5 h-5' />
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default MediaHome