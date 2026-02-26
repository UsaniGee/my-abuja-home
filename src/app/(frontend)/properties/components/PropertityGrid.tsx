'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { PropertyCard } from './property-card'
import { Button } from '@/components/ui/button'
import { RefreshCcw, Loader2 } from 'lucide-react'
import { PropertySkeleton } from '../../components/landing/our-properties/components/properties' 

export function PropertyGrid({ searchParams }: { searchParams: any }) {
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch
  } = useInfiniteQuery({
    queryKey: ['properties', searchParams],
    queryFn: async ({ pageParam = 1 }) => {
      const query = new URLSearchParams({ ...searchParams, page: pageParam.toString() })
      const res = await fetch(`/api/search-properties?${query.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) return <PropertySkeleton />

  if (isError) return (
    <div className="py-20 text-center">
      <p className="text-red-400 mb-4">Something went wrong while loading properties.</p>
      <Button onClick={() => refetch()} variant="outline"><RefreshCcw className="mr-2 h-4 w-4" /> Try Again</Button>
    </div>
  )

  const allProperties = data?.pages.flatMap((page) => page.docs) || []

  return (
    <div className="w-full">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {allProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-12 pb-10">
          <Button 
            onClick={() => fetchNextPage()} 
            disabled={isFetchingNextPage}
            className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 py-6 text-lg font-bold transition-all"
          >
            {isFetchingNextPage ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              'Load More Properties'
            )}
          </Button>
        </div>
      )}

      {allProperties.length === 0 && (
        <div className="text-center py-20 rounded-3xl border border-dashed border-white/10">
          <h3 className="text-xl font-bold text-white mb-2">No properties matched your search</h3>
          <p className="text-zinc-500">Try removing some filters or searching for a different location.</p>
        </div>
      )}
    </div>
  )
}