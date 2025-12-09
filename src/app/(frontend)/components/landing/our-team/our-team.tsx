'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Instagram, Facebook, Youtube } from 'lucide-react'

interface TeamMember {
  id: number
  name: string
  position: string
  image: string
  socials: {
    instagram?: string
    facebook?: string
    youtube?: string
    tiktok?: string
  }
}

const OurTeamHome = () => {
  const router = useRouter()
  const [autoOffset, setAutoOffset] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [startX, setStartX] = useState(0)
  const animationRef = useRef<number | null>(null)

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Mr Bola Mogaji',
      position: 'Executive Director',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_600/v1764931013/1141c64ba323ad97e42785406c5edb3fad0e3548_daydpx.jpg',
      socials: {
        instagram: '#',
        facebook: '#',
        youtube: '#',
        tiktok: '#'
      }
    },
    {
      id: 2,
      name: 'Mrs Buchi',
      position: 'Executive Director',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_600/v1764931014/c35e2aa36836a0519685951ecc12dfa3a9cf9c86_ocvv6f.jpg',
      socials: {
        instagram: '#',
        facebook: '#',
        youtube: '#',
        tiktok: '#'
      }
    },
    {
      id: 3,
      name: 'Mr Bola Mogaji',
      position: 'Senior Executive Director',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_600/v1764931013/1141c64ba323ad97e42785406c5edb3fad0e3548_daydpx.jpg',
      socials: {
        instagram: '#',
        facebook: '#',
        youtube: '#',
        tiktok: '#'
      }
    },
    {
      id: 4,
      name: 'Mrs Buchi',
      position: 'Executive Director',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_600/v1764931014/c35e2aa36836a0519685951ecc12dfa3a9cf9c86_ocvv6f.jpg',
      socials: {
        instagram: '#',
        facebook: '#',
        youtube: '#',
        tiktok: '#'
      }
    }
  ]

  const infiniteTeam = [...teamMembers, ...teamMembers, ...teamMembers]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - dragOffset)
    setIsPaused(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - startX
    setDragOffset(x)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsPaused(false)
  }

  useEffect(() => {
    const cardWidth = 300 + 24 // card width + gap
    const totalWidth = teamMembers.length * cardWidth

    const animate = () => {
      if (!isPaused && !isDragging) {
        setAutoOffset((prev) => {
          const newOffset = prev + 0.3 // Reduced from 0.5 for better performance
          return newOffset >= totalWidth ? 0 : newOffset
        })
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isPaused, isDragging, teamMembers.length])

  return (
    <div className='bg-[#FAFAFA] px-5 py-10 lg:py-[80px] lg:px-[56px]'>
      <div className='grid lg:grid-cols-3 items-center gap-10 mb-12'>
        <div className='flex items-center gap-2.5'>
          <div className='border-b border-primary w-8.5' />
          <h1 className='border rounded-full border-primary px-4 py-2'>Our Team</h1>
        </div>
        <div className='text-4xl font-bold text-center lg:text-left'>
          We are at your service, meet our team
        </div>
        <div className='flex justify-end'>
          <Button 
            onClick={() => router.push('/our-team')} 
            className='rounded-[30px] w-full lg:w-[100px] lg:h-[48px] px-6 py-6 hover:lg:w-[150px] transition-all duration-300'
          >
            View all
          </Button>
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
            transform: `translateX(-${autoOffset - dragOffset}px)`,
            transition: 'none',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {infiniteTeam.map((member, index) => (
            <div 
              key={`${member.id}-${index}`}
              className='shrink-0 w-[280px] lg:w-[300px] h-[380px] lg:h-[420px] rounded-2xl overflow-hidden relative group'
            >
              
              <Image
                src={member.image}
                alt={member.name}
                fill
                className='object-cover pointer-events-none transition-all duration-500 group-hover:scale-110'
              />
              
              <div className='absolute bottom-6 left-6 right-6 bg-white/90 rounded-xl p-4 shadow-lg z-10 group-hover:opacity-0 transition-opacity duration-300 text-center'>
                <h3 className='font-bold text-lg text-gray-900'>{member.name}</h3>
                <p className='text-sm text-gray-600'>{member.position}</p>
              </div>

              <div className='absolute inset-0 bg-primary/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-6'>
                <div className='text-center text-white px-6'>
                  <h3 className='font-bold text-2xl mb-2'>{member.name}</h3>
                  <p className='text-sm opacity-90'>{member.position}</p>
                </div>
                
                <div className='flex gap-4'>
                  {member.socials.instagram && (
                    <a 
                      href={member.socials.instagram}
                      className='bg-white hover:bg-primary hover:text-white text-primary w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram className='w-5 h-5' />
                    </a>
                  )}
                  {member.socials.facebook && (
                    <a 
                      href={member.socials.facebook}
                      className='bg-white hover:bg-primary hover:text-white text-primary w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Facebook className='w-5 h-5' />
                    </a>
                  )}
                  {member.socials.youtube && (
                    <a 
                      href={member.socials.youtube}
                      className='bg-white hover:bg-primary hover:text-white text-primary w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Youtube className='w-5 h-5' />
                    </a>
                  )}
                  {member.socials.tiktok && (
                    <a 
                      href={member.socials.tiktok}
                      className='bg-white hover:bg-primary hover:text-white text-primary w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                        <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z'/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurTeamHome