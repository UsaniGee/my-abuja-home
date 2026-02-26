'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribing email:', email)
    setEmail('')
  }

  return (
    <div className='flex items-center justify-center relative w-full h-[400px] lg:h-[500px] overflow-hidden'>
      <Image
        src="https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_1920/v1764678862/8056987a25c4d1580aefee5514d7182ce8b3baf4_lhnbxp.jpg"
        alt="Newsletter background"
        fill
        className='object-cover'
        sizes="100vw"
      />
      
      {/* <div className='absolute w-20 h-20 inset-[10px] bg-black/60 backdrop-blur-sm' /> */}

      <div className='relative z-10 flex flex-col items-center justify-center px-5 text-center bg-black/10 backdrop-blur-xs lg:w-[1210px] w-full h-fit p-10 rounded-2xl'>
    
        <div className='inline-block border border-white rounded-full px-4 py-2 mb-6'>
          <span className='text-white text-xs uppercase tracking-wide'>Our Newsletter</span>
        </div>
        <div className='mb-4'>
          <Image
            src="/Logo.svg"
            alt="MyAbujaHome Logo"
            width={380}
            height={90}
            className='h-auto w-auto max-w-[200px] lg:w-[800px]'
          />
        </div>

        <p className='text-white text-sm lg:text-base mb-8 max-w-md'>
          Get exclusive offers straight to your inbox
        </p>


        <form onSubmit={handleSubmit} className='w-full max-w-md'>
          <div className='flex items-center bg-white/10 backdrop-blur-sm p-2 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white h-12 rounded-4xl'>
            <Input
              type='email'
              placeholder='Search a city'
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className='flex-1     border-none '
            />
             <Button 
              type='submit'
              className='bg-primary hover:bg-primary/90 text-white px-8 h-9 rounded-4xl font-medium transition-all duration-300 hover:scale-105'
            >
              Subscribe!
            </Button>
           
          </div>
        </form>
      </div>
    </div>
  )
}

export default Newsletter