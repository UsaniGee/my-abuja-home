'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import {  useInView, useMotionValue, useSpring } from 'framer-motion'

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString()
      }
    })
  }, [springValue])

  return <p ref={ref} className='text-5xl font-bold text-center'>0</p>
}

const AboutHome = () => {
  const details = [
    {
      title: 'Our Impact',
      description: '120',
      subtitle: 'Happy Clients',
      bg: 'bg-[#1F1E1E]',
      text: 'text-white',
       iconColor: 'text-primary'
    },
     {
      title: 'Experience',
      description: '90',
      subtitle: 'Projects Done',
      bg: 'bg-[#FEECF3]',
      text: 'text-black',
      iconColor: 'text-black'
    },
     {
      title: 'Collaboration',
      description: '17',
      subtitle: 'Award Winning Partners',
      bg: 'bg-[#FEECF3]',
      text: 'text-black', 
      iconColor: 'text-black'
    },
     {
      title: 'Work Hours',
      description: '250',
      subtitle: 'Cups of Coffee',
      bg: 'bg-[#FEECF3]',
      text: 'text-black',
      iconColor: 'text-black'
    },
  ]
  return (
    <div className='grid lg:grid-cols-[2fr_1fr] px-5 py-10 lg:py-[80px] lg:px-[56px] lg:gap-30 gap-10'>
        
      <div>
        <div className='flex items-center gap-2.5'>
          <div className='border-b border-primary w-8.5 ' />
          <h1 className='border rounded-full border-primary px-4 py-2'>About Us</h1>
       </div>

       <div>
        <h1 className='text-3xl md:text-6xl font-bold mb-4 lg:leading-[87px] mt-6 uppercase text-primary'>
          We’re not just agents, we’re storytellers for spaces.
        </h1>
       </div>

       <div>
        <Image src={'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_1200/v1764303559/about-image_bvebna.jpg'} alt='About' width={779} height={384.0441589355469} className='w-full h-full md:h-[384px] object-cover rounded-2xl' sizes="(max-width: 768px) 100vw, 50vw" />
       </div>


      </div>
 
       <div className='flex flex-col justify-between gap-10'>
        <div className='grid grid-cols-2 gap-6' >
            {details.map((detail) => (
            <div key={detail.title} className={`${detail.bg} ${detail.text} w-full grid items-center justify-center lg:w-[194.5px] h-[176.5px] relative  py-6 px-5 rounded-[24px]` } >
              <div 
                className='absolute w-[116px] h-[90px] right-0 top-0 bg-cover bg-center bg-no-repeat'
                style={{ backgroundImage: `url(${'/Arrow.svg'})` }}
              />
              <h2 className='text-sm text-center'>{detail.title}</h2>
               <div className='flex  justify-center gap-'>
                 <AnimatedCounter value={parseInt(detail.description)} />
                 <PlusIcon className={`${detail.iconColor} w-5 h-5 `} />
               </div>
                <p className='text-xs text-center text-[#A0A0A0]'>{detail.subtitle}</p>
             
            </div>
          ))}
        </div>

        
        <div className='grid  gap-6'>
          <div className='text-[#A0A0A0] text-xl text-justify'>
            At myabujahome, we bring bold, creative campaigns to developers and help buyers find the homes they’ve always dreamed of.
          </div>
          <Button className='rounded-[30px] w-full lg:w-[160px] lg:h-[48px] px-6 py-6'>Get a property</Button>
        </div>
        
       </div>        
    </div>
  )
}

export default AboutHome