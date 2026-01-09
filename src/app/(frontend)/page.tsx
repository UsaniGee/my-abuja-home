import React from 'react'
import Image from 'next/image'
import InfiniteBackground from './components/landing/infinite-background'
import Link from 'next/link'
import { Home } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center relative overflow-hidden'>
      <InfiniteBackground />

      {/* Content */}
      <div className='relative z-20 text-white flex flex-col items-center space-y-8 px-4'>
        <div className="animate-fade-in-up">
             <Image src="/Logo.svg" alt="logo" width={300} height={200} className="w-[200px] md:w-[300px]" />
        </div>
       
        <div className='flex flex-col items-center space-y-6 text-center'>
            <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold leading-tight max-w-4xl tracking-tight'>
            WE ADD PERSONALITY TO REAL ESTATE
            </h1>      
            
            <ul className='flex flex-wrap justify-center gap-4 md:gap-7 text-sm md:text-base font-light tracking-widest uppercase'>
            <li>CONSTRUCTION</li>
            <li className='list-disc list-inside'>ADVISORY</li>
            <li className='list-disc list-inside'>PARTNERSHIP</li>
            <li className='list-disc list-inside'>BROKERAGE</li>
            </ul>

            <div className='bg-white/20 border border-primary rounded-full p-4'>
              <Link href="/home">
              <Home className='w-10 h-10 bg-primary rounded-full' /></Link>
            </div>

            <div className=''>
                <Link 
                    href="/properties"
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-white px-8 font-medium text-black transition-all duration-300 hover:bg-white/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    <span className="mr-2">Explore Properties</span>
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
