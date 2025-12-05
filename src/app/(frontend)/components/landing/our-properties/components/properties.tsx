import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const Properties = () => {

  const properties = [
    {
      id: 1,
      span: 1,
      title: 'Broadwater Estate',
      price: '₦1,700,000',
      description: 'Property One Description',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303562/prop-one_k2uecz.svg',
    },
    {
     id: 2,
     span: 2,
     title: 'Broadwater Estate',
     price: '₦1,700,000',
     description: 'Property Two Description',
     image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303540/prop-two_kzjoup.jpg',
   },
  {
    id: 3,
    span: 2,
     title: 'Broadwater Estate',
     price: '₦1,700,000',
     description: 'Property Two Description',
     image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303548/prop-three_mxvikg.jpg',
   },
    {
      id: 4,
      span: 1,
      title: 'Broadwater Estate',
      price: '₦1,700,000',
      description: 'Property One Description',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303555/prop-four_sey98g.svg',
    },
     {
     id: 5,
     span: 2,
     title: 'Broadwater Estate',
     price: '₦1,700,000',
     description: 'Property Two Description',
     image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303545/prop-five_evg4vx.jpg',
   },
  {
    id: 6,
    span: 2,
     title: 'Broadwater Estate',
     price: '₦1,700,000',
     description: 'Property Two Description',
     image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303706/HeroBgImg_adjvkt.jpg',
   },
   {
      id: 7,
      span: 1,
      title: 'Broadwater Estate',
      price: '₦1,700,000',
      description: 'Property One Description',
      image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303706/HeroBgImg_adjvkt.jpg',
    }
  ]

 

  return (
    <div className='grid grid-cols-1 md:grid-cols-10 gap-5 bg-black'>
      {properties.map((property) => {
        const spanClass = property.span === 2 ? 'md:col-span-5' : 'md:col-span-10';  
        return (
          <div key={property.id} className={`col-span-1 ${spanClass} relative`}>
           
         <div className={`h-full object-contain overflow-hidden`}>
           <Image src={property.image} alt={property.title} width={779} height={384.0441589355469} className={`w-full h-[243px] lg:h-[861px] object-cover hover:scale-110 transition-all duration-300`} />
         </div>

          <div className='text-white absolute flex gap-2 top-5 left-5 lg:top-14 lg:left-14 z-10 text-sm'>
               <Button className={`rounded-4xl text-white bg-black border ${property.id === 1 ? 'bg-transparent' : 'bg-black'} ${property.id === 1 ? 'border-primary' : 'border-black'} ${property.id === 1 ? 'text-primary' : 'text-white'}`}>
               {property.id === 1 ? 'Homes' : 'Rent'}
              </Button>
                <Button className='rounded-4xl bg-white text-black hover:bg-white'>
                {property.id === 1 ? 'For Rent' : 'Featured'}
              </Button>              
            </div>

            <div className={`w-full flex flex-col justify-between  gap-2 text-white absolute px-5 lg:px-14 bottom-5 lg:bottom-14 z-10 ${property.span === 1 ? 'lg:flex-row-reverse' : 'flex-col'} ${property.span === 1 ? 'lg:items-center' : 'items-start'} `}>
                <p>{property.description}</p>
              <div>
                  <p className='lg:text-4xl font-semibold'>PRICE - {property.price}</p>
                <h1 className='lg:text-5xl font-bold'>{property.title}</h1>
              </div>
              </div>
        </div>
        )
      })}
    </div>
  )
}

export default Properties