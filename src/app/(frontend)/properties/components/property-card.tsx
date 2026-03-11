'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Square, MapPin } from 'lucide-react'

export function PropertyCard({ property }: { property: any }) {
  const mainImage = property.images?.[0]?.url || ''
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <Link href={`/properties/${property.id}`} className="group block break-inside-avoid mb-6">
      <div className="relative overflow-hidden rounded-2xl bg-black border transition-all duration-500 ">
         <div className="relative w-full overflow-hidden">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur-md uppercase text-[10px] font-bold">
              {property.status?.replace('-', ' ')}
            </Badge>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
        </div>
        
        <div className="p-5 text-white">
          <p className="text-sm uppercase tracking-widest opacity-70 mb-1">{formattedPrice}</p>
          <h3 className="font-bold text-2xl mb-2 line-clamp-1 font-bricolage leading-tight">{property.title}</h3>
          
          <div className="flex items-center text-zinc-400 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            <span className="truncate">{property.location}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-zinc-300">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase font-bold">
                <Bed size={12} /> Beds
              </div>
              <span className="font-bold text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex flex-col items-center border-x border-white/10">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase font-bold">
                <Bath size={12} /> Baths
              </div>
              <span className="font-bold text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase font-bold">
                <Square size={12} /> Area
              </div>
              <span className="font-bold text-sm">{property.area} <span className="text-[10px] opacity-50">sqft</span></span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
