'use client'

import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const gridItems = [
    { 
        id: 1, 
        span: 2, 
        color: 'border-indigo-500',
        title: 'Lands',
        image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1771318395/1771318167999_l4tjhf.png'
    },
    { 
        id: 2, 
        span: 2, 
        color: 'border-indigo-500',
        title: 'Building',
        image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1771239732/d988e4fae9efa6b26767cd4b76df51039ec7ee09-removebg-preview_kx0bhw.png'
    },
    { 
        id: 3, 
        span: 2, 
        color: 'border-indigo-500', 
        title: 'Brokerage',
        image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1771239732/90d8f65af93d611f72a4f8d49c802a31be97f016-removebg-preview_hlucld.png'
    },
    { 
        id: 4, 
        span: 3, 
        color: 'border-teal-600',  
        title: 'Partnership',     
        image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1771239732/583396cb74fb9ce5a109b3006f5ae578dbbc4bcf-removebg-preview_ooulcp.png'
    },
    { 
        id: 5, 
        span: 3, 
        color: 'border-red-500',   
        title: 'Construction',
        image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1771239732/860d5dfc5e7cdc1c2e6927a66614d9c44d733509-removebg-preview_yffmjw.png'
    },
      { 
        id: 6, 
        span: 3, 
        color: 'border-red-500',   
        title: 'Advisory',
        image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1771239733/0ddb3413457aaa59521e9cdf52f0d87a92899a70-removebg-preview_fk7ohl.png'
    },
];


const OurServicesHome = () => {
    const router = useRouter()
  return (
     <div className='bg-[#FAFAFA] px-5 py-10 lg:py-20 lg:px-14 gap-12'>
        <div className='grid lg:grid-cols-3 gap-10'>
            <div className='flex items-center gap-2.5'>
              <div className='border-b border-primary w-8.5 ' />
              <h1 className='border rounded-full border-primary px-4 py-2'>Our services</h1>
            </div>
            <p className='text-[#A0A0A0] text-xl text-justify'>
                At myabujahome, we bring bold, creative campaigns to developers and help buyers find the homes they’ve always dreamed of.
            </p>
            <div className='flex justify-end'>
                <Button onClick={() => router.push('/services')} className='rounded-[30px] w-full lg:w-40 lg:h-12 px-6 py-6 hover:lg:w-[200px]'>
                    View our services
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {gridItems.map((item) => {
                // const spanClass = item.span === 2 ? 'md:col-span-3' : 'md:col-span-3';                
                return (
                    <Card 
                        key={item.id} 
                        className={`border-none shadow-md hover:bg-primary transition-all duration-600 group py-0 h-[450px] lg:h-[550px] relative overflow-hidden`}
                    >
                        <div className="flex flex-col justify-between h-full">
                            <div className='flex items-center justify-between group-hover:text-white px-6 pt-12 gap-2'>
                                <h3 className="text-xl lg:text-3xl font-bold uppercase font-secondary">{item.title}</h3>
                                <span className='border rounded-full border-black group-hover:border-white px-4 py-4'><ArrowUpRight className='' /></span>
                            </div>
                           <div className='flex w-full justify-end '>
                           <Image src={item.image} alt={item.title}  width={779} height={313.0441589355469} className='rounded-[15px] w-full' />
                           </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    </div>
  )
}

export default OurServicesHome