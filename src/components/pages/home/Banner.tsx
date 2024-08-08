"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, wrap } from "framer-motion";
import { BannerTypes } from "@/types/SanityTypes";

interface BannerProps {
  banners: BannerTypes[];
}

const Banner = ({ banners }: BannerProps) => {
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);

  const mediaIndex = useMemo(
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
    if (banners[mediaIndex].mediaType !== "video") {
      const interval = setInterval(() => {
        paginate(1);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [paginate, mediaIndex, banners]);

  const handleVideoEnded = useCallback(() => {
    paginate(1);
  }, [paginate]);

  if (banners.length === 0) {
    return (
      <div className="bg-gray-400 min-h-screen flex justify-center items-center text-4xl">
        No banners available
      </div>
    );
  }

  return (
    <AnimatePresence initial={false} custom={direction}>
      {banners[mediaIndex].mediaType === "video" ? (
        <motion.video
          className="w-full h-full object-cover absolute pointer-events-none"
          key={currentSlide}
          src={banners[mediaIndex].video}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 300 },
            opacity: { duration: 1.5 },
          }}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
        />
      ) : (
        <motion.img
          className="w-full h-full object-fit absolute"
          key={currentSlide}
          src={banners[mediaIndex].image}
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
      )}
      <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-center text-white text-4xl font-bold"
        >
          {banners[mediaIndex].message}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Banner;
