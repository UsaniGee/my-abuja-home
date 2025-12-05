import React from 'react'
import InnerPageHero from '../components/inner-pages/inner-page-hero'
import { Button } from '@/components/ui/button'
import TestimonialPartnersHome from '../components/landing/testimonial/testimonial-partners'
import OurTeamHome from '../components/landing/our-team/our-team'
import AboutStatistics from './components/about-statistics'
import MissionVision from './components/mission-vision'

const About = () => {
  return (
    <div className=''>
      <InnerPageHero
        backgroundImage="https://res.cloudinary.com/dnu4lxiie/image/upload/v1764678864/about-hero_w4ngw5.png"
        title="About Us"
        subtitle="Whether you're building, remodeling, buying, or selling, we bring seamless project execution under one roof."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About us' }
        ]}
        overlayOpacity={0.6}
        height="min-h-screen"
      />

      <div className='rounded-3xl'> 
      <div className='absolut px-5 py-10 lg:py-[80px] lg:px-[56px] -top-50 w-full'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='grid gap-10'>
            <div>
              <div className='flex items-center gap-2.5'>
                <div className='border-b border-primary w-8.5 ' />
              <Button className='border rounded-full border-primary px-4 py-2 text-primary bg-transparent hover:bg-transparent hover:text-primary'>About Us</Button>
              </div>
            </div>
            <div className='text-4xl lg:text-6xl font-bold lg:text-left'>
             Shaping the world of things to come
            </div>
          </div>


          <div>
            <div>
              <p className='text-2xl font-bold'>MYABUJAHOME LIMITED, as a real estate company, is a fully integrated property development, partnership, brokerage, sales, marketing, advisory and creative company.</p>
              <br />
              <p>With over a decade’s worth of business, and a team of experienced management and staff, both locally and across the globe, we deliver!
              </p>
              <br />
              <p>Our vision is to be the leading real estate company in Nigeria, and to be a partner of choice for our clients, employees, and stakeholders.Our primary goals are to acquire, build, market and sell real estate in all forms (land, buildings, etc.) that we own, or on behalf of verified owners / established Real Estate companies.</p>
            </div>
          </div>
        </div>

        
      </div>
      </div>

      <div className=''>

      <AboutStatistics />
      <MissionVision />
      <OurTeamHome />
      <TestimonialPartnersHome />
      </div>
     
    </div>
  )
}

export default About