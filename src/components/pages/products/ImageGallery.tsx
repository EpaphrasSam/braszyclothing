"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ImageGalleryProps = {
  images: string[];
  inStock: boolean;
};

const ImageGallery = ({ images, inStock }: ImageGalleryProps) => {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: string) => {
    setBigImage(image);
  };
  return (
    <div className="lg:grid lg:gap-4 lg:grid-cols-5">
      <div className="order-first lg:order-none flex max-lg:mb-4 lg:flex-col flex-row gap-4 overflow-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden w-1/5 lg:w-full rounded-lg bg-gray-100"
          >
            <motion.img
              src={image}
              className="w-full h-full object-cover object-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              alt="photo"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>
      <div className="relative h-96 lg:col-span-4 lg:h-[500px]">
        <AnimatePresence initial={false}>
          <motion.img
            key={bigImage}
            src={bigImage}
            className="w-full h-full absolute rounded-lg object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
        <span
          className={`absolute top-0 left-0 rounded-br-lg rounded-tl-lg ${inStock ? "bg-green-500" : "bg-red-500"} px-3 py-1.5 text-sm uppercase tracking-wider text-white`}
        >
          {inStock ? "In Stock" : "Sold Out"}
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;
