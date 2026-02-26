'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {  SearchX } from 'lucide-react'
import Link from 'next/link'

type PropertyItem = {
  id?: string | number
  title?: string
  price?: number | string
  description?: any
  images?: Array<{ url?: string; alt?: string }>
  [key: string]: any
}

const fetchProperties = async (): Promise<PropertyItem[]> => {
  const res = await fetch('/api/search-properties')
  if (!res.ok) throw new Error('Failed to fetch')
  const data = await res.json()
  return data.docs ?? data
}

const Properties = () => {
  const { data: properties, isLoading, isError } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    staleTime: 1000 * 60 * 5, 
  })

  if (isLoading) return <PropertySkeleton />

  if (isError || !properties?.length) return <NoPropertiesFound />

  return (
   <div className="w-full px-5 lg:px-14 py-10">
  <div className="columns-1 md:columns-2 gap-6 space-y-6">
    {properties.slice(0,8).map((item, idx) => {
      const imageUrl = item.images?.[0]?.url || null;

      return (
       
        <div 
          key={item.id ?? idx} 
          className="relative break-inside-avoid min-h-[350px] md:min-h-[300px] lg:h-auto rounded-2xl overflow-hidden  bg-black  backdrop-blur-lg group"
        >
          <Link href={`/properties/${item.id}`} >
          <div className="relative w-full">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={item.title || 'Property'} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            ) : (
              <div className="w-full h-64 bg-black" />
            )}
            
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          </div>

          <div className="absolute top-4 left-4 flex gap-2 z-20">
            <Button className="rounded-full bg-black/50 backdrop-blur-md border-white/20 text-xs px-4 h-8">
              {idx % 3 === 0 ? 'Homes' : 'Rent'}
            </Button>
            <Button className="rounded-full bg-white text-black text-xs px-4 h-8 hover:bg-gray-200">
              Featured
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 z-20 text-white">
            <p className="text-sm uppercase tracking-widest opacity-70 mb-1">
               ₦{item.price?.toLocaleString?.() ?? item.price}
            </p>
            <h2 className="text-2xl font-bold leading-tight">
              {item.title || 'Property Name'}
            </h2>
            <p className="text-sm opacity-80 mt-2 line-clamp-2">
              {typeof item.description === 'string' ? item.description : 'Premium property available now.'}
            </p>
          </div>
          </Link>
        </div>
      );
    })}
  </div>
</div>

  )
}

export const PropertySkeleton = () => (
  <div className="w-full min-h-screen px-5 py-10 columns-1 md:columns-3 gap-5 space-y-5">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
      <div key={i} className="break-inside-avoid mb-5">
        <Skeleton className={`w-full rounded-2xl bg-zinc-800/50 ${i % 2 === 0 ? 'h-96' : 'h-64'}`} />
      </div>
    ))}
  </div>
)

const NoPropertiesFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center p-10 bg-black text-white">
    <div className="bg-zinc-900 p-6 rounded-full mb-4">
      <SearchX size={48} className="text-zinc-500" />
    </div>
    <h3 className="text-2xl font-bold mb-2 font-bricolage">No Properties Available</h3>
    <p className="text-zinc-400 max-w-sm mb-6">
      We couldn't find any listings matching your criteria at the moment. Please check back later.
    </p>
    <Button variant="outline" onClick={() => window.location.reload()} className="border-white text-black hover:bg-white hover:text-black">
      Refresh Page
    </Button>
  </div>
)

export default Properties
