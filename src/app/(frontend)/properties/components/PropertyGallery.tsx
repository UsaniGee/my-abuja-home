'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import useEmblaCarousel from 'embla-carousel-react'
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PropertyGallery({ images, title }: { images: any[], title: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true })
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

  const [hero, ...rest] = images

  return (
    <div className="space-y-3">
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {/* Hero — full-width on mobile, tall left panel on desktop */}
        {hero && (
          <div
            className="col-span-2 md:col-span-1 relative w-full aspect-[4/3] md:aspect-auto md:row-span-2 md:h-[520px] rounded-xl overflow-hidden cursor-pointer group bg-muted"
            onClick={() => openModal(0)}
          >
            <Image
              src={hero.url}
              alt={hero.alt || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            {/* "View all" pill — mobile only */}
            <button
              onClick={(e) => { e.stopPropagation(); openModal(0) }}
              className="md:hidden absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur"
            >
              <Images className="w-3.5 h-3.5" />
              View all {images.length} photos
            </button>
          </div>
        )}

        {/* Secondary images — 2-column grid on the right on desktop */}
        {rest.slice(0, 4).map((image, i) => (
          <div
            key={i + 1}
            className={cn(
              'relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group bg-muted',
              // Hide extras on mobile — just show hero + first 1
              i >= 1 && 'hidden md:block'
            )}
            onClick={() => openModal(i + 1)}
          >
            <Image
              src={image.url}
              alt={image.alt || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* "View all" pill on last visible desktop thumbnail */}
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{images.length - 5} more</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View all button — desktop */}
      <button
        onClick={() => openModal(0)}
        className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary border border-primary rounded-full px-5 py-2 hover:bg-primary hover:text-white transition-colors"
      >
        <Images className="w-4 h-4" />
        View all {images.length} photos
      </button>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-none w-full h-dvh m-0 p-0 rounded-none bg-black/95 border-none flex flex-col overflow-hidden">
          <DialogTitle className="sr-only">Image Gallery for {title}</DialogTitle>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Main Viewport */}
          <div className="flex-1 flex items-center justify-center overflow-hidden relative">
            <div className="overflow-hidden w-full h-full" ref={emblaMainRef}>
              <div className="flex h-full">
                {images.map((image, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full flex items-center justify-center">
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

            {/* Nav Arrows */}
            <button
              onClick={() => emblaMainApi?.scrollPrev()}
              className="absolute left-2 md:left-4 p-2 md:p-3 bg-black/40 rounded-full text-white hover:bg-black/60"
            >
              <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
            </button>
            <button
              onClick={() => emblaMainApi?.scrollNext()}
              className="absolute right-2 md:right-4 p-2 md:p-3 bg-black/40 rounded-full text-white hover:bg-black/60"
            >
              <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
            </button>
          </div>

          {/* Thumbnail Bar */}
          <div className="bg-black/40 backdrop-blur-md p-3 md:p-4 pb-6 md:pb-8">
            <div className="overflow-hidden max-w-4xl mx-auto" ref={emblaThumbsRef}>
              <div className="flex gap-2 md:gap-3">
                {images.map((image, i) => (
                  <div
                    key={i}
                    className={cn(
                      'relative flex-[0_0_60px] md:flex-[0_0_120px] aspect-video rounded-md overflow-hidden cursor-pointer transition-all border-2',
                      selectedIndex === i
                        ? 'border-primary opacity-100 scale-105'
                        : 'border-transparent opacity-40 hover:opacity-70'
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
            <div className="text-center text-white/50 text-xs mt-3 uppercase tracking-widest font-medium">
              {selectedIndex + 1} of {images.length} — {title}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}