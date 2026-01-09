import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Square, MapPin } from 'lucide-react'
import { Property } from '@/payload/payload-types'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const {
    title,
    price,
    location,
    status,
    type,
    bedrooms,
    bathrooms,
    area,
    images,
    slug,
  } = property

  const mainImage = (images?.[0] as any)?.url || ''
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <Link href={`/properties/${property.id}`} className="group block h-full">
      <Card className="relative h-full lg:h-[503px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="aspect-4/3 overflow-hidden">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={status === 'for-sale' ? 'default' : 'secondary'} className="uppercase tracking-wider font-semibold">
              {status === 'for-sale' ? 'For Sale' : 'For Rent'}
            </Badge>
            {type && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm uppercase tracking-wider font-semibold">
                {type}
              </Badge>
            )}
          </div>
         
        </div>
        
        <CardContent className="p-5 z-10 text-white">
          <div className='flex justify-between items-center'>
            <div>
          <h3 className="font-medium text-base line-clamp-1 mb-2 transition-colors">{title}</h3>
          <div className="flex items-center text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
            </div>
            <div className=" p-4 pt-12">
            <p className="text-white font-bold text-xl md:text-xl">{formattedPrice}</p>
          </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-border/50">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center mb-1">
                <Bed className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Beds</span>
              </div>
              <span className="font-semibold">{bedrooms}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-l border-border/50">
              <div className="flex items-center mb-1">
                <Bath className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Baths</span>
              </div>
              <span className="font-semibold">{bathrooms}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-l border-border/50">
              <div className="flex items-center mb-1">
                <Square className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">Area</span>
              </div>
              <span className="font-semibold">{area} <span className="text-[10px]">sqft</span></span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
