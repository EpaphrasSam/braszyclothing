"use client";

import React from "react";
import ImageGallery from "@/components/pages/products/ImageGallery";
import { Button } from "@nextui-org/react";
import { CiStar } from "react-icons/ci";
import { FiTruck } from "react-icons/fi";
import useCartStore from "@/store/cart";
import { ProductType } from "@/types/SanityTypes";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const isDisabled = !product.inStock;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ImageGallery images={product.imageUrls} inStock={product.inStock} />
      <div>
        <div className="mb-2 md:mb-3">
          <span className="mb-0.5 inline-block text-gray-500">
            {product.categoryName} ({product.apparel})
          </span>

          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
            {product.name}
          </h2>
        </div>

        <div className="mb-4">
          <div className="flex gap-2 items-end">
            <span className="text-xl font-bold text-gray-800 md:text-2xl">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="mb-0.5 text-gray-500 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>
          {/* <span className="text-sm text-gray-500">Incl. Vat plus shipping</span> */}
        </div>
        {/* <div className="mb-6 flex items-center gap-2 text-gray-500">
          <FiTruck size={20} />
          <span className="text-sm">2-4 days</span>
        </div> */}
        <div className="flex sm:w-1/2 w-full flex-col gap-2.5">
          <Button
            radius="none"
            color={`${isDisabled ? "default" : "primary"}`}
            className="rounded-md"
            size="lg"
            onClick={() => addToCart(product)}
            isDisabled={isDisabled}
          >
            Add To Cart
          </Button>
          <Button
            radius="none"
            size="lg"
            className="rounded-md"
            color={`${isDisabled ? "default" : "secondary"}`}
            isDisabled={isDisabled}
          >
            Checkout Now
          </Button>
        </div>
        <div className="mt-8 text-base text-gray-500 tracking-wide">
          <p className="text-sm font-semibold text-gray-400">Description</p>
          <p className="mt-2 text-base text-gray-700 tracking-wide">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
