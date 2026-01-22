import InnerPageHero from '../components/inner-pages/inner-page-hero'
import InstagramFeedSection from './components/InstagramFeedSection'
import BlogGridSection from './components/BlogGridSection'
import NewsGridSection from './components/NewsGridSection'

export const dynamic = 'force-dynamic'

const Media = async () => {
  return (
    <div className="bg-white">
      <InnerPageHero
       backgroundImage={'https://res.cloudinary.com/dnu4lxiie/image/upload/v1769085310/f799ec229daf1f39f632654ecd47f5e812036b17_whvpfg.jpg'}
        title="Media/Blogs"
        subtitle="News and Resources from the frontiers of real estate."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Media/Blogs' }
        ]}
        overlayOpacity={0.6}
      />

      {/* Instagram Feed Section */}
  <div> 
      <InstagramFeedSection />
  </div>

  {/* News and Blog Section */}
  <div className='py-10'>
    {/* Heading */}
 <div className='space-y-2'>
 <div className='flex justify-center items-center gap-2.5'>
        <div className="pt-px w-15 lg:w-60 bg-linear-to-r from-secondary to-primary">
            <div className="bg-[#FAFAFA] pt-1 "/> 
        </div>
              <h1 className='border rounded-full border-primary px-4 py-2'>Blogs</h1>
               <div className="pt-px w-15 lg:w-60 bg-linear-to-r from-primary to-secondary">
            <div className="bg-[#FAFAFA] pt-1 "/>
    </div>
    </div>
    <div className="text-center space-y-2">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Latest Posts</h2>
        <p className="text-gray-600 text-base">Celebrate a legacy of excellence and recognition</p>
      </div>
 </div>

      <BlogGridSection />
      <NewsGridSection />
  </div>
    </div>
  )
}

export default Media