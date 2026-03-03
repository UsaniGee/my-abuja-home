import React from 'react'
import InnerPageHero from '../components/inner-pages/inner-page-hero'
import TestimonialPartnersHome from '../components/landing/testimonial/testimonial-partners'
import ContactFormSection from './components/contact-form-section'

const ContactUs = () => {
  return (
    <div>
      <InnerPageHero
        backgroundImage="https://res.cloudinary.com/dnu4lxiie/image/upload/v1764678864/about-hero_w4ngw5.png"
        title="Contact Us"
        subtitle="Our global real estate experts are here to help you in this ever-changing market."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' }
        ]}
        overlayOpacity={0.6}               
      />

      <ContactFormSection />

      <TestimonialPartnersHome />
    </div>
  )
}

export default ContactUs