'use client'
import React, { FC } from 'react'
import { ProductType } from '../interface'
import Link from 'next/link'
import ImageOpt from './image'

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 p-3 sm:p-5">
  {/* Badge and Favorites */}
  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 flex items-center gap-1 sm:gap-2">
    <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold bg-indigo-600 text-white rounded-full shadow-md">
      New
    </span>
  </div>

  {/* Image Container */}
  <div className="relative w-full aspect-square overflow-hidden">
    <ImageOpt product={product} />
    {/* Overlay effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>

  {/* Content */}
  <div className="pt-3 sm:pt-4">
    <div className="flex items-center justify-between mb-2 sm:mb-3">
      <span className="text-[10px] sm:text-xs font-semibold text-indigo-600 uppercase tracking-wider">
        {product.category}
      </span>
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-xs sm:text-sm font-medium text-gray-500 ml-1">{product.brand}</span>
      </div>
    </div>

    <h2 className="text-sm sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
      {product.title}
    </h2>

    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:mb-5 mb-3 min-h-[32px] sm:min-h-[40px]">
      {product.description}
    </p>

<div className="flex items-center justify-between">
          <div>
        <span className="text-sm sm:text-lg font-extrabold text-gray-900">${product.price}</span>
        {product.price < 80 && (
          <span className="text-[10px] sm:text-xs text-gray-400 line-through ml-1 sm:ml-2">${(product.price * 1.3).toFixed(2)}</span>
        )}
      </div>

      {/* Button */}
      <Link href={`/products/${product.id}`}>
        <button className="relative flex items-center justify-center px-5 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-300 overflow-hidden group">
          <span className="relative z-10">View</span>
          <span className="absolute inset-0 bg-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </Link>
    </div>
  </div>

  {/* Hover border effect */}
  <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/30 rounded-2xl transition-all duration-500 pointer-events-none" />
</div>

  )
}

export default Product