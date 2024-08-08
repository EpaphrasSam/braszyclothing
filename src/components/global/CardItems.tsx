"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardFooter,
  Button,
  Chip,
  CardBody,
  Image,
} from "@nextui-org/react";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cart";
import { HiArrowsPointingOut } from "react-icons/hi2";
import { ProductType } from "@/types/SanityTypes";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomLeftArrow, CustomRightArrow } from "./CustomArrows";
import { motion, wrap } from "framer-motion";
import { GoDotFill, GoDot } from "react-icons/go";

interface CardItemsProps {
  product: ProductType;
  hide?: boolean;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomDot = ({ onClick, ...rest }: any) => {
  const { onMove, index, active } = rest;
  return (
    <button
      className={`custom-dot ${active ? "active" : ""}`}
      onClick={() => onClick()}
    >
      <GoDotFill size={14} color={active ? "blue" : "gray"} />
    </button>
  );
};

const CardItems = ({ product, hide = false }: CardItemsProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 1]);
  const addToCart = useCartStore((state) => state.addToCart);
  const displayPrice = useCartStore((state) => state.displayPrice);
  const currency = useCartStore((state) => state.currency);
  const exchangeRates = useCartStore((state) => state.exchangeRates);
  const isDisabled = !product.inStock;

  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, [currency, exchangeRates]);

  const mediaIndex = useMemo(
    () => wrap(0, product.mediaUrls.length, currentSlide),
    [currentSlide, product.mediaUrls.length]
  );

  const handleVideoEnded = useCallback(() => {
    setCurrentSlide([currentSlide + 1, direction]);
  }, [currentSlide, direction]);

  return (
    <div className="flex flex-row w-full justify-center gap-4 flex-wrap">
      <Card
        radius="none"
        isFooterBlurred
        className="w-[250px] h-[300px] m-2 transition ease-in-out delay-150 duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardBody className="relative p-0 overflow-hidden ">
          <Carousel
            responsive={responsive}
            ssr={true}
            customLeftArrow={<CustomLeftArrow isInnerArrow={true} />}
            customRightArrow={<CustomRightArrow isInnerArrow={true} />}
            showDots={true}
            customDot={<CustomDot />}
            swipeable
            transitionDuration={500}
            afterChange={(previousSlide, { currentSlide }) =>
              setCurrentSlide([currentSlide, direction])
            }
          >
            {product.mediaUrls.map((media, index) =>
              media.type === "video" ? (
                <motion.video
                  key={`video-${index}`}
                  className="w-full h-[231px] object-cover object-center"
                  src={media.url}
                  autoPlay
                  muted
                  playsInline
                  loop
                />
              ) : (
                <motion.img
                  key={`slide-${index}`}
                  className="w-full h-[231px] object-fit object-center"
                  src={media.url}
                  alt={`Product Image ${index + 1}`}
                />
              )
            )}
          </Carousel>
          <Chip size="sm" className="absolute top-2 right-2 text-sm font-bold">
            {mediaIndex + 1}/{product.mediaUrls.length}
          </Chip>
          {isHovered && (
            <motion.div
              className="flex justify-center items-center absolute bottom-0 left-0 right-0 mt-auto mb-4"
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
        <CardFooter className="flex mb-1 flex-col sm:px-4 px-2 bg-white bottom-0 border-t-1 border-gray-300 ">
          <div
            className={`flex justify-between items-center w-full ${hide ? "max-[500px]:flex-col" : ""}`}
          >
            <p className="text-black text-sm font-semibold line-clamp-1">
              {product.name}
            </p>
            <p className="text-black text-sm font-semibold pl-3">
              {displayPrice(product.price)}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p
              className={`text-gray-800 text-sm ${hide ? "max-sm:hidden" : ""} font-semibold`}
            >
              {product.categoryName}
            </p>
            <p
              className={`text-gray-800 text-sm ${hide && "text-center max-sm:w-full"}   font-semibold`}
            >
              {product.apparel}
            </p>
          </div>
        </CardFooter>
        {!product.inStock && (
          <span
            className={`absolute top-2 left-2 bg-black px-2 py-1  bg-opacity-50 text-sm uppercase tracking-wider text-white rounded-md -rotate-12`}
          >
            Sold Out
          </span>
        )}
      </Card>
    </div>
  );
};

export default CardItems;
