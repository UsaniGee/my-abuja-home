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
        title: 'Property Sales',
       image: '/PropertySales.png'
    },
    { 
        id: 2, 
        span: 2, 
        color: 'border-indigo-500',
        title: 'Property Management',
        image: '/PropertySales.png'
    },
    { 
        id: 3, 
        span: 2, 
        color: 'border-indigo-500', 
        title: 'Property Investment',
        image: '/PropertySales.png'
    },
    { 
        id: 4, 
        span: 3, 
        color: 'border-teal-600',       
        title: 'Property Valuation',
        image: '/PropertySales.png'
    },
    { 
        id: 5, 
        span: 3, 
        color: 'border-red-500',   
        title: 'Content Creation',
        image: '/PropertySales.png'
    },
];


const OurServicesHome = () => {
    const router = useRouter()
  return (
     <div className='bg-[#FAFAFA] px-5 py-10 lg:py-[80px] lg:px-[56px] gap-12'>
        <div className='grid lg:grid-cols-3 gap-10'>
            <div className='flex items-center gap-2.5'>
              <div className='border-b border-primary w-8.5 ' />
              <h1 className='border rounded-full border-primary px-4 py-2'>Our services</h1>
            </div>
            <div className='text-[#A0A0A0] text-xl text-justify'>
                At myabujahome, we bring bold, creative campaigns to developers and help buyers find the homes they’ve always dreamed of.
            </div>
            <div className='flex justify-end'>
                <Button onClick={() => router.push('/services')} className='rounded-[30px] w-full lg:w-[160px] lg:h-[48px] px-6 py-6 hover:lg:w-[200px]'>
                    View our services
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-10">
            {gridItems.map((item) => {
                const spanClass = item.span === 2 ? 'md:col-span-2' : 'md:col-span-3';
                
                return (
                    <Card 
                        key={item.id} 
                        className={`col-span-1 ${spanClass} border-none shadow-none hover:bg-primary transition-all duration-600 group py-0`}
                    >
                        <div className="flex flex-col justify-between h-full">
                            <div className='flex items-center justify-between group-hover:text-white px-6 pt-12 gap-2'>
                                <h3 className="text-xl lg:text-3xl font-bold uppercase">{item.title}</h3>
                                <span className='border rounded-full border-black group-hover:border-white px-4 py-4'><ArrowUpRight className='' /></span>
                            </div>
                           <div className='flex w-full justify-end'>
                           <Image src={item.image} alt={item.title} width={779} height={313.0441589355469} className='rounded-[15px] w-full' />
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