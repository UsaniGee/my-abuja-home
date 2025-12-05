import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/landing/nav";
import Footer from "./components/landing/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyAbujaHome - Find Your Dream Home in Abuja",
  description: "Discover the best properties in Abuja with MyAbujaHome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className='fixed z-99 w-full flex justify-center items-center'>
        <Nav />
        </div>
        <div >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
