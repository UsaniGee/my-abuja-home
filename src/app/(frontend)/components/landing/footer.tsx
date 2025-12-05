import React from 'react'
import { Instagram, Facebook, Youtube } from 'lucide-react'
import Image from 'next/image'

const Footer = () => {
  const companyLinks = [
    { name: 'About us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Properties', href: '/properties' },
    { name: 'Our Services', href: '/services' },
    { name: 'Media', href: '/media' },
  ]

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer className='relative bg-white overflow-hidden'>
      <div 
        className='absolute inset-0 opacity-[0.03] bg-no-repeat bg-center bg-contain pointer-events-none'
        style={{ 
          backgroundImage: `url(https://res.cloudinary.com/dnu4lxiie/image/upload/v1764678860/Image_fxugad.svg)`,
          backgroundSize: '60%',
          backgroundPosition: 'center center'
        }}
      />

      <div className='relative z-10 max-w-7xl mx-auto px-5 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8'>
          
          <div className='lg:col-span-1'>
            <div className='mb-6'>
              <Image 
                src="https://res.cloudinary.com/dnu4lxiie/image/upload/v1764678860/Image_fxugad.svg"
                alt="MyAbujaHome Logo"
                width={180}
                height={60}
                className='h-auto w-auto max-w-[180px]'
              />
            </div>
            <p className='text-gray-600 text-sm mb-6 leading-relaxed'>
              Fun engaging and authentic webinars
            </p>
            
            <div className='flex gap-4'>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 group'
                  aria-label={social.label}
                >
                  <social.icon className='w-5 h-5 text-primary group-hover:text-white transition-colors duration-300' />
                </a>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3'>
             <div>
            <h3 className='text-lg font-semibold text-primary mb-6'>Company</h3>
            <ul className='space-y-3'>
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className='text-gray-600 hover:text-primary transition-colors duration-200 text-sm'
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-primary mb-6'>Contact</h3>
            <div className='space-y-4'>
              <div>
                <a 
                  href="tel:+2348088837426"
                  className='text-gray-600 hover:text-primary transition-colors duration-200 text-sm block'
                >
                  +234 (0) 808-883-7426
                </a>
              </div>
              <div>
                <a 
                  href="mailto:info@myabujahome.com"
                  className='text-gray-600 hover:text-primary transition-colors duration-200 text-sm block'
                >
                  info@myabujahome.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-primary mb-6'>Locations</h3>
            <p className='text-gray-600 text-sm'>
              Garki - Abuja, Nigeria.
            </p>
          </div>
          </div>
         
        </div>

        <div className='pt-13.5'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-gray-600'>
              Website Designed & Developed by{' '}
              <a 
                href="https://saurani.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className='text-primary hover:underline font-medium'
              >
                Saurani Technologies
              </a>
            </p>
            <p className='text-sm text-gray-600'>
              Copyright 2025{' '}
              <a 
                href="/privacy-policy" 
                className='text-primary hover:underline'
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer