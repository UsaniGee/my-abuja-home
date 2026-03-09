'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import useEmblaCarousel from 'embla-carousel-react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PropertyGallery({ images, title }: { images: any[], title: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  // Main Carousel API
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true })
  // Thumbnail Carousel API
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  const openModal = (index: number) => {
    setSelectedIndex(index)
    setIsOpen(true)
    setTimeout(() => {
       if (emblaMainApi) emblaMainApi.scrollTo(index, true)
    }, 0)
  }

  return (
    <div className="space-y-4">
      {/* Grid View */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, i) => (
          <div 
            key={i} 
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group bg-muted"
            onClick={() => openModal(i)}
          >
            <Image 
              src={image.url} 
              alt={image.alt || title} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[100vw] h-screen w-full p-0 bg-black/95 border-none flex flex-col overflow-hidden">
          <DialogTitle className="sr-only">Image Gallery for {title}</DialogTitle>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Main Viewport */}
          <div className="flex-1 flex items-center justify-center overflow-hidden relative">
            <div className="overflow-hidden w-full h-full" ref={emblaMainRef}>
              <div className="flex h-full">
                {images.map((image, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center p-4">
                    <Image 
                      src={image.url} 
                      alt={image.alt || title} 
                      fill
                      className="object-contain"
                      priority={i === selectedIndex}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Nav Arrows */}
            <button 
                onClick={() => emblaMainApi?.scrollPrev()} 
                className="absolute left-4 p-3 bg-black/40 rounded-full text-white hover:bg-black/60 hidden md:block"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
                onClick={() => emblaMainApi?.scrollNext()} 
                className="absolute right-4 p-3 bg-black/40 rounded-full text-white hover:bg-black/60 hidden md:block"
            >
                <ChevronRight className="w-8 h-8" />
            </button>
          </div>

          {/* Thumbnail Bar Section */}
          <div className="bg-black/40 backdrop-blur-md p-4 pb-8">
            <div className="overflow-hidden max-w-4xl mx-auto" ref={emblaThumbsRef}>
              <div className="flex gap-3">
                {images.map((image, i) => (
                  <div 
                    key={i} 
                    className={cn(
                        "relative flex-[0_0_80px] md:flex-[0_0_120px] aspect-video rounded-md overflow-hidden cursor-pointer transition-all border-2",
                        selectedIndex === i ? "border-primary opacity-100 scale-105" : "border-transparent opacity-40 hover:opacity-70"
                    )}
                    onClick={() => onThumbClick(i)}
                  >
                    <Image 
                      src={image.url} 
                      alt={`Thumbnail ${i + 1}`} 
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center text-white/50 text-xs mt-4 uppercase tracking-widest font-medium">
                {selectedIndex + 1} of {images.length} — {title}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}