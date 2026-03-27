import InnerPageHero from '../components/inner-pages/inner-page-hero'
import InstagramFeedSection from './components/InstagramFeedSection'
import BlogGridSection from './components/BlogGridSection'

export const dynamic = 'force-dynamic'

const Media = () => {
  return (
    <div className="bg-white min-h-screen">
      <InnerPageHero
        backgroundImage={'https://res.cloudinary.com/dnu4lxiie/image/upload/v1769085310/f799ec229daf1f39f632654ecd47f5e812036b17_whvpfg.jpg'}
        title="Media/Blogs"
        subtitle="News and Resources from the frontiers of real estate."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Media/Blogs' }]}
        overlayOpacity={0.6}
      />

      <div className="px-5 py-10 lg:py-[60px] lg:px-14 space-y-6">
        <InstagramFeedSection />

        <hr className="border-gray-100" />
        <BlogGridSection />
      </div>
    </div>
  )
}

export default Media