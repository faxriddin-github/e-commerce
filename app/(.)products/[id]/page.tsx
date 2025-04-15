'use client';

import { ProductType } from '@/app/interface';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const params = useParams();
  const id = params?.id?.toString(); // id ni string ko‘rinishga keltiramiz

  useEffect(() => {
    const getData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.in/api/products/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        const productData = data.product as ProductType;
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  const handleClick = () => {
    if (!product) return;
    const products: ProductType[] = JSON.parse(localStorage.getItem('carts') || '[]');
    const existingProductIndex = products.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      products[existingProductIndex].quantity += 1;
    } else {
      const newProduct = { ...product, quantity: 1 };
      products.push(newProduct);
    }

    localStorage.setItem('carts', JSON.stringify(products));
    toast.success('Product added to cart');
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.back();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-2xl">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-sm z-50">
        <div className="bg-white rounded-xl p-8 max-w-sm w-full shadow-2xl">
          <div className="flex flex-col items-center gap-4">
            <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">Oops!</h3>
            <p className="text-gray-600 text-center">{error || 'Product not found'}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-6 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image */}
        <div className="relative h-60 md:h-72 bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain max-w-full h-full p-8 transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-6 space-y-4">
          <h2 className="text-lg md:text-2xl font-bold text-gray-800 leading-tight">{product.title}</h2>

          <div className="flex items-center justify-between">
            <span className="text-xl md:text-3xl font-extrabold text-gray-900">${product.price}</span>
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-gray-700">
                Model: {product.model}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{product.description}</p>

          <div className="flex gap-3">
            <button
              onClick={handleClick}
              className="flex-1 bg-blue-600 text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-transparent border-2 border-gray-300 text-gray-700 py-2 md:py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
            >
              View Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
