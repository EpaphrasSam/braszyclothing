"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardFooter, Button } from "@nextui-org/react";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { ProductCardType } from "@/types/ProductCardType";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import useCartStore, { CartState } from "@/store/cart";

interface CardItemsProps {
  product: ProductCardType;
}

const CardItems = ({ product }: CardItemsProps) => {
  const router = useRouter();
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const imageIndex = useMemo(
    () => wrap(0, product.imageUrls.length, currentSlide),
    [currentSlide, product.imageUrls.length]
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

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card
      isFooterBlurred
      className="relative w-[250px] h-[400px] m-2 transition ease-in-out delay-150 duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <motion.img
          className="w-full h-full object-cover absolute"
          key={currentSlide}
          src={product.imageUrls[imageIndex]}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 300 },
            opacity: { duration: 1.5 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
        />
        {isHovered && (
          <motion.div
            className="flex justify-evenly -translate-x-1/2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="sm"
              className="mr-2"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              See Details
            </Button>
            <Button
              size="sm"
              className="ml-2"
              color="primary"
              startContent={<CiShoppingCart size={20} />}
              onClick={() => {
                addToCart(product);
              }}
            >
              Add to Cart
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <CardFooter className="flex absolute px-4 bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div className="flex justify-between w-full">
          <p className="text-black text-sm truncate">{product.name}</p>
          <p className="text-black text-sm">{product.price}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardItems;
