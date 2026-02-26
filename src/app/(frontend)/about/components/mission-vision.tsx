'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Check, Key } from 'lucide-react'

const MissionVision = () => {

const missionVisionData = [
    {
        title: "Our Mission",
        description: "To deliver exceptional real estate solutions through integrity, expertise, and innovation. We connect people with properties that transform lives, building communities and creating lasting value across Nigeria and beyond."
    },
    {
        title: "Our Vision",
        description: "To be Africa's most trusted real estate partner, renowned for excellence in property development, transparent transactions, and sustainable growth. We envision a future where quality housing and land ownership are accessible to all."
    },
    {
        title: "Our Values",
        description: "Integrity in every transaction. Excellence in every delivery. Innovation in every solution. Partnership in every relationship. Transparency in every process. Commitment to building Nigeria's future, one property at a time."
    }
]

const data = [
    {
        key: 1,
        title: 'What we do',
        description: 'Our primary goals are to acquire, build,market and sell real estate in all forms(land, buildings, etc.).',
        btnText: 'Our Solutions',
        image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_800/v1764928904/daniel-barnes-RKdLlTyjm5g-unsplash_cgeadz.jpg'
    },
     {
        key: 2,
        title: 'Our impact',
        description: 'We are in partnership with the top 20 property development companies in abuja make an impact.',
        btnText: 'See properties',
        image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_800/v1764913405/Container_bckbdl.png'
    },
     {
        key: 3,
        title: 'Core Values',
        description: 'To offer the best options to you, at affordable prices, no matter the location.',
        btnText: 'Discover More',
        image: 'https://res.cloudinary.com/dnu4lxiie/image/upload/f_auto,q_auto,w_800/v1764913372/a670b8bb3db17896eb7f2e6f63110d2dc48d8143_rj3mjf.jpg'
    },
]



  return (
    <div className="bg-[#FAFAFA] px-5 py-10 lg:py-20 lg:px-14">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
     
        <div className="space-y-6">
            {missionVisionData.map((item, index) => (
                <div key={index} className="bg-white group hover:bg-primary rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-900">
                <h3 className="text-primary bg-[#E9EBF3] group-hover:bg-white w-fit px-2 py-1 rounded-sm text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[#62636C] group-hover:text-white leading-relaxed">
                    {item.description}
                </p>
                </div>
            ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-full min-h-[500px]">
          <Image
            src="https://res.cloudinary.com/dnu4lxiie/image/upload/v1771950834/b77e60a84674e15ec2cb40c8e32b076cabf40ec1_dpmqmg.png"
            alt="Professional woman working"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-[#A10D44]/40 to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-white/85 backdrop-blur-sm rounded-xl p-4 shadow-lg flex items-start gap-3">
              <Check className="w-5 h-5 text-white mt-0.5 bg-primary rounded-full p-1" />
              <p className="text-sm text-gray-700">
                Getting properties has never been easier
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-8">
          <div className="inline-block border border-primary rounded-full px-4 py-2 mb-4">
            <span className="text-sm uppercase tracking-wide">Explore Company</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold">
            Learn more<br />about us
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((item, index: number ) => (
            <div key={index} className={`lg:h-[500px] h-[400px]  group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${item.key === 2 ? 'bg-primary' : item.key === 3 ? 'bg-[#1B1F12]/50' : 'bg-[#1B1F12]'}`}>
            <Image src={item.image} alt={item.title} height={272} width={351}  className={`object-cover absolute bottom-0  ${item.key === 2 ? 'w-[351px]'  : 'w-full h-full'}`} />
            <div className={`absolute inset-0 ${item.key === 2 ? '' : 'bg-[#1B1F12]/50' }`} />

            <div className={`relative h-full p-6 lg:p-8 flex flex-col gap-3 ${item.key === 2 ? 'justify-start' : ' justify-between '}`}>
                <div className={`space-y-2 ${item.key === 2 ? 'text-white' : 'text-primary'}`}>
                    <p>0{item.key}</p>
                    <div className="border-b border-solid border-white " />
                </div>
              <div className="space-y-4">
                <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                 {item.description}
                </p>
                <Button 
                variant="outline" 
                className="w-fit bg-transparent hover:bg-transparent hover:text-white text-white border-t-0 border-x-0 border-b border-white rounded-none text-left"
              >
               {item.btnText}
              </Button>
              </div> 
            </div>

          </div>
          ))}

          
        </div>
      </div>
    </div>
  )
}

export default MissionVision