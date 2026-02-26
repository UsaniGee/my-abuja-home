'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Properties from './components/properties'

const OurProperitiesHome = () => {
    const router = useRouter()
  return (
    <div className=''>
        <div className='grid lg:grid-cols-3 items-center gap-10 px-5 py-10 lg:py-20 lg:px-14'>
            <div className='flex items-center gap-2.5'>
              <div className='border-b border-primary w-8.5 ' />
              <h1 className='border rounded-full border-primary px-4 py-2'>Our Properties</h1>
            </div>
            <h1 className='text-4xl font-bold text-center lg:text-left'>
                Our Dream Signature Properties
            </  h1>
            <div className='flex justify-end'>
                <Button onClick={() => router.push('/properties')} className='rounded-[30px] w-full lg:w-[229px] lg:h-12 px-6 py-6 hover:lg:w-[250px]'>
                   Discover our properties
                </Button>
            </div>
        </div>

        <div className='min-h-screen'> 
       <Properties />
        </div>

        <div className='flex justify-center items-center gap-5 px-5 pb-10 pt-10 lg:pb-20 lg:px-14'>
          <span>Explore expertly crafted real estate projects built for lasting value</span>
          <Link href='/properties' className='text-primary underline'>View all properties</Link>
        </div>
    </div>
  )
}

export default OurProperitiesHome