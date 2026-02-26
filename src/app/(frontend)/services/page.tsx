import React from 'react'
import InnerPageHero from '../components/inner-pages/inner-page-hero'
import { Button } from '@/components/ui/button'
import Newsletter from '../components/landing/newsletter/newsletter'
import { div } from 'framer-motion/client'
import { ArrowUpRight } from 'lucide-react'
import { ArchDesIcon, BuildingIcon, ConsManIcon, PropertySalesIcons, PropManIcon } from '@/components/icons/services'
import Image from 'next/image'

const Services = () => {

  const services = [
    {
      icon: <BuildingIcon />,
      title: 'Lands',
      description: 'We identify, acquire, and facilitate premium land transactions across Nigeria and internationally, ensuring verified titles and strategic locations. Our expertise connects you with the perfect plot for your vision.',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1767006205/668fce6b3eca5c5a82d2e02b06e3a01487793649_1_j1d8tk.jpg'
    },
    
    {
      icon: <BuildingIcon />,
      title: 'Building',
      description: 'From residential estates to commercial complexes, we develop quality properties that meet international standards while reflecting local excellence. Your dream structure, expertly delivered.',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1767006204/0f9950d50e8827bc770bf98959eba35129e73632_i6r4qs.jpg'
    },
    
    {
      icon: <PropertySalesIcons />,
      title: 'Brokerage',
      description: 'Our experienced agents bridge buyers and sellers with integrity, transparency, and market insight gained from over a decade of successful transactions. We make property deals seamless.',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1767006206/61fcd231a1173a5f690695b9290895bcf6ed00fe_prtcbk.jpg'
    },
    {
      icon: <PropManIcon />,
      title: 'Patnership',
      description: 'We collaborate with verified owners and established real estate companies to expand opportunities and deliver exceptional value. Together, we achieve more.',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1767006206/5e774a82befc105ba91458b9d229ada94720a45f_f6kuz5.jpg'
    },
    
    {
      icon: <ConsManIcon />,
      title: 'Construction',
      description: 'Our construction services bring architectural visions to life with quality craftsmanship, timely delivery, and attention to detail. We build properties that last generations.',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1767006206/ac847bcd4aaca56334e6514a8d1cae048f4c91ac_ctfoat.jpg'
    },
    
    {
      icon: <ArchDesIcon />,
      title: 'Advisory',
      description: 'Navigate the real estate landscape with confidence through our expert guidance on investments, market trends, and property decisions. Strategic advice for optimal outcomes.',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1767006205/05c730df8c531ff370fabd5c1293ed7c9f747dc9_aza45l.jpg'
    },


  ]
  return (
   <div className=''>
      <InnerPageHero
        backgroundImage="https://res.cloudinary.com/dnu4lxiie/image/upload/v1764678864/about-hero_w4ngw5.png"
        title="Services"
        subtitle="News and Resources from the frontiers of real estate."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' }
        ]}
        overlayOpacity={0.6}
       
      />
      <div className='px-5 py-10 lg:py-20 lg:px-14 w-full'>
        <div className='flex flex-col justify-center items-center gap-2'>
        <Button className='w-fit border rounded-full border-primary text-black px-4 py-2 bg-transparent hover:bg-transparent hover:text-primary'>
          Our Services
          </Button>
        <h1 className='text-center text-3xl lg:text-6xl font-bold lg:w-[740px]'>We develop quality infrastructure & real estate projects</h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 lg:mt-20'>
          {services.map((service) => (
           <div key={service.title} className={`w-full min-h-[510px] lg:h-[410px] flex flex-col items-start justify-center relative gap-2 bg-[#F5EAEE] px-10 pb-3 rounded-2xl group transition-all duration-300 overflow-hidden`}>
            {service.image && (
              <>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className='object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500' 
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 " />
              </>
            )}
            <div className="relative z-10 w-full flex flex-col gap-7 items-start">
              <div className="border-b border-solid border-[#E0E0E0] group-hover:border-white w-full pt-10" />
              <p className='pt-15'>{service.icon}</p>
              <h2 className='text-2xl font-bold group-hover:text-white transition-colors duration-300'>{service.title}</h2>
              <p className='text-gray-500 group-hover:text-white transition-colors duration-300'>{service.description}</p>
              <div className='w-full flex items-end justify-end gap-2'>
              </div>
            </div>
                <div className='rounded-full absolute bottom-3 right-3 p-2 text-white bg-black group-hover:bg-primary transition-colors duration-300'>
                  <ArrowUpRight />
                </div>
           </div>
          ))}
        </div>

        
        </div>
        <Newsletter />
    </div>
  )
}

export default Services