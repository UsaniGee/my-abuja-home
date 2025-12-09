import React, { Suspense } from 'react'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { PropertyCard } from '@/app/(frontend)/properties/components/property-card'
import { FilterBar } from './components/filter-bar'
import InnerPageHero from '../components/inner-pages/inner-page-hero'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{
    search?: string
    status?: string
    type?: string
    minPrice?: string
    maxPrice?: string
    minArea?: string
    maxArea?: string
    minYear?: string
    maxYear?: string
    bedrooms?: string
    bathrooms?: string
    page?: string
  }>
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const payload = await getPayloadClient()
  const params = await searchParams

  const page = Number(params.page) || 1
  const limit = 12

  const where: any = {}

  if (params.search) {
    where.or = [
      {
        title: {
          like: params.search,
        },
      },
      {
        location: {
          like: params.search,
        },
      },
    ]
  }

  if (params.status && params.status !== 'all') {
    where.status = {
      equals: params.status,
    }
  }

  if (params.type && params.type !== 'all') {
    where.type = {
      equals: params.type,
    }
  }

  if (params.minPrice) {
    where.price = {
      ...where.price,
      greater_than_equal: Number(params.minPrice),
    }
  }

  if (params.maxPrice) {
    where.price = {
      ...where.price,
      less_than_equal: Number(params.maxPrice),
    }
  }

  if (params.minArea) {
    where.area = {
      ...where.area,
      greater_than_equal: Number(params.minArea),
    }
  }

  if (params.maxArea) {
    where.area = {
      ...where.area,
      less_than_equal: Number(params.maxArea),
    }
  }

  if (params.minYear) {
    where.yearBuilt = {
      ...where.yearBuilt,
      greater_than_equal: Number(params.minYear),
    }
  }

  if (params.maxYear) {
    where.yearBuilt = {
      ...where.yearBuilt,
      less_than_equal: Number(params.maxYear),
    }
  }

  if (params.bedrooms && params.bedrooms !== 'any') {
    where.bedrooms = {
      greater_than_equal: Number(params.bedrooms),
    }
  }

  if (params.bathrooms && params.bathrooms !== 'any') {
    where.bathrooms = {
      greater_than_equal: Number(params.bathrooms),
    }
  }

  const { docs: properties, totalDocs } = await payload.find({
    collection: 'properties',
    where,
    page,
    limit,
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-background">
     <InnerPageHero
        backgroundImage="https://res.cloudinary.com/dnu4lxiie/image/upload/v1764929769/IMG_8401_1_2_opmtud.svg"
        title="Properties"
        subtitle="Explore our collection of properties, from apartments to houses, and find the perfect home for you."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Properties' }
        ]}
        overlayOpacity={0.6}
        height=""
      />
     <div className=''>
       <Suspense fallback={<div className="h-16 bg-background border-b" />}>
        <FilterBar />
      </Suspense>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-end items-center mb-6">
          <p className="text-muted-foreground">
            Showing {properties.length} of {totalDocs} properties
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </main>
     </div>
    </div>
  )
}