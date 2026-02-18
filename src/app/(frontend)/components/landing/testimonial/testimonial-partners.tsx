'use client'
import React from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './testimonial-swiper.css'

const TestimonialPartnersHome = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Donald Maiden',
      role: 'Realtor',
      rating: 5,
      text: "I've used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers. I highly recommend it for any type of project.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 2,
      name: 'Crystal Maiden',
      role: 'UI/X Designer',
      rating: 5,
      text: "This UI Kit is incredibly helpful for my design work. The illustrations are clean, modern, and serve as a perfect for beginners and professionals alike.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      rating: 5,
      text: "Working with this team has been an absolute pleasure. Their professionalism and attention to detail made the entire process seamless.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      rating: 5,
      text: "Working with this team has been an absolute pleasure. Their professionalism and attention to detail made the entire process seamless.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      rating: 5,
      text: "Working with this team has been an absolute pleasure. Their professionalism and attention to detail made the entire process seamless.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 6,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      rating: 5,
      text: "Working with this team has been an absolute pleasure. Their professionalism and attention to detail made the entire process seamless.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 7,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      rating: 5,
      text: "Working with this team has been an absolute pleasure. Their professionalism and attention to detail made the entire process seamless.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 8,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      rating: 5,
      text: "Working with this team has been an absolute pleasure. Their professionalism and attention to detail made the entire process seamless.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 9,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      rating: 5,
      text: "Working with this team has been an absolute pleasure. Their professionalism and attention to detail made the entire process seamless.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 10,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      rating: 5,
      text: "Working with this team has been an absolute pleasure. Their professionalism and attention to detail made the entire process seamless.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    },
    {
      id: 11,
      name: 'Sarah Johnson',
      role: 'Property Investor',
      rating: 5,
      text: "Working with this team has been an absolute pleasure. Their professionalism and attention to detail made the entire process seamless.",
      avatar: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303559/about-image_bvebna.jpg'
    }
  ]

  const partners = [
    { id: 1, name: 'Partner 1', logo: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764424577/ddc56eac3a7c966a864a21a5455717f9f29ca992_qhl78h.png' },
    { id: 2, name: 'Partner 2', logo: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764424575/Logo_1_nbtt2j.svg' },
    { id: 3, name: 'Partner 3', logo: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764424575/Logo_2_oz1s4e.svg' },
    { id: 4, name: 'Partner 4', logo: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764424576/Logo_hlhns2.svg' },
    { id: 5, name: 'Partner 5', logo: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764424576/Logo_3_s4xlmx.svg' },
    { id: 6, name: 'Partner 6', logo: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764424575/Logo_4_chzule.svg' },
    { id: 7, name: 'Partner 7', logo: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764424576/90b4a08841da7853ca8124b3b6c1fbd39b4f38d5_aoiezu.png' }
  ]

  return (
    <div className='px-5 py-10 lg:py-20 lg:px-14'>
      
      <div className='grid justify-center gap-5 pb-5'>
         <div className='flex justify-center items-center gap-2.5'>
        <div className="pt-px w-15 lg:w-60 bg-linear-to-r from-secondary to-primary">
            <div className="bg-[#FAFAFA] pt-1 "/> 
        </div>
              <h1 className='border rounded-full border-primary px-4 py-2'>Testimonials</h1>
               <div className="pt-px w-15 lg:w-60 bg-linear-to-r from-primary to-secondary">
            <div className="bg-[#FAFAFA] pt-1 "/>
    </div>
            </div>
              <h2 className='text-3xl lg:text-4xl font-bold text-center max-w-2xl'>
          Trusted by homeowners & investors
        </h2>
        
        <p className='text-gray-600 text-center max-w-2xl'>
          We blend design, quality, and purpose-crafted to elevate daily living.
        </p>
      </div>
     

      {/* Testimonials Carousel */}
      <div className='w-full'>
        <Swiper
          modules={[Autoplay, Mousewheel, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          mousewheel={{
            forceToAxis: true,
          }}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className='testimonials-swiper'
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className='bg-white rounded-2xl p-5 hover:bg-[#FEECF3] hover:text-primary transition duration-600 h-full cursor-grab'>
                <div className='flex items-center justify-between border-b pb-3 mb-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-full overflow-hidden bg-gray-200'>
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className='w-full h-full object-cover'
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className='font-semibold text-gray-900'>{testimonial.name}</h4>
                      <p className='text-sm text-gray-500'>{testimonial.role}</p>
                    </div>
                  </div>
                  <div className='flex gap-1 mb-4'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className='w-5 h-5 fill-[#FF7F22] text-[#FF7F22]' />
                    ))}
                  </div>
                </div>

                <p className='leading-relaxed'>
                  {testimonial.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Partners Section */}
      <div className='mt-16'>
        <div className='flex items-center justify-center mb-6'>
          <div className="pt-px w-8 lg:w-60 border-b border-secondary" />
        <h3 className='border rounded-full border-secondary px-4 py-2 text-xs lg:text-sm'>
          We are Proud To Partner With Best-In-Class Clients
        </h3>
        <div className="pt-px w-8 lg:w-60 border-b border-secondary" />
        </div>
        
        <Swiper
          modules={[Autoplay, Mousewheel, Navigation]}
          spaceBetween={32}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          mousewheel={{
            forceToAxis: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 32,
            },
          }}
          className='partners-swiper'
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id} className='border-l-2 border-secondary'>
              <div className=' lg:grayscale hover:grayscale-0 transition-all duration-300 lg:opacity-60 hover:opacity-100 flex items-center justify-center cursor-grab'>
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  width={80}
                  height={80}
                  className='h-20 object-cover aspect-square'
                  unoptimized
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TestimonialPartnersHome