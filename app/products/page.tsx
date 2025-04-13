'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageOpt from '../components/image';
import { ProductType } from '../interface';

export default function AllProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20); // Show 20 at start

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.in/api/products', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        const productData = await res.json();
        const data = productData.products as ProductType[];
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-md">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-md p-5 max-w-xs w-full shadow-md text-center">
          <svg className="w-8 h-8 text-red-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-base font-semibold text-gray-800 mb-2">No Products Found</h3>
          <p className="text-gray-600 text-xs mb-3">The product you’re looking for doesn’t exist.</p>
          <Link href="/products" className="inline-block px-4 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-xs font-medium">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Our All Products</h1>
            <div className="h-1 w-16 bg-indigo-600 rounded mt-1" />
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">Check out our latest collection from FakeStore API.</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 py-2 sm:py-4">
          {products.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md group"
            >
              {/* Image */}
              <div className="relative h-28 mt-4 sm:h-40 bg-white overflow-hidden">
                <ImageOpt product={product} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-2 sm:p-4 space-y-1 sm:space-y-2">
                <span className="text-[10px] sm:text-xs text-indigo-600 uppercase tracking-wide block">
                  {product.category}
                </span>
                <h2 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-300">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-[10px] sm:text-xs line-clamp-2 sm:line-clamp-3 min-h-[2rem] sm:min-h-[2.5rem]">
                  {product.description}
                </p>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-bold text-gray-900">${product.price}</span>
                  <Link href={`/products/${product.id}`}>
                    <button className="px-3 py-2 sm:px-4 sm:py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-[10px] sm:text-sm font-medium">
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < products.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 20)}
              className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
