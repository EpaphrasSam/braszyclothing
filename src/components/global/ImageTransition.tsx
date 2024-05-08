"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ImageTransition = ({ images }: { images: string[] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.img
        className="w-full h-full object-cover absolute"
        src={images[0]}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.img
        className="w-full h-full object-cover absolute"
        src={images[1]}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default ImageTransition;
