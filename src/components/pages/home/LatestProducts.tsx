"use client";

import CardItems from "@/components/global/CardItems";
import { ProductCardType } from "@/types/ProductCardType";
import { Divider } from "@nextui-org/react";
import React from "react";
import Carousel from "react-multi-carousel";

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
  products: ProductCardType[];
}

const LatestProducts = ({ products }: ProductCardProps) => {
  return (
    <div>
      <Divider className="my-4" />
      <h2 className="text-3xl font-semibold mb-4 capitalize">
        Latest collection
      </h2>
      <Carousel
        responsive={responsive}
        ssr={true}
        autoPlay
        autoPlaySpeed={3000}
        infinite
      >
        {products.map((product) => (
          <CardItems key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default LatestProducts;