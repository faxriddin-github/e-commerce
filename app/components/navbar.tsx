'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FiShoppingBag, FiX, FiMenu } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      // Change height when scroll position is greater than 50px (adjust as needed)
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg shadow-sm ${isScrolled ? 'shadow-lg' : ''} `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between duration-200 ${isScrolled ? 'h-15 md:h-16' : 'h-16 md:h-20'} `}>
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/next.svg"
              alt="Company Logo"
              width={90}
              height={30}
              className="h-6 w-30 transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/"
              className={`text-gray-700 hover:text-indigo-600 px-4 py-2 text-lg font-medium relative transition-colors duration-300 group
                 ${pathname === '/' ? 'text-indigo-600' : ''}`}
              
            >
              Home
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-3/4 
                ${pathname === '/' ? 'w-3/4' : ''}`}></span>
            </Link>
            <Link 
              href="/products"
              className={`text-gray-700 hover:text-indigo-600 px-4 py-2 text-lg font-medium relative transition-colors duration-300 group 
                ${pathname === '/products' ? 'text-indigo-600' : ''}`}
            >
              Products
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-3/4 
                ${pathname === '/products' ? 'w-3/4' : ''}`}></span>
            </Link>
            <Link 
              href="/contact"
              className={`text-gray-700 hover:text-indigo-600 px-4 py-2 text-lg font-medium relative transition-colors duration-300 group
                ${pathname === '/contact' ? 'text-indigo-600' : ''}`}
            >
              Contact
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-3/4 
                ${pathname === '/contact' ? 'w-3/4' : ''}`}></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link href="/cart" className="relative">
              <button className="flex items-center space-x-2 px-5 py-2.5 rounded-lg text-base font-medium text-indigo-600 hover:bg-indigo-50 transition-colors duration-300">
                <FiShoppingBag className="h-5 w-5" />
                <span>My Bag</span>
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none  focus:ring-indigo-500 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden absolute w-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-4 bg-white shadow-lg border-t border-gray-100">
          <nav className="space-y-2">
            <Link 
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
            >
              Home
            </Link>
            <Link 
              href="/products"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
            >
              Products
            </Link>
            <Link 
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
            >
              Contact
            </Link>
            <Link 
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 mt-2 rounded-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 text-center"
            >
              <FiShoppingBag className="h-5  w-5" />
              <span>My Bag</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar