"use client";

import React, { useCallback, useMemo } from "react";
import ImageGallery from "@/components/pages/products/ImageGallery";
import { Button, Card, CardBody } from "@nextui-org/react";
import { CiStar } from "react-icons/ci";
import { FiTruck } from "react-icons/fi";
import useCartStore from "@/store/cart";
import { ProductType } from "@/types/SanityTypes";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { FaCheckCircle, FaShoppingCart } from "react-icons/fa";

type ProductProps = {
  product: ProductType;
};

const Product = ({ product }: ProductProps) => {
  const router = useRouter();
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const { addToCart, updateItemColor, updateItemSize } = useCartStore(
    (state) => ({
      addToCart: state.addToCart,
      updateItemColor: state.updateItemColor,
      updateItemSize: state.updateItemSize,
    })
  );

  const cartItem = useMemo(
    () => cartItems && cartItems.find((item) => item.id === product.id),
    [cartItems, product.id]
  );

  const isDisabled = !product.inStock;

  const handleUpdate = useCallback(
    (type: "color" | "size", value: string) => {
      if (isDisabled) return;
      if (cartItem) {
        if (type === "color") {
          updateItemColor(product.id, value);
        } else if (type === "size") {
          updateItemSize(product.id, value);
        }
      } else {
        addToCart(product);
        if (type === "color") {
          updateItemColor(product.id, value);
        } else if (type === "size") {
          updateItemSize(product.id, value);
        }
      }
    },
    [
      addToCart,
      updateItemColor,
      updateItemSize,
      cartItem,
      product.id,
      isDisabled,
    ]
  );

  if (!product)
    return (
      <div className="flex  items-center justify-center min-h-screen">
        <div className="flex flex-col gap-6 items-center">
          <div className="text-5xl text-gray-600 font-bold">
            No product found
          </div>
          <Button
            onClick={() => router.push("/")}
            color="primary"
            radius="none"
            size="lg"
            className="w-[200px]"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );

  const handleCheckOut = () => {
    addToCart(product);
    router.push("/checkouts/information");
  };

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
        </div>

        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-gray-700 text-xl">Size</div>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <Card
                  isPressable
                  radius="none"
                  className="w-12"
                  key={size}
                  isDisabled={isDisabled}
                  onClick={() => handleUpdate("size", size)}
                >
                  <CardBody
                    className={`text-center ${
                      cartItem && cartItem.size === size
                        ? "bg-gray-500 text-white"
                        : ""
                    }`}
                  >
                    {size}
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold text-gray-700 text-xl">Colors</div>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <Card
                  isPressable
                  radius="none"
                  className="w-fit"
                  key={color}
                  isDisabled={isDisabled}
                  onClick={() => handleUpdate("color", color)}
                >
                  <CardBody
                    className={`text-center capitalize ${
                      cartItem && cartItem.color === color
                        ? "bg-gray-500 text-white"
                        : ""
                    }`}
                  >
                    {color}
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="flex sm:w-1/2 w-full flex-col gap-2.5">
          <Button
            radius="none"
            color={`${isDisabled ? "default" : "primary"}`}
            startContent={<FaShoppingCart />}
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
            startContent={<FaCheckCircle />}
            className={`rounded-md ${isDisabled ? "bg-gray-500 text-white" : "bg-black text-white"}`}
            // color={`${isDisabled ? "default" : "secondary"}`}

            isDisabled={isDisabled}
            onClick={handleCheckOut}
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
