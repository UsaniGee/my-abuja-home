'use client'
import React from 'react'

const SuccessStoriesHome = () => {
  const videos = [
    {
      id: 1,
      title: 'Where in Abuja do you desire a property?',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
      id: 2,
      title: 'Which would you rather invest in a Condo or a Duplex?',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
      id: 3,
      title: 'Value After 2 Years - Investment Analysis',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    },
    {
      id: 4,
      title: 'Where in Abuja do you desire a property?',
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
    }
  ]

  return (
    <div className='bg-[#FAFAFA] px-5 py-10 lg:py-[80px] lg:px-[56px]'>
      {/* Header Section */}
      <div className='grid justify-center gap-5 pb-10 lg:pb-16'>
        <div className='flex justify-center items-center gap-2.5'>
          <div className="pt-px w-15 lg:w-60 bg-linear-to-r from-secondary to-primary">
            <div className="bg-[#FAFAFA] pt-1 "/> 
          </div>
          <h1 className='border rounded-full border-primary px-4 py-2'>Success Stories</h1>
          <div className="pt-px w-15 lg:w-60 bg-linear-to-r from-primary to-secondary">
            <div className="bg-[#FAFAFA] pt-1 "/>
          </div>
        </div>
        <h2 className='text-3xl lg:text-4xl font-bold text-center'>
          Celebrate a legacy of excellence and recognition
        </h2>
      </div>

      {/* Video Grid */}
      <div className='grid md:grid-cols-2 gap-6'>
        {videos.map((video) => (
          <div 
            key={video.id}
            className='bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group'
          >
            <div className='relative aspect-video overflow-hidden'>
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className='w-full h-full'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuccessStoriesHome