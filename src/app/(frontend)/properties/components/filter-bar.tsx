'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Filter, RotateCcw, ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Toggle for expanded filters
  const [showFilters, setShowFilters] = useState(false)

  // State for filters
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [status, setStatus] = useState(searchParams.get('status') || 'all')
  const [type, setType] = useState(searchParams.get('type') || 'all')
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || 'any')
  const [bathrooms, setBathrooms] = useState(searchParams.get('bathrooms') || 'any')

  // Range States
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  
  const [minArea, setMinArea] = useState(searchParams.get('minArea') || '')
  const [maxArea, setMaxArea] = useState(searchParams.get('maxArea') || '')

  const [minYear, setMinYear] = useState(searchParams.get('minYear') || '')
  const [maxYear, setMaxYear] = useState(searchParams.get('maxYear') || '')

  // Debounce search input only (optional, or just rely on Search button)
  // The design has a "Search" button, so we might not need auto-debounce for everything,
  // but keeping it for the text input is often good UX. 
  // However, looking at the design, the "Search" button implies manual submission.
  // I will make the "Search" button trigger the update.

  const handleSearch = () => {
    const params = new URLSearchParams() // Start fresh or merge? Usually merge, but let's be clean.
    // Actually, we should probably preserve other params if they exist (like page), but usually search resets page.
    
    if (search) params.set('search', search)
    if (status && status !== 'all') params.set('status', status)
    if (type && type !== 'all') params.set('type', type)
    if (bedrooms && bedrooms !== 'any') params.set('bedrooms', bedrooms)
    if (bathrooms && bathrooms !== 'any') params.set('bathrooms', bathrooms)

    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)

    if (minArea) params.set('minArea', minArea)
    if (maxArea) params.set('maxArea', maxArea)

    if (minYear) params.set('minYear', minYear)
    if (maxYear) params.set('maxYear', maxYear)

    router.push(`/properties?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch('')
    setStatus('all')
    setType('all')
    setBedrooms('any')
    setBathrooms('any')
    setMinPrice('')
    setMaxPrice('')
    setMinArea('')
    setMaxArea('')
    setMinYear('')
    setMaxYear('')
    router.push('/properties')
  }

  return (
    <div className="w-full space-y-4 bg-background lg:grid-cols-3 items-center gap-10 px-5 py-10 lg:py-20 lg:px-14">
      <div className="grid gap-5 container mx-auto px-4">
        <div className='flex flex-col lg:flex-row justify-between items-center'>
           <h1 className="text-3xl font-bold">Property Listings</h1>
           <div>
            <p>Most Popular</p>
           </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-3 items-center">
          
          <div className="relative w-full lg:w-[300px] shrink-0">
            <Input
              placeholder="What are looking for"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-4 bg-white border-input h-10"
            />
          </div>

          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full lg:w-[110px] bg-white h-10">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
                <SelectItem value="for-sale">For Sale</SelectItem>
                <SelectItem value="for-rent">For Rent</SelectItem>
              </SelectContent>
            </Select>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full lg:w-[110px] bg-white h-10">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Type</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>

            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="w-full lg:w-[110px] bg-white h-10">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Beds</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={bathrooms} onValueChange={setBathrooms}>
              <SelectTrigger className="w-full lg:w-[110px] bg-white h-10">
                <SelectValue placeholder="Baths" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Baths</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 ml-auto shrink-0">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={clearFilters}
              className="h-10 w-10 bg-white"
              title="Reset Filters"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowFilters(!showFilters)}
              className={`h-10 w-10 bg-white ${showFilters ? 'border-primary text-primary' : ''}`}
              title="Toggle Advanced Filters"
            >
              <Filter className="h-4 w-4" />
            </Button>

            <Button 
              onClick={handleSearch}
              className="h-10 px-6 bg-[#A10D44] hover:bg-[#8a0b3a] text-white"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Expanded Filters Section */}
        {showFilters && (
          <div className="mt-6 p-6 bg-white rounded-lg border shadow-sm animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Price</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Min Price" 
                    type="number" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="h-10"
                  />
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input 
                    placeholder="Max Price" 
                    type="number" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              {/* Area Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Area</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Min Area" 
                    type="number" 
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    className="h-10"
                  />
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input 
                    placeholder="Max Area" 
                    type="number" 
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              {/* Year Built Range */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Year Built</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Min Year" 
                    type="number" 
                    value={minYear}
                    onChange={(e) => setMinYear(e.target.value)}
                    className="h-10"
                  />
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground shrink-0" />
                  <Input 
                    placeholder="Max Year" 
                    type="number" 
                    value={maxYear}
                    onChange={(e) => setMaxYear(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
