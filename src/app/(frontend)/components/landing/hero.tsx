import React from 'react'
import BgImage from '../../../../../public/HeroBgImg.jpg'
import { ChevronDownIcon, Search } from 'lucide-react'

const Hero = () => {

  const details = [
    {
      title: 'Category',
      description: 'Rent/Buy',
      icon: ChevronDownIcon 
    },
     {
      title: 'Location',
      description: 'Abuja',
      icon: ChevronDownIcon 
    },
     {
      title: 'Type',
      description: 'House',
      icon: ChevronDownIcon 
    },
     {
      title: 'Budget',
      description: '₦1.7M',
      icon: ChevronDownIcon 
    },
  ]


  return (
    <div className='relative min-h-screen flex justify-center items-center p-5'>
      <div 
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(https://res.cloudinary.com/dnu4lxiie/image/upload/v1764303706/HeroBgImg_adjvkt.jpg)` }}
      />
      
      <div className='absolute inset-0 bg-black/40' />
      
     <div>
      <div className='relative text-center text-white mt-[108.5px]'>
        <h1 className='text-5xl md:text-7xl font-bold mb-4 lg:leading-[87px]'>Find Your Dream <br /> Home With <br /> Us</h1>
        <p className='text-xl md:text-2xl mt-[24px]'>A leading independent real estate agency shaping modern communities.</p>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-5 items-center gap-5 lg:gap-10 mt-[55.5px]'>
        {details.map((detail) => (
          <div key={detail.title} className='w-full lg:w-[188px] h-[92px] relative text-white bg-white/20 py-6 px-5 rounded-[24px]'>
            <h2 className='text-sm'>{detail.title}</h2>
            <div className='flex justify-between'>
              <p className='text-xl'>{detail.description}</p>
            <detail.icon />
            </div>
          </div>
        ))}

        <div className='flex items-center  lg:w-[56px] h-[56px] relative text-white bg-primary py-4 px-4 rounded-full'><Search  /></div>
      </div>
     </div>
    </div>
  )
}

export default Hero