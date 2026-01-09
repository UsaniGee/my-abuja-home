'use client'

import { usePathname } from 'next/navigation'
import Nav from './components/landing/nav'
import Footer from './components/landing/footer'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <>
      {!isHomePage && (
        <div className="fixed z-50 w-full flex justify-center items-center">
          <Nav />
        </div>
      )}
      
      <div>{children}</div>
      
      {!isHomePage && <Footer />}
    </>
  )
}

