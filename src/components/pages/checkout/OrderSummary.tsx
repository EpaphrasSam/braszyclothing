"use client";

import useCartStore from "@/store/cart";
import { useStore } from "@/store/useStore";
import { Badge, Button, Divider, Input } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const OrderSummary = () => {
  const cartItems = useStore(useCartStore, (state) => state.cartItems);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const [isCouponVisible, setIsCouponVisible] = useState(false);

  if (!cartItems) {
    return null;
  }

  return (
    <div className="bg-white h-full flex flex-col p-4 pt-8 rounded-md shadow-md">
      <div className="text-lg font-bold">
        Order Summary ({cartItems.length})
      </div>
      <Divider className="my-4" />
      <div className="scrollbar-thin scrollbar-thumb-gray-500 my-2  overflow-y-auto flex-grow">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-4 mt-2">
            <div className="flex">
              <div className="mr-4">
                <Badge content={item.quantity} size="lg" color="primary">
                  <Image
                    src={item.imageUrls[0]}
                    alt={item.name}
                    width={80}
                    height={50}
                    className="rounded-md"
                  />
                </Badge>
              </div>
              <div>
                <h3 className="text-sm text-gray-700 font-semibold">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 font-semibold">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="md:col-span-1">
              <span className="text-gray-500 font-semibold">
                ${(item.price * item.quantity!).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Divider className="my-4" />
        <div className="mb-4 flex justify-between">
          <div className="text-base font-medium mb-1">Promo Code</div>
          {!isCouponVisible ? (
            <FiPlus
              size={24}
              className="cursor-pointer transition ease-in-out duration-300 hover:scale-110 hover:opacity-75"
              onClick={() => setIsCouponVisible(true)}
            />
          ) : (
            <FiMinus
              size={24}
              className="cursor-pointer transition ease-in-out duration-300 hover:scale-110 hover:opacity-75"
              onClick={() => setIsCouponVisible(false)}
            />
          )}
        </div>
        <AnimatePresence>
          {isCouponVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex gap-2 w-full"
            >
              <Input
                placeholder="Enter code"
                radius="sm"
                color="primary"
                variant="bordered"
              />
              <Button color="primary" radius="none" className="rounded-md">
                Apply
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <Divider className="my-4" />
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Subtotal</span>$
          {cartItems &&
            cartItems
              .reduce((total, item) => total + item.price * item.quantity!, 0)
              .toFixed(2)}
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Shipping</span>
          <span className="font-bold">FREE</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-500">Estimated Tax</span>
          FREE
        </div>
        <Divider className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Estimated Total</span>${totalAmount(cartItems).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
