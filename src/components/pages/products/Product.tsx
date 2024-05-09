"use client";

import React from "react";
import ImageGallery from "@/components/pages/products/ImageGallery";
import { Button } from "@nextui-org/react";
import { CiStar } from "react-icons/ci";
import { FiTruck } from "react-icons/fi";
import useCartStore from "@/store/cart";

type ProductProps = {
  product: any;
};

const Product = ({ product }: ProductProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ImageGallery images={product.imageUrls} />
      <div>
        <div className="mb-2 md:mb-3">
          <span className="mb-0.5 inline-block text-gray-500">
            Men ({product.apparel})
          </span>

          <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
            {product.name}
          </h2>
        </div>
        {/* <div className="mb-6 flex items-center gap-3 md:mb-10">
          <Button
            radius="full"
            size="sm"
            className="text-sm"
            color="secondary"
            endContent={<CiStar size={20} />}
          >
            4.2
          </Button>
          <span className="text-sm text-gray-500 transition duration-100">
            56 ratings
          </span>
        </div> */}
        <div className="mb-4">
          <div className="flex gap-2 items-end">
            <span className="text-xl font-bold text-gray-800 md:text-2xl">
              $ {product.price}
            </span>
            <span className="mb-0.5 text-gray-500 line-through">
              $ {(product.price + 30).toFixed(2)}
            </span>
          </div>
          <span className="text-sm text-gray-500">Incl. Vat plus shipping</span>
        </div>
        <div className="mb-6 flex items-center gap-2 text-gray-500">
          <FiTruck size={20} />
          <span className="text-sm">2-4 days</span>
        </div>
        <div className="flex gap-2.5">
          <Button
            radius="sm"
            color="primary"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </Button>
          <Button radius="sm" color="secondary">
            Checkout Now
          </Button>
        </div>
        <p className="mt-12 text-base text-gray-500 tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe sed
          dignissimos error quisquam officiis ea ipsa quidem, blanditiis a eos
          asperiores ipsam voluptate. Sit quos, pariatur voluptatem sapiente cum
          praesentium?
        </p>
      </div>
    </div>
  );
};

export default Product;
