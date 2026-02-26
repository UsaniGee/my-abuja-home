'use client'

import { Button } from '@/components/ui/button'
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'
import { FaXTwitter } from "react-icons/fa6";

interface TeamMember {
  id: number
  name: string
  position: string
  image: string
  socials: {
    instagram?: string
    facebook?: string
    youtube?: string   
    x?: string
    linkedin?: string
    whatsapp?: string
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
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1770723343/ADEBOLA_MOGAJI_edited_pdqvsb.png',
      socials: {
        instagram: 'https://www.instagram.com/myabujahome',
        facebook: 'https://web.facebook.com/myabujahome',
        youtube: 'https://www.youtube.com/@myabujahome',
        linkedin: 'https://www.linkedin.com/in/myabujahomelimited',
        x: 'https://www.x.com/myabujahome'
      }
    },
    {
      id: 2,
      name: 'Mrs Buchi',
      position: 'Executive Director',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1770723353/ONYEBUCHI_LENOIR_edited_zkqos4.png',
      socials: {
        instagram: 'https://www.instagram.com/myabujahome',
        facebook: 'https://web.facebook.com/myabujahome',
        youtube: 'https://www.youtube.com/@myabujahome',
        linkedin: 'https://www.linkedin.com/in/myabujahomelimited',
        x: 'https://www.x.com/myabujahome'
      }
    },
    {
      id: 3,
      name: 'Kindness Emmanuel',
      position: 'General Manager',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1770723345/KINDNESS_EMMANUEL_edited_hce31i.png',
     socials: {
        instagram: 'https://www.instagram.com/myabujahome',
        facebook: 'https://web.facebook.com/myabujahome',
        youtube: 'https://www.youtube.com/@myabujahome',
        linkedin: 'https://www.linkedin.com/in/myabujahomelimited',
        x: 'https://www.x.com/myabujahome'
      }
    },
    {
      id: 4,
      name: 'Shahida Ahmad',
      position: 'Marketing Manager',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1770723350/SHAHIDA_AHMAD_edited_ap4jwh.png',
      socials: {
        instagram: 'https://www.instagram.com/myabujahome',
        facebook: 'https://web.facebook.com/myabujahome',
        youtube: 'https://www.youtube.com/@myabujahome',
        linkedin: 'https://www.linkedin.com/in/myabujahomelimited',
        x: 'https://www.x.com/myabujahome'
      }
    },
    {
      id: 5,
      name: 'Moni Mogaji',
      position: 'International Relations Manager',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1770723346/MONI_MOGAJI_edited_zuabnv.png',
      socials: {
        instagram: 'https://www.instagram.com/myabujahome',
        facebook: 'https://web.facebook.com/myabujahome',
        youtube: 'https://www.youtube.com/@myabujahome',
        linkedin: 'https://www.linkedin.com/in/myabujahomelimited',
        x: 'https://www.x.com/myabujahome'
      }
    },
     {
      id: 6,
      name: 'Gospel Alhaji',
      position: 'Brand Ambassador',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1770723345/GOSPEL_ALHAJI_edited_a23jqq.png',
     socials: {
        instagram: 'https://www.instagram.com/myabujahome',
        facebook: 'https://web.facebook.com/myabujahome',
        youtube: 'https://www.youtube.com/@myabujahome',
        linkedin: 'https://www.linkedin.com/in/myabujahomelimited',
        x: 'https://www.x.com/myabujahome'
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
    const cardWidth = 300 + 24 
    const totalWidth = teamMembers.length * cardWidth

    const animate = () => {
      if (!isPaused && !isDragging) {
        setAutoOffset((prev) => {
          const newOffset = prev + 0.3 
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
    <div className='bg-[#FAFAFA] px-5 py-10 lg:py-20 lg:px-14'>
      <div className='grid lg:grid-cols-3 items-center gap-10 mb-12'>
        <div className='flex items-center gap-2.5'>
          <div className='border-b border-primary w-8.5' />
          <h1 className='border rounded-full border-primary px-4 py-2'>Our Team</h1>
        </div>
        <div className='text-3xl font-bold text-center lg:text-left'>
          We are at your service, meet our team
        </div>
        <div className='flex justify-end'>
          <Button 
            onClick={() => router.push('/about')} 
            className='rounded-[30px] w-full lg:w-[100px] lg:h-12 px-6 py-6 hover:lg:w-[150px] transition-all duration-300'
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
              className='shrink-0 w-[280px] lg:w-[300px] h-[380px] lg:h-[420px] rounded-2xl overflow-hidden relative group shadow-lg '
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
                
                <div className='flex gap-2'>
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
                  {member.socials.linkedin && (
                    <a 
                      href={member.socials.linkedin}
                      className='bg-white hover:bg-primary hover:text-white text-primary w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className='w-5 h-5' />
                    </a>
                  )}
                  {member.socials.x && (
                    <a 
                      href={member.socials.x}
                      className='bg-white hover:bg-primary hover:text-white text-primary w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaXTwitter />
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