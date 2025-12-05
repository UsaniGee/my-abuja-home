import React from 'react'
import InnerPageHero from '../components/inner-pages/inner-page-hero'

const Services = () => {
  return (
   <div className=''>
      <InnerPageHero
        backgroundImage="https://res.cloudinary.com/dnu4lxiie/image/upload/v1764678864/about-hero_w4ngw5.png"
        title="Services"
        subtitle="Whether you're building, remodeling, buying, or selling, we bring seamless project execution under one roof."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' }
        ]}
        overlayOpacity={0.6}
        height="min-h-screen"
      />
     <div className='relative'> 
      <div className='absolute px-5 py-10 lg:py-[80px] lg:px-[56px] -top-50 w-full rounded-3xl bg-white'>
        Services
        </div>
      </div>
        
       <div className='mt-70'>

       </div>
    </div>
  )
}

export default Services