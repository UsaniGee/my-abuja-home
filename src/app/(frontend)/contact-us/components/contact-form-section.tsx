'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSuccess(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (err: any) {
      setError(err.message || 'Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="px-5 py-10 lg:py-20 lg:px-14">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#A10D44]"></div>
          
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in touch</h2>
            <p className="text-gray-600 text-lg">Our friendly team would love to hear from you.</p>
          </div>

          {success ? (
            <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold mb-2">Message sent successfully!</h3>
              <p>Thank you for reaching out. We will get back to you shortly.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
               >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-200">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A10D44] focus:ring-1 focus:ring-[#A10D44] outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 (815) 000-0000"
                    className="w-full pl-20 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#A10D44] focus:ring-1 focus:ring-[#A10D44] outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A10D44] focus:ring-1 focus:ring-[#A10D44] outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="w-4 h-4 rounded border-gray-300 text-[#A10D44] focus:ring-[#A10D44]"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  You agree to our friendly <a href="#" className="underline hover:text-[#A10D44]">privacy policy</a>.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#A10D44] text-white font-semibold rounded-2xl hover:bg-[#8e0b3c] transition-colors shadow-lg shadow-[#A10D44]/20 disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  'Send a message'
                )}
              </button>
            </form>
          )}
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
