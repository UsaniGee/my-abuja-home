'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Square, MapPin } from 'lucide-react'

export function PropertyCard({ property }: { property: any }) {
  const mainImageObject = property.images?.[0]
  const mainImage = mainImageObject?.cloudinary?.secure_url || mainImageObject?.cloudinary?.url || mainImageObject?.url || ''
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <Link href={`/properties/${property.id}`} className="group block break-inside-avoid mb-6">
      <div className="relative overflow-hidden rounded-2xl bg-black border transition-all duration-500 ">
         <div className="relative w-full overflow-hidden">
          <Image
            src={mainImage}
            alt={property.title || 'Property Image'}
            width={800}
            height={600}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized={mainImage.endsWith('.svg')}
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






// import Image from 'next/image'
// import Link from 'next/link'
// import { Card, CardContent } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Bed, Bath, Square, MapPin } from 'lucide-react'
// import { Property } from '@/payload/payload-types'

// interface PropertyCardProps {
//   property: Property
// }

// export function PropertyCard({ property }: PropertyCardProps) {
//   const {
//     title,
//     price,
//     location,
//     status,
//     type,
//     bedrooms,
//     bathrooms,
//     area,
//     images,
//     slug,
//   } = property

//   const mainImage = (images?.[0] as any)?.url || ''
//   const formattedPrice = new Intl.NumberFormat('en-NG', {
//     style: 'currency',
//     currency: 'NGN',
//     maximumFractionDigits: 0,
//   }).format(price)

//   return (
//     <Link href={`/properties/${property.id}`} className="group block h-full">
//       <Card className="relative h-full lg:h-[503px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
//         <div className="aspect-4/3 overflow-hidden">
//           <Image
//             src={mainImage}
//             alt={title}
//             fill
//             className="object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//           <div className="absolute top-3 left-3 flex gap-2">
//             <Badge variant={status === 'for-sale' ? 'default' : 'secondary'} className="uppercase tracking-wider font-semibold">
//               {status === 'for-sale' ? 'For Sale' : 'For Rent'}
//             </Badge>
//             {type && (
//               <Badge variant="outline" className="bg-background/80 backdrop-blur-sm uppercase tracking-wider font-semibold">
//                 {type}
//               </Badge>
//             )}
//           </div>
         
//         </div>
        
//         <CardContent className="p-5 z-10 text-white">
//           <div className='flex justify-between items-center'>
//             <div>
//           <h3 className="font-medium text-base line-clamp-1 mb-2 transition-colors">{title}</h3>
//           <div className="flex items-center text-sm mb-4">
//             <MapPin className="w-4 h-4 mr-1 shrink-0" />
//             <span className="line-clamp-1">{location}</span>
//           </div>
//             </div>
//             <div className=" p-4 pt-12">
//             <p className="text-white font-bold text-xl md:text-xl">{formattedPrice}</p>
//           </div>
//           </div>
          
//           <div className="grid grid-cols-3 gap-2 py-3 border-t border-border/50">
//             <div className="flex flex-col items-center justify-center text-center">
//               <div className="flex items-center mb-1">
//                 <Bed className="w-4 h-4 mr-1" />
//                 <span className="text-xs font-medium">Beds</span>
//               </div>
//               <span className="font-semibold">{bedrooms}</span>
//             </div>
//             <div className="flex flex-col items-center justify-center text-center border-l border-border/50">
//               <div className="flex items-center mb-1">
//                 <Bath className="w-4 h-4 mr-1" />
//                 <span className="text-xs font-medium">Baths</span>
//               </div>
//               <span className="font-semibold">{bathrooms}</span>
//             </div>
//             <div className="flex flex-col items-center justify-center text-center border-l border-border/50">
//               <div className="flex items-center mb-1">
//                 <Square className="w-4 h-4 mr-1" />
//                 <span className="text-xs font-medium">Area</span>
//               </div>
//               <span className="font-semibold">{area} <span className="text-[10px]">sqft</span></span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   )
// }
