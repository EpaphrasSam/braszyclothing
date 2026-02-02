"use client";

import CardItems from "@/components/global/CardItems";
import { ProductType } from "@/types/SanityTypes";
import { Divider } from "@heroui/react";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import SkeletonLoader from "../../global/SkeletonLoader";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import {
  CustomLeftArrow,
  CustomRightArrow,
} from "@/components/global/CustomArrows";

const responsive = {
  LargeDesktop: {
    breakpoint: { max: 3000, min: 1400 },
    items: 5,
    // slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1200 },
    items: 4,
    // slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1200, min: 848 },
    items: 3,
    // slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 930, min: 648 },
    items: 2,
    // slidesToSlide: 2,
  },
  smallMobile: {
    breakpoint: { max: 648, min: 0 },
    items: 1,
    // slidesToSlide: 1,
  },
};

interface ProductCardProps {
  products: ProductType[];
}

const LatestProducts = ({ products }: ProductCardProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products) {
      setLoading(false);
    }
  }, [products]);
  return (
    <div>
      <Divider className="my-4" />
      <h2 className="text-3xl font-semibold mb-4 capitalize">
        Latest products
      </h2>
      {loading ? (
        <SkeletonLoader />
      ) : products.length === 0 ? (
        <div className="text-center text-4xl font-semibold text-gray-500 my-20 pb-10">
          No latest products
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          ssr={true}
          autoPlay
          autoPlaySpeed={10000}
          infinite
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          swipeable
        >
          {products.map((product) => (
            <CardItems key={product.id} product={product} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default LatestProducts;
