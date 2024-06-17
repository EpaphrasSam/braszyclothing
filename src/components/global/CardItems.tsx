"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Card, CardFooter, Button, Chip, CardBody } from "@nextui-org/react";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cart";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { ProductType } from "@/types/SanityTypes";
import Image from "next/image";

interface CardItemsProps {
  product: ProductType;
  hide?: boolean;
}

const CardItems = ({ product, hide = false }: CardItemsProps) => {
  const router = useRouter();
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 1]);
  const [isHovered, setIsHovered] = useState(false);

  const imageIndex = useMemo(
    () => wrap(0, product.imageUrls.length, currentSlide),
    [currentSlide, product.imageUrls.length]
  );

  const paginate = useCallback(
    (newDirection: number) => {
      const newIndex = currentSlide + newDirection;
      if (newIndex >= 0 && newIndex < product.imageUrls.length) {
        setCurrentSlide([newIndex, newDirection]);
      }
    },
    [currentSlide, product.imageUrls.length]
  );

  const addToCart = useCartStore((state) => state.addToCart);
  const isDisabled = !product.inStock;

  return (
    <div className="flex flex-row w-full justify-center gap-4 flex-wrap">
      <Card
        radius="none"
        isFooterBlurred
        className="w-[250px] h-[300px] m-2 transition ease-in-out delay-150 duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardBody className="relative p-0 overflow-hidden">
          <AnimatePresence custom={direction} initial={false}>
            {product.imageUrls.map((url, index) =>
              index === imageIndex ? (
                <motion.img
                  className="w-full h-full object-cover absolute"
                  key={`slide-${index}`}
                  src={url}
                  custom={direction}
                  initial={{ x: 0 }}
                  animate={{ x: "0%" }}
                  exit={{ x: direction > 0 ? "-100%" : "100%" }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    duration: 0.5,
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -1000) {
                      paginate(1);
                    } else if (swipe > 1000) {
                      paginate(-1);
                    }
                  }}
                />
              ) : null
            )}
          </AnimatePresence>

          {product.imageUrls.length > 1 && imageIndex > 0 && (
            <div className="absolute top-16 left-1">
              <MdArrowBackIosNew
                size={18}
                onClick={() => paginate(-1)}
                className="cursor-pointer text-gray-700 transition ease-in-out duration-300 hover:opacity-50"
              />
            </div>
          )}

          {product.imageUrls.length > 1 &&
            imageIndex < product.imageUrls.length - 1 && (
              <div className="absolute top-16 right-1">
                <MdArrowForwardIos
                  size={18}
                  onClick={() => paginate(1)}
                  className="cursor-pointer text-gray-700 transition ease-in-out duration-300 hover:opacity-50"
                />
              </div>
            )}

          <Chip size="sm" className="absolute top-2 right-2 text-sm font-bold">
            {imageIndex + 1}/{product.imageUrls.length}
          </Chip>

          {isHovered && (
            <motion.div
              className="flex justify-center items-center mt-auto mb-4"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                size="sm"
                radius="full"
                className="mr-2 bg-blue-950 text-white"
                startContent={<HiArrowsPointingOut size={20} color="white" />}
                onClick={() => router.push(`/products/${product.slug}`)}
              >
                <span className="max-sm:hidden">View Item</span>
              </Button>
              {!isDisabled && (
                <Button
                  size="sm"
                  radius="full"
                  className="ml-2"
                  color="primary"
                  startContent={<CiShoppingCart size={20} />}
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  <span className="max-sm:hidden">Add to Cart</span>
                </Button>
              )}
            </motion.div>
          )}
        </CardBody>

        <CardFooter className="flex max-sm:py-1 flex-col px-4 bg-white bottom-0 border-t-1 border-gray-300 ">
          <div
            className={`flex justify-between items-center w-full ${hide ? "max-[500px]:flex-col" : ""}`}
          >
            <p className="text-black text-sm font-semibold line-clamp-1">
              {product.name}
            </p>
            <p className="text-black text-sm font-semibold">${product.price}</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p
              className={`text-gray-800 text-sm ${hide ? "max-sm:hidden" : ""} font-semibold`}
            >
              {product.categoryName}
            </p>
            <p className="text-gray-800 text-sm text-center max-sm:w-full font-semibold">
              {product.apparel}
            </p>
          </div>
        </CardFooter>
        <span
          className={`absolute top-0 left-0 rounded-br-lg rounded-tl-none ${product.inStock ? "bg-green-500" : "bg-red-500"} px-3 py-1.5 text-sm uppercase tracking-wider text-white`}
        >
          {product.inStock ? "In Stock" : "Sold Out"}
        </span>
      </Card>
    </div>
  );
};

export default CardItems;
