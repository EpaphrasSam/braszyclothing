"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, wrap } from "framer-motion";
import { BannerTypes } from "@/types/SanityTypes";

interface BannerProps {
  banners: BannerTypes[];
}

const Banner = ({ banners }: BannerProps) => {
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);

  const imageIndex = useMemo(
    () => wrap(0, banners.length, currentSlide),
    [currentSlide, banners.length]
  );

  const paginate = useCallback(
    (newDirection: number) => {
      setCurrentSlide([currentSlide + newDirection, newDirection]);
    },
    [currentSlide]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 10000);

    return () => clearInterval(interval);
  }, [paginate]);
  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.img
        className="w-full h-full object-cover absolute"
        key={currentSlide}
        src={banners[imageIndex].image}
        custom={direction}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 300 },
          opacity: { duration: 1.5 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-center text-white text-4xl font-bold"
        >
          {banners[imageIndex].message}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Banner;
