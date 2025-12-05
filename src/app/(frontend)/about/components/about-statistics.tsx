'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Building2, Ruler, Target } from 'lucide-react'
import Image from 'next/image'
import { div } from 'framer-motion/client'

interface StatCardProps {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  delay?: number
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, suffix, label, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              const duration = 2000
              const steps = 60
              const increment = value / steps
              let current = 0

              const timer = setInterval(() => {
                current += increment
                if (current >= value) {
                  setCount(value)
                  clearInterval(timer)
                  setHasAnimated(true)
                } else {
                  setCount(Math.floor(current))
                }
              }, duration / steps)

              return () => clearInterval(timer)
            }, delay)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [value, hasAnimated, delay])

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center justify-end mb-4">
        <div className="bg-primary/10 p-3 rounded-xl">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center text-4xl lg:text-5xl font-bold text-gray-900">
          {count}
         <div>
             <span>{suffix}</span>
             <span className="text-primary">+</span>
         </div>
        </div>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  )
}

const AboutStatistics = () => {
  const stats = [
    {
      icon: <Building2 className="w-6 h-6 text-primary" />,
      value: 40,
      suffix: '',
      label: 'projects in development'
    },
    {
      icon: <Ruler className="w-6 h-6 text-primary" />,
      value: 18,
      suffix: 'm',
      label: 'square feet of property'
    },
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      value: 2.5,
      suffix: 'b',
      label: 'total project cost'
    }
  ]

  return (
    <div className='relative grid lg:justify-items-end bg-[#FAFAFA] px-5 py-10 lg:py-[80px] lg:px-[56px] gap-12'>
      
      <div className="absolute inset-0 mx-5 lg:mx-[56px] my-10 lg:my-[80px]">
        <Image
          src="https://res.cloudinary.com/dnu4lxiie/image/upload/v1764841896/4b4cbef24bbf4459a1e82dfcb3f17875081cb4bc_nkpfrb.jpg"
          alt="Team collaboration"
          fill
          className="object-cover rounded-3xl"
          priority
        />
        <div className="absolute inset-0 bg-black/20 rounded-3xl" />
      </div>

      <div className="p-5 z-10">    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full lg:w-[450px]">
          <div className="hidden md:block"></div>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutStatistics
