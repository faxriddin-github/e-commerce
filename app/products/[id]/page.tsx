'use client';
import { ProductType } from '@/app/interface';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const handleClick = () => {
    if (!product) return; // Agar mahsulot mavjud bo'lmasa, hech narsa qilmasin

    try {
      // LocalStorage'dan cartni olish
      const products: ProductType[] = JSON.parse(localStorage.getItem("carts") || "[]");

      // Mahsulotni cartga qo'shish yoki miqdorini oshirish
      const existingProductIndex = products.findIndex(p => p.id === product.id);

      if (existingProductIndex !== -1) {
        // Agar mahsulot allaqachon bor bo'lsa, miqdorini oshirish
        products[existingProductIndex].quantity += 1;
      } else {
        // Yangi mahsulotni qo'shish
        const newProduct = { ...product, quantity: 1 };
        products.push(newProduct);
      }

      // Mahsulotni LocalStorage'ga qayta saqlash
      localStorage.setItem('carts', JSON.stringify(products));
      toast('Mahsulot savatga qo\'shildi');
    } catch (error) {
      console.error("Savatga mahsulot qo'shishda xato:", error);
      toast('Mahsulotni savatga qo\'shishda xato yuz berdi');
    }
  };

  useEffect(() => {
    async function getData() {
      if (!id) return;

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://fakestoreapi.in/api/products/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error('Mahsulotni olishda xato');
        const data = await res.json();
        const productData = data.product as ProductType;
        setProduct(productData);
      } catch (error) {
        console.error('Mahsulotni olishda xato:', error);
        setError('Mahsulotni yuklab olishda xato');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-lg shadow-md">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 text-base font-medium">Mahsulot ma`lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Mahsulot topilmadi</h3>
          <p className="text-gray-600 mb-4">{error || 'Siz qidirayotgan mahsulot mavjud emas.'}</p>
          <Link
            href="/products"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Do`konga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-15 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mahsulot rasmiga ko'rsatish */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="relative h-[400px]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Mahsulot tafsilotlari */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.title}</h1>
              <p className="text-gray-500 text-xs mt-1">SKU: {id}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-gray-900">${product.price}</span>
              {product.brand && (
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-md">
                  <span className="text-sm font-medium text-gray-700">
                    {product.brand} ({product.model})
                  </span>
                </div>
              )}
            </div>

            <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>

            <div className="flex justify-between gap-3">
              <div className="text-gray-600 space-y-1 text-sm">
                <p>
                  <span className="font-medium">Kategoriya:</span> {product.category}
                </p>
                <p>
                  <span className="font-medium">Mavjudlik:</span> Omborda bor
                </p>
              </div>
              <button onClick={handleClick} className="flex bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium">
                Savatga qo`shish
              </button>
            </div>
          </div>
        </div>

        {/* Mahsulotlar ro'yxatiga qaytish */}
        <div className="mt-6">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Mahsulotlar ro`yxatiga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
