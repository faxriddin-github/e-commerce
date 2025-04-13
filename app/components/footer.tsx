'use client'
import React, { useState, FormEvent } from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa'
import Link from 'next/link'

const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Bulten uchun formani yuborish funksiyasi
  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    console.log('Subscribed email:', email)
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 text-gray-700 py-12 mt-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Biz haqimizda</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Biz mijozlarimizga eng yaxshi mahsulotlar va xizmatlarni taqdim etishga intilamiz. Sifat va ishonchlilik – bizning ustuvorligimiz.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigatsiya</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_2px_rgba(96,165,250,0.5)]"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
                >
                  All Products
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_2px_rgba(96,165,250,0.5)]"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_2px_rgba(96,165,250,0.5)]"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aloqa</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                <a
                  href="mailto:info@company.com"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-300"
                >
                  info@company.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                <a
                  href="tel:+998901234567"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-all duration-300"
                >
                  +998 90 123 45 67
                </a>
              </li>
            </ul>
            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Bizni kuzating</h4>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                >
                  <FaFacebook className="text-xl" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_10px_rgba(96,165,250,0.5)]"
                >
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yangiliklarga obuna bo‘ling</h3>
            {isSubscribed ? (
              <p className="text-sm text-blue-400 animate-fade-in">
                Obuna bo‘ldingiz! Tez orada yangiliklarimizni olasiz.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email manzilingiz"
                  className="p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-400 to-pink-400 rounded-lg hover:from-blue-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(96,165,250,0.3)] hover:shadow-[0_0_25px_rgba(96,165,250,0.5)]"
                >
                  Obuna bo‘lish
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Barcha huquqlar himoyalangan.{' '}
            <Link
              href="/terms"
              className="text-gray-500 hover:text-gray-900 transition-all duration-300"
            >
              Xizmat shartlari
            </Link>{' '}
            |{' '}
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-gray-900 transition-all duration-300"
            >
              Maxfiylik siyosati
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer