"use client";

import CardItems from "@/components/global/CardItems";
import { ProductCardType } from "@/types/ProductCardType";
import { Divider } from "@nextui-org/react";
import React from "react";
import Carousel from "react-multi-carousel";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 648 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 648, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

interface ProductCardProps {
  products: ProductCardType[];
  category: "women's" | "men's";
}

const ProductCard = ({ products, category }: ProductCardProps) => {
  return (
    <div>
      <Divider className="my-4" />
      <h2 className="text-3xl font-semibold mb-4 capitalize">
        {category} Collection
      </h2>
      <Carousel responsive={responsive} ssr={true}>
        {products.map((product) => (
          <CardItems key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCard;
