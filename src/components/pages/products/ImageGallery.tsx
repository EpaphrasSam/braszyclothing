"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoDotFill } from "react-icons/go";
import {
  CustomLeftArrow,
  CustomRightArrow,
} from "@/components/global/CustomArrows";

type ImageGalleryProps = {
  images: string[];
  inStock: boolean;
};

const CustomDot = ({
  onClick,
  active,
}: {
  onClick: () => void;
  active: boolean;
}) => (
  <button className={`custom-dot ${active ? "active" : ""}`} onClick={onClick}>
    <GoDotFill size={14} color={active ? "blue" : "gray"} />
  </button>
);

const ImageGallery = ({ images, inStock }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
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
                className="w-full h-full border-2 border-solid object-cover cursor-pointer"
                whileHover={{ scale: 1.1 }}
                alt="photo"
                onClick={() => handleDotClick(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative w-full h-[500px]">
        <AnimatePresence custom={currentIndex} mode="wait" initial={false}>
          <motion.img
            key={images[currentIndex]}
            src={images[currentIndex]}
            className="w-full h-full border-2 border-solid rounded-none object-fit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </AnimatePresence>

        {currentIndex > 0 && (
          <CustomLeftArrow onClick={handlePrev} isInnerArrow={true} />
        )}
        {currentIndex < images.length - 1 && (
          <CustomRightArrow onClick={handleNext} isInnerArrow={true} />
        )}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <CustomDot
              key={index}
              onClick={() => handleDotClick(index)}
              active={index === currentIndex}
            />
          ))}
        </div>

        {!inStock && (
          <span
            className={`absolute top-4 left-4 bg-black bg-opacity-50 px-2 py-1 text-sm uppercase tracking-wider text-white rounded-md`}
          >
            Sold Out
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
