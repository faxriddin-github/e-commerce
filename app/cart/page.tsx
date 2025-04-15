"use client";

import React, { useEffect, useState } from "react";
import { ProductType } from "../interface";
import ImageOpt from "../components/image";
import Link from "next/link";

const Cart = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  // localStorage dan cartni olish
  useEffect(() => {
    const stored = localStorage.getItem("carts");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []); // faqat bir marta sahifa yuklanishi bilan bajariladi

  // Cartni localStorage ga saqlash
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("carts", JSON.stringify(products));
    }
  }, [products]); // state yangilanganida localStoragega yoziladi

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedProducts = products.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(quantity, 1) };
      }
      return item;
    });
    setProducts(updatedProducts); // State yangilanadi, localStorage ham yangilanadi
  };

  const handleRemove = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts); // Mahsulot o'chirilganda, localStorage yangilanadi
    localStorage.setItem("carts", JSON.stringify(updatedProducts));
  };

  const calculateSubtotal = () => {
    return products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const shipping = 4.99;

  const calculateTotal = () => {
    return calculateSubtotal() + shipping;
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Your Shopping Cart
              </h1>
              <p className="mt-3 text-lg text-gray-500">
                {products.length} item{products.length !== 1 ? "s" : ""} in your
                cart
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex flex-col sm:flex-row p-6">
                        <div className="flex-shrink-0 w-full sm:w-40 h-40 rounded-md overflow-hidden">
                          <ImageOpt product={product} />
                        </div>

                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full uppercase tracking-wider">
                                  {product.category}
                                </span>
                                <h3 className="mt-2 text-lg font-medium text-gray-900 line-clamp-2">
                                  {product.title}
                                </h3>
                              </div>
                              <button
                                onClick={() => handleRemove(product.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>

                            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                              {product.description}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    product.quantity - 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm font-medium">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    product.quantity + 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 transition-colors"
                              >
                                +
                              </button>
                            </div>

                            <div className="flex items-center">
                              <div className="flex items-center mr-4">
                                <span className="ml-1 text-sm text-gray-600">
                                  {product.brand}
                                </span>
                              </div>
                              <span className="text-lg font-semibold text-gray-900">
                                {(
                                  product.price * product.quantity
                                ).toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="bg-white shadow-sm rounded-lg p-6 sticky top-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        {calculateSubtotal().toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="text-base font-medium text-gray-900">
                        Total
                      </span>
                      <span className="text-base font-bold text-gray-900">
                        {calculateTotal().toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    </div>

                    <div className="text-sm text-gray-500 mt-1">
                      Including VAT
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Proceed to Checkout
                  </button>

                  <div className="mt-6 text-center">
                    <Link
                      href="/products"
                      className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Your cart is empty
              </h2>
              <p className="mt-2 text-gray-600">
                Looks like you haven`t added any items to your cart yet.
              </p>
              <div className="mt-6">
                <Link
                  href="/products"
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
