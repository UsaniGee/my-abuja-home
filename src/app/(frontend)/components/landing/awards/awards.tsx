'use client'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const AwardCard = ({ award }: { award: any }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div 
      className='shrink-0 w-[300px] lg:w-[400px] h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group'
    >
      {/* Front / Image View */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${showDetails ? 'opacity-0 pointer-events-none' : 'opacity-100'} md:group-hover:opacity-0 md:group-hover:pointer-events-none`}
      >
        <Image
          src={award.image}
          alt={award.title}
          fill
          className='object-cover pointer-events-none'
          unoptimized
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />
        <div className='absolute bottom-0 left-0 right-0 p-5 text-white flex justify-between items-end gap-3'>
          <div className='flex-1'>
            <p className='text-xs mb-2 opacity-90'>{award.date}</p>
            <h3 className='font-bold text-lg mb-2 drop-shadow-lg'>{award.title}</h3>
            {/* Description truncated on front view */}
            <p className='text-sm line-clamp-2 opacity-90'>
              {award.description}
            </p>
          </div>
          {/* Mobile Flip Button */}
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              setShowDetails(true); 
            }}
            className='md:hidden shrink-0 bg-white/20 backdrop-blur-sm p-3 rounded-full z-10 hover:bg-white/30 transition-colors'
            aria-label="Show Details"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Back / Description View (Details) */}
      <div 
        className={`absolute inset-0 bg-[#A10D44] text-white p-6 transition-opacity duration-300 flex flex-col justify-center ${showDetails ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:group-hover:opacity-100 md:group-hover:pointer-events-auto`}
      >
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            setShowDetails(false); 
          }}
          className='md:hidden absolute top-4 right-4 bg-black/20 backdrop-blur-sm p-2 rounded-full z-10 hover:bg-black/30 transition-colors'
          aria-label="Hide Details"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <style>
          {`
            .custom-scrollbar::-webkit-scrollbar {
              width: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.4);
              border-radius: 10px;
            }
          `}
        </style>
        <div 
          className='mt-8 overflow-y-auto max-h-full pr-2 custom-scrollbar'
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.4) transparent' }}
        >
          <p className='text-xs mb-3 opacity-90'>{award.date}</p>
          <h3 className='font-bold text-xl mb-4'>{award.title}</h3>
          <p className='text-sm leading-relaxed'>{award.description}</p>
        </div>
      </div>
    </div>
  )
}

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
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/q_auto/f_auto/v1776246029/award-img1_j7q0nt.png',
      title: 'CEO OF MYABUJAHOME LIMITED MET WITH THE DEPUTY SENATE PRESIDENT ON INVESTMENTS IN HOUSING',
      description: 'MR BOLA MOGAJI, THE CEO OF MYABUJAHOME LIMITED, MET WITH ALHAJI BARAU JIBRIN, THE DEPUTY SENATE PRESIDENT OF THE FEDERAL REPUBLIC OF NIGERIA, AND THE #4 MAN IN THE HELMS OF AFFAIRS IN NIGERIA ON THE 2ND OF MAY 2024, TO DISCUSS POTENTIAL INVESTMENTS INTO THE REAL ESTATE SECTOR FOR BOTH LOCAL AND FOREIGN INVESTORS, AND PARTNERSHIP WITH THE FEDERAL GOVERNMENT.',
      date: '20th August 2024'
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/q_auto/f_auto/v1776246029/award-img2_hf9vt8.png',
      title: 'MYABUJAHOME LIMITED TO TEAM UP WITH THE MINISTRY OF HOUSING & URBAN DEVELOPMENT',
      description: 'MYABUJAHOME LIMITED and its management team met with the Hon. Minister of Federal Ministry of Housing & Urban Development (FMHAUD) Arc. Ahmed Musa Dangiwa, Hon. Minister of State (FMHAUD) Engr. Abdullahi Tijjani Gwarzo, and the Permanent Secretary FMHAUD Alh. Mamman recently at the Abuja head office. The Ministers, flanked in the photograph by Mr. Bola Mogaji - the CEO of Myabujahome Limited, the GM - Mr Kindness Emmanuel, the Head of Marketing - Hajia (Mrs) Shahidah Ahmad, and Alhaji Abbah Mohammed to commemorate the occasion, spoke very highly of the MYABUJAHOME proposals, and impending prospects as these endeavours commence.',
      date: '15th July 2024'
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/q_auto/f_auto/v1776246029/award-img3_om3ofm.png',
      title: 'CEO OF MYABUJAHOME LIMITED MET WITH MANAGING DIRECTOR OF THE FEDERAL HOUSING AUTHORITY (FHA)',
      description: 'MR BOLA MOGAJI, THE CEO OF MYABUJAHOME LIMITED AND HIS TEAM, MET WITH HON. OYETUNJI OJO, THE MANAGING DIRECTOR, FEDERAL HOUSING AUTHORITY (FHA) ON PARTNERING TO BUILD AFFORDABLE HOUSING ACROSS NIGERIA.',
      date: '10th June 2024'
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/q_auto/f_auto/v1776246031/award-img4_hicvao.png',
      title: 'CEO OF MYABUJAHOME LIMITED MET WITH MANAGING DIRECTOR OF THE FEDERAL MORTGAGE BANK OF NIGERIA (FMBN)',
      description: 'MR BOLA MOGAJI, THE CEO OF MYABUJAHOME LIMITED AND HIS TEAM, MET WITH MR SHEHU USMAN OSIDI, THE MANAGING DIRECTOR, FEDERAL MORTGAGE BANK OF NIGERIA (FMBN) ON ACCESSING THE MUCH NEEDED FUNDING TO BUILD AFFORDABLE HOUSING ACROSS NIGERIA.',
      date: '5th May 2024'
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/q_auto/f_auto/v1776246029/award-img5_bkeurl.png',
      title: 'With the VICE CHANCELLOR, UNIVERSITY OF ABUJA',
      description: 'Honored for positive community development impact',
      date: '20th April 2024'
    },
    {
      id: 6,
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/q_auto/f_auto/v1776246030/award-img6_jwjynt.png',
      title: 'With the DEPUTY VICE CHANCELLOR, Nasarawa State University',
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

  const handleTouchStart1 = (e: React.TouchEvent) => {
    setIsDragging1(true)
    setStartX1(e.touches[0].pageX - dragOffset1)
    setIsPaused(true)
  }

  const handleTouchMove1 = (e: React.TouchEvent) => {
    if (!isDragging1) return
    const x = e.touches[0].pageX - startX1
    setDragOffset1(x)
  }

  const handleTouchStart2 = (e: React.TouchEvent) => {
    setIsDragging2(true)
    setStartX2(e.touches[0].pageX - dragOffset2)
    setIsPaused(true)
  }

  const handleTouchMove2 = (e: React.TouchEvent) => {
    if (!isDragging2) return
    const x = e.touches[0].pageX - startX2
    setDragOffset2(x)
  }

  useEffect(() => {
    const cardWidth = 300 + 24 
    const totalWidth = awards.length * cardWidth

    const animate1 = () => {
      if (!isPaused && !isDragging1) {
        setAutoOffset1((prev) => {
          const newOffset = prev + 0.3 
          return newOffset >= totalWidth ? 0 : newOffset
        })
      }
      animationRef1.current = requestAnimationFrame(animate1)
    }

    const animate2 = () => {
      if (!isPaused && !isDragging2) {
        setAutoOffset2((prev) => {
          const newOffset = prev - 0.3 
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
    <div ref={sectionRef} className='bg-[#FAFAFA] px-5 py-10 lg:py-20 lg:px-14 gap-12 overflow-hidden'>
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
        style={{ cursor: isDragging1 ? 'grabbing' : 'grab' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); handleMouseUp1() }}
        onMouseDown={handleMouseDown1}
        onMouseMove={handleMouseMove1}
        onMouseUp={handleMouseUp1}
      >
        <div 
          className='flex gap-6 select-none'
          style={{ 
            transform: `translateX(-${autoOffset1 + scrollOffset - dragOffset1}px)`,
            transition: 'none',
          }}
          onTouchStart={handleTouchStart1}
          onTouchMove={handleTouchMove1}
          onTouchEnd={handleMouseUp1}
          onTouchCancel={handleMouseUp1}
        >
          {infiniteAwards.map((award, index) => (
            <AwardCard key={`row1-${award.id}-${index}`} award={award} />
          ))}
        </div>
      </div>

      <div 
        className='overflow-hidden'
        style={{ cursor: isDragging2 ? 'grabbing' : 'grab' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); handleMouseUp2() }}
        onMouseDown={handleMouseDown2}
        onMouseMove={handleMouseMove2}
        onMouseUp={handleMouseUp2}
      >
        <div 
          className='flex gap-6 select-none'
          style={{ 
            transform: `translateX(${autoOffset2 + scrollOffset + dragOffset2}px)`,
            transition: 'none',
          }}
          onTouchStart={handleTouchStart2}
          onTouchMove={handleTouchMove2}
          onTouchEnd={handleMouseUp2}
          onTouchCancel={handleMouseUp2}
        >
          {infiniteAwards.map((award, index) => (
            <AwardCard key={`row2-${award.id}-${index}`} award={award} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AwardsHome