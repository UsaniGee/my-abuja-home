'use client'

import React from 'react'
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface InnerPageHeroProps {
  backgroundImage: string
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  overlayOpacity?: number
  className?: string
  height?: string
}

const InnerPageHero: React.FC<InnerPageHeroProps> = ({
  backgroundImage,
  title,
  subtitle,
  breadcrumbs = [],
  overlayOpacity = 0.5,
  className = '',
  height = 'min-h-screen',
}) => {
  return (
    <div className={`relative ${height} flex flex-col justify-between  ${className}`}>
      <div 
        className='grayscale absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      <div 
        className='absolute inset-0 bg-black'
        style={{ opacity: overlayOpacity }}
      />
      
     
      <div className='z-10 flex flex-col justify-between p-5 md:p-8 lg:p-12 h-screen mt-30'>
        <div className='flex-1 flex flex-col justify-center items-center w-full'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6'>
              {title}
            </h1>            
          </div>
        </div>
        

        <div className='grid grid-cols-2 items-center gap-5 mb-60 border-t border-white/20 pt-5'>
        <div>
        {breadcrumbs.length > 0 && (
          <div className='text-white text-xs md:text-base'>
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {crumb.href ? (
                  <Link 
                    href={crumb.href} 
                    className='hover:underline transition-colors'
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className='mx-2'>•</span>
                )}
              </span>
            ))}
          </div>
        )}
        </div>


        <div>
            {subtitle && (
              <div className='text-white text-xs md:text-lg lg:text-xl lg:w-[400px]  ml-auto text-right md:text-left'>
                <p>{subtitle}</p>
              </div>
            )}
         </div>
        </div>
      </div>
    </div>
  )
}

export default InnerPageHero

