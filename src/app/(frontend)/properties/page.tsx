import React, { Suspense } from 'react'
import { FilterBar } from './components/filter-bar'
import InnerPageHero from '../components/inner-pages/inner-page-hero'
import { PropertyGrid } from './components/PropertityGrid'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exclusive Properties in Abuja | MyAbujaHome',
  description: 'Explore our curated list of luxury homes, modern apartments, and prime lands for sale and rent in Abuja.',
}

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
  const params = await searchParams

  return (
    <div className="min-h-screen flex flex-col">
      <InnerPageHero
        backgroundImage="https://res.cloudinary.com/dnu4lxiie/image/upload/v1765374016/2fc77a07b3da6f47d6c2bab101f6e88b097c76c0_n5ktnh.jpg"
        title="Properties"
        subtitle="Explore our collection of properties, from apartments to houses, and find the perfect home for you."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Properties' }]}
        overlayOpacity={0.6}
      />
      
      <section className='relative z-30 sticky top-0  backdrop-blur-md'> 
        <Suspense fallback={<div className="h-20 animate-pulse border-b " />}>
          <FilterBar />
        </Suspense>
      </section>

      <main className="px-5 lg:px-14 py-8 max-w-[1920px] mx-auto w-full">
          <PropertyGrid searchParams={params} />
      </main>
    </div>
  )
}