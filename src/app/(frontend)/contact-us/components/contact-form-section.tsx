'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'

const ContactFormSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#A10D44]"></div>
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in touch</h2>
            <p className="text-gray-600 text-lg">Our friendly team would love to hear from you.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="first_name" className="text-sm font-medium text-gray-700">First name</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="First name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A10D44] focus:ring-1 focus:ring-[#A10D44] outline-none transition-all placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="last_name" className="text-sm font-medium text-gray-700">Last name</label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A10D44] focus:ring-1 focus:ring-[#A10D44] outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A10D44] focus:ring-1 focus:ring-[#A10D44] outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone number</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 flex items-center gap-1 text-gray-700 border-r border-gray-200 pr-2 mr-2">
                  <span>NG</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+234 (815) 000-0000"
                  className="w-full pl-20 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#A10D44] focus:ring-1 focus:ring-[#A10D44] outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A10D44] focus:ring-1 focus:ring-[#A10D44] outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="privacy"
                className="w-4 h-4 rounded border-gray-300 text-[#A10D44] focus:ring-[#A10D44]"
              />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                You agree to our friendly <a href="#" className="underline hover:text-[#A10D44]">privacy policy</a>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#A10D44] text-white font-semibold rounded-2xl hover:bg-[#8e0b3c] transition-colors shadow-lg shadow-[#A10D44]/20"
            >
              Send a message
            </button>
          </form>
        </div>

        {/* Right Column: Map */}
        <div className="w-full lg:w-1/2 min-h-[500px] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15762.668582236528!2d7.068340763292415!3d9.002700685386047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e7672da5f9175%3A0xe54e2e21e149ef37!2sGwagwalada%2C%20Federal%20Capital%20Territory!5e0!3m2!1sen!2sng!4v1715379984100!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

export default ContactFormSection
