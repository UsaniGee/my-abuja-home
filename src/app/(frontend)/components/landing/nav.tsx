'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about' },
    { name: 'Properties', href: '/properties' },
    { name: 'Services', href: '/services' },
    { name: 'Media', href: '/media' },
    { name: 'Calculator', href: '/calculator' },
  ]

  return (
    <div className='w-full p-5 lg:px-[56px]'>
      <nav className='w-full rounded-[24px] z-50 md:p-0 bg-black/30 backdrop-blur-md  border-b border-white/20 '>
      <div className=' px-6 lg:px-8 py-3'>
        <div className='flex items-center justify-between h-12 md:h-[69px]'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-2 group'>
            <div className=' '>
             <Image src='/Logo.svg' alt='Logo' width={147} height={45} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className='text-white/90 hover:text-white font-medium transition-all duration-300 relative group'
              >
                {link.name}
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full'></span>
              </Link>
            ))}           
          </div>

          <div className='space-x-4 hidden md:flex items-center text-white'>
            <span>EN</span>
             <button className='bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg'>
              Get in touch
            </button>
          </div>

          {/* Mobile Menu Button */}
         <div className='flex items-center space-x-4 md:hidden text-white'>
             <span>EN</span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=' text-white p-2 rounded-[30px] hover:bg-white/10 transition-colors'
            aria-label='Toggle menu'
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
         </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`z-20 md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-fit opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='px-4 pt-2 pb-4 space-y-3 bg-white/5 backdrop-blur-lg border-t border-white/10'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className='block text-white/90 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg font-medium transition-all duration-200'
            >
              {link.name}
            </Link>
          ))}
           <div className='space-x-4 md:hidden'>
             <button className='w-full rounded-[30px] bg-[#FFFFFE] text-gray-900 px-6 py-3 font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg'>
            Get in touch
          </button>
          </div>
         
        </div>
      </div>
    </nav>
    </div>
    
  )
}

export default Nav