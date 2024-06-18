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
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="order-first lg:w-[150px] lg:order-none mx-2 lg:h-[500px] h-auto flex lg:flex-col flex-row gap-4 lg:overflow-y-auto lg:overflow-x-hidden overflow-x-auto">
        <div className="flex lg:flex-col flex-row gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-[100px] h-[100px] lg:w-[100px] rounded-none bg-gray-100"
            >
              <motion.img
                src={image}
                className="w-full h-full object-cover  cursor-pointer"
                whileHover={{ scale: 1.1 }}
                alt="photo"
                onClick={() => handleSmallImageClick(image)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-full  h-[500px]">
        <AnimatePresence custom={bigImage} mode="wait" initial={false}>
          <motion.img
            key={bigImage}
            src={bigImage}
            className="w-full h-full rounded-none object-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>
        <span
          className={`absolute top-4 left-4 bg-black bg-opacity-50 px-2 py-1 text-sm uppercase tracking-wider text-white rounded-md`}
        >
          {inStock ? "In Stock" : "Sold Out"}
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;
