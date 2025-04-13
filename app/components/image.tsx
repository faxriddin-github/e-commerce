'use client'
import Image from 'next/image';
import React, { FC, useState } from 'react'
import { ProductType } from '../interface';

interface ImageType {
    product:ProductType
  }

const ImageOpt: FC<ImageType> = ({product}) => {
    const [isLoading, setLoading] = useState(true);

  
  return (
    <Image src={product.image} alt={product.title} width={721} height={401}
    className={`w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-110 
        ${isLoading ? 'blur-2xl scale-110' : 'blur-0 scale-100'}`}
        onLoadingComplete={() => setLoading(false)}
    />
     
  )
}

export default ImageOpt