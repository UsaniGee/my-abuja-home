'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type PropertyItem = {
  id?: string | number
  title?: string
  price?: number | string
  description?: any
  images?: Array<{ url?: string }>
  [key: string]: any
}

const Properties = () => {
  const [properties, setProperties] = useState<PropertyItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const res = await fetch('/api/properties')
        if (!res.ok) throw new Error('Failed to fetch properties')
        const data = await res.json()
        const items = data.docs ?? data
        if (mounted) setProperties(items)
      } catch (err) {
        console.error('Properties fetch error:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className='min-h-[200px] flex items-center justify-center text-white'>Loading properties...</div>
  if (!properties.length) return <div className='min-h-[200px] flex items-center justify-center text-white'>No properties found</div>

  return (
    <div className='grid grid-cols-1 md:grid-cols-10 gap-5 bg-black'>
      {properties.map((item: PropertyItem, idx) => {
        const imageUrl = item.images && item.images[0] && item.images[0].url ? item.images[0].url : null
        const span = idx % 3 === 0 ? 1 : 2
        const spanClass = span === 2 ? 'md:col-span-5' : 'md:col-span-10'

        return (
          <div key={item.id ?? idx} className={`col-span-1 ${spanClass} relative`}>
            <div className={`h-full object-contain overflow-hidden`}>
              {imageUrl ? (
                <Image src={imageUrl} alt={item.title || 'Property'} width={779} height={384} className={`w-full h-[243px] lg:h-full lg:max-h-[861px] object-cover hover:scale-110 transition-all duration-300`} sizes="(max-width: 768px) 100vw, 50vw" />
              ) : (
                <div className='w-full h-[243px] lg:h-[861px] bg-gray-700' />
              )}
            </div>

            <div className='text-white absolute flex gap-2 top-5 left-5 lg:top-14 lg:left-14 z-10 text-sm'>
              <Button className={`rounded-4xl text-white bg-black border ${idx === 0 ? 'bg-transparent border-primary text-primary' : 'bg-black border-black text-white'}`}>
                {idx === 0 ? 'Homes' : 'Rent'}
              </Button>
              <Button className='rounded-4xl bg-white text-black hover:bg-white'>
                {idx === 0 ? 'For Rent' : 'Featured'}
              </Button>
            </div>

            <div className={`w-full flex flex-col justify-between gap-2 text-white absolute px-5 lg:px-14 bottom-5 lg:bottom-14 z-10 ${span === 1 ? 'lg:flex-row-reverse' : 'flex-col'} ${span === 1 ? 'lg:items-center' : 'items-start'}`}>
              <p className='text-sm lg:text-base'>{typeof item.description === 'string' ? item.description : 'Premium property'}</p>
              <div>
                <p className='lg:text-3xl font-medium'>PRICE - ₦{item.price?.toLocaleString?.() ?? item.price}</p>
                <h1 className='lg:text-5xl font-medium'>{item.title && item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title || 'Property'}</h1>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Properties




 // const properties = [
  //   {
  //     id: 1,
  //     span: 1,
  //     title: 'Broadwater Estate',
  //     price: '₦1,700,000',
  //     description: 'Property One Description',
  //     image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_1200/v1764303562/prop-one_k2uecz.svg',
  //   },
  //   {
  //    id: 2,
  //    span: 2,
  //    title: 'Broadwater Estate',
  //    price: '₦1,700,000',
  //    description: 'Property Two Description',
  //    image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_1200/v1764303540/prop-two_kzjoup.jpg',
  //  },
  // {
  //   id: 3,
  //   span: 2,
  //    title: 'Broadwater Estate',
  //    price: '₦1,700,000',
  //    description: 'Property Two Description',
  //    image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_1200/v1764303548/prop-three_mxvikg.jpg',
  //  },
  //   {
  //     id: 4,
  //     span: 1,
  //     title: 'Broadwater Estate',
  //     price: '₦1,700,000',
  //     description: 'Property One Description',
  //     image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_1200/v1764303555/prop-four_sey98g.svg',
  //   },
  //    {
  //    id: 5,
  //    span: 2,
  //    title: 'Broadwater Estate',
  //    price: '₦1,700,000',
  //    description: 'Property Two Description',
  //    image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_1200/v1764303545/prop-five_evg4vx.jpg',
  //  },
  // {
  //   id: 6,
  //   span: 2,
  //    title: 'Broadwater Estate',
  //    price: '₦1,700,000',
  //    description: 'Property Two Description',
  //    image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_1920/v1764303706/HeroBgImg_adjvkt.jpg',
  //  },
  //  {
  //     id: 7,
  //     span: 1,
  //     title: 'Broadwater Estate',
  //     price: '₦1,700,000',
  //     description: 'Property One Description',
  //     image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_1920/v1764303706/HeroBgImg_adjvkt.jpg',
  //   }
  // ]
