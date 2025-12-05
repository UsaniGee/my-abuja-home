'use client'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

const AwardsHome = () => {
  const [autoOffset1, setAutoOffset1] = useState(0)
  const [autoOffset2, setAutoOffset2] = useState(0)
  const [scrollOffset, setScrollOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging1, setIsDragging1] = useState(false)
  const [isDragging2, setIsDragging2] = useState(false)
  const [dragOffset1, setDragOffset1] = useState(0)
  const [dragOffset2, setDragOffset2] = useState(0)
  const [startX1, setStartX1] = useState(0)
  const [startX2, setStartX2] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const animationRef1 = useRef<number | null>(null)
  const animationRef2 = useRef<number | null>(null)

  const awards = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg',
      title: 'MD of Federal Mortgage Bank Of Nigeria (FMBN) - Right and Mr Bola Mogaji (MyAbujaHome)',
      description: 'discussing M.A.H AWARD from NSCDC to build affordable houses, and other likely projects.',
      date: '20th August 2024'
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg',
      title: 'Excellence Award 2024',
      description: 'Recognized for outstanding contribution to real estate development',
      date: '15th July 2024'
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg',
      title: 'Innovation in Housing',
      description: 'Award for innovative affordable housing solutions',
      date: '10th June 2024'
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg',
      title: 'Partnership Excellence',
      description: 'Recognition for strategic partnerships in real estate',
      date: '5th May 2024'
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg',
      title: 'Community Impact Award',
      description: 'Honored for positive community development impact',
      date: '20th April 2024'
    },
    {
      id: 6,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg',
      title: 'Best Developer 2024',
      description: 'Top real estate developer of the year',
      date: '15th March 2024'
    }
  ]

  const infiniteAwards = [...awards, ...awards, ...awards]

  const handleMouseDown1 = (e: React.MouseEvent) => {
    setIsDragging1(true)
    setStartX1(e.pageX - dragOffset1)
    setIsPaused(true)
  }

  const handleMouseMove1 = (e: React.MouseEvent) => {
    if (!isDragging1) return
    e.preventDefault()
    const x = e.pageX - startX1
    setDragOffset1(x)
  }

  const handleMouseUp1 = () => {
    setIsDragging1(false)
    setIsPaused(false)
  }

  const handleMouseDown2 = (e: React.MouseEvent) => {
    setIsDragging2(true)
    setStartX2(e.pageX - dragOffset2)
    setIsPaused(true)
  }

  const handleMouseMove2 = (e: React.MouseEvent) => {
    if (!isDragging2) return
    e.preventDefault()
    const x = e.pageX - startX2
    setDragOffset2(x)
  }

  const handleMouseUp2 = () => {
    setIsDragging2(false)
    setIsPaused(false)
  }

  useEffect(() => {
    const cardWidth = 300 + 24 
    const totalWidth = awards.length * cardWidth

    const animate1 = () => {
      if (!isPaused && !isDragging1) {
        setAutoOffset1((prev) => {
          const newOffset = prev + 0.5 
          return newOffset >= totalWidth ? 0 : newOffset
        })
      }
      animationRef1.current = requestAnimationFrame(animate1)
    }

    const animate2 = () => {
      if (!isPaused && !isDragging2) {
        setAutoOffset2((prev) => {
          const newOffset = prev - 0.5 
          return newOffset <= -totalWidth ? 0 : newOffset
        })
      }
      animationRef2.current = requestAnimationFrame(animate2)
    }

    animationRef1.current = requestAnimationFrame(animate1)
    animationRef2.current = requestAnimationFrame(animate2)

    return () => {
      if (animationRef1.current) cancelAnimationFrame(animationRef1.current)
      if (animationRef2.current) cancelAnimationFrame(animationRef2.current)
    }
  }, [isPaused, isDragging1, isDragging2, awards.length])


  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionHeight = rect.height
        const windowHeight = window.innerHeight
        
        const offset = windowHeight - sectionTop
        
        if (offset > 0 && offset < windowHeight + sectionHeight) {
          setScrollOffset(offset * 0.3) 
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className='bg-[#FAFAFA] px-5 py-10 lg:py-[80px] lg:px-[56px] gap-12 overflow-hidden'>
      <div className='grid justify-center gap-5 mb-12'>
         <div className='flex justify-center items-center gap-2.5'>
        <div className="pt-px w-15 lg:w-60 bg-linear-to-r from-secondary to-primary">
            <div className="bg-[#FAFAFA] pt-1 "/>
        </div>
              <h1 className='border rounded-full border-primary px-4 py-2'>Awards and Key moments</h1>
               <div className="pt-px w-15 lg:w-60 bg-linear-to-r from-primary to-secondary">
        <div className="bg-[#FAFAFA] pt-1 "/>
    </div>
            </div>
             <div className='text-4xl font-bold text-center'>
                Celebrate a legacy of excellence and recognition
            </div>
      </div>
      <div 
        className='mb-8 overflow-hidden'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className='flex gap-6 select-none'
          style={{ 
            transform: `translateX(-${autoOffset1 + scrollOffset - dragOffset1}px)`,
            transition: 'none',
            cursor: isDragging1 ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown1}
          onMouseMove={handleMouseMove1}
          onMouseUp={handleMouseUp1}
          onMouseLeave={handleMouseUp1}
        >
          {infiniteAwards.map((award, index) => (
            <div 
              key={`row1-${award.id}-${index}`}
              className='shrink-0 w-[300px] lg:w-[400px] h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group'
            >
              <Image
                src={award.image}
                alt={award.title}
                fill
                className='object-cover pointer-events-none'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-5 text-white'>
                <p className='text-xs mb-2 opacity-90'>{award.date}</p>
                <h3 className='font-bold text-lg mb-2 line-clamp-2 drop-shadow-lg'>{award.title}</h3>
                <p className='text-sm line-clamp-2 opacity-90'>{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div 
        className='overflow-hidden'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className='flex gap-6 select-none'
          style={{ 
            transform: `translateX(${autoOffset2 + scrollOffset + dragOffset2}px)`,
            transition: 'none',
            cursor: isDragging2 ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown2}
          onMouseMove={handleMouseMove2}
          onMouseUp={handleMouseUp2}
          onMouseLeave={handleMouseUp2}
        >
          {infiniteAwards.map((award, index) => (
            <div 
              key={`row2-${award.id}-${index}`}
              className='shrink-0 w-[300px] lg:w-[400px] h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group'
            >
              <Image
                src={award.image}
                alt={award.title}
                fill
                className='object-cover pointer-events-none'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />
              
              <div className='absolute bottom-0 left-0 right-0 p-5 text-white'>
                <p className='text-xs mb-2 opacity-90'>{award.date}</p>
                <h3 className='font-bold text-lg mb-2 line-clamp-2 drop-shadow-lg'>{award.title}</h3>
                <p className='text-sm line-clamp-2 opacity-90'>{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AwardsHome