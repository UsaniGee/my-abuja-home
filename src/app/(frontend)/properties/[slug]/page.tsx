import React from 'react'
import InnerPageHero from '../../components/inner-pages/inner-page-hero'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Square, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { notFound } from 'next/navigation'
import { Media } from '@/payload/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const dynamic = 'force-dynamic'

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  let property
  try {
     const result = await payload.find({
      collection: 'properties',
      where: {
        id: {
            equals: slug
        }
      },
      depth: 1,
    })
    
    if (result.docs.length > 0) {
        property = result.docs[0]
    }
  } catch (error) {
    console.error('Error fetching property details:', error)
  }

  if (!property) {
    return notFound()
  }

  const mainImage = (property.images?.[0] as Media)?.url || ''
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <>
      <InnerPageHero
        backgroundImage={mainImage}
        title={property.title}
        subtitle={property.location}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Properties', href: '/properties' },
          { label: property.title }
        ]}
        overlayOpacity={0.5}
      />

      <div className="container mx-auto px-4 lg:px-14 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
   
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>               
                <h2 className="text-3xl font-medium">{property.title}</h2>
                <div className="flex items-center gap-3 my-2">
                   <Badge variant={property.status === 'for-sale' ? 'default' : 'secondary'} className="uppercase rounded-none">
                    {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
                  </Badge>
                   <Badge variant="outline" className="uppercase rounded-none">
                    {property.type}
                  </Badge>
                </div>
                <div className="flex items-center text-muted-foreground mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{formattedPrice}</p>
                {property.status === 'for-rent' && <span className="text-sm text-muted-foreground">/ year</span>}
              </div>
            </div>

            <h3 className="text-2xl font-medium">Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-card border rounded-xl">
              <div className="flex flex-col justify-center ">
               <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{property.bedrooms || 0}</span>
                <Bed className="w-6 h-6 text-secondary" />
               </div>
                <span className="text-sm text-muted-foreground">Bedrooms</span>
              </div>
              <div className="flex flex-col justify-center  ">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{property.bathrooms || 0}</span>
                <Bath className="w-6 h-6 text-secondary" />
              </div>
                <span className="text-sm text-muted-foreground">Bathrooms</span>
              </div>
              <div className="flex flex-col justify-center  ">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{property.area || 0}</span>
                <Square className="w-6 h-6 text-secondary" />
                </div>
                <span className="text-sm text-muted-foreground">Sq Ft</span>
              </div>
               <div className="flex flex-col  justify-cente text-cente ">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-secondary" />
                <span className="font-bold text-lg">{property.yearBuilt || 'N/A'}</span>
                </div>
                <span className="text-sm text-muted-foreground">Built</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Description</h3>
              <div className="prose max-w-none text-muted-foreground border p-7 rounded-xl">
                 {property.description && (
                  <RichText data={property.description} />
                 )}
              </div>
            </div>

             {property.images && property.images.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Live View</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {property.images.map((image: any, i: number) => {
                             const img = image as Media;
                             if (!img.url) return null;
                             return (
                                <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
                                    <Image 
                                        src={img.url} 
                                        alt={img.alt || property.title} 
                                        fill 
                                        className="object-cover hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                             )
                        })}
                    </div>
                </div>
             )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-card border rounded-xl shadow-sm sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Interested in this property?</h3>
              <p className="text-muted-foreground mb-6">
                Contact us today to schedule a viewing or request more information.
              </p>
              
              <div className="space-y-4">
                 <button className="w-full bg-primary text-primary-foreground h-12 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Schedule Viewing
                </button>
                <button className="w-full border border-input bg-background h-12 rounded-md font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
