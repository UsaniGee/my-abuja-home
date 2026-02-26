'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ChevronDownIcon, Search, MapPin } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Hero = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  
  const [filters, setFilters] = useState({
    status: 'all',
    location: '',
    type: 'all',
    maxPrice: '',
  })

  const { data: locations = [] } = useQuery({
    queryKey: ['property-locations'],
    queryFn: async () => {
      const res = await fetch('/api/search-properties?limit=100') 
      const data = await res.json()
      const uniqueLocs = Array.from(new Set(data.docs.map((p: any) => p.location)))
      return uniqueLocs.filter(Boolean) as string[]
    },
    staleTime: 1000 * 60 * 30, 
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (filters.status !== 'all') params.append('status', filters.status)
    if (filters.location) params.append('search', filters.location)
    if (filters.type !== 'all') params.append('type', filters.type)
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.replace(/\D/g, ''))
    
    router.push(`/properties?${params.toString()}`)
  }

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className='relative min-h-screen flex justify-center items-center p-5 font-inter'>
      <div 
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(https://res.cloudinary.com/dnu4lxiie/image/upload/v1771233468/8b89ceb0b3f2d4574f64ae63ad607414b801732f_c6u1xh.png)` }}
      />
      <div className='absolute inset-0 bg-black/40' />
      
      <div className="z-10">
        <div className='relative text-center text-white mt-[108.5px]'>
          <h1 className='text-5xl md:text-7xl font-bold mb-4 lg:leading-[87px] font-secondary'>
            Find Your Dream <br /> Home With <br /> Us
          </h1>
          <p className='text-xl md:text-2xl mt-6 opacity-90'>A leading independent real estate agency shaping modern communities.</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-5 items-center gap-5 lg:gap-6 mt-[55.5px]'>
          
          {/* CATEGORY DROPDOWN (Shadcn) */}
          <div className='w-full lg:w-[188px] h-[92px] relative text-white bg-white/20 hover:bg-white/30 transition-colors py-4 px-5 rounded-3xl backdrop-blur-md'>
            <h2 className='text-xs uppercase tracking-widest opacity-70 mb-1'>Category</h2>
            <Select onValueChange={(v) => updateFilter('status', v)}>
              <SelectTrigger className="bg-transparent border-none p-0 w-full h-auto text-xl focus:ring-0 shadow-none capitalize">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 w-full text-white border-zinc-800">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="for-sale">Buy</SelectItem>
                <SelectItem value="for-rent">Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* LOCATION SUGGESTION (Shadcn Popover + Command) */}
          <div className='w-full lg:w-[188px] h-[92px] relative text-white bg-white/20 hover:bg-white/30 transition-colors py-4 px-5 rounded-3xl backdrop-blur-md'>
            <h2 className='text-xs uppercase tracking-widest opacity-70 mb-1'>Location</h2>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="flex justify-between items-center w-full text-xl outline-none">
                  <span className="truncate">{filters.location || "State"}</span>
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className=" p-0 w-full lg:w-[200px] bg-zinc-900 border-zinc-800" align="start">
                <Command className="bg-transparent text-white">
                  <CommandInput placeholder="Search state..." className="text-white" />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((loc) => (
                        <CommandItem
                          key={loc}
                          value={loc}
                          onSelect={(currentValue) => {
                            updateFilter('location', currentValue === filters.location ? "" : currentValue)
                            setOpen(false)
                          }}
                          className="text-white hover:bg-white/10 cursor-pointer"
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          {loc}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* TYPE DROPDOWN (Shadcn) */}
          <div className='w-full lg:w-[188px] h-[92px] relative text-white bg-white/20 hover:bg-white/30 transition-colors py-4 px-5 rounded-3xl backdrop-blur-md'>
            <h2 className='text-xs uppercase tracking-widest opacity-70 mb-1'>Type</h2>
            <Select onValueChange={(v) => updateFilter('type', v)}>
              <SelectTrigger className="bg-transparent border-none p-0 w-full h-auto text-xl focus:ring-0 shadow-none capitalize">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 w-full text-white border-zinc-800">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* BUDGET INPUT */}
          <div className='w-full lg:w-[188px] h-[92px] relative text-white bg-white/20 hover:bg-white/30 transition-colors py-4 px-5 rounded-3xl backdrop-blur-md'>
            <h2 className='text-xs uppercase tracking-widest opacity-70 mb-1'>Budget</h2>
            <input 
              type="text" 
              placeholder="₦1.7M" 
              className='bg-transparent text-xl outline-none placeholder:text-white/40 w-full mt-1'
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
            />
          </div>

          <button 
            onClick={handleSearch}
            className='flex items-center justify-center lg:w-16 h-16 relative text-white bg-primary py-4 px-4 rounded-full hover:scale-110 transition-transform active:scale-95 shadow-lg shadow-primary/20'
          >
            <p className="lg:hidden">Search</p>
            <Search size={28} className="hidden lg:block" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero