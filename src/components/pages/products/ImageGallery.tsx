"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ImageGalleryProps = {
  images: string[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: string) => {
    setBigImage(image);
  };
  return (
    <div className="flex flex-col lg:grid gap-4 lg:grid-cols-5">
      <div className="order-first flex gap-4 lg:order-none lg:flex-col overflow-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden h-full rounded-lg bg-gray-100"
          >
            <motion.img
              src={image}
              className="w-full h-full object-cover object-center cursor-pointer"
              whileHover={{ scale: 1.1 }}
              width={200}
              height={200}
              alt="photo"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>
      <div className="relative h-[300px] md:h-full w-full rounded-lg bg-gray-100 lg:col-span-4">
        <AnimatePresence initial={false}>
          <motion.img
            key={bigImage}
            src={bigImage}
            width={500}
            height={500}
            className="w-full h-full absolute rounded-lg object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
        <span className="absolute top-0 left-0 rounded-tl-lg bg-green-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;
