'use client'

import React from 'react'
import { motion } from 'framer-motion'

const images = [
  "https://res.cloudinary.com/dnu4lxiie/image/upload/v1766574915/GIRI_DISCOUNT_POSTER_1_ijq5qh.svg",
  "https://res.cloudinary.com/dnu4lxiie/image/upload/v1766574913/961790feb6f71f21314eb699336481fd90fec502_zrhqid.png",
  "https://res.cloudinary.com/dnu4lxiie/image/upload/v1766574816/e7771c031b28b996f1af6c1c2d4afe212c7b4abb_m6v2fx.jpg",
  "https://res.cloudinary.com/dnu4lxiie/image/upload/v1766574801/064e030048627a1aafa1f173eed0bd08de33a325_rcwuvw.jpg",
  "https://res.cloudinary.com/dnu4lxiie/image/upload/v1766574818/56746b8c3822461a2117344831b3a2f74ea4e115_luoukt.jpg",
  "https://res.cloudinary.com/dnu4lxiie/image/upload/v1766574819/b93a0a128cfede4d366b96598dfcdd52eee3319c_ztdcdn.jpg",
  "https://res.cloudinary.com/dnu4lxiie/image/upload/v1766574819/475166bcf206faf6f6a8c836267b5be805a55937_tiajzg.png",
  "https://res.cloudinary.com/dnu4lxiie/image/upload/v1766574853/5c6f92854aa36c1efcfff557e72bde1cf003856f_zls8ho.jpg"
]

const InfiniteBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" /> 
      
      <motion.div
        className="flex h-full w-max" 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...images, ...images].map((src, index) => (
          <div key={index} className="relative h-full shrink-0">
            <img
              src={src}
              alt={`Background ${index}`}
              className="h-full w-auto object-cover opacity-60"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default InfiniteBackground