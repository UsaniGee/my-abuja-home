import React from 'react'
import Hero from './components/landing/hero'
import AboutHome from './components/landing/about/about-section'
import OurServicesHome from './components/landing/our-services/our-services'
import OurProperitiesHome from './components/landing/our-properties/our-properties'
import AwardsHome from './components/landing/awards/awards'
import TestimonialPartnersHome from './components/landing/testimonial/testimonial-partners'
import MediaHome from './components/landing/media/media'
import SuccessStoriesHome from './components/landing/success-stories/success-stories'
import OurTeamHome from './components/landing/our-team/our-team'
import Newsletter from './components/landing/newsletter/newsletter'

const Home = () => {
  return (
    <div className='p-0 m-0'>
      <Hero />
      <AboutHome />
      <OurServicesHome />
      <OurProperitiesHome />
      <AwardsHome />
      <TestimonialPartnersHome />
      <MediaHome />
      <SuccessStoriesHome />  
      <OurTeamHome />
      <Newsletter />
    </div>
  )
}

export default Home